import supertest from 'supertest'
import app from '..'

const req = supertest(app)

describe('Test main server router', () => {
    it('Get the /api/ endpoint', async () => {
        const res = await req.get('/')
        expect(res.status).toBe(200)
    })
})