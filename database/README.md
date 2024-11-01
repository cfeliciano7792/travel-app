# Travel Planner App - Database Setup

PostgreSQL credentials:
```bash
port: 9010
username: cs467
password: cs467
```

## Prerequisites

- Install PostgreSQL on your machine.
https://www.postgresql.org/download/windows/
- Install pgAdmin (optional, for GUI access to the database).
https://www.postgresql.org/ftp/pgadmin/pgadmin4/v8.12/windows/
- Ensure Node.js and npm are installed.

## Database Setup

1. **Start PostgreSQL Service**  
   Make sure your PostgreSQL service is running.

2. **Open PostgreSQL CLI**  
   Open a terminal and connect to PostgreSQL with the following command:
   ```bash
   psql -U postgres

3. Run these commands to set up the database and user for the project:
    ```bash
    CREATE DATABASE travel_planner_db;
    CREATE USER cs467 WITH PASSWORD 'your_password';
    ALTER ROLE cs467 SET client_encoding TO 'utf8';
    ALTER ROLE cs467 SET timezone TO 'UTC';
    GRANT ALL PRIVILEGES ON DATABASE travel_planner_db TO cs467;
    ```

4. Run Schema and Seed Files:

    Exit from the psql prompt with '\q' and reconnect to the new database:
    ```bash
    psql -U cs467 -d travel_planner_db
    ```
    Then run the schema.sql and seed.sql files.
    
    If it's easier, just copy and paste the schema.sql and seed.sql files into pgAdmin. That worked best for me as directly manipulating the database in the terminal was a bit tricky.

    Verify that the tables have been populated with:
    ```bash
    SELECT * FROM Users;
    SELECT * FROM Trips;
    SELECT * FROM Experiences;
    SELECT * FROM Ratings;
    ```

## Backend Setup for database

1. Open 'backend/config/db.js' and make sure the user, password, database, and port match your local PostgreSQL setup.

2. Start the Server

```bash
node server.js
```

3. Test API Endpoints

Either use a tool like Postman or directly in the browser.

For example:
- GET all users: http://localhost:5000/api/users

## Notes

This should help everyone get the database up and running locally, but I will work to improve this setup as well as potentially migrating to an online database if that is easier and I can find a free host.
