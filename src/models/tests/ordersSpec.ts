import { Product } from "../products";
import { Order } from "../orders";

const {
    ENV
} = process.env

const order_obj = new Order();

describe(`order Model ${ENV}`, () => {
    it('should have index method', () => {
        expect(order_obj.index).toBeDefined();
    });
    

    it('should have show method', () => {
        expect(order_obj.show).toBeDefined();
    });

    it('should have create method', () => {
        expect(order_obj.create).toBeDefined();
    });

    it('should have delete method', () => {
        expect(order_obj.delete).toBeDefined();
    });


    it('create method should add an order', async () => {
        const result = await order_obj.create({
          status : "open",
          user_id : 1 
         });
        expect(result).toEqual({
            id: 1,
            status : "open",
            user_id : '1' 
        });
    });

    it('show method should return the correct order', async () => {
        const result = await order_obj.show(1);
        expect(result.id).toEqual(1);
    });

    it('delete method should remove the order', async () => {
        await order_obj.delete(1);
        const result = await order_obj.index()
    
        expect(result).toEqual([]);
    });

    it('current method should return current orders', async () => {
        await order_obj.create({
          status : "current",
          user_id : 1 
         });

        await order_obj.create({
            status : "completed",
            user_id : 1 
        });

        const result = await order_obj.currentOrders();

        expect(result).toEqual([{
            id: 2,
            status : "current",
            user_id : '1' 
        }]);
    });


    it('completedOrders method should return completed orders', async () => {
        const result = await order_obj.completedOrders();

        expect(result).toEqual([{
            id: 3,
            status : "completed",
            user_id : '1' 
        }]);
    });

    // it('index method should return a list of products', async () => {
    //     const result = await product_obj.index();
    //     expect(result).toEqual([{
    //         id: 1,
    //         name: 'test_product',
    //         price: 250
    //     }]);
    // });

    // it('show method should return the correct product', async () => {
    //     const result = await product_obj.show(1);
    //     expect(result).toEqual({
    //         id: 1,
    //         name: 'test_product',
    //         price: 250
    //     });
    // });

    // it('delete method should remove the product', async () => {
    //     await product_obj.delete(1);
    //     const result = await product_obj.index()
    
    //     expect(result).toEqual([]);
    // });
});