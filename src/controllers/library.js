"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var LibraryController = /** @class */ (function () {
    function LibraryController(app, libraryRepository, bookRepository) {
        this.libraryRepository = libraryRepository;
        this.bookRepository = bookRepository;
        // app.get('/api/library/tag', this.loadTag.bind(this));
        // app.post('/api/library/tag', this.addTag.bind(this));
        // app.delete('/api/library/tag/:id', this.delTag.bind(this));
        app.get('/api/library/genre', this.listGenre.bind(this));
        app.post('/api/library/genre', this.addGenre.bind(this));
        app.delete('/api/library/genre/:id(\\d+)', this.delGenre.bind(this));
        app.get('/api/library/search', this.search.bind(this));
        app.get('/api/library/book/:id(\\d+)', this.loadBook.bind(this));
    }
    LibraryController.prototype.listGenre = function (request, response) {
        return __awaiter(this, void 0, void 0, function () {
            var idParent, output;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        idParent = request.query.idParent;
                        return [4 /*yield*/, this.libraryRepository.listGenre(idParent)];
                    case 1:
                        output = _a.sent();
                        response.status(200).send(output);
                        return [2 /*return*/];
                }
            });
        });
    };
    LibraryController.prototype.loadBook = function (request, response) {
        return __awaiter(this, void 0, void 0, function () {
            var bookId, output;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (request.params.id === undefined) {
                            response.status(400).send();
                            return [2 /*return*/];
                        }
                        bookId = parseInt(request.params.id.toString());
                        return [4 /*yield*/, this.bookRepository.loadBook(bookId, true)];
                    case 1:
                        output = _a.sent();
                        response.status(200).send(output);
                        return [2 /*return*/];
                }
            });
        });
    };
    LibraryController.prototype.preparseQueryParamStringForSearch = function (queryValue) {
        var parsedQueryValue = queryValue === undefined ? '%' : queryValue.toString();
        parsedQueryValue = parsedQueryValue.replace(' ', '%');
        parsedQueryValue = "%" + parsedQueryValue + "%";
        return parsedQueryValue;
    };
    LibraryController.prototype.preparseQueryParamInt = function (queryValue, defaultValue) {
        if (defaultValue === void 0) { defaultValue = undefined; }
        return queryValue === undefined ? defaultValue : parseInt(queryValue.toString());
    };
    LibraryController.prototype.search = function (request, response) {
        return __awaiter(this, void 0, void 0, function () {
            var title, author, idGenre, idSubGenre, output;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        title = this.preparseQueryParamStringForSearch(request.query.title);
                        author = this.preparseQueryParamStringForSearch(request.query.author);
                        idGenre = this.preparseQueryParamInt(request.query.idGenre);
                        idSubGenre = this.preparseQueryParamInt(request.query.idSubGenre);
                        return [4 /*yield*/, this.libraryRepository.search(title, author, idGenre, idSubGenre)];
                    case 1:
                        output = _a.sent();
                        response.status(200).send(output);
                        return [2 /*return*/];
                }
            });
        });
    };
    LibraryController.prototype.addGenre = function (request, response) {
        return __awaiter(this, void 0, void 0, function () {
            var body, output;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        body = request.body;
                        if (body.name === undefined) {
                            response.status(400).send();
                            return [2 /*return*/];
                        }
                        return [4 /*yield*/, this.libraryRepository.addGenre(body)];
                    case 1:
                        output = _a.sent();
                        response.status(200).send(output);
                        return [2 /*return*/];
                }
            });
        });
    };
    LibraryController.prototype.delGenre = function (request, response) {
        return __awaiter(this, void 0, void 0, function () {
            var idGenre, output;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        idGenre = request.params.id;
                        if (idGenre === undefined) {
                            response.sendStatus(400).send();
                            return [2 /*return*/];
                        }
                        return [4 /*yield*/, this.libraryRepository.delGenre(parseInt(idGenre))];
                    case 1:
                        output = _a.sent();
                        response.sendStatus(200).send(output);
                        return [2 /*return*/];
                }
            });
        });
    };
    return LibraryController;
}());
exports.default = LibraryController;
