// Example API route for handling Trip Experiences
// This table holds the connections between trips and experiences

const express = require('express');
const pool = require('../config/db');
const router = express.Router();

// Get all trip experiences
router.get('/', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM TripExperiences');
        res.json(result.rows);
    } catch (err) {
        console.error('Error in GET /api/trip-experiences:', err);
        res.status(500).send('Server Error - Get');
    }
});

// Get all experiences associated with a specific trip_id
router.get('/trip/:trip_id', async (req, res) => {
    const { trip_id } = req.params;

    try {
        const result = await pool.query(
            `SELECT e.*
             FROM TripExperiences te
             INNER JOIN Experiences e ON te.experience_id = e.experience_id
             WHERE te.trip_id = $1`,
            [trip_id]
        );

        if (result.rowCount === 0) {
            return res.status(404).json({ message: 'No experiences found for this trip' });
        }

        res.json(result.rows);
    } catch (err) {
        console.error('Error in GET /api/trip-experiences/trip/:trip_id:', err);
        res.status(500).send('Server Error - Get Experiences by Trip');
    }
});

// Add a new trip-experience connection
router.post('/', async (req, res) => {
    const { trip_id, experience_id } = req.body;

    try {
        const result = await pool.query(
            `INSERT INTO TripExperiences (trip_id, experience_id)
             VALUES ($1, $2) RETURNING *`,
            [
                trip_id || null,
                experience_id || null,
            ]
        );
        res.status(201).json(result.rows[0]);
    } catch (err) {
        console.error('Error in POST /api/trip-experiences:', err);
        res.status(500).send('Server Error - Post');
    }
});

// Update a trip-experience connection
router.put('/:id', async (req, res) => {
    const { id } = req.params; // 'id' corresponds to 'trip_experience_id'
    const { trip_id, experience_id } = req.body;

    try {
        const result = await pool.query(
            `UPDATE TripExperiences
             SET trip_id = COALESCE($1, trip_id),
                 experience_id = COALESCE($2, experience_id)
             WHERE trip_experience_id = $3
             RETURNING *`,
            [
                trip_id || null,
                experience_id || null,
                id,
            ]
        );

        if (result.rowCount === 0) {
            return res.status(404).json({ message: 'TripExperience not found' });
        }

        res.json(result.rows[0]);
    } catch (err) {
        console.error('Error in PUT /api/trip-experiences/:id:', err);
        res.status(500).send('Server Error - Update');
    }
});

// Delete a trip-experience connection
router.delete('/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const result = await pool.query(
            'DELETE FROM TripExperiences WHERE trip_experience_id = $1 RETURNING *',
            [id]
        );

        if (result.rowCount === 0) {
            return res.status(404).json({ message: 'TripExperience not found' });
        }

        res.json({ message: 'TripExperience deleted', tripExperience: result.rows[0] });
    } catch (err) {
        console.error('Error in DELETE /api/trip-experiences/:id:', err);
        res.status(500).send('Server Error - Delete');
    }
});

module.exports = router;
