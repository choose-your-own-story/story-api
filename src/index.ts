import express, {NextFunction} from 'express';

import jwt from 'jsonwebtoken';

import multer from 'multer';
const upload = multer({ dest: '/tmp' });

const publicPathRaw = process.env.PUBLIC_PATH || '/';
const lastChar = publicPathRaw.charAt(publicPathRaw.length -1);
const extraSlash = lastChar === '/' ? '' : '/';
const publicPath = `${publicPathRaw}${extraSlash}`;
const publicPathNoTrailingSlash = lastChar === '/' && publicPathRaw.length > 1 ? publicPathRaw.substring(0, publicPathRaw.length -1) : publicPathRaw;

function checkToken (req: express.Request, res: express.Response, next: NextFunction): any {

  const secret = process.env.SECRET || 'secret';

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
    { uri: `${publicPath}api/multimedia`, method: 'GET' }
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
        message: `Token is not valid`,
      });
    }

    req.decoded = decoded;
    next();
  });
}


const app: express.Application = express();
const port: number = 3000;

import bodyParser from 'body-parser'; // instalar: npm install body-parser

import cors from 'cors';

import morgan from 'morgan';

app.use(bodyParser.json({limit: '10mb'}));
app.use(bodyParser.urlencoded({extended: true, limit: '10mb'}));
app.use(cors());
app.use(morgan('dev'));
app.use(checkToken);

import BookController from './controllers/book.js';
import BookRepository from './repositories/book.js';
import UserRepository from './repositories/user.js';
import PostgreProvider from './providers/postgres.js'
import HomeRepository from "./repositories/home.js";
import HomeController from "./controllers/home.js";
import UserController from "./controllers/user.js";
import UploadRepository from "./repositories/upload.js";
import UploadController from "./controllers/upload.js";
import LibraryController from "./controllers/library.js";
import LibraryRepository from "./repositories/library.js";

const configuration = {
  doSpacesEndpoint: process.env.DO_SPACES_ENDPOINT,
  doSpacesKey: process.env.DO_SPACES_KEY,
  doSpacesSecret: process.env.DO_SPACES_SECRET,
  doSpacesName: process.env.DO_SPACES_NAME
};


const postgreProvider = new PostgreProvider();
const bookRepository = new BookRepository(postgreProvider);
const homeRepository = new HomeRepository(postgreProvider);
const userRepository = new UserRepository(postgreProvider);
const uploadRepository = new UploadRepository(configuration);
const libraryRepository = new LibraryRepository(postgreProvider);

const router = express.Router();

new BookController(router, bookRepository);
new HomeController(router, homeRepository);
new UserController(router, userRepository);
new UploadController(router, upload, uploadRepository);
new LibraryController(router, libraryRepository, bookRepository);

console.log(`listening on ${publicPathNoTrailingSlash}`);
app.use(publicPathNoTrailingSlash, router);

console.log('adding handler for errors');
process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
});

app.listen(port, '0.0.0.0', () => {
  console.log(`History Maker app listening at http://0.0.0.0:${port}`)
});
