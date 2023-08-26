import { Client } from 'pg'


const host = '127.0.0.1'
const username = 'postgres'
const database = 'postgres'
const port = 5433
const password = 'postgres' 

function createClient(): object {
    return new Client({
        host: host,
        port: port,
        database: database,
        user: username,
        password: password
    })
}


module.exports = createClient