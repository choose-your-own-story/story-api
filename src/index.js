"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
// import fileUpload = require('express-fileupload');
var jwt = require('jsonwebtoken');
var multer = require("multer");
var upload = multer({ dest: process.env.UPLOAD_STORAGE_PATH });
var publicPathRaw = process.env.PUBLIC_PATH || '/';
var lastChar = publicPathRaw.charAt(publicPathRaw.length - 1);
var extraSlash = lastChar === '/' ? '' : '/';
var publicPath = "" + publicPathRaw + extraSlash;
var publicPathNoTrailingSlash = lastChar === '/' && publicPathRaw.length > 1 ? publicPathRaw.substring(0, publicPathRaw.length - 1) : publicPathRaw;
var checkToken = function (req, res, next) {
    var secret = process.env.SECRET;
    var noneSecure = [
        { uri: publicPath + "api/user/login", method: 'POST' },
        { uri: publicPath + "api/user/register", method: 'POST' },
        { uri: publicPath + "api/upload", method: 'GET' },
        { uri: publicPath + "api/upload", method: 'POST' },
        { uri: publicPath + "api/upload", method: 'PUT' },
        { uri: publicPath + "api/home", method: 'GET' },
        { uri: publicPath + "api/book", method: 'GET' },
        { uri: publicPath + "api/library", method: 'GET' },
        { uri: publicPath + "api/library", method: 'POST' },
        { uri: publicPath + "api/library", method: 'DELETE' },
        { uri: publicPath + "api/multimedia", method: 'GET' }
    ];
    var foundNoneSecure = noneSecure.filter(function (location) {
        return req.originalUrl.startsWith(location.uri) && req.method === location.method;
    });
    var noSecure = (foundNoneSecure.length > 0 || req.method === 'OPTIONS');
    // Express headers are auto converted to lowercase
    var token = req.headers.authorization;
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
    jwt.verify(token, secret, function (err, decoded) {
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
var app = express();
var port = 3000;
var bodyParser = require('body-parser'); // instalar: npm install body-parser
var cors = require('cors');
var morgan = require('morgan');
app.use(bodyParser.json());
app.use(cors());
app.use(morgan('tiny'));
app.use(checkToken);
//app.use(`${publicPath}multimedia`, express.static('/static'));
var book_1 = __importDefault(require("./controllers/book"));
var book_2 = __importDefault(require("./repositories/book"));
var user_1 = __importDefault(require("./repositories/user"));
var postgres_1 = __importDefault(require("./providers/postgres"));
var home_1 = __importDefault(require("./repositories/home"));
var home_2 = __importDefault(require("./controllers/home"));
var user_2 = __importDefault(require("./controllers/user"));
var upload_1 = __importDefault(require("./repositories/upload"));
var upload_2 = __importDefault(require("./controllers/upload"));
var library_1 = __importDefault(require("./controllers/library"));
var library_2 = __importDefault(require("./repositories/library"));
var configuration = {
    storagePath: process.env.UPLOAD_STORAGE_PATH,
    cdnServer: process.env.CDN_HOST
};
var postgreProvider = new postgres_1.default();
var bookRepository = new book_2.default(postgreProvider);
var homeRepository = new home_1.default(postgreProvider);
var userRepository = new user_1.default(postgreProvider);
var uploadRepository = new upload_1.default(configuration);
var libraryRepository = new library_2.default(postgreProvider);
var router = express.Router();
var bookController = new book_1.default(router, bookRepository);
var homeController = new home_2.default(router, homeRepository);
var userController = new user_2.default(router, userRepository);
var uploadController = new upload_2.default(router, upload, uploadRepository);
var libraryController = new library_1.default(router, libraryRepository, bookRepository);
console.log("listening on " + publicPathNoTrailingSlash);
app.use(publicPathNoTrailingSlash, router);
app.listen(port, '0.0.0.0', function () {
    console.log("History Maker app listening at http://0.0.0.0:" + port);
});
