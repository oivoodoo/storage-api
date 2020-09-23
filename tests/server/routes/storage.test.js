const request = require('supertest')
const app = require('../../../server')

const enc_key = 'super-key';

describe('Storage Endpoints', () => {
    it('should be possible to create encrypted data record', async () => {
        const id = 'example-id'

        const res = await request(app)
            .post('/storage/' + id + '/set')
            .send({
                encryption_key: enc_key,
                value: {
                    key1: 'value1',
                    key2: 'value2'
                }
            })

        expect(res.statusCode).toEqual(201)
    })

    it('should be possible to decrypt value data record', async () => {
        const id = 'example-id'

        const res = await request(app)
            .post('/storage/' + id + '/get')
            .send({ decryption_key: enc_key })

        expect(res.statusCode).toEqual(200)
    })
})
