# Blog Application

A full-stack blog application built using **Node.js**, **Express**, **MongoDB Atlas**, **React**, and **Material UI**. This application allows users to sign up, log in, create, edit, delete, and manage blogs. Blogs can be set as **public** or **private**, and users can only view or edit their own posts unless they have access to a public post.

## Features

- **User Authentication:**
  - User login and registration with JWT (JSON Web Tokens).
  - Secure password handling using bcrypt.
  
- **Blog Management:**
  - Create, read, update, and delete blog posts.
  - Option to set blogs as **public** or **private**.
  - Blogs can be filtered by author, category, or tags.

- **User Profile:**
  - View and update user profile details (email, username).
  
- **Responsive Design:**
  - Clean and responsive UI using **Material-UI (MUI)**.

- **Real-time Updates:**
  - Use **Socket.io** for real-time notifications when a blog is updated or commented on.

- **Search and Filter:**
  - Search and filter blogs based on tags, category, and author.

## Tech Stack

- **Backend:** 
  - Node.js
  - Express.js
  - MongoDB Atlas (NoSQL Database)
  
- **Frontend:**
  - React.js
  - Material UI (MUI)

- **Authentication:** 
  - JWT (JSON Web Tokens) for secure authentication
  
- **Real-time Communication:**
  - Socket.io for real-time updates

## Getting Started

To get started with this project, follow the steps below:

### Prerequisites

- **Node.js** (version 14.x or higher)
- **MongoDB Atlas** account for cloud database
- A code editor (like **VS Code**)

### Installation

1. Clone the repository:

    ```bash
    git clone https://github.com/yourusername/blog-app.git
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
    npm install
    ```

### Configuration

1. Create a `.env` file in the **backend** directory and add the following environment variables:

    ```bash
    PORT=5000
    MONGO_URI=your_mongo_atlas_connection_string
    JWT_SECRET=your_jwt_secret_key
    ```

2. For the **frontend**, you may need to configure the API base URL to point to your backend server. This can be done in the **frontend/src/api.js** file.

### Running the Application

1. Run the backend server:

    ```bash
    cd backend
    npm start
    ```

2. Run the frontend React app:

    ```bash
    cd frontend
    npm start
    ```

### Usage

- After logging in or signing up, users can:
  - Create new blogs with options for setting them as **public** or **private**.
  - Edit, update, or delete their existing blogs.
  - View blogs from other users if they are set as **public**.
  
### License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

Feel free to contribute to this project by forking the repository, submitting issues, or sending pull requests. For any questions or suggestions, feel free to open an issue.

