import client from "../database";

export type order = {
    id?: Number ;
    status : string ;
    user_id :string | Number | null ;
}

export class Order{
    async index(): Promise<order[]> {
        try{
            const conn = await client.connect()
            const sql  = 'SELECT * FROM orders'
            const result = await conn.query(sql) 
            conn.release()

            return result.rows ;
        }catch(err){
            throw new Error(`Cannot get orders ${err}`)
        }
    }

    //create order
    async create(o: order): Promise<order> {
        try {
            const sql = `INSERT INTO orders (status, user_id) VALUES($1, (SELECT id FROM users WHERE id=$2)) RETURNING id ,status, user_id ;`;
            const conn = await client.connect();
        
            const result = await conn.query(sql, [
                o.status,
                o.user_id
            ]);
        
            conn.release();
            return result.rows[0];

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
          const sql = 'DELETE FROM orders WHERE id=($1);'
          const conn = await client.connect()
      
          const result = await conn.query(sql, [id])
      
          const order = result.rows[0]
      
          conn.release()
      
          return order
        } catch (err) {
            throw new Error(`Could not delete prder ${id}. Error: ${err}`)
        }
    }
    
    async currentOrders(): Promise<order[]> {
        try {
        const sql = 'SELECT * FROM orders WHERE status=\'current\''
        const conn = await client.connect()
    
        const result = await conn.query(sql)
    
        conn.release()
    
            return result.rows;
        } catch (err) {
            throw new Error(`Could not find order. Error: ${err}`)
        }
    }
    
    async completedOrders(): Promise<order[]> {
        try {
        const sql = 'SELECT * FROM orders WHERE status=\'completed\''
        const conn = await client.connect()
    
        const result = await conn.query(sql,)
    
        conn.release()
    
            return result.rows;
        } catch (err) {
            throw new Error(`Could not find orders. Error: ${err}`)
        }
      }
    
      
}