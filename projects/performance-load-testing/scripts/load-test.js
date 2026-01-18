import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
    stages: [
        { duration: '30s', target: 50 }, // Ramp-up to 50 users
        { duration: '1m', target: 50 },  // Stay at 50 users
        { duration: '30s', target: 0 },  // Ramp-down to 0 users
    ],
    thresholds: {
        http_req_duration: ['p(95)<500'], // 95% of requests must complete below 500ms
        http_req_failed: ['rate<0.01'],   // http errors should be less than 1%
    },
};

export default function () {
    const res = http.get('https://test.k6.io');

    check(res, {
        'status is 200': (r) => r.status === 200,
        'protocol is HTTP/2': (r) => r.proto === 'h2',
    });

    sleep(1);
}
