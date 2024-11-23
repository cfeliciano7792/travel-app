// Example API route for handling Users

const express = require('express');
const router = express.Router();
const pool = require('../config/db');

// Get all users
router.get('/', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM Users');
        res.json(result.rows);
    } catch (err) {
        console.error('Error in GET /api/users:', err);
        res.status(500).send('Server Error - Get');
    }
});

// Add a new user
router.post('/', async (req, res) => {
    const { username, email, password_hash, profile_picture, bio } = req.body;

    try {
        const result = await pool.query(
            `INSERT INTO Users (username, email, password_hash, profile_picture, bio)
             VALUES ($1, $2, $3, $4, $5) RETURNING *`,
            [username, email, password_hash, profile_picture, bio]
        );
        res.status(201).json(result.rows[0]);
    } catch (err) {
        console.error('Error in POST /api/users:', err);
        res.status(500).send('Server Error - Post');
    }
});

// Update a user
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { username, email, profile_picture, bio } = req.body;

    try {
        const result = await pool.query(
            `UPDATE Users
             SET username = COALESCE($1, username),
                 email = COALESCE($2, email),
                 profile_picture = COALESCE($3, profile_picture),
                 bio = COALESCE($4, bio)
             WHERE user_id = $5
             RETURNING *`,
            [username, email, profile_picture, bio, id]
        );

        if (result.rowCount === 0) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.json(result.rows[0]);
    } catch (err) {
        console.error('Error in PUT /api/users/:id:', err);
        res.status(500).send('Server Error - Update');
    }
});

// Delete a user
router.delete('/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const result = await pool.query(
            'DELETE FROM Users WHERE user_id = $1 RETURNING *',
            [id]
        );

        if (result.rowCount === 0) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.json({ message: 'User deleted', user: result.rows[0] });
    } catch (err) {
        console.error('Error in DELETE /api/users/:id:', err);
        res.status(500).send('Server Error - Delete');
    }
});

// Search users by username or email
router.get('/search', async (req, res) => {
    const { username, email } = req.query;
    const filters = [];
    const values = [];

    // Add username filter if present in query
    if (username) {
        filters.push(`username ILIKE $${filters.length + 1}`);
        values.push(`%${username}%`);
    }

    // Add email filter if present in query
    if (email) {
        filters.push(`email ILIKE $${filters.length + 1}`);
        values.push(`%${email}%`);
    }

    const whereClause = filters.length > 0 ? `WHERE ${filters.join(' AND ')}` : '';

    try {
        const query = `SELECT * FROM Users ${whereClause}`;
        const result = await pool.query(query, values);

        if (result.rowCount === 0) {
            return res.status(404).json({ message: 'No users found' });
        }

        res.json(result.rows);
    } catch (err) {
        console.error('Error in GET /api/users/search:', err);
        res.status(500).send('Server Error - Search');
    }
});

module.exports = router;
