import PostgresProvider from '../providers/postgres.js';
import QueryLoader from "./helpers/query_loader.js";


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
        this.genre = genre;
        this.subGenre = subGenre;
        this.reads = reads;
        this.likes = likes;
    }
}

class BookRepository {

    databaseProvider: PostgresProvider;
    queryLoader: QueryLoader;

    constructor(databaseProvider: PostgresProvider) {
        this.databaseProvider = databaseProvider;
        this.queryLoader = new QueryLoader('book')
    }

    async _loadFirstPages(bookId: number) {
        const query = this.queryLoader.rq('load_first_pages');
        const data = await this.databaseProvider.instance().query(query, [bookId]);
        return data.rows.map(function(item) {
            return {
                title: item.title,
                id: item.id
            };
        });
    }

    async loadBook(bookId: number, incReadCounter: boolean) {
        if (incReadCounter) {
            const queryStat = this.queryLoader.rq('upsert_book_read_stats');
            await this.databaseProvider.instance().query(queryStat, [bookId]);
        }

        const query = this.queryLoader.rq('list_one_book');
        const data = await this.databaseProvider.instance().query(query, [bookId]);
        const firstPages = await this._loadFirstPages(bookId);
        return data.rows.map(function(item) {
            return {
                title: item.title,
                description: item.description,
                cover: item.cover,
                id: item.id,
                first_pages: firstPages,
                idGenre: item.id_genre,
                idSubGenre: item.id_sub_genre,
                active: item.active
            };
        })[0];
    }

    async loadBookPages(bookId: number) {
        const vm = this;
        const query = this.queryLoader.rq('load_book_pages');
        const data = await this.databaseProvider.instance().query(query, [bookId]);
        const pages = data.rows.map(function(item) {
            return {
                title: vm._parsePageTitle(item.title),
                page_type: item.page_type,
                id: item.id,
                choices: [] as any,
                recive_count: item.recive_count,
                items_count: item.items_count
            };
        });

        const queryBookChoices = this.queryLoader.rq('load_book_choices');
        const dataBookChoices = await this.databaseProvider.instance().query(queryBookChoices, [bookId]);

        dataBookChoices.rows.forEach(function(choice) {
            const page = pages.find(item => item.id === choice.id_page);
            if (page === undefined)
                return;

            const obj = {
                id: parseInt(choice.id),
                idPage: choice.id_page,
                idTargetPage: choice.target_page,
                text: choice.value
            };

            page.choices.push(obj)
        });
        return pages;
    }

