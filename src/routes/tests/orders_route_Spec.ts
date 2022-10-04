import supertest from 'supertest'
import app from '../../index'

const request = supertest(app)
let token = ''

describe('orders API Endpoints', async () => {
    beforeAll(async () => {
        const res = await request
            .post('/api/users/authenticate')
            .set('Content-type', 'application/json')
            .send({
                id: '1',
                password: 'pass123',
            })
        token = res.body.token
    })

    //create
    describe('Test API methods', () => {
        it('should create new order', async () => {
            const res = await request
                .post('/api/orders/')
                .set('Content-type', 'application/json')
                .set('Authorization', `Bearer ${token}`)
                .send({
                    status: 'open',
                    user_id: 3,
                })

            const { id, status, user_id } = res.body.order

            expect(res.status).toBe(200)
            expect(id).toBe(9)
            expect(status).toBe('open')
            expect(user_id).toBe('3')
        })

        //index
        it('should get list of orders', async () => {
            const res = await request
                .get('/api/orders/')
                .set('Content-type', 'application/json')
                .set('Authorization', `Bearer ${token}`)

            expect(res.status).toBe(200)
            expect(res.body.orders.length).toBe(8)
        })

        //show
        it('should get order info', async () => {
            const res = await request
                .get(`/api/orders/9`)
                .set('Content-type', 'application/json')
                .set('Authorization', `Bearer ${token}`)

            const { id, status, user_id } = res.body.order

            expect(id).toBe(9)
            expect(status).toBe('open')
            expect(user_id).toBe('3')
        })

        //delete
        it('should delete order', async () => {
            const res = await request
                .delete(`/api/orders/9`)
                .set('Content-type', 'application/json')
                .set('Authorization', `Bearer ${token}`)
            expect(res.status).toBe(200)
            expect(res.body.order.id).toBe(9)
            expect(res.body.order.user_id).toBe('3')
        })

        //current orders
        it('should get current orders by user id', async () => {
            const res = await request
                .get(`/api/orders/active/2`)
                .set('Content-type', 'application/json')
                .set('Authorization', `Bearer ${token}`)
            const orders = res.body.orders
            expect(orders.length).toBe(1)
            expect(orders[0].id).toBe(2)
        })

        //complete orders
        it('should get complete orders by user id ', async () => {
            const res = await request
                .get(`/api/orders/completed/2`)
                .set('Content-type', 'application/json')
                .set('Authorization', `Bearer ${token}`)

            const orders = res.body.orders

            expect(orders.length).toBe(1)
            expect(orders[0].id).toBe(7)
        })

        //add product to order
        it('should add product to order ', async () => {
            const res = await request
                .post(`/api/orders/addProduct/`)
                .set('Content-type', 'application/json')
                .set('Authorization', `Bearer ${token}`)
                .send({
                    quantity: 1,
                    product_id: '5',
                    order_id: '7',
                })

            const product = res.body.product

            expect(product.id).toBe(12)
            expect(product.quantity).toBe(1)
            expect(product.product_id).toBe('5')
            expect(product.order_id).toBe('7')
        })
    })
})
