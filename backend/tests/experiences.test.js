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
    const newExperience = {
        user_id: 1,
        title: 'New Experience',
        description: 'Test description',
        photos: ['photo1.jpg', 'photo2.jpg'], // Example photo URLs
        location_coordinates: '40.7128, -74.0060', // Example coordinates
        rating: 4.5,
        upvotes: 10,
        downvotes: 2,
    };
    const mockData = { experience_id: 1, ...newExperience };

    pool.query.mockResolvedValueOnce({ rows: [mockData] });

    const response = await request(app).post('/api/experiences').send(newExperience);
    expect(response.statusCode).toBe(201);
    expect(response.body).toEqual(mockData);

    expect(pool.query).toHaveBeenCalledWith(
        expect.stringContaining('INSERT INTO Experiences'),
        [
            newExperience.user_id,
            newExperience.title,
            newExperience.description,
            JSON.stringify(newExperience.photos), // Convert to JSON for query
            newExperience.location_coordinates,
            newExperience.rating,
            newExperience.upvotes,
            newExperience.downvotes,
        ]
      );
  });
});
