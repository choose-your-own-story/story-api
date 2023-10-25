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
var BookController = /** @class */ (function () {
    function BookController(app, bookRepository) {
        this.bookRepository = bookRepository;
        app.get('/api/book/:bookId(\\d+)', this.loadBook.bind(this));
        app.get('/api/book/:bookId(\\d+)/page/:pageId(\\d+)', this.loadBookPage.bind(this));
        app.post('/api/book', this.addBook.bind(this));
        app.put('/api/book/:bookId', this.updateBook.bind(this));
        app.post('/api/book/:bookId/page', this.addBookPage.bind(this));
        app.put('/api/book/:bookId/page/:pageId', this.updateBookPage.bind(this));
        app.delete('/api/book/:bookId/page/:pageId', this.deleteBookPage.bind(this));
        app.delete('/api/book/:bookId', this.deleteBook.bind(this));
        app.get('/api/book/:bookId/page', this.loadBookPages.bind(this));
        app.post('/api/book/:bookId/page/:pageId/item', this.addPageItem.bind(this));
        app.put('/api/book/:bookId/page/:pageId/item', this.updatePageItem.bind(this));
        app.post('/api/book/:bookId/page/:pageId/choice', this.addPageChoice.bind(this));
        app.delete('/api/book/:bookId/page/:pageId/choice/:choiceId', this.deletePageChoice.bind(this));
        app.delete('/api/book/:bookId/page/:pageId/item/:itemId', this.deletePageItem.bind(this));
        app.get('/api/book/search', this.search.bind(this));
        app.get('/api/user/library', this.library.bind(this));
    }
    BookController.prototype.loadBook = function (request, response) {
        return __awaiter(this, void 0, void 0, function () {
            var bookId, output;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (request.params.bookId === undefined) {
                            response.status(400).send();
                            return [2 /*return*/];
                        }
                        bookId = parseInt(request.params.bookId.toString());
                        return [4 /*yield*/, this.bookRepository.loadBook(bookId, false)];
                    case 1:
                        output = _a.sent();
                        response.status(200).send(output);
                        return [2 /*return*/];
                }
            });
        });
    };
    BookController.prototype.library = function (request, response) {
        return __awaiter(this, void 0, void 0, function () {
            var output;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.bookRepository.loadBooks(request.decoded.id)];
                    case 1:
                        output = _a.sent();
                        response.status(200).send(output);
                        return [2 /*return*/];
                }
            });
        });
    };
    BookController.prototype.addBook = function (request, response) {
        return __awaiter(this, void 0, void 0, function () {
            var bookBody, output;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        bookBody = request.body;
                        bookBody.author = 1;
                        return [4 /*yield*/, this.bookRepository.addBook(request.decoded.id, request.decoded.name, bookBody)];
                    case 1:
                        output = _a.sent();
                        response.status(200).send(output);
                        return [2 /*return*/];
                }
            });
        });
    };
    BookController.prototype.updateBook = function (request, response) {
        return __awaiter(this, void 0, void 0, function () {
            var bookBody, output;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        bookBody = request.body;
                        return [4 /*yield*/, this.bookRepository.updateBook(request.decoded.id, request.decoded.name, bookBody)];
                    case 1:
                        output = _a.sent();
                        response.status(200).send(output);
                        return [2 /*return*/];
                }
            });
        });
    };
    BookController.prototype.addBookPage = function (request, response) {
        return __awaiter(this, void 0, void 0, function () {
            var bookId, body, output;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (request.params.bookId === undefined) {
                            response.status(400).send();
                            return [2 /*return*/];
                        }
                        bookId = parseInt(request.params.bookId);
                        body = request.body;
                        return [4 /*yield*/, this.bookRepository.addBookPage(bookId, body)];
                    case 1:
                        output = _a.sent();
                        response.status(200).send(output);
                        return [2 /*return*/];
                }
            });
        });
    };
    BookController.prototype.updateBookPage = function (request, response) {
        return __awaiter(this, void 0, void 0, function () {
            var bookId, pageId, title, output;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (request.params.bookId === undefined) {
                            response.status(400).send();
                            return [2 /*return*/];
                        }
                        bookId = parseInt(request.params.bookId);
                        pageId = parseInt(request.params.pageId);
                        title = request.body.title;
                        return [4 /*yield*/, this.bookRepository.updateBookPage(bookId, pageId, title)];
                    case 1:
                        output = _a.sent();
                        response.status(200).send(output);
                        return [2 /*return*/];
                }
            });
        });
    };
    BookController.prototype.deleteBookPage = function (request, response) {
        return __awaiter(this, void 0, void 0, function () {
            var bookId, pageId, output;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (request.params.pageId === undefined) {
                            response.status(400).send();
                            return [2 /*return*/];
                        }
                        if (request.params.bookId === undefined) {
                            response.status(400).send();
                            return [2 /*return*/];
                        }
                        bookId = parseInt(request.params.bookId);
                        pageId = parseInt(request.params.pageId);
                        return [4 /*yield*/, this.bookRepository.deleteBookPage(bookId, pageId)];
                    case 1:
                        output = _a.sent();
                        response.status(200).send(output);
                        return [2 /*return*/];
                }
            });
        });
    };
    BookController.prototype.deleteBook = function (request, response) {
        return __awaiter(this, void 0, void 0, function () {
            var bookId, output;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (request.params.bookId === undefined) {
                            response.status(400).send();
                            return [2 /*return*/];
                        }
                        bookId = parseInt(request.params.bookId);
                        return [4 /*yield*/, this.bookRepository.deleteBook(request.decoded.id, bookId)];
                    case 1:
                        output = _a.sent();
                        response.status(202).send(output);
                        return [2 /*return*/];
                }
            });
        });
    };
    BookController.prototype.addPageItem = function (request, response) {
        return __awaiter(this, void 0, void 0, function () {
            var output;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (request.params.pageId === undefined) {
                            response.status(400).send();
                            return [2 /*return*/];
                        }
                        if (request.params.bookId === undefined) {
                            response.status(400).send();
                            return [2 /*return*/];
                        }
                        return [4 /*yield*/, this.bookRepository.addPageItem(request.body)];
                    case 1:
                        output = _a.sent();
                        response.status(200).send(output);
                        return [2 /*return*/];
                }
            });
        });
    };
    BookController.prototype.updatePageItem = function (request, response) {
        return __awaiter(this, void 0, void 0, function () {
            var output;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (request.params.pageId === undefined) {
                            response.status(400).send();
                            return [2 /*return*/];
                        }
                        if (request.params.bookId === undefined) {
                            response.status(400).send();
                            return [2 /*return*/];
                        }
                        return [4 /*yield*/, this.bookRepository.updatePageItem(request.body)];
                    case 1:
                        output = _a.sent();
                        response.status(200).send(output);
                        return [2 /*return*/];
                }
            });
        });
    };
    BookController.prototype.search = function (request, response) {
        return __awaiter(this, void 0, void 0, function () {
            var rawTitle, title, output;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        rawTitle = request.query.title;
                        title = rawTitle === undefined ? '' : rawTitle.toString();
                        return [4 /*yield*/, this.bookRepository.search(title)];
                    case 1:
                        output = _a.sent();
                        response.status(200).send(output);
                        return [2 /*return*/];
                }
            });
        });
    };
    BookController.prototype.addPageChoice = function (request, response) {
        return __awaiter(this, void 0, void 0, function () {
            var output;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (request.params.pageId === undefined) {
                            response.status(400).send();
                            return [2 /*return*/];
                        }
                        if (request.params.bookId === undefined) {
                            response.status(400).send();
                            return [2 /*return*/];
                        }
                        return [4 /*yield*/, this.bookRepository.addPageChoice(parseInt(request.params.bookId), request.body)];
                    case 1:
                        output = _a.sent();
                        response.status(200).send(output);
                        return [2 /*return*/];
                }
            });
        });
    };
    BookController.prototype.deletePageChoice = function (request, response) {
        return __awaiter(this, void 0, void 0, function () {
            var output;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (request.params.pageId === undefined) {
                            response.status(400).send();
                            return [2 /*return*/];
                        }
                        if (request.params.bookId === undefined) {
                            response.status(400).send();
                            return [2 /*return*/];
                        }
                        if (request.params.choiceId === undefined) {
                            response.status(400).send();
                            return [2 /*return*/];
                        }
                        return [4 /*yield*/, this.bookRepository.deletePageChoice(parseInt(request.params.choiceId))];
                    case 1:
                        output = _a.sent();
                        response.status(200).send(output);
                        return [2 /*return*/];
                }
            });
        });
    };
    BookController.prototype.deletePageItem = function (request, response) {
        return __awaiter(this, void 0, void 0, function () {
            var output;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (request.params.pageId === undefined) {
                            response.status(400).send();
                            return [2 /*return*/];
                        }
                        if (request.params.bookId === undefined) {
                            response.status(400).send();
                            return [2 /*return*/];
                        }
                        if (request.params.itemId === undefined) {
                            response.status(400).send();
                            return [2 /*return*/];
                        }
                        return [4 /*yield*/, this.bookRepository.deletePageItem(parseInt(request.params.itemId))];
                    case 1:
                        output = _a.sent();
                        response.status(200).send(output);
                        return [2 /*return*/];
                }
            });
        });
    };
    BookController.prototype.loadBookPage = function (request, response) {
        return __awaiter(this, void 0, void 0, function () {
            var bookId, pageId, userId, output;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (request.params.bookId === undefined) {
                            response.status(400).send();
                            return [2 /*return*/];
                        }
                        if (request.params.pageId === undefined) {
                            response.status(400).send();
                            return [2 /*return*/];
                        }
                        bookId = parseInt(request.params.bookId.toString());
                        pageId = parseInt(request.params.pageId.toString());
                        userId = request.decoded !== undefined ? request.decoded.id : undefined;
                        return [4 /*yield*/, this.bookRepository.loadPage(bookId, pageId, userId)];
                    case 1:
                        output = _a.sent();
                        response.status(200).send(output);
                        return [2 /*return*/];
                }
            });
        });
    };
    BookController.prototype.loadBookPages = function (request, response) {
        return __awaiter(this, void 0, void 0, function () {
            var bookId, output;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (request.params.bookId === undefined) {
                            response.status(400).send();
                            return [2 /*return*/];
                        }
                        bookId = parseInt(request.params.bookId.toString());
                        return [4 /*yield*/, this.bookRepository.loadBookPages(bookId)];
                    case 1:
                        output = _a.sent();
                        response.status(200).send(output);
                        return [2 /*return*/];
                }
            });
        });
    };
    return BookController;
}());
exports.default = BookController;
