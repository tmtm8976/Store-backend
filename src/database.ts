import config from './config'
import { Pool } from 'pg'


let client: Pool

if (config.env == 'test') {
    client = new Pool({
        host: config.pg_host,
        database: config.test_db,
        user: config.pg_user,
        password: config.pg_pass,
    })
} else {
    client = new Pool({
        host: config.pg_host,
        database: config.db,
        user: config.pg_user,
        password: config.pg_pass,
    })
}

export default client
