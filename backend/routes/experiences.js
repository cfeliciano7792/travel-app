// Example API route for handling Experiences

const multer = require("multer");
const path = require("path");
const fs = require("fs");
const express = require('express');
const router = express.Router();
const pool = require('../config/db');

const uploadDir = path.join(__dirname, "../uploads/");
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        console.log(`File destination path: ${uploadDir}`);
        cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + "-" + file.originalname)
      },
});

const uploadStorage = multer({ storage: storage })

router.post("/uploads", uploadStorage.single("file"), (req, res) => {
    if (!req.file) {
        return res.status(400).send("No file uploaded.");
    }
    const filePath = `/uploads/${req.file.filename}`;
    res.status(200).json({ filePath });
});
// Get all experiences
router.get('/', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM Experiences');
        // Return all experiences
        res.json(result.rows);
    } catch (err) {
        console.error('Error in GET /api/experiences:', err);
        res.status(500).send('Server Error - Get');
    }
});

// Add a new experience
router.post('/', async (req, res) => {
    const { user_id, title, description, photos, location_coordinates, rating, upvotes, downvotes } = req.body;

    try {
        const result = await pool.query(
            `INSERT INTO Experiences (
                user_id,
                title,
                description,
                photos,
                location_coordinates,
                rating,
                upvotes,
                downvotes
             ) VALUES (
                $1,
                $2,
                $3,
                COALESCE($4::jsonb, '[]'::jsonb),
                $5,
                $6,
                COALESCE($7, 0),
                COALESCE($8, 0)
             ) RETURNING *`,
            [
                user_id,
                title,
                description || null,
                photos ? JSON.stringify(photos) : null,
                location_coordinates || null,
                rating || null,
                upvotes,
                downvotes,
            ]
        );
        res.status(201).json(result.rows[0]);
    } catch (err) {
        console.error('Error in POST /api/experiences:', err);
        res.status(500).send('Server Error - Post');
    }
});

// Route to increment upvote by 1 for a specified experience_id
router.post('/:id/upvote', async (req, res) => {
    const { id } = req.params;

    try {
        const result = await pool.query(
            `UPDATE Experiences
             SET upvotes = upvotes + 1
             WHERE experience_id = $1
             RETURNING *`,
            [id]
        );

        if (result.rowCount === 0) {
            return res.status(404).json({ message: 'Experience not found' });
        }

        res.json(result.rows[0]);
    } catch (err) {
        console.error('Error in POST /api/experiences/:id/upvote:', err);
        res.status(500).send('Server Error - Upvote');
    }
});

// Route to increment downvote by 1 for a specified experience_id
router.post('/:id/downvote', async (req, res) => {
    const { id } = req.params;

    try {
        const result = await pool.query(
            `UPDATE Experiences
             SET downvotes = downvotes + 1
             WHERE experience_id = $1
             RETURNING *`,
            [id]
        );

        if (result.rowCount === 0) {
            return res.status(404).json({ message: 'Experience not found' });
        }

        res.json(result.rows[0]);
    } catch (err) {
        console.error('Error in POST /api/experiences/:id/downvote:', err);
        res.status(500).send('Server Error - Downvote');
    }
});

// Update an experience
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { user_id, title, description, photos, location_coordinates, rating, upvotes, downvotes } = req.body;

    try {
        const result = await pool.query(
            `UPDATE Experiences
             SET user_id = COALESCE($1, user_id),
                 title = COALESCE($2, title),
                 description = COALESCE($3, description),
                 photos = COALESCE($4::jsonb, photos),
                 location_coordinates = COALESCE($5, location_coordinates),
                 rating = COALESCE($6, rating),
                 upvotes = COALESCE($7, upvotes),
                 downvotes = COALESCE($8, downvotes)
             WHERE experience_id = $9
             RETURNING *`,
            [
                user_id || null,
                title || null,
                description || null,
                photos ? JSON.stringify(photos) : null, // Convert photos array to JSON string
                location_coordinates || null,
                rating || null,
                upvotes || null,
                downvotes || null,
                id,
            ]
        );

        if (result.rowCount === 0) {
            return res.status(404).json({ message: 'Experience not found' });
        }

        res.json(result.rows[0]);
    } catch (err) {
        console.error('Error in PUT /api/experiences/:id:', err);
        res.status(500).send('Server Error - Update');
    }
});

// Delete an experience
router.delete('/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const result = await pool.query(
            'DELETE FROM Experiences WHERE experience_id = $1 RETURNING *',
            [id]
        );

        if (result.rowCount === 0) {
            return res.status(404).json({ message: 'Experience not found' });
        }

        res.json({ message: 'Experience deleted', experience: result.rows[0] });
    } catch (err) {
        console.error('Error in DELETE /api/experiences/:id:', err);
        res.status(500).send('Server Error - Delete');
    }
});

// Search or filter experiences (partial/case-insensitive)
// Works for title and ratings (min or max)
router.get('/search', async (req, res) => {
    // Query parameters
    const { title, minRating, maxRating } = req.query;
    const filters = [];
    const values = [];

    // Add title filter if present in query
    if (title) {
        filters.push(`title ILIKE $${filters.length + 1}`);
        values.push(`%${title}%`);
    }

    // Add rating filter if present in query
    if (minRating) {
        filters.push(`rating >= $${filters.length + 1}`);
        values.push(minRating);
    }

    if (maxRating) {
        filters.push(`rating <= $${filters.length + 1}`);
        values.push(maxRating);
    }

    const whereClause = filters.length > 0 ? `WHERE ${filters.join(' AND ')}` : '';

    try {
        const query = `SELECT * FROM Experiences ${whereClause}`;
        const result = await pool.query(query, values);
        if (result.rowCount === 0) {
            return res.status(404).json({ message: 'No experiences found' });
        }
        res.json(result.rows);
    } catch (err) {
        console.error('Error in GET /api/experiences/search:', err);
        res.status(500).send('Server Error - Search');
    }
});

module.exports = router;
