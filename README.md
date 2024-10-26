

# **Calendar App**

A simple, intuitive calendar application that allows users to create, view, edit, and delete personal events. This project is built using the MERN stack (MongoDB, Express, React, Node.js) with PostgreSQL as the database and deployed on Netlify (frontend) and Render (backend). It includes user authentication via Firebase/Auth0, responsive styling with Tailwind CSS, and secure token-based authentication for API access.

### **Features**
- **User Authentication**: Allows secure login using Firebase/Auth0.
- **Create Events**: Users can add events with details like title, date & time, and description.
- **Edit & Delete Events**: Edit or remove existing events with ease.
- **View Events**: See events in a list or calendar view.
- **Responsive UI**: Built with Tailwind CSS for a clean, mobile-friendly interface.

---

## **Table of Contents**

1. [Demo](#demo)
2. [Tech Stack](#tech-stack)
3. [Architecture](#architecture)
4. [Getting Started](#getting-started)
5. [Backend Setup](#backend-setup)
6. [Frontend Setup](#frontend-setup)
7. [Deployment](#deployment)
8. [Environment Variables](#environment-variables)
9. [API Documentation](#api-documentation)

---

## **Demo**
[Live Demo of Calendar App](https://yourapp.netlify.app)

---

## **Tech Stack**
- **Frontend**: React, Context API, Tailwind CSS, Firebase/Auth0 (for authentication)
- **Backend**: Node.js, Express, PostgreSQL, Sequelize ORM
- **Database**: PostgreSQL
- **Deployment**: Netlify (Frontend), Render (Backend)

---

## **Architecture**

This project is organized into two main folders:
- `frontend/`: Contains the React frontend, built with Tailwind CSS and deployed on Netlify.
- `backend/`: Contains the Express backend API, using PostgreSQL for data storage and hosted on Render.

### **File Structure**

```
calendar-app/
├── backend/
│   ├── config/                # Database and environment configuration
│   ├── controllers/           # Logic for CRUD operations on events
│   ├── middleware/            # JWT authentication middleware
│   ├── models/                # Sequelize models
│   ├── routes/                # API route definitions
│   └── server.js              # Entry point for Express server
└── frontend/
    ├── components/            # Reusable UI components (Calendar, EventForm, EventList)
    ├── context/               # Event context API for state management
    ├── hooks/                 # Custom hooks for authentication
    ├── pages/                 # Pages like Home and Login
    ├── services/              # Axios API instance
    └── App.js                 # Main component with routing
```

---

## **Getting Started**

### **Prerequisites**
- Node.js and npm installed
- PostgreSQL database set up locally or on a managed server

---

## **Backend Setup**

1. **Install Dependencies**:
   ```bash
   cd backend
   npm install
   ```
2. **Set Up Environment Variables**: Create a `.env` file in the `backend/` folder:
   ```plaintext
   DATABASE_URL=your_postgresql_url
   JWT_SECRET=your_jwt_secret
   ```
3. **Run the Server**:
   ```bash
   npm run dev
   ```

---

## **Frontend Setup**

1. **Install Dependencies**:
   ```bash
   cd frontend
   npm install
   ```
2. **Configure Environment Variables**: Create a `.env` file in `frontend/` folder:
   ```plaintext
   REACT_APP_API_BASE_URL=https://your-backend-api.onrender.com
   ```
3. **Start the Frontend**:
   ```bash
   npm start
   ```

---

## **Deployment**

### **Frontend (Netlify)**
1. Push your code to GitHub or a similar version control.
2. Connect the repository to Netlify, and set `REACT_APP_API_BASE_URL` in Netlify's environment variables.

### **Backend (Render)**
1. Deploy the backend by linking your GitHub repo to Render.
2. Configure environment variables (e.g., `DATABASE_URL`, `JWT_SECRET`) in Render’s settings.

---

## **Environment Variables**

### Backend:
- `DATABASE_URL`: Connection URL for PostgreSQL.
- `JWT_SECRET`: Secret key for JWT token encryption.

### Frontend:
- `REACT_APP_API_BASE_URL`: The base URL for the backend API.

---

## **API Documentation**

### **Authentication**
- **POST** `/auth/login` - Authenticates user and returns a JWT token.

### **Events**
- **GET** `/events` - Retrieves the list of events for the authenticated user.
- **POST** `/events` - Creates a new event.
- **PUT** `/events/:id` - Updates an existing event.
- **DELETE** `/events/:id` - Deletes an event.

Each request to `/events` routes requires a valid JWT token in the Authorization header.

---

## **Future Enhancements**
- Add reminder notifications for events
- Implement recurring events
- Add color coding and categorization for events

---

## **License**
This project is licensed under the MIT License.

---
