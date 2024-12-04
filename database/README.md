# Travel Planner App - Database Setup

PostgreSQL Cloud Database Credentials:
```bash
port: 5432
username: cs467
password: LIgMhiHaoZi4oXO9G19GtpwisBumHwCS
host: dpg-csp82ol6l47c73epvjg0-a.virginia-postgres.render.com
database: travel_planner_db_hoi8
```

## Prerequisites

- Install pgAdmin (optional) for a GUI tool to manage the database.
https://www.postgresql.org/ftp/pgadmin/pgadmin4/v8.12/windows/
- Ensure Node.js and npm are installed.
- Install dotenv package if not already done for loading environment variables:
```bash
npm install dotenv
```

## .env File Configuration
- You will need to create a ".env" file in the backend folder of the project with the following content:
```bash
DB_USER="cs467"
DB_HOST="dpg-csp82ol6l47c73epvjg0-a.virginia-postgres.render.com"
DB_DATABASE="travel_planner_db_hoi8"
DB_PASSWORD="LIgMhiHaoZi4oXO9G19GtpwisBumHwCS"
DB_PORT=5432
NODE_ENV=development
PORT=5000
```
Note: The ".env" file should also be added to the .gitignore in the backend folder to prevent pushing it on GIT.

## Database Connection Setup in pgAdmin (Optional but Recommended)

1. Open pgAdmin and create a new server connection:

    - Name: Render Travel Planner
    - Host name/address: dpg-csp82ol6l47c73epvjg0-a.virginia-postgres.render.com
    - Port: 5432
    - Username: cs467
    - Password: LIgMhiHaoZi4oXO9G19GtpwisBumHwCS
    - Database: travel_planner_db_hoi8
    - SSL Mode: If required, set to Require or Verify CA.

2. Test the connection to ensure pgAdmin connects successfully.

## Running and Testing the Local server

1) Start the local server:

First navigate to the backend folder of the project and run:
```bash
node server.js
```

Make sure that the server starts without and errors. You should see a message like:
```bash
Server is running on port 5000
```

2) Test API Endpoints

- Use Postman or in the web browser directly to test API endpoints locally.
- Example: To get all users, make a GET request to:
```bash
http://localhost:5000/api/users
```

## Notes

- Ensure your .env file is set up correctly before starting the server.
- If you encounter connection issues, double-check the credentials and SSL settings in pgAdmin and your .env file.
