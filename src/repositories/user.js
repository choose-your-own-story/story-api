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
var search_result_1 = __importDefault(require("./contracts/search_result"));
var continue_reading_result_1 = __importDefault(require("./contracts/continue_reading_result"));
var jwt = require('jsonwebtoken');
var uuid = require('uuidv4').uuid;
var UserRepository = /** @class */ (function () {
    function UserRepository(databaseProvider) {
        this.databaseProvider = databaseProvider;
        this.queryLoader = new query_loader_1.default('user');
        this.secret = process.env.SECRET;
    }
    UserRepository.prototype._jwtFromUserData = function (userData) {
        var randomIdToken = uuid();
        // creamos el token con el que el usuario va a autenticarse en los
        // llamados a las api
        var token = jwt.sign({
            name: userData.name,
            thumb: userData.thumb,
            id: userData.id
        }, this.secret, {
            expiresIn: (24 * 365).toString() + "h",
        });
        return {
            user: userData,
            token: token
        };
    };
    UserRepository.prototype.login = function (userName, userPassword) {
        return __awaiter(this, void 0, void 0, function () {
            var query, data, userData;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        query = this.queryLoader.rq('login');
                        return [4 /*yield*/, this.databaseProvider.instance().query(query, [userName, userPassword])];
                    case 1:
                        data = _a.sent();
                        if (data.rows.length === 0)
                            return [2 /*return*/, 'No hay usuario'];
                        userData = data.rows.map(function (item) {
                            return {
                                id: item.id,
                                name: item.name,
                                thumb: item.thumb
                            };
                        })[0];
                        return [2 /*return*/, this._jwtFromUserData(userData)];
                }
            });
        });
    };
    UserRepository.prototype.register = function (userName, userPassword, userThumb) {
        return __awaiter(this, void 0, void 0, function () {
            var query, response, userData, e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        query = this.queryLoader.rq('register');
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.databaseProvider.instance().query(query, [userName, userPassword, userThumb])];
                    case 2:
                        response = _a.sent();
                        userData = {
                            id: response.rows[0]['id'],
                            name: userName,
                            thumb: userThumb
                        };
                        return [2 /*return*/, this._jwtFromUserData(userData)];
                    case 3:
                        e_1 = _a.sent();
                        return [2 /*return*/, "user already exists"];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    UserRepository.prototype.listUserLikes = function (userId) {
        return __awaiter(this, void 0, void 0, function () {
            var query, data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        query = this.queryLoader.rq('list_user_likes');
                        return [4 /*yield*/, this.databaseProvider.instance().query(query, [userId])];
                    case 1:
                        data = _a.sent();
                        return [2 /*return*/, data.rows.map(function (item) { return item.id_book; })];
                }
            });
        });
    };
    UserRepository.prototype.listUserFavorites = function (userId) {
        return __awaiter(this, void 0, void 0, function () {
            var query, data, items;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        query = this.queryLoader.rq('list_user_favorites');
                        return [4 /*yield*/, this.databaseProvider.instance().query(query, [userId])];
                    case 1:
                        data = _a.sent();
                        items = data.rows.map(function (item) {
                            return new search_result_1.default(item.id, item.id_user, item.active, item.title, item.description, item.cover, item.activated_date, item.id_genre, item.id_sub_genre, item.u_name, item.u_thumb, item.g_name, item.sg_name, item.read_count, item.like_count);
                        });
                        return [2 /*return*/, items];
                }
            });
        });
    };
    UserRepository.prototype.updateUserThumb = function (userName, userThumb) {
        return __awaiter(this, void 0, void 0, function () {
            var query, data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        query = this.queryLoader.rq('update_user_thumb');
                        return [4 /*yield*/, this.databaseProvider.instance().query(query, [userName, userThumb])];
                    case 1:
                        data = _a.sent();
                        return [2 /*return*/, data.rows.map(function (item) {
                                return {
                                    name: item.name,
                                    thumb: item.thumb
                                };
                            })[0]];
                }
            });
        });
    };
    UserRepository.prototype.addFavorite = function (userId, bookId) {
        return __awaiter(this, void 0, void 0, function () {
            var query, e_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        query = this.queryLoader.rq('upsert_user_favorite');
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.databaseProvider.instance().query(query, [bookId, userId])];
                    case 2:
                        _a.sent();
                        return [2 /*return*/, this.listUserFavorites(userId)];
                    case 3:
                        e_2 = _a.sent();
                        return [2 /*return*/, "can not add book to list"];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    UserRepository.prototype.delFavorite = function (userId, bookId) {
        return __awaiter(this, void 0, void 0, function () {
            var query, e_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        query = this.queryLoader.rq('delete_user_favorite');
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.databaseProvider.instance().query(query, [bookId, userId])];
                    case 2:
                        _a.sent();
                        return [2 /*return*/, this.listUserFavorites(userId)];
                    case 3:
                        e_3 = _a.sent();
                        return [2 /*return*/, "can not add book to list"];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    UserRepository.prototype.addLike = function (userId, bookId) {
        return __awaiter(this, void 0, void 0, function () {
            var query, queryStat, e_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        query = this.queryLoader.rq('upsert_user_like');
                        queryStat = this.queryLoader.rq('inc_book_like_count');
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 4, , 5]);
                        return [4 /*yield*/, this.databaseProvider.instance().query(query, [bookId, userId])];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, this.databaseProvider.instance().query(queryStat, [bookId])];
                    case 3:
                        _a.sent();
                        return [2 /*return*/, this.listUserLikes(userId)];
                    case 4:
                        e_4 = _a.sent();
                        return [2 /*return*/, "can not add book to list"];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    UserRepository.prototype.delLike = function (userId, bookId) {
        return __awaiter(this, void 0, void 0, function () {
            var query, queryStat, e_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        query = this.queryLoader.rq('delete_user_like');
                        queryStat = this.queryLoader.rq('dec_book_like_count');
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 4, , 5]);
                        return [4 /*yield*/, this.databaseProvider.instance().query(query, [bookId, userId])];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, this.databaseProvider.instance().query(queryStat, [bookId])];
                    case 3:
                        _a.sent();
                        return [2 /*return*/, this.listUserLikes(userId)];
                    case 4:
                        e_5 = _a.sent();
                        return [2 /*return*/, "can not add book to list"];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    UserRepository.prototype.listContinueReading = function (userId) {
        return __awaiter(this, void 0, void 0, function () {
            var query, data, items;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        query = this.queryLoader.rq('list_continue_reading');
                        return [4 /*yield*/, this.databaseProvider.instance().query(query, [userId])];
                    case 1:
                        data = _a.sent();
                        items = data.rows.map(function (item) {
                            return new continue_reading_result_1.default(item.id, item.id_user, item.active, item.title, item.description, item.cover, item.activated_date, item.id_genre, item.id_sub_genre, item.u_name, item.u_thumb, item.g_name, item.sg_name, item.read_count, item.like_count, item.id_page);
                        });
                        return [2 /*return*/, items];
                }
            });
        });
    };
    return UserRepository;
}());
exports.default = UserRepository;
