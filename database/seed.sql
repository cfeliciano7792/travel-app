-- Use this file to create and insert sample data to test the database

-- Insert sample users
INSERT INTO Users (username, email, password_hash, profile_picture, bio)
VALUES 
('traveler1', 'traveler1@example.com', 'hashed_password1', 'https://example.com/pic1.jpg', 'I love traveling!'),
('traveler2', 'traveler2@example.com', 'hashed_password2', 'https://example.com/pic2.jpg', 'Adventure seeker!');

-- Insert sample trips
INSERT INTO Trips (user_id, title)
VALUES 
(1, 'Summer Road Trip'),
(2, 'Winter Adventure');

-- Insert sample experiences
INSERT INTO Experiences (user_id, title, description, photos, rating)
VALUES 
(1, 'Hiking in Yosemite', 'A scenic hike in Yosemite National Park', '["https://example.com/photo1.jpg", "https://example.com/photo2.jpg"]'::jsonb, 4.5),
(2, 'Exploring the Rockies', 'An adventurous trek in the Rockies', '["https://example.com/photo3.jpg", "https://example.com/photo4.jpg"]'::jsonb, 4.8);

-- Insert sample ratings
INSERT INTO Ratings (experience_id, user_id, rating_value, review)
VALUES 
(1, 1, 5, 'Incredible experience!'),
(2, 2, 4, 'Beautiful scenery, would recommend!');
