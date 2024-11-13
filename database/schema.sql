-- Create tables needed for Travel Planner

-- Users table
CREATE TABLE IF NOT EXISTS Users (
    user_id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    profile_picture TEXT,
    bio TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Trips table
CREATE TABLE IF NOT EXISTS Trips (
    trip_id SERIAL PRIMARY KEY,
    user_id INT REFERENCES Users(user_id) ON DELETE CASCADE,
    title VARCHAR(150) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Experiences table
CREATE TABLE IF NOT EXISTS Experiences (
    experience_id SERIAL PRIMARY KEY,
    user_id INT REFERENCES Users(user_id) ON DELETE CASCADE,
    title VARCHAR(150) NOT NULL CHECK (CHAR_LENGTH(title) > 0),
    description TEXT,
    photos JSONB,
    rating NUMERIC(3, 2) CHECK (rating >= 1 AND rating <= 5),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- TripExperiences table to associate experiences with trips
CREATE TABLE IF NOT EXISTS TripExperiences (
    trip_experience_id SERIAL PRIMARY KEY,
    trip_id INT REFERENCES Trips(trip_id) ON DELETE CASCADE,
    experience_id INT REFERENCES Experiences(experience_id) ON DELETE CASCADE
);
