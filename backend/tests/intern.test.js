const request = require('supertest');
const app = require('../server');

// Mock Supabase to avoid real remote calls during unit tests
jest.mock('../src/config/supabaseClient', () => ({
    from: jest.fn().mockReturnThis(),
    select: jest.fn().mockReturnThis(),
    order: jest.fn().mockResolvedValue({ data: [{ id: 1, name: 'Test Program' }], error: null })
}));

describe('Intern API Endpoints', () => {
    it('GET /api/interns/programs should return array of programs', async () => {
        const res = await request(app).get('/api/interns/programs');
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveLength(1);
        expect(res.body[0].name).toBe('Test Program');
    });
});
