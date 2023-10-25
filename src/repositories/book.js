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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var query_loader_1 = __importDefault(require("./helpers/query_loader"));
var SearchResult = /** @class */ (function () {
    function SearchResult(id, idUser, active, title, description, cover, activated_date, idGenre, idSubGenre, genre, subGenre, reads, likes) {
        this.id = id;
        this.idUser = idUser;
        this.active = active;
        this.title = title;
        this.description = description;
        this.cover = cover;
        this.activated_date = activated_date;
        this.idGenre = idGenre;
        this.idSubGenre = idSubGenre;
        this.genre = genre;
        this.subGenre = subGenre;
        this.reads = reads;
        this.likes = likes;
    }
    return SearchResult;
}());
var BookRepository = /** @class */ (function () {
    function BookRepository(databaseProvider) {
        this.databaseProvider = databaseProvider;
        this.queryLoader = new query_loader_1.default('book');
    }
    BookRepository.prototype._loadFirstPages = function (bookId) {
        return __awaiter(this, void 0, void 0, function () {
            var query, data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        query = this.queryLoader.rq('load_first_pages');
                        return [4 /*yield*/, this.databaseProvider.instance().query(query, [bookId])];
                    case 1:
                        data = _a.sent();
                        return [2 /*return*/, data.rows.map(function (item) {
                                return {
                                    title: item.title,
                                    id: item.id
                                };
                            })];
                }
            });
        });
    };
    BookRepository.prototype.loadBook = function (bookId, incReadCounter) {
        return __awaiter(this, void 0, void 0, function () {
            var queryStat, query, data, firstPages;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!incReadCounter) return [3 /*break*/, 2];
                        queryStat = this.queryLoader.rq('upsert_book_read_stats');
                        return [4 /*yield*/, this.databaseProvider.instance().query(queryStat, [bookId])];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2:
                        query = this.queryLoader.rq('list_one_book');
                        return [4 /*yield*/, this.databaseProvider.instance().query(query, [bookId])];
                    case 3:
                        data = _a.sent();
                        return [4 /*yield*/, this._loadFirstPages(bookId)];
                    case 4:
                        firstPages = _a.sent();
                        return [2 /*return*/, data.rows.map(function (item) {
                                return {
                                    title: item.title,
                                    description: item.description,
                                    cover: item.cover,
                                    id: item.id,
                                    first_pages: firstPages,
                                    idGenre: item.id_genre,
                                    idSubGenre: item.id_sub_genre,
                                    active: item.active
                                };
                            })[0]];
                }
            });
        });
    };
    BookRepository.prototype.loadBookPages = function (bookId) {
        return __awaiter(this, void 0, void 0, function () {
            var vm, query, data, pages, queryBookChoices, dataBookChoices;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        vm = this;
                        query = this.queryLoader.rq('load_book_pages');
                        return [4 /*yield*/, this.databaseProvider.instance().query(query, [bookId])];
                    case 1:
                        data = _a.sent();
                        pages = data.rows.map(function (item) {
                            return {
                                title: vm._parsePageTitle(item.title),
                                page_type: item.page_type,
                                id: item.id,
                                choices: [],
                                recive_count: item.recive_count,
                                items_count: item.items_count
                            };
                        });
                        queryBookChoices = this.queryLoader.rq('load_book_choices');
                        return [4 /*yield*/, this.databaseProvider.instance().query(queryBookChoices, [bookId])];
                    case 2:
                        dataBookChoices = _a.sent();
                        dataBookChoices.rows.forEach(function (choice) {
                            var page = pages.find(function (item) { return item.id === choice.id_page; });
                            if (page === undefined)
                                return;
                            var obj = {
                                id: parseInt(choice.id),
                                idPage: choice.id_page,
                                idTargetPage: choice.target_page,
                                text: choice.value
                            };
                            page.choices.push(obj);
                        });
                        return [2 /*return*/, pages];
                }
            });
        });
    };
    BookRepository.prototype.loadBooks = function (userId) {
        return __awaiter(this, void 0, void 0, function () {
            var query, data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        query = this.queryLoader.rq('list_all_books');
                        return [4 /*yield*/, this.databaseProvider.instance().query(query, [userId])];
                    case 1:
                        data = _a.sent();
                        return [2 /*return*/, data.rows.map(function (item) {
                                return new SearchResult(item.id, item.id_user, item.active, item.title, item.description, item.cover, item.activated_date, item.id_genre, item.id_sub_genre, item.g_name, item.sg_name, item.read_count, item.like_count);
                            })];
                }
            });
        });
    };
    BookRepository.prototype.addBook = function (userId, userName, book) {
        return __awaiter(this, void 0, void 0, function () {
            var bookTitle, bookUserId, bookDescription, bookCover, query, data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        bookTitle = book.title;
                        bookUserId = userId;
                        bookDescription = book.description;
                        bookCover = book.cover;
                        query = this.queryLoader.rq('add_new_book');
                        return [4 /*yield*/, this.databaseProvider.instance().query(query, [
                                bookTitle,
                                bookUserId,
                                bookDescription,
                                bookCover
                            ])];
                    case 1:
                        data = _a.sent();
                        return [2 /*return*/, data.rows.map(function (item) {
                                return {
                                    title: bookTitle,
                                    user_id: bookUserId,
                                    author: userName,
                                    description: bookDescription,
                                    cover: bookCover,
                                    id: item.id
                                };
                            })[0]];
                }
            });
        });
    };
    BookRepository.prototype.updateBook = function (userId, userName, book) {
        return __awaiter(this, void 0, void 0, function () {
            var bookTitle, bookUserId, bookDescription, bookCover, bookIdGenre, bookIdSubGenre, bookId, bookActive, query, data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        bookTitle = book.title;
                        bookUserId = userId;
                        bookDescription = book.description;
                        bookCover = book.cover;
                        bookIdGenre = book.idGenre;
                        bookIdSubGenre = book.idSubGenre;
                        bookId = parseInt(book.id);
                        bookActive = parseInt(book.active);
                        query = this.queryLoader.rq('update_book');
                        return [4 /*yield*/, this.databaseProvider.instance().query(query, [
                                bookTitle,
                                bookDescription,
                                bookCover,
                                bookIdGenre,
                                bookIdSubGenre,
                                bookActive,
                                bookId,
                                bookUserId
                            ])];
                    case 1:
                        data = _a.sent();
                        return [2 /*return*/, data.rows.map(function (item) {
                                return {
                                    title: bookTitle,
                                    author: userName,
                                    description: bookDescription,
                                    cover: bookCover,
                                    id: item.id
                                };
                            })[0]];
                }
            });
        });
    };
    BookRepository.prototype.addBookPage = function (bookId, pageBody) {
        return __awaiter(this, void 0, void 0, function () {
            var vm, query, pageType, data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        vm = this;
                        console.log(pageBody);
                        query = this.queryLoader.rq('add_new_book_page');
                        pageType = pageBody.page_type;
                        return [4 /*yield*/, this.databaseProvider.instance().query(query, [bookId, pageType])];
                    case 1:
                        data = _a.sent();
                        return [2 /*return*/, data.rows.map(function (item) {
                                return {
                                    book_id: bookId,
                                    id: item.id,
                                    title: vm._parsePageTitle(item.title),
                                    page_type: item.page_type
                                };
                            })[0]];
                }
            });
        });
    };
    BookRepository.prototype.updateBookPage = function (bookId, pageId, title) {
        return __awaiter(this, void 0, void 0, function () {
            var vm, query;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        vm = this;
                        query = this.queryLoader.rq('update_book_page');
                        return [4 /*yield*/, this.databaseProvider.instance().query(query, [pageId, title])];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, {
                                book_id: bookId,
                                id: pageId,
                                title: vm._parsePageTitle(title)
                            }];
                }
            });
        });
    };
    BookRepository.prototype.addBookPageWithTitle = function (bookId, title) {
        return __awaiter(this, void 0, void 0, function () {
            var query, data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        query = this.queryLoader.rq('add_new_book_page_with_title');
                        return [4 /*yield*/, this.databaseProvider.instance().query(query, [bookId, title])];
                    case 1:
                        data = _a.sent();
                        return [2 /*return*/, data.rows.map(function (item) {
                                return {
                                    book_id: bookId,
                                    id: item.id,
                                    title: item.title
                                };
                            })[0]];
                }
            });
        });
    };
    BookRepository.prototype.deleteBookPage = function (bookId, pageId) {
        return __awaiter(this, void 0, void 0, function () {
            var query;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        query = this.queryLoader.rq('delete_book_page');
                        return [4 /*yield*/, this.databaseProvider.instance().query(query, [pageId])];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, {
                                status: 'ok'
                            }];
                }
            });
        });
    };
    BookRepository.prototype.deletePageChoice = function (choiceId) {
        return __awaiter(this, void 0, void 0, function () {
            var query;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        query = this.queryLoader.rq('delete_choice');
                        return [4 /*yield*/, this.databaseProvider.instance().query(query, [choiceId])];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, {
                                status: 'ok'
                            }];
                }
            });
        });
    };
    BookRepository.prototype.deletePageItem = function (itemId) {
        return __awaiter(this, void 0, void 0, function () {
            var query;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        query = this.queryLoader.rq('delete_page_item');
                        return [4 /*yield*/, this.databaseProvider.instance().query(query, [itemId])];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, {
                                status: 'ok'
                            }];
                }
            });
        });
    };
    BookRepository.prototype.deleteBook = function (userId, bookId) {
        return __awaiter(this, void 0, void 0, function () {
            var queryPages, queryBook;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        queryPages = this.queryLoader.rq('delete_book_pages');
                        return [4 /*yield*/, this.databaseProvider.instance().query(queryPages, [bookId])];
                    case 1:
                        _a.sent();
                        queryBook = this.queryLoader.rq('delete_book');
                        return [4 /*yield*/, this.databaseProvider.instance().query(queryBook, [bookId, userId])];
                    case 2:
                        _a.sent();
                        return [2 /*return*/, {
                                status: 'ok'
                            }];
                }
            });
        });
    };
    BookRepository.prototype.addPageItem = function (item) {
        return __awaiter(this, void 0, void 0, function () {
            var pageId, itemType, value, query, data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        pageId = item.page_id;
                        itemType = item.item_type;
                        value = item.value;
                        query = this.queryLoader.rq('add_page_item');
                        return [4 /*yield*/, this.databaseProvider.instance().query(query, [pageId, itemType, value])];
                    case 1:
                        data = _a.sent();
                        return [2 /*return*/, data.rows.map(function (item) {
                                return {
                                    id: item.id,
                                    page_id: pageId,
                                    type: itemType,
                                    value: value
                                };
                            })[0]];
                }
            });
        });
    };
    BookRepository.prototype.updatePageItem = function (item) {
        return __awaiter(this, void 0, void 0, function () {
            var pageId, itemType, value, id, query, data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        pageId = item.page_id;
                        itemType = item.item_type;
                        value = item.value;
                        id = item.id;
                        query = this.queryLoader.rq('update_page_item');
                        return [4 /*yield*/, this.databaseProvider.instance().query(query, [value, id])];
                    case 1:
                        data = _a.sent();
                        return [2 /*return*/, data.rows.map(function (item) {
                                return {
                                    id: item.id,
                                    page_id: pageId,
                                    type: itemType,
                                    value: value
                                };
                            })[0]];
                }
            });
        });
    };
    BookRepository.prototype.addPageChoice = function (bookId, item) {
        return __awaiter(this, void 0, void 0, function () {
            var pageId, sortIndex, value, targetPage, targetPageTitle, targetPageId, newPageObject, pageBody, newPageObject, query, data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        pageId = item.page_id;
                        sortIndex = item.sort_index;
                        value = item.value;
                        targetPage = item.target_page;
                        targetPageTitle = item.target_page_title;
                        targetPageId = 0;
                        if (!((targetPage <= 0) || (targetPage === undefined))) return [3 /*break*/, 5];
                        if (!((targetPageTitle !== undefined) && (targetPageTitle !== ''))) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.addBookPageWithTitle(bookId, targetPageTitle)];
                    case 1:
                        newPageObject = _a.sent();
                        targetPageId = newPageObject.id;
                        return [3 /*break*/, 4];
                    case 2:
                        pageBody = {
                            page_type: 0
                        };
                        return [4 /*yield*/, this.addBookPage(bookId, pageBody)];
                    case 3:
                        newPageObject = _a.sent();
                        targetPageId = newPageObject.id;
                        _a.label = 4;
                    case 4: return [3 /*break*/, 6];
                    case 5:
                        // use existing page
                        targetPageId = targetPage;
                        _a.label = 6;
                    case 6:
                        query = this.queryLoader.rq('add_page_choice');
                        return [4 /*yield*/, this.databaseProvider.instance().query(query, [pageId, sortIndex, targetPageId, value, bookId])];
                    case 7:
                        data = _a.sent();
                        return [2 /*return*/, data.rows.map(function (item) {
                                return {
                                    id: item.id,
                                    pageId: pageId,
                                    sortIndex: sortIndex,
                                    targetPageTitle: targetPageTitle,
                                    value: value,
                                    targetPage: targetPageId
                                };
                            })[0]];
                }
            });
        });
    };
    BookRepository.prototype.search = function (title) {
        return __awaiter(this, void 0, void 0, function () {
            var titleQuery, query, data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        titleQuery = "%" + title + "%";
                        query = this.queryLoader.rq('search');
                        return [4 /*yield*/, this.databaseProvider.instance().query(query, [titleQuery])];
                    case 1:
                        data = _a.sent();
                        return [2 /*return*/, data.rows.map(function (item) {
                                return {
                                    title: item.title,
                                    id: item.id
                                };
                            })];
                }
            });
        });
    };
    BookRepository.prototype._parsePageTitle = function (title) {
        return title === null || title === undefined ? '' : title;
    };
    BookRepository.prototype._loadPageData = function (pageId) {
        return __awaiter(this, void 0, void 0, function () {
            var vm, query, data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        vm = this;
                        query = this.queryLoader.rq('load_page_title');
                        return [4 /*yield*/, this.databaseProvider.instance().query(query, [pageId])];
                    case 1:
                        data = _a.sent();
                        return [2 /*return*/, data.rows.map(function (item) {
                                return {
                                    title: vm._parsePageTitle(item.title),
                                    page_type: item.page_type
                                };
                            })[0]];
                }
            });
        });
    };
    BookRepository.prototype._loadPageItems = function (pageId) {
        return __awaiter(this, void 0, void 0, function () {
            var query, data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        query = this.queryLoader.rq('load_page_items');
                        return [4 /*yield*/, this.databaseProvider.instance().query(query, [pageId])];
                    case 1:
                        data = _a.sent();
                        return [2 /*return*/, data.rows.map(function (item) {
                                return {
                                    id: item.id,
                                    page_id: item.id_page,
                                    type: item.type,
                                    value: item.value
                                };
                            })];
                }
            });
        });
    };
    BookRepository.prototype._updateUserContinueReading = function (userId, bookId, pageId) {
        return __awaiter(this, void 0, void 0, function () {
            var query;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        query = this.queryLoader.rq('upsert_user_continue_reading');
                        return [4 /*yield*/, this.databaseProvider.instance().query(query, [userId, bookId, pageId])];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    BookRepository.prototype._loadPageChoices = function (pageId) {
        return __awaiter(this, void 0, void 0, function () {
            var query, data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        query = this.queryLoader.rq('load_page_choices');
                        return [4 /*yield*/, this.databaseProvider.instance().query(query, [pageId])];
                    case 1:
                        data = _a.sent();
                        return [2 /*return*/, data.rows.map(function (item) {
                                return {
                                    value: item.value,
                                    id: item.id,
                                    sortIndex: item.sort_index,
                                    targetPage: item.target_page,
                                    targetBook: item.target_book,
                                    targetPageTitle: item.title
                                };
                            })];
                }
            });
        });
    };
    BookRepository.prototype.loadPage = function (bookId, pageId, userId) {
        return __awaiter(this, void 0, void 0, function () {
            var vm, pageItems, pageChoices, data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        vm = this;
                        if (!(userId !== undefined)) return [3 /*break*/, 2];
                        return [4 /*yield*/, this._updateUserContinueReading(userId, bookId, pageId)];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2: return [4 /*yield*/, this._loadPageItems(pageId)];
                    case 3:
                        pageItems = _a.sent();
                        return [4 /*yield*/, this._loadPageChoices(pageId)];
                    case 4:
                        pageChoices = _a.sent();
                        return [4 /*yield*/, this._loadPageData(pageId)];
                    case 5:
                        data = _a.sent();
                        return [2 /*return*/, {
                                items: pageItems,
                                choices: pageChoices,
                                title: vm._parsePageTitle(data.title),
                                page_type: data.page_type
                            }];
                }
            });
        });
    };
    return BookRepository;
}());
exports.default = BookRepository;
