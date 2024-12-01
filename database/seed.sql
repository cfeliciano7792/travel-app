-- Use this file to create and insert sample data into the database
-- Query one at a time

-- Insert sample users
INSERT INTO Users (username, email, password_hash, profile_picture, bio)
VALUES 
('Mike Mic', 'Mike@gmail.com', '@idkai#4555', 'https://example.com/pic1.jpg', 'I love traveling!'),
('Ben Joe', 'BJoe@gmail.com', 'p@ssw0rd', 'https://example.com/pic2.jpg', 'Adventure seeker!'),
('Kent Clark', 'KClark@gmail.com', 'I@msUperMAN!', 'https://example.com/pic3.jpg', 'Nature enthusiast!');

-- Insert sample trips
INSERT INTO Trips (user_id, title, description, trip_date)
VALUES 
(1, 'Summer Road Trip', 'A journey through the western United States visiting major national parks.', '2025-06-15'),
(2, 'Winter Adventure', 'A thrilling ski trip to the Rocky Mountains.', '2025-12-20'),
(3, 'European Tour', 'A cultural and historical tour of Europe, including France, Italy, and Germany.', '2025-04-10');

-- Insert sample experiences
INSERT INTO Experiences (user_id, title, description, photos, location_coordinates, rating)
VALUES 
(1, 'Hiking in Yosemite', 'A scenic hike in Yosemite National Park with breathtaking views and wildlife.', 
    '["https://example.com/photo1.jpg", "https://example.com/photo2.jpg"]'::jsonb, '(37.8651, -119.5383)', 4.5),
(2, 'Exploring the Rockies', 'An adventurous trek through the Rockies, filled with snow and amazing landscapes.', 
    '["https://example.com/photo3.jpg", "https://example.com/photo4.jpg"]'::jsonb, '(39.5501, -105.7821)', 4.8),
(3, 'Venice Canal Tour', 'A peaceful boat ride through the iconic canals of Venice with great local stories.', 
    '["https://example.com/photo5.jpg", "https://example.com/photo6.jpg"]'::jsonb, '(45.4408, 12.3155)', 4.9);

-- Insert sample trip-experience associations
INSERT INTO TripExperiences (trip_id, experience_id)
VALUES 
(1, 1),
(2, 2),
(3, 3),
(1, 3);
