## API Documentation

### Base URL
The base URL for all API requests is `http://localhost:3000`.

### Endpoints

#### 1. Get All Users
- **URL**: `/users`
- **Method**: `GET`
- **Description**: Returns a list of all registered users.
- **Response**:
    ```json
    [
      { "name": "user1", "password": "hashedPassword1" },
      { "name": "user2", "password": "hashedPassword2" }
    ]
    ```

#### 2. Sign Up
- **URL**: `/signup`
- **Method**: `POST`
- **Description**: Registers a new user with a hashed password.
- **Request Body**:
    ```json
    {
      "name": "username",
      "password": "userpassword"
    }
    ```
- **Response**:
  - **201**: User created successfully.
  - **500**: Server error.

#### 3. Login
- **URL**: `/login`
- **Method**: `POST`
- **Description**: Authenticates a user by verifying the provided password.
- **Request Body**:
    ```json
    {
      "name": "username",
      "password": "userpassword"
    }
    ```
- **Response**:
  - **200**: `Login Successful!`
  - **400**: `User not found`
  - **500**: Server error.