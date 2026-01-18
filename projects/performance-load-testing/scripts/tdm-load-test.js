import http from 'k6/http';
import { check, sleep } from 'k6';

// Test Configuration
export const options = {
    stages: [
        { duration: '10s', target: 10 }, // Ramp-up to 10 users
        { duration: '30s', target: 50 }, // Stress test at 50 users (High Scale for local)
        { duration: '10s', target: 0 },  // Ramp-down
    ],
    thresholds: {
        http_req_duration: ['p(95)<2000'], // Allow up to 2s (generation is heavy)
        http_req_failed: ['rate<0.01'],    // Errors < 1%
    },
};

// Base URL (Must use host.docker.internal to reach host machine from container)
const BASE_URL = 'http://host.docker.internal:3001';

export default function () {
    const payload = JSON.stringify({
        count: 5,
        type: 'product' // Generating products is slightly heavier with Faker
    });

    const params = {
        headers: {
            'Content-Type': 'application/json',
        },
    };

    const res = http.post(`${BASE_URL}/api/data/generate`, payload, params);

    check(res, {
        'status is 201': (r) => r.status === 201,
        'response is success': (r) => r.json('success') === true,
        'has correct message': (r) => r.json('message').includes('Successfully generated'),
    });

    sleep(1);
}
