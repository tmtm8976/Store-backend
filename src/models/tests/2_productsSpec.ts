import { Product } from '../products'
import { userModel } from '../users'
import { Order }   from '../orders'



const { ENV } = process.env


const user_obj = new userModel() 
const order_obj = new Order()
const product_obj = new Product()


describe(`Product Model ${ENV}`, () => {

    //create testing data 
    beforeAll(async()=>{

    })

    describe('product model mehtods check: ' , () => {
        
        it('should have index method', () => {
            expect(product_obj.index).toBeDefined()
        })

        it('should have show method', () => {
            expect(product_obj.show).toBeDefined()
        })

        it('should have create method', () => {
            expect(product_obj.create).toBeDefined()
        })

        it('should have delete method', () => {
            expect(product_obj.delete).toBeDefined()
        })

        it('should have category method', () => {
            expect(product_obj.category).toBeDefined()
        })

        it('should have popular method', () => {
            expect(product_obj.popular).toBeDefined()
        })

    })

    describe('testing product model methods: ' , () => {

        //create
        it('create method should create a product', async () => {
            const result = await product_obj.create({
                name: 'product11',
                price: 22,
                category: 'cate3'
            })
            expect(result).toEqual({
                id: 11,
                name: 'product11',
                price: 22,
                category: 'cate3'
            })
        })
        
        //index
        it('index method should return a list of products', async () => {
            const result = await product_obj.index()
            expect(result.length).toEqual(11)
        })
        
        //show
        it('show method should return the correct product', async () => {
            const result = await product_obj.show(1)
            expect(result).toEqual({
                id: 1,
                name: 'product1',
                price: 10,
                category: 'cate1'
            })
        })
    
        //delete
        it('delete method should remove the product', async () => {
            await product_obj.delete(11)
            const result = await product_obj.index()
    
            expect(result.length).toEqual(10)
        })
    
        //category
        it('category method should return products of the same category', async () => {
    
            const result = await product_obj.category('cate3')
    
            expect(result).toEqual([
                {
                    id: 7,
                    name: 'product7',
                    price: 40,
                    category: 'cate3'
                },
                {
                    id: 8,
                    name: 'product8',
                    price: 45,
                    category: 'cate3'
                },
                {
                    id: 9,
                    name: 'product9',
                    price: 50,
                    category: 'cate3'
                },
                {
                    id: 10,
                    name: 'product10',
                    price: 55,
                    category: 'cate3'
                }
            ])
        })

        //popular
        it('popular method should get the top 5 popular products', async () => {

            const result = await product_obj.popular();
    
            expect(result).toEqual([
                {
                    product_id: '9' ,
                    total_quantity: '10'
                },
                {
                    product_id: '8' ,
                    total_quantity: '9'
                },
                {
                    product_id: '7' ,
                    total_quantity: '8'
                },
                {
                    product_id: '6' ,
                    total_quantity: '7'
                },
                {
                    product_id: '1' ,
                    total_quantity: '5'
                }
            ])
        })
    })
    


})
