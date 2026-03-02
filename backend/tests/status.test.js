const request = require('supertest');
const app = require('../server');

describe('GET /api/status', () => {
    it('should return 200 with status and skills info', async () => {
        const res = await request(app).get('/api/status');
        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual({
            status: 'running',
            skills: 'active'
        });
    });
});
