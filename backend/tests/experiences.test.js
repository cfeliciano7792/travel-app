// Testing the experience.js routes under backend/routes/experiences.js
const request = require('supertest');
const app = require('../server');
const pool = require('../config/db');

// Mock the `pool.query` aka db
jest.mock('../config/db', () => {
  return {
    query: jest.fn(),
  };
});

describe('Experiences API', () => {
  afterEach(() => {
    jest.clearAllMocks(); // Reset mocks between tests
  });

  // Begin testing routes
  test('GET /api/experiences should return all experiences', async () => {
    const mockData = [{ experience_id: 1, title: 'Test Experience' }];
    pool.query.mockResolvedValueOnce({ rows: mockData });

    const response = await request(app).get('/api/experiences');
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual(mockData);
    expect(pool.query).toHaveBeenCalledWith('SELECT * FROM Experiences');
  });

  test('POST /api/experiences should add a new experience', async () => {
    const newExperience = { user_id: 1, title: 'New Experience', description: 'A test description' };
    const mockData = { experience_id: 1, ...newExperience };

    pool.query.mockResolvedValueOnce({ rows: [mockData] });

    const response = await request(app).post('/api/experiences').send(newExperience);
    expect(response.statusCode).toBe(201);
    expect(response.body).toEqual(mockData);
    expect(pool.query).toHaveBeenCalledWith(
      expect.stringContaining('INSERT INTO Experiences'),
      expect.any(Array)
    );
  });

  test('GET /api/experiences/search should return filtered results', async () => {
    const mockData = [{ experience_id: 1, title: 'Search Experience' }];
    pool.query.mockResolvedValueOnce({ rows: mockData });

    const response = await request(app).get('/api/experiences/search?title=Search');
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual(mockData);
    expect(pool.query).toHaveBeenCalledWith(
      expect.stringContaining('SELECT * FROM Experiences WHERE title ILIKE $1'),
      ['%Search%']
    );
  });
});
