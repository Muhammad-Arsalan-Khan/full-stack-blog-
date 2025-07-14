# Blog Application

A full-stack blog application built using **Node.js**, **Express**, **MongoDB Atlas**, **React**, and **Material UI**. This application allows users to sign up, log in, create, edit, delete, and manage blogs. Blogs can be set as **public** or **private**, and users can only view or edit their own posts unless they have access to a public post. Admins can also manage user accounts and blog posts from the admin panel.

---

## Features

### User Features:
- **User Authentication:**
  - User login and registration with **JWT (JSON Web Tokens)**.
  - Secure password handling using **bcrypt** to hash passwords before storing them in the database.
  - **Now includes Nodemailer functionality – only users who verify their email can log in.**
  
- **Blog Management:**
  - Create, read, update, and delete blog posts.
  - Option to set blogs as **public** or **private**.
  - **Like blogs**: Users can like a blog.
  - **Commit blogs**: Users can commit a blog.

- **Admin Panel:**
  - Admins can manage all users and blogs.
  - Admins can **delete any blog**.
  - Admins can **deactivate users** (set `isActive: false`), preventing them from logging in.



- **Responsive Design:**
  - Clean and responsive UI using **Material-UI (MUI)**.

### Admin Features:
- **User Management**: Admins can activate or deactivate users and view all users.
- **Blog Management**: Admins can delete any blog, regardless of the author.
  
---

## Tech Stack

- **Backend:**
  - **Node.js**: JavaScript runtime.
  - **Express.js**: Web framework for handling HTTP requests.
  - **MongoDB Atlas**: NoSQL cloud database for storing users, blogs, and related data.
  
- **Frontend:**
  - **React.js**: JavaScript library for building the user interface.
  - **Material UI (MUI)**: UI component library for React.
  - **Axios**: Promise-based HTTP client for making API requests.

- **Authentication:** 
  - **JWT (JSON Web Tokens)** for secure user authentication.
  - **bcrypt** for hashing passwords.

---

## Getting Started

To get started with this project, follow the steps below:

### Prerequisites

- **Node.js** (version 14.x or higher)
- **MongoDB Atlas** account for cloud database (or a local MongoDB instance)
- A code editor (like **VS Code**)

### Installation

1. Clone the repository:

    ```bash
    git clone https://github.com/Muhammad-Arsalan-Khan/full-stack-blog-.git
    cd blog-app
    ```

2. Install the backend dependencies:

    ```bash
    cd backend
    npm install
    ```

3. Install the frontend dependencies:

    ```bash
    cd frontend
    cd Blog-App
    npm install
    ```

### Configuration

1. Create a `.env` file in the **backend** directory and add the following environment variables:

    ```bash
    PORT=5000
    MONGO_URI=your_mongo_atlas_connection_string
    JWT_SECRET=your_jwt_secret_key
    ```

    - **MONGO_URI**: This is the connection string to your MongoDB Atlas (or local MongoDB) database.
    - **JWT_SECRET**: A secret string used for signing JWT tokens.

2. In the **frontend**, you may need to configure the **API base URL** to point to your backend server. This can be done in the **frontend/src/api.js** file.

### Running the Application

1. Run the backend server:

    ```bash
    cd backend
    npm start
    ```

    The backend will be running on `http://localhost:5000`.

2. Run the frontend React app:

    ```bash
    cd frontend
    cd Blog-App
    npm run dev
    ```

    The frontend will be running on `http://localhost:5174`.

### Usage

- **Sign up**: New users can register to create an account.
- **Login**: Users can log in using their credentials (email and password).
- After logging in, users can:
  - **Create new blogs** with options for setting them as **public** or **private**.
  - **Edit**, **update**, or **delete** their existing blogs.
  - **Like** blogs and view a list of blogs they have liked in their profile.
  - **View** public blogs created by other users.
  - **Search** for blogs based on title.
  
- **Admin Panel**:
  - Admins can view a list of all users and all blogs.
  - Admins can **deactivate users** and prevent them from logging in.
  - Admins can **delete any blog**, regardless of ownership.

---

## API Routes

### Authentication

- **POST** `/auth/signup`: Register a new user.
- **POST** `/auth/login`: Login to the application.
- **POST** `/auth/logout`: Logout from the application.

### User Management (Admin)

- **GET** `/service/admin/alluser`: Get the list of all users.
- **PUT** `/service/admin/userUpdate/:userId`: Update a user's status (Admin only).
- **DELETE** `/service/admin/deleteUser/:userId`: Delete a user (Admin only).

### Blog Management

- **GET** `/service/blogs`: Get all blogs (Public route).
- **GET** `/service/blog/:blogId`: Get a specific blog by ID.
- **POST** `/service/createblogs`: Create a new blog.
- **PUT** `/service/updateblogs/:blogId`: Update an existing blog.
- **DELETE** `/service/deleteblogs/:blogId`: Delete a blog (Admin or the blog owner).
- **PUT** `/service/likeblogs/:id`: Like a blog.

### User Status

- **PUT** `/service/admin/userUpdate/:userId`: Toggle the status of a blog between **Active** and **Not Active**.

---

## Security

- **JWT Authentication**: All requests to protected routes require a valid JWT token in the request headers.
- **Password Hashing**: User passwords are hashed using **bcrypt** before being stored in the database.
- **Cookies**: JWT tokens are stored in secure, HTTP-only cookies for session management.

---

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## Acknowledgments

- Thanks to [Material-UI](https://mui.com/) for the beautiful UI components.
- Thanks to [bcrypt](https://www.npmjs.com/package/bcrypt) and [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken) for providing the necessary security mechanisms.
- Thanks to [MongoDB](https://www.mongodb.com/) and [Mongoose](https://mongoosejs.com/) for the database management.

---

**Happy Blogging!** 🎉
