// login.js

const express = require('express');
const bcrypt = require('bcrypt');
const pool = require('../config/db'); // Database connection
const router = express.Router();

// POST route for login
router.post('/', async (req, res) => {
    const { username, password } = req.body;

    try {
        // Look up the user in the database by username
        const result = await pool.query(
            'SELECT * FROM Users WHERE username = $1',
            [username]
        );
        
        const user = result.rows[0];
        
        // If user is not found
        if (!user) {
            return res.status(400).json({ error: 'User not found' });
        }

        // Compare the password with the hashed password
        const isMatch = await bcrypt.compare(password, user.password_hash);
        console.log("Password match result:", isMatch);
        if (isMatch) {
            return res.status(200).json({ message: 'Login successful!', ok: true, userID: user.user_id });
        } else {
            return res.status(400).json({ error: 'Invalid username or password' });
        }
    } catch (err) {
        console.error("Error in login route:", err);
        return res.status(500).json({ error: 'Server Error' });
    }
});

module.exports = router;