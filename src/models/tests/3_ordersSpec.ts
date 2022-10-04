import { Order } from '../orders'

const { ENV } = process.env

const order_obj = new Order()

describe(`order Model ${ENV}`, () => {
    describe('order model mehtods check: ', () => {
        it('should have index method', () => {
            expect(order_obj.index).toBeDefined()
        })

        it('should have show method', () => {
            expect(order_obj.show).toBeDefined()
        })

        it('should have create method', () => {
            expect(order_obj.create).toBeDefined()
        })

        it('should have delete method', () => {
            expect(order_obj.delete).toBeDefined()
        })

        it('should have get active orders method', () => {
            expect(order_obj.active_orders).toBeDefined()
        })

        it('should have get complete orders method', () => {
            expect(order_obj.complete_orders).toBeDefined()
        })
        it('should have add product method', () => {
            expect(order_obj.addProduct).toBeDefined()
        })
    })

    describe('testing order model methods: ', () => {
        //create
        it('create method should add an order', async () => {
            const result = await order_obj.create({
                status: 'open',
                user_id: 3,
            })
            expect(result).toEqual({
                id: 8,
                status: 'open',
                user_id: '3',
            })
        })

        //index
        it('index method should return a list of all orders', async () => {
            const result = await order_obj.index()
            expect(result.length).toEqual(8)
        })

        //show
        it('show method should return the correct order', async () => {
            const result = await order_obj.show(8)
            expect(result).toEqual({
                id: 8,
                status: 'open',
                user_id: '3',
            })
        })

        //delete
        it('delete method should remove the order', async () => {
            await order_obj.delete(8)
            const result = await order_obj.index()

            expect(result.length).toEqual(7)
        })

        //get active orders
        it('get active orders method should return current orders orders by user id', async () => {
            const result = await order_obj.active_orders(3)

            expect(result).toEqual([
                {
                    id: 3,
                    status: 'open',
                    user_id: '3',
                },
            ])
        })

        //get complete orders
        it('complete orders method should return a list of all completed orders by user id', async () => {
            const result = await order_obj.complete_orders(1)

            expect(result).toEqual([
                {
                    id: 6,
                    status: 'complete',
                    user_id: '1',
                },
            ])
        })

        //add product
        it('add product method should add product to the order', async () => {
            const result = await order_obj.addProduct({
                quantity: 1,
                order_id: '1',
                product_id: '1',
            })

            expect(result).toEqual({
                id: 11,
                quantity: 1,
                product_id: '1',
                order_id: '1',
            })
        })
    })
})
