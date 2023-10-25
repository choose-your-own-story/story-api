import express = require('express');
import LibraryRepository from "../repositories/library";
import BookRepository from "../repositories/book";


class LibraryController {

    libraryRepository: LibraryRepository;
    bookRepository: BookRepository;

    constructor(app: express.Router, libraryRepository: LibraryRepository, bookRepository: BookRepository) {
        this.libraryRepository = libraryRepository;
        this.bookRepository = bookRepository;
        // app.get('/api/library/tag', this.loadTag.bind(this));
        // app.post('/api/library/tag', this.addTag.bind(this));
        // app.delete('/api/library/tag/:id', this.delTag.bind(this));
        app.get('/api/library/genre', this.listGenre.bind(this));
        app.post('/api/library/genre', this.addGenre.bind(this));
        app.delete('/api/library/genre/:id(\\d+)', this.delGenre.bind(this));

        app.get('/api/library/search', this.search.bind(this));
        app.get('/api/library/book/:id(\\d+)', this.loadBook.bind(this));
    }

    async listGenre(request: express.Request, response: express.Response) {
        let idParent = request.query.idParent;
        const output = await this.libraryRepository.listGenre(idParent);

        response.status(200).send(output);
    }

    async loadBook(request: express.Request, response: express.Response) {
        if (request.params.id === undefined) {
            response.status(400).send();
            return;
        }

        const bookId: number = parseInt(request.params.id.toString());
        const output = await this.bookRepository.loadBook(bookId, true);

        response.status(200).send(output);
    }

    preparseQueryParamStringForSearch(queryValue: any) {
        let parsedQueryValue = queryValue === undefined? '%' : queryValue.toString();
        parsedQueryValue = parsedQueryValue.replace(' ', '%');
        parsedQueryValue = `%${parsedQueryValue}%`;
        return parsedQueryValue;
    }

    preparseQueryParamInt(queryValue: any, defaultValue=undefined): number | undefined {
        return queryValue === undefined? defaultValue : parseInt(queryValue.toString());
    }

    async search(request: express.Request, response: express.Response) {
        const title = this.preparseQueryParamStringForSearch(request.query.title);
        const author = this.preparseQueryParamStringForSearch(request.query.author);
        const idGenre = this.preparseQueryParamInt(request.query.idGenre);
        const idSubGenre = this.preparseQueryParamInt(request.query.idSubGenre);

        const output = await this.libraryRepository.search(title, author, idGenre, idSubGenre);

        response.status(200).send(output);
    }

    async addGenre(request: express.Request, response: express.Response) {
        const body = request.body;
        if (body.name === undefined) {
            response.status(400).send();
            return;
        }

        const output = await this.libraryRepository.addGenre(body);

        response.status(200).send(output);
    }

    async delGenre(request: express.Request, response: express.Response) {
        const idGenre = request.params.id;
        if (idGenre === undefined) {
            response.sendStatus(400).send();
            return;
        }

        const output = await this.libraryRepository.delGenre(parseInt(idGenre));

        response.sendStatus(200).send(output);
    }
}

export default LibraryController;