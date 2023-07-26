import { createConnection } from "mysql2/promise";

export const conn = await createConnection({
    host: 'localhost',
    database: 'classicmodels',
    user: 'root',
    password: 'password'
})