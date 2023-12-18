import express from 'express';
import UserRepository from "../repositories/user";


class UserController {

    userRepository: UserRepository;

    constructor(app: express.Router, userRepository: UserRepository) {
        this.userRepository = userRepository;
        app.post('/api/user/login', this.login.bind(this));
        app.post('/api/user/register', this.register.bind(this));
        app.post('/api/user/favorite', this.addFavorite.bind(this));
        app.delete('/api/user/favorite/:bookId', this.delFavorite.bind(this));
        app.get('/api/user/favorite', this.listFavorites.bind(this));
        app.post('/api/user/like', this.addLike.bind(this));
        app.delete('/api/user/like/:bookId', this.delLike.bind(this));
        app.get('/api/user/like', this.listLikes.bind(this));
        app.get('/api/user/continue-reading', this.listContinueReading.bind(this));
    }

    async login(request: express.Request, response: express.Response) {
        const userName: string = request.body.name;
        const userPassword: string = request.body.password;
        const output = await this.userRepository.login(userName, userPassword);

        response.status(200).send(output);
    }

    async register(request: express.Request, response: express.Response) {
        const userName: string = request.body.name;
        const userPassword: string = request.body.password;
        const userThumb: string = request.body.thumb;

        const output = await this.userRepository.register(userName, userPassword, userThumb);

        response.status(200).send(output);
    }

    async addFavorite(request: express.Request, response: express.Response) {
        const bookId: number = request.body.bookId;
        const userId: number = request.decoded.id;

        const output = await this.userRepository.addFavorite(userId, bookId);

        response.status(200).send(output);
    }

    async delFavorite(request: express.Request, response: express.Response) {
        const bookId: number = parseInt(request.params.bookId);
        const userId: number = request.decoded.id;

        const output = await this.userRepository.delFavorite(userId, bookId);

        response.status(202).send(output);
    }

    async listFavorites(request: express.Request, response: express.Response) {
        const userId: number = request.decoded.id;

        const output = await this.userRepository.listUserFavorites(userId);

        response.status(200).send(output);
    }

    async addLike(request: express.Request, response: express.Response) {
        const bookId: number = request.body.bookId;
        const userId: number = request.decoded.id;

        const output = await this.userRepository.addLike(userId, bookId);

        response.status(200).send(output);
    }

    async delLike(request: express.Request, response: express.Response) {
        const bookId: number = parseInt(request.params.bookId);
        const userId: number = request.decoded.id;

        const output = await this.userRepository.delLike(userId, bookId);

        response.status(202).send(output);
    }

    async listLikes(request: express.Request, response: express.Response) {
        const userId: number = request.decoded.id;

        const output = await this.userRepository.listUserLikes(userId);

        response.status(200).send(output);
    }

    async listContinueReading(request: express.Request, response: express.Response) {
        const userId: number = request.decoded.id;

        const output = await this.userRepository.listContinueReading(userId);

        response.status(200).send(output);
    }
}

export default UserController;
