// Example API route for handling Experiences

const express = require('express');
const router = express.Router();
const pool = require('../config/db');

// Get all experiences
router.get('/', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM Experiences');
        // Return all experiences
        res.json(result.rows);
    } catch (err) {
        console.error('Error in GET /api/experiences:', err);
        res.status(500).send('Server Error - Get');
    }
});

// Add a new experience
router.post('/', async (req, res) => {
    const { user_id, title, description, photos, rating } = req.body;

    try {
        const result = await pool.query(
            `INSERT INTO Experiences (user_id, title, description, photos, rating)
             VALUES ($1, $2, $3, $4, $5) RETURNING *`,
            [user_id, title, description, photos, rating]
        );
        res.status(201).json(result.rows[0]);
    } catch (err) {
        console.error('Error in POST /api/experiences:', err);
        res.status(500).send('Server Error - Post');
    }
});
// Update an experience
router.put('/:id', async (req, res) => {
    const { id } = req.params; // 'id' corresponds to 'experience_id'
    const { title, description, rating } = req.body;

    try {
        const result = await pool.query(
            `UPDATE Experiences
             SET title = COALESCE($1, title),
                 description = COALESCE($2, description),
                 rating = COALESCE($3, rating)
             WHERE experience_id = $4
             RETURNING *`,
            [title, description, rating, id]
        );

        if (result.rowCount === 0) {
            return res.status(404).json({ message: 'Experience not found' });
        }

        res.json(result.rows[0]);
    } catch (err) {
        console.error('Error in PUT /api/experiences/:id:', err);
        res.status(500).send('Server Error - Update');
    }
});
// Delete an experience
router.delete('/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const result = await pool.query(
            'DELETE FROM Experiences WHERE experience_id = $1 RETURNING *',
            [id]
        );

        if (result.rowCount === 0) {
            return res.status(404).json({ message: 'Experience not found' });
        }

        res.json({ message: 'Experience deleted', experience: result.rows[0] });
    } catch (err) {
        console.error('Error in DELETE /api/experiences/:id:', err);
        res.status(500).send('Server Error - Delete');
    }
});

// Search or filter experiences (partial/case-insensitive)
// Works for title and ratings (min or max)
router.get('/search', async (req, res) => {
    // Query parameters
    const { title, minRating, maxRating } = req.query;
    const filters = [];
    const values = [];

    // Add title filter if present in query
    if (title) {
        filters.push(`title ILIKE $${filters.length + 1}`);
        values.push(`%${title}%`);
    }

    // Add rating filter if present in query
    if (minRating) {
        filters.push(`rating >= $${filters.length + 1}`);
        values.push(minRating);
    }

    if (maxRating) {
        filters.push(`rating <= $${filters.length + 1}`);
        values.push(maxRating);
    }

    const whereClause = filters.length > 0 ? `WHERE ${filters.join(' AND ')}` : '';

    try {
        const query = `SELECT * FROM Experiences ${whereClause}`;
        const result = await pool.query(query, values);
        if (result.rowCount === 0) {
            return res.status(404).json({ message: 'No experiences found' });
        }
        res.json(result.rows);
    } catch (err) {
        console.error('Error in GET /api/experiences/search:', err);
        res.status(500).send('Server Error - Search');
    }
});

module.exports = router;
