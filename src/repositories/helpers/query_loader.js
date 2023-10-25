"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var fs_1 = __importDefault(require("fs"));
var QueryLoader = /** @class */ (function () {
    function QueryLoader(basePath) {
        this.basePath = basePath;
    }
    QueryLoader.prototype.rq = function (queryName) {
        return fs_1.default.readFileSync("src/repositories/queries/" + this.basePath + "/" + queryName + ".sql", { encoding: 'utf8' });
    };
    ;
    QueryLoader.prototype.lq = function (query) {
        console.log(query.replace(/\n/g, ' ')
            .replace(/\r/g, ' ')
            .replace(/\t/g, ' '));
    };
    ;
    return QueryLoader;
}());
exports.default = QueryLoader;
