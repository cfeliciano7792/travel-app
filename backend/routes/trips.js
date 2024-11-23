// Example API route for handling Trips

const express = require('express');
const pool = require('../config/db');
const router = express.Router();


// GET route to fetch all trips
router.get('/', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM Trips');
        // Return all Trips
        res.json(result.rows);
    } catch (err) {
        // Log specific error details
        console.error("Error in /api/trips:", err);
        res.status(500).send("Server Error");
    }
});

// Get route to fetch trips for a specific userID
router.get("/user/:user_id", async (req, res) => {
    const { user_id } = req.params;
    try {
        const results = await pool.query(
            `SELECT * FROM TRIPS WHERE user_id=$1`, [user_id]
        );
        //If no trips found return an empty array
        if (results.rows.length === 0) {
            return res.status(404).json({message:'No trips found for this user'});
        }
        res.json(results.rows);
    } catch (err) {
        console.error("Error in POST /api/trips/user/:userID", err);
        res.status(500).send("Server Error");
    }
});

// POST route to add a new trip
router.post('/', async (req, res) => {
    console.log(req.body)
    const { user_id, title } = req.body;
    
    try {
        const result = await pool.query(
            `INSERT INTO Trips (user_id, title) VALUES ($1, $2) RETURNING *`,
            [user_id, title]
        );
        res.json(result.rows[0]);
    } catch (err) {
        console.error("Error in POST /api/trips:", err);
        res.status(500).send("Server Error");
    }
});

module.exports = router;
