import dotenv from 'dotenv'

dotenv.config() 

const { 
    PORT,
    ENV,
    POSTGRES_HOST,
    POSTGRES_PORT,
    POSTGRES_DB,
    POSTGRES_DB_TEST,
    POSTGRES_USER,
    POSTGRES_PASSWORD,
    SALT_ROUNDS,
    PEPPER,
    TOKEN_SECRET
 } = process.env

export default {
    port: PORT,
    env: ENV,
    pg_host: POSTGRES_HOST,
    pg_port: POSTGRES_PORT,
    db : POSTGRES_DB,
    test_db : POSTGRES_DB_TEST,
    pg_user: POSTGRES_USER,
    pg_pass: POSTGRES_PASSWORD,
    salt: SALT_ROUNDS,
    pepper: PEPPER,
    token: TOKEN_SECRET

}