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
                .send({});

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
                .send({ encryption_key: encKey, value: value })
            expect(setResp.statusCode).toEqual(201);

            const getResp = await request(app)
                .post('/storage/' + id + '/get')
                .send({ decryption_key: encKey })
            expect(getResp.statusCode).toEqual(200);
            expect(getResp.body).toEqual([value]);
        });

        it('should be possible to decrypt multiple keys using *', async () => {
            const id1 = 'pattern-1';
            const value1 = {
                key1: 'value1',
                key2: 'value2'
            };
            const id2 = 'pattern-2';
            const value2 = {
                key3: 'value3',
                key4: 'value4'
            };

            await request(app)
                .post('/storage/' + id1 + '/set')
                .send({ encryption_key: encKey, value: value1 })
            await request(app)
                .post('/storage/' + id2 + '/set')
                .send({ encryption_key: encKey, value: value2 })

            const resp = await request(app)
                .post('/storage/' + 'pattern-*' + '/get')
                .send({ decryption_key: encKey })
            expect(resp.statusCode).toEqual(200);
            expect(resp.body).toEqual([value1, value2]);
        });

        it('should be ok on using wrong secure key and return nothing as result', async () => {
            const id = 'example-id'
            const value = {
                key1: 'value1',
                key2: 'value2'
            };

            const setResp = await request(app)
                .post('/storage/' + id + '/set')
                .send({ encryption_key: encKey, value: value })
            expect(setResp.statusCode).toEqual(201);

            const getResp = await request(app)
                .post('/storage/' + id + '/get')
                .send({ decryption_key: encKey + 'wrong' })
            expect(getResp.statusCode).toEqual(200);
            expect(getResp.body).toEqual([]);
        });
    });
});
