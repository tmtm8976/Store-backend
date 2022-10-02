import client from '../database'
import bcrypt from 'bcrypt'

const { SALT_ROUNDS, PEPPER } = process.env

const hashing = (password: string) => {
    const salt = parseInt(SALT_ROUNDS as string, 10)
    return bcrypt.hashSync(`${password}${PEPPER}`, salt)
}

export type user = {
    id?: number
    first_name: string
    last_name: string
    password: string
}

export class userModel {
    //get all users
    async index(): Promise<user[]> {
        try {
            const conn = await client.connect()
            const sql = 'SELECT id, first_name, last_name, password FROM users;'
            const result = await conn.query(sql)
            conn.release()

            return result.rows
        } catch (err) {
            throw new Error(`Cannot get users ${err}`)
        }
    }

    //show one user
    async show(id: number | string): Promise<{id : number, first_name : string, last_name : string}> {
        try {
            const sql =
                'SELECT id, first_name, last_name FROM users WHERE id=($1);'
            const conn = await client.connect()

            const result = await conn.query(sql, [id])

            conn.release()

            return result.rows[0]
        } catch (err) {
            throw new Error(`Could not find user ${id}. Error: ${err}`)
        }
    }

    //create user
    async create(u: user): Promise<{id : number, first_name : string, last_name : string}> {
        try {
            const sql = `INSERT INTO users (first_name, last_name, password) VALUES($1, $2, $3) RETURNING id, first_name, last_name ;`
            const conn = await client.connect()

            const hash = hashing(u.password)

            const result  = await conn.query(sql, [
                u.first_name,
                u.last_name,
                hash,
            ])

            conn.release()
            return result.rows[0]
        } catch (err) {
            throw new Error(
                `Could not add new user ${u.first_name} ${u.last_name}. Error: ${err}`
            )
        }
    }

    //delete
    async delete(id: number | string): Promise<user> {
        try {
            const sql = 'DELETE FROM users WHERE id=($1) RETURNING id, first_name, last_name ;'
            const conn = await client.connect()

            const result = await conn.query(sql, [id])

            const user = result.rows[0]

            conn.release()

            return user
        } catch (err) {
            throw new Error(`Could not delete user ${id}. Error: ${err}`)
        }
    }

    async authenticate(id: string, password: string): Promise<user | null> {
        try {
            const conn = await client.connect()
            const sql = 'SELECT password FROM users WHERE id = $1;'
            const result = await conn.query(sql, [id])

            if (result.rows.length != 0) {
                const { password: hashPasword } = result.rows[0]
                const validatePassword = bcrypt.compareSync(
                    `${password}${PEPPER}`,
                    hashPasword
                )

                if (validatePassword) {
                    const user_info = await conn.query(
                        'SELECT first_name, last_name, id FROM users WHERE id=($1);',
                        [id]
                    )
                    return user_info.rows[0]
                }
            }
            conn.release()
            return null
        } catch (error) {
            throw new Error(`Can't log in: ${(error as Error).message}`)
        }
    }
}
