## API Documentation

### Base URL
The base URL for all API requests is `http://localhost:5000`.

### Endpoints

#### 1. Get All Users (Optional, for Testing or Admin Use)
- **URL**: `/api/users`
- **Method**: `GET`
- **Description**: Returns a list of all registered users.
- **Response**:
    ```json
    [
      { "username": "user1", "email": "user1@example.com", "profile_picture": "link_to_image", "bio": "Bio info" },
      { "username": "user2", "email": "user2@example.com", "profile_picture": "link_to_image", "bio": "Bio info" }
    ]
    ```

#### 2. Register a New User
- **URL**: `/api/register`
- **Method**: `POST`
- **Description**: Registers a new user with a hashed password.
- **Request Body**:
    ```json
    {
      "username": "OSU",
      "password": "password",
      "email": "osu@example.com",
      "profile_picture": "link_to_image",
      "bio": "Oregon State University"
    }
    ```
- **Response**:
  - **201**: User created successfully.
  - **500**: Server error.

#### 3. Login
- **URL**: `/api/login`
- **Method**: `POST`
- **Description**: Authenticates a user by verifying the provided password.
- **Request Body**:
    ```json
    {
      "username": "OSU",
      "password": "password"
    }
    ```
- **Response**:
  - **200**: `Login Successful!`
  - **400**: `User not found` or `Login Failed` (for incorrect password).
  - **500**: Server error.

### Example Requests

#### Register a User Example

```http
POST http://localhost:5000/api/register
Content-Type: application/json


{
    "username": "Benny",
    "password": "password",
    "email": "benny@example.com",
    "profile_picture": "link_to_image",
    "bio": "OSU Mascot"
}
```