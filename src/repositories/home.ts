import PostgresProvider from '../providers/postgres.js';
import QueryLoader from "./helpers/query_loader.js";


class HomeRepository {

    databaseProvider: PostgresProvider;
    queryLoader: QueryLoader;

    constructor(databaseProvider: PostgresProvider) {
        this.databaseProvider = databaseProvider;
        this.queryLoader = new QueryLoader('book')
    }

    async loadHome() {
        const query = this.queryLoader.rq('list_home');
        const data = await this.databaseProvider.instance().query(query, []);

        return data.rows.map(function(item) {
            return {
                title: item.title,
                author: item.author,
                description: item.description,
                cover: item.cover,
                id: item.id
            };
        });
    }
}

export default HomeRepository;

