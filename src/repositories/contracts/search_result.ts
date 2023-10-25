
class SearchResult {
    id: number;
    idUser: number;
    active: number;
    title: string;
    description: string;
    cover: string;
    activated_date: string;
    idGenre: number | undefined;
    idSubGenre: number | undefined;
    userName: string;
    userThumb: string | undefined;
    genre: string | undefined;
    subGenre: string | undefined;
    reads: number;
    likes: number;

    constructor(
        id: number,
        idUser: number,
        active: number,
        title: string,
        description: string,
        cover: string,
        activated_date: string,
        idGenre: number | undefined,
        idSubGenre: number | undefined,
        userName: string,
        userThumb: string | undefined,
        genre: string | undefined,
        subGenre: string | undefined,
        reads: number,
        likes: number) {
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
}

export default SearchResult;