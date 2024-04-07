import PostgresProvider from '../providers/postgres.js';
import QueryLoader from "./helpers/query_loader.js";
import SearchResult from "./contracts/search_result.js";
import ContinueReadingResult from "./contracts/continue_reading_result.js";
import { sign } from 'jsonwebtoken-esm';


class UserRepository {

    databaseProvider: PostgresProvider;
    queryLoader: QueryLoader;
    secret: string;

    constructor(databaseProvider: PostgresProvider) {
        this.databaseProvider = databaseProvider;
        this.queryLoader = new QueryLoader('user');
        this.secret = process.env.SECRET || 'fake-secret';
    }

    _jwtFromUserData(userData: any) {
        // creamos el token con el que el usuario va a autenticarse en los
        // llamados a las api
        const token = sign(
            {
                name: userData.name,
                thumb: userData.thumb,
                id: userData.id
            },
            this.secret,
            {
                expiresIn: `${(24 * 365).toString()}h`, // un anio
            },
        );

        return {
            user: userData,
            token: token
        };
    }

    async login(userName: string, userPassword: string) {
        const query = this.queryLoader.rq('login');
        const data = await this.databaseProvider.instance().query(query, [userName, userPassword]);
        if (data.rows.length === 0)
            return 'No hay usuario';

        const userData = data.rows.map(function(item) {
            return {
                id: item.id,
                name: item.name,
                thumb: item.thumb
            };
        })[0];

        return this._jwtFromUserData(userData);
    }

    async register(userName: string, userPassword: string, userThumb: string) {
        const query = this.queryLoader.rq('register');
        try {
            const response = await this.databaseProvider.instance().query(query, [userName, userPassword, userThumb]);
            const userData = {
                id: response.rows[0]['id'],
                name: userName,
                thumb: userThumb
            };
            return this._jwtFromUserData(userData);
        }
        catch (e) {
            return "user already exists"
        }
    }

    async listUserLikes(userId: number) {
        const query = this.queryLoader.rq('list_user_likes');
        const data = await this.databaseProvider.instance().query(query, [userId]);
        return data.rows.map(item => item.id_book);
    }

    async listUserFavorites(userId: number) {
        const query = this.queryLoader.rq('list_user_favorites');
        const data = await this.databaseProvider.instance().query(query, [userId]);
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

    async updateUserThumb(userName: string, userThumb: string) {
        const query = this.queryLoader.rq('update_user_thumb');
        const data = await this.databaseProvider.instance().query(query, [userName, userThumb]);
        return data.rows.map(function(item) {
            return {
                name: item.name,
                thumb: item.thumb
            };
        })[0];
    }

    async addFavorite(userId: number, bookId: number) {
        const query = this.queryLoader.rq('upsert_user_favorite');
        try {
            await this.databaseProvider.instance().query(query, [bookId, userId]);
            return this.listUserFavorites(userId);
        }
        catch (e) {
            return "can not add book to list"
        }
    }

    async delFavorite(userId: number, bookId: number) {
        const query = this.queryLoader.rq('delete_user_favorite');
        try {
            await this.databaseProvider.instance().query(query, [bookId, userId]);
            return this.listUserFavorites(userId);
        }
        catch (e) {
            return "can not add book to list"
        }
    }

    async addLike(userId: number, bookId: number) {
        const query = this.queryLoader.rq('upsert_user_like');
        const queryStat = this.queryLoader.rq('inc_book_like_count');
        try {
            await this.databaseProvider.instance().query(query, [bookId, userId]);
            await this.databaseProvider.instance().query(queryStat, [bookId]);

            return this.listUserLikes(userId);
        }
        catch (e) {
            return "can not add book to list"
        }
    }

    async delLike(userId: number, bookId: number) {
        const query = this.queryLoader.rq('delete_user_like');
        const queryStat = this.queryLoader.rq('dec_book_like_count');
        try {
            await this.databaseProvider.instance().query(query, [bookId, userId]);
            await this.databaseProvider.instance().query(queryStat, [bookId]);
            return this.listUserLikes(userId);
        }
        catch (e) {
            return "can not add book to list"
        }
    }

    async listContinueReading(userId: number) {
        const query = this.queryLoader.rq('list_continue_reading');
        const data = await this.databaseProvider.instance().query(query, [userId]);
        const items = data.rows.map(function(item) {
            return new ContinueReadingResult(
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
                item.like_count,
                item.id_page
            );
        });
        return items;
    }
}

export default UserRepository;

