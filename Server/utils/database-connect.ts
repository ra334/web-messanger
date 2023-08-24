import { Client } from 'pg'

const host = process.env.HOST || '127.0.0.1'
const username = process.env.USERNAME || 'postgres'
const database = process.env.DATABASE || 'mypostgres'
const port = Number(process.env.DATABASE_PORT) || 5432
const password = process.env.PASSWORD || 'superpass' 


module.exports = new Client({
    host: host,
    port: port,
    database: database,
    user: username,
    password: password
})