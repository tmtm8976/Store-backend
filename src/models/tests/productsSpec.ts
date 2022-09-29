import { Product } from "../products";

const {
    ENV
} = process.env

const product_obj = new Product();

describe(`Product Model ${ENV}`, () => {
    it('should have index method', () => {
        expect(product_obj.index).toBeDefined();
    });
    

    it('should have show method', () => {
        expect(product_obj.show).toBeDefined();
    });

    it('should have create method', () => {
        expect(product_obj.create).toBeDefined();
    });

    it('should have delete method', () => {
        expect(product_obj.delete).toBeDefined();
    });


    it('create method should add a product', async () => {
        const result = await product_obj.create({
          name: 'test_product',
          price: 250
         });
        expect(result).toEqual({
        id: 1,
        name: 'test_product',
        price: 250
        });
    });

    it('index method should return a list of products', async () => {
        const result = await product_obj.index();
        expect(result).toEqual([{
            id: 1,
            name: 'test_product',
            price: 250
        }]);
    });

    it('show method should return the correct product', async () => {
        const result = await product_obj.show(1);
        expect(result).toEqual({
            id: 1,
            name: 'test_product',
            price: 250
        });
    });

    it('delete method should remove the product', async () => {
        await product_obj.delete(1);
        const result = await product_obj.index()
    
        expect(result).toEqual([]);
    });
});