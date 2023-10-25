"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var search_result_1 = __importDefault(require("./search_result"));
var ContinueReadingResult = /** @class */ (function (_super) {
    __extends(ContinueReadingResult, _super);
    function ContinueReadingResult(id, idUser, active, title, description, cover, activated_date, idGenre, idSubGenre, userName, userThumb, genre, subGenre, reads, likes, idPage) {
        var _this = _super.call(this, id, idUser, active, title, description, cover, activated_date, idGenre, idSubGenre, userName, userThumb, genre, subGenre, reads, likes) || this;
        _this.id_page = idPage;
        return _this;
    }
    return ContinueReadingResult;
}(search_result_1.default));
exports.default = ContinueReadingResult;
