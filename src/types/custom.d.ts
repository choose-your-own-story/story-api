

declare namespace Express {
    export interface Request {
        decoded?: any,
        file: any
    }
}

declare module sharp {}