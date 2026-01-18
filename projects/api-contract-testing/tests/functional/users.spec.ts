import request from 'supertest';

const BASE_URL = 'https://jsonplaceholder.typicode.com';

describe('Functional API Tests (JSONPlaceholder)', () => {

    it('GET /users - Should return a list of users', async () => {
        const response = await request(BASE_URL).get('/users');
        expect(response.status).toBe(200);
        expect(response.body).toBeInstanceOf(Array);
        expect(response.body.length).toBeGreaterThan(0);
    });

    it('POST /users - Should create a new user', async () => {
        const payload = {
            name: "Leanne Graham",
            username: "Bret",
            email: "Sincere@april.biz"
        };
        const response = await request(BASE_URL).post('/users').send(payload);
        expect(response.status).toBe(201);
        expect(response.body.name).toBe(payload.name);
        expect(response.body).toHaveProperty('id');
    });

    it('PUT /users/1 - Should update user details', async () => {
        const payload = {
            name: "Leanne Graham Updated"
        };
        const response = await request(BASE_URL).put('/users/1').send(payload);
        expect(response.status).toBe(200);
        // JSONPlaceholder mostly echoes back what you sent or empty, but 200 is key
        expect(response.body.name).toBe(payload.name);
    });

    it('DELETE /users/1 - Should delete user', async () => {
        const response = await request(BASE_URL).delete('/users/1');
        expect(response.status).toBe(200); // JSONPlaceholder returns 200 for delete
    });
});
