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

describe('Trips API', () => {
  afterEach(() => {
    jest.clearAllMocks(); // Reset mocks between tests
  });

  test('GET /api/trips should return all trips', async () => {
    const mockData = [{ trip_id: 1, user_id: 1, title: 'Test Trip' }];
    pool.query.mockResolvedValueOnce({ rows: mockData });

    const response = await request(app).get('/api/trips');
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual(mockData);
    expect(pool.query).toHaveBeenCalledWith('SELECT * FROM Trips');
  });

  test('GET /api/trips/user/:user_id should return trips for a specific user', async () => {
    const mockData = [{ trip_id: 1, user_id: 1, title: 'User Trip' }];
    pool.query.mockResolvedValueOnce({ rows: mockData });

    const response = await request(app).get('/api/trips/user/1');
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual(mockData);
    expect(pool.query).toHaveBeenCalledWith(
      'SELECT * FROM Trips WHERE user_id = $1',
      ['1'] // Adjusted to match string type
    );
  });

  test('POST /api/trips should add a new trip', async () => {
    const newTrip = { 
      user_id: 1, 
      title: 'New Trip', 
      description: 'A test description', 
      trip_date: '2024-12-01' 
    };
    const mockData = { trip_id: 1, ...newTrip };
  
    pool.query.mockResolvedValueOnce({ rows: [mockData] });
  
    const response = await request(app).post('/api/trips').send(newTrip);
    expect(response.statusCode).toBe(201);
    expect(response.body).toEqual(mockData);
  
    // Normalize query strings
    const normalizeQuery = (query) =>
      query.replace(/\s+/g, ' ').replace(/\s*\(\s*/g, '(').replace(/\s*\)\s*/g, ')').trim();
  
    expect(normalizeQuery(pool.query.mock.calls[0][0])).toBe(
      normalizeQuery('INSERT INTO Trips (user_id, title, description, trip_date) VALUES ($1, $2, $3, $4) RETURNING *')
    );
  
    expect(pool.query.mock.calls[0][1]).toEqual([
      newTrip.user_id,
      newTrip.title,
      newTrip.description,
      newTrip.trip_date,
    ]);
  });
  
  test('GET /api/trips/search should return filtered trips', async () => {
    const mockData = [{ trip_id: 1, user_id: 1, title: 'Search Trip' }];
    pool.query.mockResolvedValueOnce({ rows: mockData });

    const response = await request(app).get('/api/trips/search?title=Search');
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual(mockData);
    expect(pool.query).toHaveBeenCalledWith(
      expect.stringContaining('SELECT * FROM Trips WHERE title ILIKE $1'),
      ['%Search%']
    );
  });
});
