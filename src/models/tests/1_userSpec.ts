import { userModel } from '../users'
import { insert_test_data } from './test_data'
import config from '../../config'

const  env = config.env

const user_obj = new userModel()

//insert data into testing database
beforeAll(async () => {
    await insert_test_data()
})

describe(`User Model ${env}`, () => {
    describe('User model mehtods check: ', () => {
        it('should have index method', () => {
            expect(user_obj.index).toBeDefined()
        })

        it('should have show method', () => {
            expect(user_obj.show).toBeDefined()
        })

        it('should have create method', () => {
            expect(user_obj.create).toBeDefined()
        })

        it('should have delete method', () => {
            expect(user_obj.delete).toBeDefined()
        })

        it('should have an Authenticate user method', () => {
            expect(user_obj.authenticate).toBeDefined()
        })
    })

    describe('testing user model methods: ', () => {
        //create
        it('create method should add a user', async () => {
            const result = await user_obj.create({
                first_name: 'user6',
                last_name: 'user6',
                password: 'pass123',
            })
            expect(result).toEqual({
                id: 6,
                first_name: 'user6',
                last_name: 'user6',
            })
        })

        //index
        it('index method should return a list of all the users in the database', async () => {
            const result = await user_obj.index()
            expect(result.length).toEqual(6)
        })

        //show
        it('show method should return the correct user', async () => {
            const result = await user_obj.show(6)
            expect(result).toEqual({
                id: 6,
                first_name: 'user6',
                last_name: 'user6',
            })
        })

        // delete
        it('delete method should remove the user', async () => {
            await user_obj.delete(6)
            const result = await user_obj.index()

            expect(result.length).toEqual(5)
        })

        // authenticate
        describe('Testing for Authentication:', () => {
            //correct info
            it('Athenticate method should return authenticated user', async () => {
                const result = await user_obj.authenticate('1', 'pass123')

                expect(result?.id).toEqual(1)
                expect(result?.first_name).toEqual('user1')
                expect(result?.last_name).toEqual('user1')
            })

            //wrong info
            it('Athenticate method should return null if id or password are wrong', async () => {
                const result = await user_obj.authenticate(
                    '1',
                    'wrong password'
                )

                expect(result).toBe(null)
            })
        })
    })
})
