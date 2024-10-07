export const dbConfig = () => ({
    database: {
        port: process.env.DB_PORT,
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        dnName: process.env.DB_DATABASE
    }
});