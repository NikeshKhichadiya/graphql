declare namespace NodeJS {
    interface ProcessEnv {
        MONGO_URL: string;
        PORT: number,
        NODE_ENV: string
    }
}