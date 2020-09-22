const request = require('supertest')
const app = require('../../../server')

describe('Storage Endpoints', () => {
    it('should be possible to create encrypted data record', async () => {
        const id = 'example-id'

        const res = await request(app)
            .post('/storage/' + id + '/set')
            .send({
                encryption_key: 'super-key',
                value: {
                    key1: 'value1',
                    key2: 'value2'
                }
            })

        expect(res.statusCode).toEqual(201)
    })
})
