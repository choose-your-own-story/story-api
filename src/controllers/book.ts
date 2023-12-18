import express from 'express';
import BookRepository from "../repositories/book.js";


class BookController {

    bookRepository: BookRepository;

    constructor(app: express.Router, bookRepository: BookRepository) {
        this.bookRepository = bookRepository;
        app.get('/api/book/:bookId(\\d+)', this.loadBook.bind(this));
        app.get('/api/book/:bookId(\\d+)/page/:pageId(\\d+)', this.loadBookPage.bind(this));
        app.post('/api/book', this.addBook.bind(this));
        app.put('/api/book/:bookId', this.updateBook.bind(this));
        app.post('/api/book/:bookId/page', this.addBookPage.bind(this));
        app.put('/api/book/:bookId/page/:pageId', this.updateBookPage.bind(this));
        app.delete('/api/book/:bookId/page/:pageId', this.deleteBookPage.bind(this));
        app.delete('/api/book/:bookId', this.deleteBook.bind(this));
        app.get('/api/book/:bookId/page', this.loadBookPages.bind(this));
        app.post('/api/book/:bookId/page/:pageId/item', this.addPageItem.bind(this));
        app.put('/api/book/:bookId/page/:pageId/item', this.updatePageItem.bind(this));
        app.post('/api/book/:bookId/page/:pageId/choice', this.addPageChoice.bind(this));
        app.delete('/api/book/:bookId/page/:pageId/choice/:choiceId', this.deletePageChoice.bind(this));
        app.delete('/api/book/:bookId/page/:pageId/item/:itemId', this.deletePageItem.bind(this));
        app.get('/api/book/search', this.search.bind(this));
        app.get('/api/user/library', this.library.bind(this));
    }

    async loadBook(request: express.Request, response: express.Response) {
        if (request.params.bookId === undefined) {
            response.status(400).send();
            return;
        }

        const bookId: number = parseInt(request.params.bookId.toString());
        const output = await this.bookRepository.loadBook(bookId, false);

        response.status(200).send(output);
    }

    async library(request: express.Request, response: express.Response) {
        const output = await this.bookRepository.loadBooks(request.decoded.id);

        response.status(200).send(output);
    }

    async addBook(request: express.Request, response: express.Response) {
        const bookBody: any = request.body;
        bookBody.author = 1;
        const output = await this.bookRepository.addBook(request.decoded.id, request.decoded.name, bookBody);

        response.status(200).send(output);
    }

    async updateBook(request: express.Request, response: express.Response) {
        const bookBody: any = request.body;
        const output = await this.bookRepository.updateBook(request.decoded.id,request.decoded.name, bookBody);

        response.status(200).send(output);
    }

    async addBookPage(request: express.Request, response: express.Response) {
        if (request.params.bookId === undefined) {
            response.status(400).send();
            return;
        }

        const bookId: number = parseInt(request.params.bookId);
        const body: any = request.body;
        const output = await this.bookRepository.addBookPage(bookId, body);

        response.status(200).send(output);
    }

    async updateBookPage(request: express.Request, response: express.Response) {
        if (request.params.bookId === undefined) {
            response.status(400).send();
            return;
        }

        const bookId: number = parseInt(request.params.bookId);
        const pageId: number = parseInt(request.params.pageId);
        const title: string = request.body.title;

        const output = await this.bookRepository.updateBookPage(bookId, pageId, title);

        response.status(200).send(output);
    }

    async deleteBookPage(request: express.Request, response: express.Response) {
        if (request.params.pageId === undefined) {
            response.status(400).send();
            return;
        }
        if (request.params.bookId === undefined) {
            response.status(400).send();
            return;
        }
        const bookId: number = parseInt(request.params.bookId);
        const pageId: number = parseInt(request.params.pageId);
        const output = await this.bookRepository.deleteBookPage(bookId, pageId);

        response.status(200).send(output);
    }

    async deleteBook(request: express.Request, response: express.Response) {
        if (request.params.bookId === undefined) {
            response.status(400).send();
            return;
        }
        const bookId: number = parseInt(request.params.bookId);
        const output = await this.bookRepository.deleteBook(request.decoded.id, bookId);

        response.status(202).send(output);
    }

    async addPageItem(request: express.Request, response: express.Response) {
        if (request.params.pageId === undefined) {
            response.status(400).send();
            return;
        }
        if (request.params.bookId === undefined) {
            response.status(400).send();
            return;
        }

        const output = await this.bookRepository.addPageItem(request.body);

        response.status(200).send(output);
    }

    async updatePageItem(request: express.Request, response: express.Response) {
        if (request.params.pageId === undefined) {
            response.status(400).send();
            return;
        }
        if (request.params.bookId === undefined) {
            response.status(400).send();
            return;
        }

        const output = await this.bookRepository.updatePageItem(request.body);

        response.status(200).send(output);
    }

    async search(request: express.Request, response: express.Response) {
        const rawTitle: any = request.query.title;

        const title: string = rawTitle === undefined ? '' : rawTitle.toString();

        const output = await this.bookRepository.search(title);

        response.status(200).send(output);
    }

    async addPageChoice(request: express.Request, response: express.Response) {
        if (request.params.pageId === undefined) {
            response.status(400).send();
            return;
        }
        if (request.params.bookId === undefined) {
            response.status(400).send();
            return;
        }

        const output = await this.bookRepository.addPageChoice(parseInt(request.params.bookId), request.body);

        response.status(200).send(output);
    }

    async deletePageChoice(request: express.Request, response: express.Response) {
        if (request.params.pageId === undefined) {
            response.status(400).send();
            return;
        }
        if (request.params.bookId === undefined) {
            response.status(400).send();
            return;
        }
        if (request.params.choiceId === undefined) {
            response.status(400).send();
            return;
        }
        const output = await this.bookRepository.deletePageChoice(parseInt(request.params.choiceId));

        response.status(200).send(output);
    }

    async deletePageItem(request: express.Request, response: express.Response) {
        if (request.params.pageId === undefined) {
            response.status(400).send();
            return;
        }
        if (request.params.bookId === undefined) {
            response.status(400).send();
            return;
        }
        if (request.params.itemId === undefined) {
            response.status(400).send();
            return;
        }
        const output = await this.bookRepository.deletePageItem(parseInt(request.params.itemId));

        response.status(200).send(output);
    }

    async loadBookPage(request: express.Request, response: express.Response) {
        if (request.params.bookId === undefined) {
            response.status(400).send();
            return;
        }
        if (request.params.pageId === undefined) {
            response.status(400).send();
            return;
        }

        const bookId: number = parseInt(request.params.bookId.toString());
        const pageId: number = parseInt(request.params.pageId.toString());

        const userId: number = request.decoded !== undefined? request.decoded.id : undefined;

        const output = await this.bookRepository.loadPage(bookId, pageId, userId);

        response.status(200).send(output);
    }

    async loadBookPages(request: express.Request, response: express.Response) {
        if (request.params.bookId === undefined) {
            response.status(400).send();
            return;
        }

        const bookId: number = parseInt(request.params.bookId.toString());

        const output = await this.bookRepository.loadBookPages(bookId);

        response.status(200).send(output);
    }
}

export default BookController;
