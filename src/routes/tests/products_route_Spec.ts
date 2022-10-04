import supertest from 'supertest'
import app from '../../index'

const request = supertest(app)
let token = ''

describe('Products API Endpoints', async () => {
    //log in first
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

    describe('Test API methods', () => {
        //create
        it('should create new product', async () => {
            const res = await request
                .post('/api/products/')
                .set('Content-type', 'application/json')
                .set('Authorization', `Bearer ${token}`)
                .send({
                    name: 'product12',
                    price: 22,
                    category: 'cate4',
                })
            expect(res.status).toBe(200)
            const { id, name, price, category } = res.body.product
            expect(id).toBe(12)
            expect(name).toBe('product12')
            expect(price).toBe(22)
            expect(category).toBe('cate4')
        })

        //index
        it('should get list of products', async () => {
            const res = await request
                .get('/api/products/')
                .set('Content-type', 'application/json')
            expect(res.status).toBe(200)
            expect(res.body.products.length).toBe(11)
        })

        //show
        it('should get product info', async () => {
            const res = await request
                .get(`/api/products/12`)
                .set('Content-type', 'application/json')
            const { id, name, price, category } = res.body.product
            expect(id).toBe(12)
            expect(name).toBe('product12')
            expect(price).toBe(22)
            expect(category).toBe('cate4')
        })

        //delete
        it('should delete product', async () => {
            const res = await request
                .delete(`/api/products/12`)
                .set('Content-type', 'application/json')
                .set('Authorization', `Bearer ${token}`)
            expect(res.status).toBe(200)
            expect(res.body.product.id).toBe(12)
            expect(res.body.product.name).toBe('product12')
        })

        //popular
        it('should get top five most popular products ', async () => {
            const res = await request
                .get(`/api/products/popular/`)
                .set('Content-type', 'application/json')
            const products = res.body.products
            expect(products.length).toBe(5)
            expect(products[0].product_id).toBe('9')
            expect(products[1].product_id).toBe('8')
            expect(products[2].product_id).toBe('7')
            expect(products[3].product_id).toBe('6')
            expect(products[4].product_id).toBe('1')
        })

        //products by category
        it('should get products by category: ', async () => {
            const res = await request
                .get(`/api/products/category/cate3`)
                .set('Content-type', 'application/json')
            const products = res.body.products
            expect(products.length).toBe(4)
            expect(products[0].id).toBe(7)
            expect(products[1].id).toBe(8)
            expect(products[2].id).toBe(9)
            expect(products[3].id).toBe(10)
        })
    })
})
