import SearchResult from './search_result.js'

class ContinueReadingResult extends SearchResult {

    id_page: number;

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
        likes: number,
        idPage: number) {
        super(id
            ,idUser
            ,active
            ,title
            ,description
            ,cover
            ,activated_date
            ,idGenre
            ,idSubGenre
            ,userName
            ,userThumb
            ,genre
            ,subGenre
            ,reads
            ,likes);
        this.id_page = idPage;
    }
}

export default ContinueReadingResult;
