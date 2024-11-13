-- Use this file to create and insert sample data into the database
-- Query one at a time

-- Insert sample users
INSERT INTO Users (username, email, password_hash, profile_picture, bio)
VALUES 
('traveler1', 'traveler1@example.com', 'hashed_password1', 'https://example.com/pic1.jpg', 'I love traveling!'),
('traveler2', 'traveler2@example.com', 'hashed_password2', 'https://example.com/pic2.jpg', 'Adventure seeker!'),
('traveler3', 'traveler3@example.com', 'hashed_password3', 'https://example.com/pic3.jpg', 'Nature enthusiast!');

-- Insert sample trips
INSERT INTO Trips (user_id, title)
VALUES 
(1, 'Summer Road Trip'),
(2, 'Winter Adventure'),
(3, 'European Tour');

-- Insert sample experiences
INSERT INTO Experiences (user_id, title, description, photos, rating)
VALUES 
(1, 'Hiking in Yosemite', 'A scenic hike in Yosemite National Park with breathtaking views and wildlife.', 
    '["https://example.com/photo1.jpg", "https://example.com/photo2.jpg"]'::jsonb, 4.5),
(2, 'Exploring the Rockies', 'An adventurous trek through the Rockies, filled with snow and amazing landscapes.', 
    '["https://example.com/photo3.jpg", "https://example.com/photo4.jpg"]'::jsonb, 4.8),
(3, 'Venice Canal Tour', 'A peaceful boat ride through the iconic canals of Venice with great local stories.', 
    '["https://example.com/photo5.jpg", "https://example.com/photo6.jpg"]'::jsonb, 4.9);

-- Insert sample trip-experience associations
INSERT INTO TripExperiences (trip_id, experience_id)
VALUES 
(1, 1),
(2, 2),
(3, 3),
(1, 3);
