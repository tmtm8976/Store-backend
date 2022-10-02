import client from '../database'

export type order = {
    id?: Number
    status: string
    user_id: string | Number | null
}

export type product_order = {
    id? : Number | string ,
    quantity: number ,
    product_id : string,
    order_id : string
}

export class Order {
    async index(): Promise<order[]> {
        try {
            const conn = await client.connect()
            const sql = 'SELECT * FROM orders'
            const result = await conn.query(sql)
            conn.release()

            return result.rows
        } catch (err) {
            throw new Error(`Cannot get orders ${err}`)
        }
    }

    //create order
    async create(o: order): Promise<order> {
        try {
            const sql = `INSERT INTO orders (status, user_id) VALUES($1, (SELECT id FROM users WHERE id=$2)) RETURNING id ,status, user_id ;`
            const conn = await client.connect()

            const result = await conn.query(sql, [o.status, o.user_id])

            conn.release()
            return result.rows[0]
        } catch (err) {
            throw new Error(`Could not add new order ${o.id}. Error: ${err}`)
        }
    }

    //show order by id
    async show(id: number): Promise<order> {
        try {
            const sql = 'SELECT * FROM orders WHERE id=($1);'
            const conn = await client.connect()

            const result = await conn.query(sql, [id])

            conn.release()

            return result.rows[0]
        } catch (err) {
            throw new Error(`Could not find order ${id}. Error: ${err}`)
        }
    }

    //delete order
    async delete(id: number): Promise<order> {
        try {
            const sql = 'DELETE FROM orders WHERE id=($1) RETURNING *;'
            const conn = await client.connect()

            const result = await conn.query(sql, [id])

            const order = result.rows[0]

            conn.release()

            return order
        } catch (err) {
            throw new Error(`Could not delete order ${id}. Error: ${err}`)
        }
    }

    //method to get active orders
    async active_orders(): Promise<order[]> {
        try {
            const sql = "SELECT * FROM orders WHERE status='open'"
            const conn = await client.connect()

            const result = await conn.query(sql)

            conn.release()

            return result.rows
        } catch (err) {
            throw new Error(`Could not find order. Error: ${err}`)
        }
    }

    //method to get completed orders
    async complete_orders(): Promise<order[]> {
        try {
            const sql = "SELECT * FROM orders WHERE status='complete'"
            const conn = await client.connect()

            const result = await conn.query(sql)

            conn.release()

            return result.rows
        } catch (err) {
            throw new Error(`Could not find orders. Error: ${err}`)
        }
    }

    //method to add product to the order
    async addProduct(product : {quantity: number, order_id : string, product_id : string}) : Promise<product_order>{
        try {

            const sql = 'INSERT INTO order_products(quantity, order_id, product_id) VALUES($1, (SELECT id FROM orders WHERE id=$2), (SELECT id FROM products WHERE id=$3)) RETURNING id, quantity, product_id, order_id ; '
            const conn = await client.connect();

            const result = await conn.query(sql,[product.quantity, product.order_id, product.product_id])
            const order = result.rows[0]

            conn.release()
            return order 
        } catch (error) {
           throw new Error(`Could not add product ${product.product_id} to order ${product.order_id}: ${error}`) 
        }

    }
}
