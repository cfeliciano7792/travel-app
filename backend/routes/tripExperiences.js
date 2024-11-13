// Example API route for handling Trip Experiences
// This is a table that holds the connections between trips and experiences

const express = require('express');
const pool = require('../config/db');
const router = express.Router();

// GET route to fetch all trip experiences
router.get('/', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM TripExperiences');
        // Return all Trip Experience connections
        res.json(result.rows);
    } catch (err) {
        // Log specific error details
        console.error("Error in /api/trip-experiences:", err);
        res.status(500).send("Server Error");
    }
});

module.exports = router;
