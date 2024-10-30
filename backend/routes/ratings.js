// Example API route for handling Ratings

const express = require('express');
const pool = require('../config/db');
const router = express.Router();

// GET route to fetch all ratings
router.get('/', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM Ratings');
        res.json(result.rows);
    } catch (err) {
        console.error("Error in /api/ratings:", err);
        res.status(500).send("Server Error");
    }
});

// POST route to add a new rating
router.post('/', async (req, res) => {
    const { experience_id, user_id, rating_value, review } = req.body;
    try {
        const result = await pool.query(
            `INSERT INTO Ratings (experience_id, user_id, rating_value, review) VALUES ($1, $2, $3, $4) RETURNING *`,
            [experience_id, user_id, rating_value, review]
        );
        res.json(result.rows[0]);
    } catch (err) {
        console.error("Error in POST /api/ratings:", err);
        res.status(500).send("Server Error");
    }
});

module.exports = router;
