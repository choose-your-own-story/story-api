"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var SearchResult = /** @class */ (function () {
    function SearchResult(id, idUser, active, title, description, cover, activated_date, idGenre, idSubGenre, userName, userThumb, genre, subGenre, reads, likes) {
        this.id = id;
        this.idUser = idUser;
        this.active = active;
        this.title = title;
        this.description = description;
        this.cover = cover;
        this.activated_date = activated_date;
        this.idGenre = idGenre;
        this.idSubGenre = idSubGenre;
        this.userName = userName;
        this.userThumb = userThumb;
        this.genre = genre;
        this.subGenre = subGenre;
        this.reads = reads;
        this.likes = likes;
    }
    return SearchResult;
}());
exports.default = SearchResult;
