// Example API route for handling Experiences

const express = require('express');
const pool = require('../config/db');
const router = express.Router();

// GET route to fetch all experiences
router.get('/', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM Experiences');
        // Return all experiences
        res.json(result.rows);
    } catch (err) {
        // Log specific error details
        console.error("Error in /api/experiences:", err);
        res.status(500).send("Server Error-Get");
    }
});

// POST route to add a new experience

router.post('/', async (req, res) => {
    const { user_id, title, description, rating } = req.body;
    const photos = null;

    try {
        const result = await pool.query(
            `INSERT INTO Experiences (user_id, title, description, photos, rating)
             VALUES ($1, $2, $3, $4, $5) RETURNING *`,
            [user_id, title, description, photos, rating]
        );
        res.status(201).json(result.rows[0]); 
    } catch (err) {
        console.error("Error in POST /api/experiences:", err);
        res.status(500).send("Server Error - Post");
    }
});

module.exports = router;
