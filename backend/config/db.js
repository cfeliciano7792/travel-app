// Handle Database Connection

// Create connection
const { Pool } = require('pg');

const pool = new Pool({
    user: 'cs467',
    host: 'localhost',
    database: 'travel_planner_db',
    password: 'cs467',
    port: 5432,
});

module.exports = pool;
