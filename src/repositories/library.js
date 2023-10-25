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
var Genre = /** @class */ (function () {
    function Genre(id, name, idParent) {
        this.id = id;
        this.name = name;
        this.idParent = idParent;
    }
    return Genre;
}());
var LibraryRepository = /** @class */ (function () {
    function LibraryRepository(databaseProvider) {
        this.databaseProvider = databaseProvider;
        this.queryLoader = new query_loader_1.default('library');
    }
    LibraryRepository.prototype.listGenre = function (idParentGenre) {
        return __awaiter(this, void 0, void 0, function () {
            var query, data, items;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        query = this.queryLoader.rq('list_genre');
                        return [4 /*yield*/, this.databaseProvider.instance().query(query, [idParentGenre])];
                    case 1:
                        data = _a.sent();
                        items = data.rows.map(function (item) {
                            return new Genre(item.id, item.name, item.id_parent);
                        });
                        return [2 /*return*/, items];
                }
            });
        });
    };
    LibraryRepository.prototype.search = function (title, author, idGenre, idSubGenre) {
        return __awaiter(this, void 0, void 0, function () {
            var query, parsedIdGenre, parsedIdSubGenre, data, items;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        query = this.queryLoader.rq('search');
                        parsedIdGenre = idGenre === undefined ? 0 : idGenre;
                        parsedIdSubGenre = idSubGenre === undefined ? 0 : idSubGenre;
                        return [4 /*yield*/, this.databaseProvider.instance().query(query, [title, author, parsedIdGenre, parsedIdSubGenre])];
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
    LibraryRepository.prototype.addGenre = function (body) {
        return __awaiter(this, void 0, void 0, function () {
            var query, name, idParent, data, item;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        query = this.queryLoader.rq('add_genre');
                        name = body.name;
                        idParent = body.idParent;
                        return [4 /*yield*/, this.databaseProvider.instance().query(query, [name, idParent])];
                    case 1:
                        data = _a.sent();
                        item = data.rows.map(function (item) {
                            return new Genre(item.id, item.name, item.id_parent);
                        })[0];
                        return [2 /*return*/, item];
                }
            });
        });
    };
    LibraryRepository.prototype.delGenre = function (idGenre) {
        return __awaiter(this, void 0, void 0, function () {
            var query, data, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        query = this.queryLoader.rq('del_genre');
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.databaseProvider.instance().query(query, [idGenre])];
                    case 2:
                        data = _b.sent();
                        return [2 /*return*/, 0];
                    case 3:
                        _a = _b.sent();
                        return [2 /*return*/, 1];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    return LibraryRepository;
}());
exports.default = LibraryRepository;
