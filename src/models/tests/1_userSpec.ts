import { userModel } from "../users";

const {
    ENV
} = process.env

const user_obj = new userModel();

describe(`User Model ${ENV}`, () => {
    it('should have index method', () => {
        expect(user_obj.index).toBeDefined();
    });
    

    it('should have show method', () => {
        expect(user_obj.show).toBeDefined();
    });

    it('should have create method', () => {
        expect(user_obj.create).toBeDefined();
    });

    it('should have delete method', () => {
        expect(user_obj.delete).toBeDefined();
    });


    it('create method should add a user', async () => {
        const result = await user_obj.create({
          first_name: 'test_first_name',
          last_name: 'test_last_name',
          password: 'test_password'
        });
        expect(result.first_name).toEqual('test_first_name');
    });

    it('index method should return a list of users', async () => {
        const result = await user_obj.index();
        expect(result.length).toEqual(1);
    });

    it('show method should return the correct user', async () => {
    const result = await user_obj.show(1);
    expect(result.id).toEqual(1);
    });

    it('delete method should remove the user', async () => {
        await user_obj.create({
            first_name: 'test_first_name',
            last_name: 'test_last_name',
            password: 'test_password'
          });
        await user_obj.delete(2);
        const result = await user_obj.index()
    
        expect(result.length).toEqual(1);
    });
});