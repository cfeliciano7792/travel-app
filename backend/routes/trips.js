// Example API route for handling Trips

const express = require('express');
const pool = require('../config/db');
const router = express.Router();

// Get all trips
router.get('/', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM Trips');
        res.json(result.rows);
    } catch (err) {
        console.error('Error in GET /api/trips:', err);
        res.status(500).send('Server Error - Get');
    }
});

// Get trips for a specific user
router.get('/user/:user_id', async (req, res) => {
    const { user_id } = req.params;
    try {
        const results = await pool.query('SELECT * FROM Trips WHERE user_id = $1', [user_id]);
        if (results.rows.length === 0) {
            return res.status(404).json({ message: 'No trips found for this user' });
        }
        res.json(results.rows);
    } catch (err) {
        console.error('Error in GET /api/trips/user/:user_id:', err);
        res.status(500).send('Server Error - User Trips');
    }
});

// Add a new trip
router.post('/', async (req, res) => {
    const { user_id, title, description, trip_date } = req.body;

    try {
        const result = await pool.query(
            `INSERT INTO Trips (
                user_id,
                title,
                description,
                trip_date
             ) VALUES (
                $1,
                $2,
                $3,
                $4
             ) RETURNING *`,
            [
                user_id,
                title,
                description || null,
                trip_date || null,
            ]
        );
        res.status(201).json(result.rows[0]);
    } catch (err) {
        console.error('Error in POST /api/trips:', err);
        res.status(500).send('Server Error - Post');
    }
});

// Update a trip
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { user_id, title, description, trip_date } = req.body;

    try {
        const result = await pool.query(
            `UPDATE Trips
             SET user_id = COALESCE($1, user_id),
                 title = COALESCE($2, title),
                 description = COALESCE($3, description),
                 trip_date = COALESCE($4, trip_date)
             WHERE trip_id = $5
             RETURNING *`,
            [
                user_id || null,
                title || null,
                description || null,
                trip_date || null,
                id,
            ]
        );

        if (result.rowCount === 0) {
            return res.status(404).json({ message: 'Trip not found' });
        }

        res.json(result.rows[0]);
    } catch (err) {
        console.error('Error in PUT /api/trips/:id:', err);
        res.status(500).send('Server Error - Update');
    }
});

// Delete a trip
router.delete('/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const result = await pool.query(
            'DELETE FROM Trips WHERE trip_id = $1 RETURNING *',
            [id]
        );

        if (result.rowCount === 0) {
            return res.status(404).json({ message: 'Trip not found' });
        }

        res.json({ message: 'Trip deleted', trip: result.rows[0] });
    } catch (err) {
        console.error('Error in DELETE /api/trips/:id:', err);
        res.status(500).send('Server Error - Delete');
    }
});

// Search trips by title
router.get('/search', async (req, res) => {
    const { title } = req.query;
    const filters = [];
    const values = [];

    // Add title filter if present in query
    if (title) {
        filters.push(`title ILIKE $${filters.length + 1}`);
        values.push(`%${title}%`);
    }

    const whereClause = filters.length > 0 ? `WHERE ${filters.join(' AND ')}` : '';

    try {
        const query = `SELECT * FROM Trips ${whereClause}`;
        const result = await pool.query(query, values);

        if (result.rowCount === 0) {
            return res.status(404).json({ message: 'No trips found' });
        }

        res.json(result.rows);
    } catch (err) {
        console.error('Error in GET /api/trips/search:', err);
        res.status(500).send('Server Error - Search');
    }
});

module.exports = router;
