# Book Exchange Portal (MERN)

This repository contains a full-stack book exchange system built using the MERN (MongoDB, Express, React, Node.js) stack. The application allows users to register, log in, view books, add books, request books, and manage book-related transactions.

## Features

- **User Authentication**: Register, log in, and log out functionality.
- **Book Management**: View all available books and add new books.
- **Book Requests**: Users can request books from other users and manage incoming book requests.
- **Request Tracking**: Track both outgoing and incoming book requests.
- **Search and Filter**: Filter books using a search bar with selectable criteria (e.g., title, author, ISIN).

## Technologies Used

### Backend (Server)
- **Node.js**: JavaScript runtime for building the backend.
- **Express.js**: Web framework for handling HTTP requests.
- **MongoDB**: NoSQL database for data storage.
- **Mongoose**: ODM for MongoDB.
- **JWT (JSON Web Token)**: Used for secure user authentication.
- **bcrypt.js**: Library for password hashing.

### Frontend (Client)
- **React.js**: JavaScript library for building user interfaces.
- **Axios**: HTTP client for making API calls.
- **React Router**: Library for navigation between pages.


## Setup Instructions

### Prerequisites

- **Node.js**: Ensure Node.js is installed. [Download here](https://nodejs.org/)
- **MongoDB**: Ensure MongoDB is installed and running locally or use a cloud service (e.g., MongoDB Atlas).

### Backend Setup

1. Navigate to the `server` folder:

```bash
   cd server
```

2. Install dependencies:

```bash
    npm install
```

3. Create a .env file in the server directory with the following variables:

```bash
    MONGO_URI=your_mongo_db_connection_string
    JWT_SECRET=your_jwt_secret
```

4. Start the server:

```bash
    node app.js
```

### FrontEnd Setup

1. Navigate to the `client` folder:

```bash
   cd client
```

2. Install dependencies:

```bash
    npm install
```

4. Start the server:

```bash
    npm run start
```

### Running the Application

Backend will run on http://localhost:8000.
Frontend will run on http://localhost:3000.

Make sure the backend server is running before accessing the frontend.

## Usage

- Register a new user or log in with an existing account.
- View the list of available books on the main page.
- Add new books using the "Add Book" page.
- Request to borrow books from other users.
- Track your outgoing and incoming book requests on the relevant pages.
