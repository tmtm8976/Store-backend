import { userModel } from '../users'
import { Product } from '../products'
import { Order } from '../orders'

export const insert_test_data = async () => {
    //__________________________ ussers table data.______________________________________________________

    const user_obj = new userModel()

    await user_obj.create({
        first_name: 'user1',
        last_name: 'user1',
        password: 'pass123',
    })
    await user_obj.create({
        first_name: 'user2',
        last_name: 'user2',
        password: 'pass123',
    })
    await user_obj.create({
        first_name: 'user3',
        last_name: 'user3',
        password: 'pass123',
    })
    await user_obj.create({
        first_name: 'user4',
        last_name: 'user4',
        password: 'pass123',
    })
    await user_obj.create({
        first_name: 'user5',
        last_name: 'user5',
        password: 'pass123',
    })

    //__________________________ products table data.______________________________________________________

    const product_obj = new Product()

    await product_obj.create({
        name: 'product1',
        price: 10,
        category: 'cate1',
    })
    await product_obj.create({
        name: 'product2',
        price: 15,
        category: 'cate1',
    })
    await product_obj.create({
        name: 'product3',
        price: 20,
        category: 'cate1',
    })
    await product_obj.create({
        name: 'product4',
        price: 25,
        category: 'cate2',
    })
    await product_obj.create({
        name: 'product5',
        price: 30,
        category: 'cate2',
    })
    await product_obj.create({
        name: 'product6',
        price: 35,
        category: 'cate2',
    })
    await product_obj.create({
        name: 'product7',
        price: 40,
        category: 'cate3',
    })
    await product_obj.create({
        name: 'product8',
        price: 45,
        category: 'cate3',
    })
    await product_obj.create({
        name: 'product9',
        price: 50,
        category: 'cate3',
    })
    await product_obj.create({
        name: 'product10',
        price: 55,
        category: 'cate3',
    })

    //__________________________orders table data.______________________________________________________

    const order_obj = new Order()

    await order_obj.create({
        status: 'open',
        user_id: 1,
    })
    await order_obj.create({
        status: 'open',
        user_id: 2,
    })
    await order_obj.create({
        status: 'open',
        user_id: 3,
    })
    await order_obj.create({
        status: 'complete',
        user_id: 4,
    })
    await order_obj.create({
        status: 'complete',
        user_id: 5,
    })
    await order_obj.create({
        status: 'complete',
        user_id: 1,
    })
    await order_obj.create({
        status: 'complete',
        user_id: 2,
    })

    //__________________________ order_products table data.______________________________________________________

    await order_obj.addProduct({
        quantity: 1,
        order_id: '1',
        product_id: '1',
    })
    await order_obj.addProduct({
        quantity: 2,
        order_id: '2',
        product_id: '2',
    })
    await order_obj.addProduct({
        quantity: 3,
        order_id: '3',
        product_id: '3',
    })
    await order_obj.addProduct({
        quantity: 4,
        order_id: '4',
        product_id: '4',
    })
    await order_obj.addProduct({
        quantity: 3,
        order_id: '5',
        product_id: '5',
    })
    await order_obj.addProduct({
        quantity: 7,
        order_id: '6',
        product_id: '6',
    })
    await order_obj.addProduct({
        quantity: 8,
        order_id: '7',
        product_id: '7',
    })
    await order_obj.addProduct({
        quantity: 9,
        order_id: '1',
        product_id: '8',
    })
    await order_obj.addProduct({
        quantity: 10,
        order_id: '2',
        product_id: '9',
    })
    await order_obj.addProduct({
        quantity: 4,
        order_id: '3',
        product_id: '1',
    })
}
