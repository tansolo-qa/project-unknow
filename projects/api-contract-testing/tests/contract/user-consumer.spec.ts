import { PactV3, MatchersV3 } from '@pact-foundation/pact';
import path from 'path';
import axios from 'axios';

const { like } = MatchersV3;

const provider = new PactV3({
    consumer: 'FrontendApp',
    provider: 'UserService',
    dir: path.resolve(process.cwd(), 'pacts'),
});

describe('User Service Contract', () => {

    it('get user by ID', () => {
        provider
            .given('a user with ID 1 exists')
            .uponReceiving('a request for user 1')
            .withRequest({
                method: 'GET',
                path: '/users/1',
            })
            .willRespondWith({
                status: 200,
                headers: { 'Content-Type': 'application/json' },
                body: {
                    id: like(1),
                    name: like('Leanne Graham'),
                },
            });

        return provider.executeTest(async (mockServer) => {
            // Act: Consumer makes a request to the Mock Provider
            const response = await axios.get(`${mockServer.url}/users/1`);

            // Assert: Response matches what we expect
            expect(response.status).toEqual(200);
            expect(response.data).toEqual(expect.objectContaining({
                id: 1,
                name: 'Leanne Graham'
            }));
        });
    });
});
