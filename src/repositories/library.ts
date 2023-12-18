import PostgresProvider from '../providers/postgres.js';
import QueryLoader from "./helpers/query_loader.js";
import SearchResult from './contracts/search_result.js'

class Genre {
    id: number;
    name: string;
    idParent: number;

    constructor(id: number, name: string, idParent: number) {
        this.id = id;
        this.name = name;
        this.idParent = idParent;
    }
}

class LibraryRepository {

    databaseProvider: PostgresProvider;
    queryLoader: QueryLoader;

    constructor(databaseProvider: PostgresProvider) {
        this.databaseProvider = databaseProvider;
        this.queryLoader = new QueryLoader('library')
    }

    async listGenre(idParentGenre: any) {
        const query = this.queryLoader.rq('list_genre');
        const data = await this.databaseProvider.instance().query(query, [idParentGenre]);
        const items = data.rows.map(function(item) {
            return new Genre(
                item.id,
                item.name,
                item.id_parent
            );
        });
        return items;
    }

    async search(title: string, author: string, idGenre: number | undefined, idSubGenre: number | undefined) {
        const query = this.queryLoader.rq('search');
        const parsedIdGenre: number = idGenre === undefined? 0 : idGenre;
        const parsedIdSubGenre: number = idSubGenre === undefined? 0 : idSubGenre;
        const data = await this.databaseProvider.instance().query(query, [title, author, parsedIdGenre, parsedIdSubGenre]);
        const items = data.rows.map(function(item) {
            return new SearchResult(
                item.id,
                item.id_user,
                item.active,
                item.title,
                item.description,
                item.cover,
                item.activated_date,
                item.id_genre,
                item.id_sub_genre,
                item.u_name,
                item.u_thumb,
                item.g_name,
                item.sg_name,
                item.read_count,
                item.like_count
            );
        });
        return items;
    }

    async addGenre(body: any) {
        const query = this.queryLoader.rq('add_genre');
        const name = body.name;
        const idParent = body.idParent;
        const data = await this.databaseProvider.instance().query(query, [name, idParent]);

        const item = data.rows.map(function(item) {
            return new Genre(
                item.id,
                item.name,
                item.id_parent
            );
        })[0];
        return item;
    }

    async delGenre(idGenre: number) {
        const query = this.queryLoader.rq('del_genre');
        try {
            await this.databaseProvider.instance().query(query, [idGenre]);
            return 0
        }
        catch {
            return 1
        }
    }
}

export default LibraryRepository;

