// Import required modules
const express = require('express');
const bcrypt = require('bcrypt');
const fetch = require('node-fetch'); // Needed to make internal API requests if necessary
const router = express.Router();

// POST route for signing up a new user
router.post('/', async (req, res) => {
    const { username, email, password, profile_picture, bio } = req.body;

    try {
        // Generate a hashed password
        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(password, salt);

        // Prepare user data for the users endpoint
        const userPayload = {
            username,
            email,
            password_hash: hashedPassword,
            profile_picture,
            bio,
        };

        // Send the data to the /api/users endpoint
        const response = await fetch('https://travel-app-server-fkh8.onrender.com/api/users', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(userPayload),
        });

        // Check response from /api/users
        if (!response.ok) throw new Error("Error creating user");

        // Send response back to client
        res.status(201).json(await response.json());
    } catch (err) {
        console.error("Error in signup route:", err);
        res.status(500).send("Server Error");
    }
});

module.exports = router;