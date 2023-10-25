"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var pg_1 = __importDefault(require("pg"));
var PostgresProvider = /** @class */ (function () {
    function PostgresProvider() {
        this.pool = new pg_1.default.Pool({
            user: process.env.POSTGRES_USER,
            host: process.env.POSTGRES_HOST,
            database: process.env.POSTGRES_DB,
            password: process.env.POSTGRES_PASSWORD,
            port: Number(process.env.POSTGRES_PORT),
            ssl: {
                rejectUnauthorized: false,
                ca: process.env.POSTGRES_CA
            }
        });
    }
    PostgresProvider.prototype.instance = function () {
        return this.pool;
    };
    return PostgresProvider;
}());
exports.default = PostgresProvider;
