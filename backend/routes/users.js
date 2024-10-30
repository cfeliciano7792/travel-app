// Example API route for handling Users

// Database connection
const express = require('express');
const pool = require('../config/db');
const router = express.Router();

// GET route to fetch all users
router.get('/', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM Users');
        // Return all users
        res.json(result.rows);
    } catch (err) {
        // Log specific error details
        console.error("Error in /api/users:", err);
        res.status(500).send("Server Error");
    }
});

// POST route to add a new user (example)
router.post('/', async (req, res) => {
    const { username, email, password_hash, profile_picture, bio } = req.body;
    try {
        const result = await pool.query(
            `INSERT INTO Users (username, email, password_hash, profile_picture, bio)
             VALUES ($1, $2, $3, $4, $5) RETURNING *`,
            [username, email, password_hash, profile_picture, bio]
        );
        // Return the newly created user
        res.json(result.rows[0]);
    } catch (err) {
        console.error("Error in POST /api/users:", err);
        res.status(500).send("Server Error");
    }
});

module.exports = router;
