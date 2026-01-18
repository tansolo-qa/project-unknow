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

    it('POST /auth/login - Should fail with missing username', async () => {
        const payload = {
            password: "password123"
        };
        const response = await request(BASE_URL).post('/auth/login').send(payload);
        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty('message');
    });

    it('POST /auth/login - Should handle Basic SQL Injection attempt gracefully', async () => {
        const payload = {
            username: "' OR '1'='1",
            password: "password123"
        };
        const response = await request(BASE_URL).post('/auth/login').send(payload);

        // Should NOT return 200 (Success) or 500 (Server Error which implies vulnerability)
        // Expect 400 (Bad Request) or 401 (Unauthorized)
        expect([400, 403, 401]).toContain(response.status);
    });
});
