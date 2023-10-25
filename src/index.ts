import express = require('express');
// import fileUpload = require('express-fileupload');

const jwt = require('jsonwebtoken');

import multer  = require('multer');
const upload = multer({ dest: process.env.UPLOAD_STORAGE_PATH });

const publicPathRaw = process.env.PUBLIC_PATH || '/';
const lastChar = publicPathRaw.charAt(publicPathRaw.length -1);
const extraSlash = lastChar === '/' ? '' : '/';
const publicPath = `${publicPathRaw}${extraSlash}`;
const publicPathNoTrailingSlash = lastChar === '/' && publicPathRaw.length > 1 ? publicPathRaw.substring(0, publicPathRaw.length -1) : publicPathRaw;

const checkToken = (req: express.Request, res: express.Response, next: Function): any => {

  const secret = process.env.SECRET;

  const noneSecure = [
    { uri: `${publicPath}api/user/login`, method: 'POST' },
    { uri: `${publicPath}api/user/register`, method: 'POST' },
    { uri: `${publicPath}api/upload`, method: 'GET' },
    { uri: `${publicPath}api/upload`, method: 'POST' },
    { uri: `${publicPath}api/upload`, method: 'PUT' },
    { uri: `${publicPath}api/home`, method: 'GET' },
    { uri: `${publicPath}api/book`, method: 'GET' },
    { uri: `${publicPath}api/library`, method: 'GET' },
    { uri: `${publicPath}api/library`, method: 'POST' },
    { uri: `${publicPath}api/library`, method: 'DELETE' },
    { uri: `${publicPath}image`, method: 'GET' }
  ];

  const foundNoneSecure: Array<any> = noneSecure.filter(function(location) {
    return req.originalUrl.startsWith(location.uri) && req.method === location.method;
  });

  const noSecure = (foundNoneSecure.length > 0 || req.method === 'OPTIONS');

  // Express headers are auto converted to lowercase
  let token: string | undefined = req.headers.authorization;

  if (!token) {
    if (!noSecure)
      return res.status(401).json({
        success: false,
        message: 'Auth token is not supplied',
      });
    next();
    return;
  }

  if (token.startsWith('Bearer ')) {
    // Remove Bearer from string
    token = token.slice(7, token.length);
  }

  jwt.verify(token, secret, (err: any, decoded: any) => {
    if (err && !noSecure) {
      return res.status(401).json({
        success: false,
        message: 'Token is not valid',
      });
    }

    req.decoded = decoded;
    next();
  });
};


const app: express.Application = express();
const port: number = 3000;

const bodyParser = require('body-parser'); // instalar: npm install body-parser
const cors = require('cors');

const morgan = require('morgan');

app.use(bodyParser.json());
app.use(cors());
app.use(morgan('tiny'));
app.use(checkToken);

app.use(`${publicPath}image`, express.static('/storage/image'));

import BookController from './controllers/book';
import BookRepository from './repositories/book';
import UserRepository from './repositories/user';
import PostgreProvider from './providers/postgres'
import HomeRepository from "./repositories/home";
import HomeController from "./controllers/home";
import UserController from "./controllers/user";
import UploadRepository from "./repositories/upload";
import UploadController from "./controllers/upload";
import LibraryController from "./controllers/library";
import LibraryRepository from "./repositories/library";

const configuration = {
  storagePath: process.env.UPLOAD_STORAGE_PATH,
  cdnServer: process.env.CDN_HOST
};

const postgreProvider = new PostgreProvider();
const bookRepository = new BookRepository(postgreProvider);
const homeRepository = new HomeRepository(postgreProvider);
const userRepository = new UserRepository(postgreProvider);
const uploadRepository = new UploadRepository(configuration);
const libraryRepository = new LibraryRepository(postgreProvider);

const router = express.Router();

const bookController = new BookController(router, bookRepository);
const homeController = new HomeController(router, homeRepository);
const userController = new UserController(router, userRepository);
const uploadController = new UploadController(router, upload, uploadRepository);
const libraryController = new LibraryController(router, libraryRepository, bookRepository);

console.log(`listening on ${publicPathNoTrailingSlash}`);
app.use(publicPathNoTrailingSlash, router);

app.listen(port, '0.0.0.0', () => {
  console.log(`History Maker app listening at http://0.0.0.0:${port}`)
});
