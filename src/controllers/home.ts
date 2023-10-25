import express = require('express');
import HomeRepository from "../repositories/home";


class HomeController {

    bookRepository: HomeRepository;

    constructor(app: express.Router, homeRepository: HomeRepository) {
        this.bookRepository = homeRepository;
        app.get('/api/home', this.loadHome.bind(this));
    }

    async loadHome(request: express.Request, response: express.Response) {
        const output = await this.bookRepository.loadHome();

        response.status(200).send(output);
    }

}

export default HomeController;