import request from 'supertest';

const BASE_URL = 'https://dummyjson.com';

describe('Security API Tests', () => {

    it('POST /auth/login - Should fail without password', async () => {
        const payload = {
            username: "kminchelle"
            // missing password
        };

        // DummyJSON returns 400 for missing credentials
        const response = await request(BASE_URL).post('/auth/login').send(payload);
        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty('message');
    });
});
