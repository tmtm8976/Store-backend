import client from '../../database'

export const insert_test_data = async () => {
    const user_sql = `INSERT INTO users (first_name, last_name, password) VALUES
    ('user1', 'user1', 'pass123'), ('user2', 'user2', 'pass123'), ('user3', 'user3', 'pass123'), ('user4', 'user4', 'pass123'), ('user5', 'user5', 'pass123');`

    const product_sql =  `INSERT INTO products (name, price, category) VALUES
    ('product1', 10, 'cate1'), ('product2', 15, 'cate1'), ('product3', 20, 'cate1'), ('product4', 25, 'cate2'),
    ('product5', 30, 'cate2'), ('product6', 35, 'cate2'), ('product7', 40, 'cate3'), ('product8', 45, 'cate3'),
    ('product9', 50, 'cate3'), ('product10', 55, 'cate3');`

    const order_sql = `INSERT INTO orders (status, user_id) VALUES
    ('open', (SELECT id FROM users WHERE id=1)), ('open', (SELECT id FROM users WHERE id=2)), ('open', (SELECT id FROM users WHERE id=3)),
    ('complete', (SELECT id FROM users WHERE id=4)), ('complete', (SELECT id FROM users WHERE id=5)), ('complete', (SELECT id FROM users WHERE id=1)),
    ('complete', (SELECT id FROM users WHERE id=2)) ;` 

    const order_product_sql = `INSERT INTO order_products (quantity, order_id, product_id) VALUES
    (1, (SELECT id FROM orders WHERE id=1), (SELECT id FROM products WHERE id=1)), (2, (SELECT id FROM orders WHERE id=2), (SELECT id FROM products WHERE id=2)),
    (3, (SELECT id FROM orders WHERE id=3), (SELECT id FROM products WHERE id=3)), (4, (SELECT id FROM orders WHERE id=4), (SELECT id FROM products WHERE id=4)),
    (3, (SELECT id FROM orders WHERE id=5), (SELECT id FROM products WHERE id=5)), (7, (SELECT id FROM orders WHERE id=6), (SELECT id FROM products WHERE id=6)),
    (8, (SELECT id FROM orders WHERE id=7), (SELECT id FROM products WHERE id=7)), (9, (SELECT id FROM orders WHERE id=1), (SELECT id FROM products WHERE id=8)),
    (10, (SELECT id FROM orders WHERE id=2), (SELECT id FROM products WHERE id=9)), (4, (SELECT id FROM orders WHERE id=3), (SELECT id FROM products WHERE id=1)); `


    const conn = await client.connect() ;
    await conn.query(user_sql);
    await conn.query(product_sql);
    await conn.query(order_sql);
    await conn.query(order_product_sql);

    conn.release() ;
}