    async loadBooks(userId: number) {
        const query = this.queryLoader.rq('list_all_books');
        const data = await this.databaseProvider.instance().query(query, [userId]);
        return data.rows.map(function(item) {
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
                item.g_name,
                item.sg_name,
                item.read_count,
                item.like_count
            );
        });
    }

    async addBook(userId: number, userName: string, book: any) {
        const bookTitle: string = book.title;
        const bookUserId: number = userId;
        const bookDescription: string = book.description;
        const bookCover: string = book.cover;

        const query = this.queryLoader.rq('add_new_book');
        const data = await this.databaseProvider.instance().query(query,
            [
                bookTitle,
                bookUserId,
                bookDescription,
                bookCover
            ]);

        return data.rows.map(function(item) {
            return {
                title: bookTitle,
                user_id: bookUserId,
                author: userName,
                description: bookDescription,
                cover: bookCover,
                id: item.id
            };
        })[0];
    }

    async updateBook(userId: number, userName: string, book: any) {
        const bookTitle: string = book.title;
        const bookUserId: number = userId;
        const bookDescription: string = book.description;
        const bookCover: string = book.cover;
        const bookIdGenre: number | undefined = book.idGenre;
        const bookIdSubGenre: number | undefined = book.idSubGenre;
        const bookId: number = parseInt(book.id);
        const bookActive: number = parseInt(book.active);

        const query = this.queryLoader.rq('update_book');
        const data = await this.databaseProvider.instance().query(query,
            [
                bookTitle,
                bookDescription,
                bookCover,
                bookIdGenre,
                bookIdSubGenre,
                bookActive,
                bookId,
                bookUserId
            ]);

        return data.rows.map(function(item) {
            return {
                title: bookTitle,
                author: userName,
                description: bookDescription,
                cover: bookCover,
                id: item.id
            };
        })[0];
    }

    async addBookPage(bookId: number, pageBody: any) {
        const vm = this;
        console.log(pageBody);
        const query = this.queryLoader.rq('add_new_book_page');
        const pageType = pageBody.page_type;
        const data = await this.databaseProvider.instance().query(query, [bookId, pageType]);
        return data.rows.map(function(item) {
            return {
                book_id: bookId,
                id: item.id,
                title: vm._parsePageTitle(item.title),
                page_type: item.page_type
            };
        })[0];
    }

    async updateBookPage(bookId: number, pageId: number, title: string) {
        const vm = this;
        const query = this.queryLoader.rq('update_book_page');
        await this.databaseProvider.instance().query(query, [pageId, title]);
        return {
            book_id: bookId,
            id: pageId,
            title: vm._parsePageTitle(title)
        };
    }

    async addBookPageWithTitle(bookId: number, title: string) {
        const query = this.queryLoader.rq('add_new_book_page_with_title');
        const data = await this.databaseProvider.instance().query(query, [bookId, title]);
        return data.rows.map(function(item) {
            return {
                book_id: bookId,
                id: item.id,
                title: item.title
            };
        })[0];
    }

    async deleteBookPage(bookId: number, pageId: number) {
        const query = this.queryLoader.rq('delete_book_page');
        await this.databaseProvider.instance().query(query, [pageId]);
        return {
            status: 'ok'
        }
    }

    async deletePageChoice(choiceId: number) {
        const query = this.queryLoader.rq('delete_choice');
        await this.databaseProvider.instance().query(query, [choiceId]);
        return {
            status: 'ok'
        }
    }

    async deletePageItem(itemId: number) {
        const query = this.queryLoader.rq('delete_page_item');
        await this.databaseProvider.instance().query(query, [itemId]);
        return {
            status: 'ok'
        }
    }

    async deleteBook(userId: number, bookId: number) {
        const queryPages = this.queryLoader.rq('delete_book_pages');
        await this.databaseProvider.instance().query(queryPages, [bookId]);
        const queryBook = this.queryLoader.rq('delete_book');
        await this.databaseProvider.instance().query(queryBook, [bookId, userId]);

        return {
            status: 'ok'
        }
    }

    async addPageItem(item: any) {
        const pageId: number = item.page_id;
        const itemType: number = item.item_type;
        const value: string = item.value;

        const query = this.queryLoader.rq('add_page_item');
        const data = await this.databaseProvider.instance().query(query, [pageId, itemType, value]);

        return data.rows.map(function(item) {
            return {
                id: item.id,
                page_id: pageId,
                type: itemType,
                value: value
            };
        })[0];
    }

    async updatePageItem(item: any) {
        const pageId: number = item.page_id;
        const itemType: number = item.item_type;
        const value: string = item.value;
        const id: number = item.id;

        const query = this.queryLoader.rq('update_page_item');
        const data = await this.databaseProvider.instance().query(query, [value, id]);

        return data.rows.map(function(item) {
            return {
                id: item.id,
                page_id: pageId,
                type: itemType,
                value: value
            };
        })[0];
    }

    async addPageChoice(bookId: number, item: any) {
        const pageId: number = item.page_id;
        const sortIndex: number = item.sort_index;
        const value: string = item.value;
        const targetPage: number = item.target_page;
        const targetPageTitle: string = item.target_page_title;

        let targetPageId: number = 0;

        if ((targetPage <= 0) || (targetPage === undefined)) {
            // new page
            if ((targetPageTitle !== undefined) && (targetPageTitle !== '')) {
                // add page with title
                const newPageObject = await this.addBookPageWithTitle(bookId, targetPageTitle);
                targetPageId = newPageObject.id;
            }
            else {
                // add page without title
                const pageBody = {
                    page_type: 0
                };
                const newPageObject = await this.addBookPage(bookId, pageBody);
                targetPageId = newPageObject.id;
            }
        }
        else {
            // use existing page
            targetPageId = targetPage
        }

        // after page existence has been solved, we add the choice for that page

        const query = this.queryLoader.rq('add_page_choice');
        const data = await this.databaseProvider.instance().query(query, [pageId, sortIndex, targetPageId, value, bookId]);

        return data.rows.map(function(item) {
            return {
                id: item.id,
                pageId: pageId,
                sortIndex: sortIndex,
                targetPageTitle: targetPageTitle,
                value: value,
                targetPage: targetPageId
            };
        })[0];
    }

    async search(title: string) {
        const titleQuery: string = `%${title}%`;
        const query = this.queryLoader.rq('search');
        const data = await this.databaseProvider.instance().query(query, [titleQuery]);

        return data.rows.map(function(item) {
            return {
                title: item.title,
                id: item.id
            };
        });
    }

    _parsePageTitle(title: string | undefined) {
        return title === null || title === undefined? '' : title
    }
    async _loadPageData(pageId: number) {
        const vm = this;
        const query = this.queryLoader.rq('load_page_title');
        const data = await this.databaseProvider.instance().query(query, [pageId]);
        return data.rows.map(function(item) {
            return {
                title: vm._parsePageTitle(item.title),
                page_type: item.page_type
            };
        })[0];
    }

    async _loadPageItems(pageId: number) {
        const query = this.queryLoader.rq('load_page_items');
        const data = await this.databaseProvider.instance().query(query, [pageId]);
        return data.rows.map(function(item) {
            return {
                id: item.id,
                page_id: item.id_page,
                type: item.type,
                value: item.value
            };
        });
    }

    async _updateUserContinueReading(userId: number, bookId: number, pageId: number) {
        const query = this.queryLoader.rq('upsert_user_continue_reading');
        await this.databaseProvider.instance().query(query, [userId, bookId, pageId]);
    }

    async _loadPageChoices(pageId: number) {
        const query = this.queryLoader.rq('load_page_choices');
        const data = await this.databaseProvider.instance().query(query, [pageId]);
        return data.rows.map(function(item) {
            return {
                value: item.value,
                id: item.id,
                sortIndex: item.sort_index,
                targetPage: item.target_page,
                targetBook: item.target_book,
                targetPageTitle: item.title
            };
        });
    }

    async loadPage(bookId: number, pageId: number, userId: number) {
        const vm = this;
        if (userId !== undefined)
            await this._updateUserContinueReading(userId, bookId, pageId);

        const pageItems = await this._loadPageItems(pageId);
        const pageChoices = await this._loadPageChoices(pageId);
        const data = await this._loadPageData(pageId);
        return {
            items: pageItems,
            choices: pageChoices,
            title: vm._parsePageTitle(data.title),
            page_type: data.page_type
        }
    }
}

export default BookRepository;

