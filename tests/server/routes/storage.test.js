const request = require('supertest');
const app = require('../../../server');

const encKey = 'super-key';

describe('Storage Endpoints', () => {
    describe('#set', () => {
        it('should not be ok on missing params', async () => {
            const id = 'example-id';

            const res = await request(app)
                .post('/storage/' + id + '/set')
                .send();

            expect(res.statusCode).toEqual(500);
        });

        it('should be possible to create encrypted data record', async () => {
            const id = 'example-id'

            const res = await request(app)
                .post('/storage/' + id + '/set')
                .send({
                    encryption_key: encKey,
                    value: {
                        key1: 'value1',
                        key2: 'value2'
                    }
                });

            expect(res.statusCode).toEqual(201);
        });
    });

    describe('#get', () => {
        it('should not be ok on missing params', async () => {
            const id = 'example-id';

            const res = await request(app)
                .post('/storage/' + id + '/get')
                .send();

            expect(res.statusCode).toEqual(500);
        });

        it('should be ok to receive nothing on any passed id', async () => {
            const id = 'example-id';

            const res = await request(app)
                .post('/storage/' + id + '/get')
                .send({ decryption_key: encKey });

            expect(res.statusCode).toEqual(200);
        });

        it('should be possible to decrypt value for existing record', async () => {
            const id = 'example-id'
            const value = {
                key1: 'value1',
                key2: 'value2'
            };

            const setResp = await request(app)
                .post('/storage/' + id + '/set')
                .send({
                    encryption_key: encKey,
                    value: value
                });
            expect(setResp.statusCode).toEqual(201);

            const getResp = await request(app)
                .post('/storage/' + id + '/get')
                .send({ decryption_key: encKey })

            expect(getResp.statusCode).toEqual(200);
            expect(getResp.body).toEqual([value]);
        });
    });
});
