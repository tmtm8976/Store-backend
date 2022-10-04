import supertest from 'supertest'
import app from '../../index'

const request = supertest(app)
let token = ''

describe('User API Endpoints', () => {
    //Authenticate
    describe('Test Authenticate methods', () => {
        it('should be able to authenticate to get token', async () => {
            const res = await request
                .post('/api/users/authenticate')
                .set('Content-type', 'application/json')
                .send({
                    id: '1',
                    password: 'pass123',
                })
            expect(res.status).toBe(200)
            const { id, first_name, last_name } = res.body.user
            expect(id).toBe(1)
            expect(first_name).toBe('user1')
            expect(last_name).toBe('user1')
            token = res.body.token
        })

        it('should be failed to authenticate with wrong id', async () => {
            const res = await request
                .post('/api/users/authenticate')
                .set('Content-type', 'application/json')
                .send({
                    id: '99',
                    password: 'pass123',
                })
            expect(res.status).toBe(401)
        })
    })

    describe('Test API methods', () => {
        //create
        it('should create new user', async () => {
            const res = await request
                .post('/api/users/')
                .set('Content-type', 'application/json')
                .send({
                    first_name: 'user7',
                    last_name: 'user7',
                    password: 'pass123',
                })
            expect(res.status).toBe(200)
            const { id, first_name, last_name } = res.body.user
            expect(id).toBe(7)
            expect(first_name).toBe('user7')
            expect(last_name).toBe('user7')
        })

        //index
        it('should get list of users', async () => {
            const res = await request
                .get('/api/users/')
                .set('Content-type', 'application/json')
                .set('Authorization', `Bearer ${token}`)
            expect(res.status).toBe(200)
            expect(res.body.users.length).toBe(6)
        })

        //show
        it('should get user info', async () => {
            const res = await request
                .get(`/api/users/7`)
                .set('Content-type', 'application/json')
                .set('Authorization', `Bearer ${token}`)
            expect(res.status).toBe(200)
            expect(res.body.user.first_name).toBe('user7')
            expect(res.body.user.last_name).toBe('user7')
        })

        //delete
        it('should delete user', async () => {
            const res = await request
                .delete(`/api/users/7`)
                .set('Content-type', 'application/json')
                .set('Authorization', `Bearer ${token}`)
            expect(res.status).toBe(200)
            expect(res.body.user.id).toBe(7)
            expect(res.body.user.first_name).toBe('user7')
        })
    })
})
