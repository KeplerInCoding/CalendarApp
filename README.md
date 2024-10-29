
---

https://github.com/user-attachments/assets/e8e3c1d4-34dd-4ea4-87e9-65c839545f5a



# **Calendar App**

A simple and intuitive calendar application for managing personal events. Built with the MERN stack (MongoDB, Express, React, Node.js), using PostgreSQL for storage, and deployed on Netlify (frontend) and Render (backend). This application provides secure token-based authentication with Auth0 and has a responsive design implemented using Tailwind CSS.

### **Features**
- **User Authentication**: Secure login using Auth0.
- **Event Management**: Add, edit, view, and delete events with title, date & time, and description.
- **Responsive Design**: Built with Tailwind CSS for seamless experience across devices.

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
[Live Demo of Calendar App](https://mycalendarappeventmngmt.netlify.app)

---

## **Tech Stack**
- **Frontend**: React, Context API, Tailwind CSS, Auth0 (for authentication)
- **Backend**: Node.js, Express, PostgreSQL, Sequelize ORM
- **Database**: PostgreSQL
- **Deployment**: Netlify (Frontend), Render (Backend)

---

## **Architecture**

This project has two main folders:
- `frontend/`: Contains the React frontend with Tailwind styling, deployed on Netlify.
- `backend/`: Contains the Express backend API, using PostgreSQL for data and hosted on Render.

### **File Structure**

```
calendar-app/
├── backend/
│   ├── config/                # Database and environment configuration
│   ├── controllers/           # CRUD logic for events
│   ├── middleware/            # JWT authentication middleware
│   ├── models/                # Sequelize models
│   ├── routes/                # API route definitions
│   └── server.js              # Entry point for Express server
└── frontend/
    ├── components/            # UI components (Calendar, EventForm, EventList)
    ├── context/               # Context API for event state management
    ├── pages/                 # Pages like Home and Login
    ├── services/              # Axios instance for API calls
    └── App.js                 # Main component with routing
```

---

## **Getting Started**

### **Prerequisites**
- Node.js and npm installed
- PostgreSQL database (either local or hosted)

---

## **Backend Setup**

1. **Install Dependencies**:
   ```bash
   cd backend
   npm install
   ```
2. **Set Up Environment Variables**: Create a `.env` file in the `backend/` folder with:
   ```plaintext
   DATABASE_URL=your_postgresql_url
   JWT_SECRET=your_jwt_secret
   PORT=5000
   AUTH0_DOMAIN=your-auth0-domain
   ```
3. **Run the Server**:
   ```bash
   npm start
   ```

---

## **Frontend Setup**

1. **Install Dependencies**:
   ```bash
   cd frontend
   npm install
   ```
2. **Configure Environment Variables**: Create a `.env` file in `frontend/` with:
   ```plaintext
   REACT_APP_AUTH0_DOMAIN=your-auth0-domain
   REACT_APP_AUTH0_CLIENT_ID=your-client-id
   REACT_APP_API_BASE_URL=https://your-backend-api.onrender.com
   REACT_APP_AUTH0_AUDIENCE=https://your-backend-api.onrender.com/api/v1
   ```
3. **Start the Frontend**:
   ```bash
   npm start
   ```

---

## **Deployment**

### **Frontend (Netlify)**
1. Push the code to GitHub.
2. On Netlify, set up a new site linked to your GitHub repo.
3. Set the `REACT_APP_*` environment variables in Netlify’s settings.
4. Use these settings:
   - **Base Directory**: `frontend`
   - **Build Command**: `npm run build`
   - **Publish Directory**: `frontend/build`

### **Backend (Render)**
1. Link your GitHub repo to Render.
2. Set `DATABASE_URL`, `JWT_SECRET`, `AUTH0_DOMAIN`, and `PORT` environment variables.
3. Deploy the backend API.

---

## **Environment Variables**

### Backend:
- `DATABASE_URL`: PostgreSQL connection URL.
- `JWT_SECRET`: Secret key for JWT.
- `AUTH0_DOMAIN`: Auth0 domain for authentication.

### Frontend:
- `REACT_APP_API_BASE_URL`: Base URL of backend API.
- `REACT_APP_AUTH0_DOMAIN`: Auth0 domain.
- `REACT_APP_AUTH0_CLIENT_ID`: Auth0 Client ID.
- `REACT_APP_AUTH0_AUDIENCE`: Auth0 audience identifier.

---

## **API Documentation**

### **Authentication**
- **POST** `/auth/login` - Authenticates user with Auth0 and provides a JWT token.

### **Events**
- **GET** `/events` - Get list of user events.
- **POST** `/events` - Add a new event.
- **PUT** `/events/:id` - Edit an event.
- **DELETE** `/events/:id` - Delete an event.

Each request requires a valid JWT token in the `Authorization` header.

---

## **Future Enhancements**
- Add event reminders
- Implement recurring events
- Add color-coded categories for events

---

## **License**
This project is licensed under the MIT License.
