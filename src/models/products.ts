import client from "../database";

export type product = {
    id? : Number ;
    name : string ;
    price : Number ;
}

export class Product{
    async index(): Promise<product[]> {
        try{
            const conn = await client.connect()
            const sql  = 'SELECT * FROM products'
            const result = await conn.query(sql) 
            conn.release()

            return result.rows ;
        }catch(err){
            throw new Error(`Cannot get products ${err}`)
        }
    }
    
    async show(id: number): Promise<product> {
        try {
        const sql = 'SELECT * FROM products WHERE id=($1)'
        const conn = await client.connect()
    
        const result = await conn.query(sql, [id])
    
        conn.release()
    
        return result.rows[0]
        } catch (err) {
            throw new Error(`Could not find product ${id}. Error: ${err}`)
        }
      }
    
      async create(p: product): Promise<product> {
          try {
            const sql = `INSERT INTO products (name, price) VALUES($1, $2) RETURNING *`
            const conn = await client.connect()
        
            const result = await conn
                .query(sql, [p.name, p.price])
        
            const product = result.rows[0]
        
            conn.release()
        
            return product
          } catch (err) {
              throw new Error(`Could not add new product ${p.name}. Error: ${err}`)
          }
      }
    
      async popular(): Promise<product[]> {
          try {
            const sql = `SELECT TOP(5) Product_id, SUM(Quantity) AS TotalQuantity
            FROM order_products
            GROUP BY product_id
            ORDER BY SUM(quantity) DESC;`
            const conn = await client.connect()
        
            const result = await conn.query(sql)
        
            const products = result
        
            conn.release()
        
            return products.rows
          } catch (err) {
              throw new Error(`Could not get products. Error: ${err}`)
          }
        }
    async category(category: string): Promise<product> {
            try {
            const sql = 'SELECT * FROM products WHERE category=($1)'
            const conn = await client.connect()
        
            const result = await conn.query(sql, [category])
        
            conn.release()
        
            return result.rows[0]
            } catch (err) {
                throw new Error(`Could not find product ${category}. Error: ${err}`)
            }
    }

    async delete(id: number): Promise<product> {
        try {
          const sql = 'DELETE FROM products WHERE id=($1)'
          const conn = await client.connect()
      
          const result = await conn.query(sql, [id])
      
          const product = result.rows[0]
      
          conn.release()
      
          return product
        } catch (err) {
            throw new Error(`Could not delete product ${id}. Error: ${err}`)
        }
    }
    
    async turncate(): Promise<product> {
        try {
            const sql = 'TRUNCATE TABLE products'
            const conn = await client.connect()
      
            const result = await conn.query(sql)
      
            const product = result.rows[0]
      
            conn.release()
      
            return product
        } catch (err) {
            throw new Error(`Could not delete products. Error: ${err}`)
        }
    }
    
}