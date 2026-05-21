# Internshala

A modern, premium internship discovery platform built with the MERN stack (MongoDB, Express, React, Node.js). 
This application features a state-of-the-art UI/UX, advanced filtering systems, and dedicated dashboards for students and employers.

## 🚀 Features

- **Premium UI/UX:** Built with Tailwind CSS, featuring glassmorphism, gradient accents, and dark mode (Carbon Theme).
- **Advanced Search & Filtering:** Dynamic, scrollable checkbox filters for Location and Profile, with radio group selections for Duration and Stipend.
- **Dual Dashboards:** 
  - **Student Dashboard:** Track applied internships and statuses.
  - **Employer Dashboard:** Publish new internship listings and review received applications.
- **Role-based Authentication:** Secure JWT authentication for students and admins/employers.

## 🛠️ Tech Stack

- **Frontend:** React (Vite), Tailwind CSS, React Router DOM, React Icons, Axios
- **Backend:** Node.js, Express, MongoDB (Mongoose), JWT, bcryptjs
- **Scraping (Backend):** Puppeteer, Cheerio (for fetching live internship data)

## 📦 Installation & Setup

1. **Clone the repository:**
   ```bash
   git clone https://github.com/bhatiadev884-hue/intern.git
   cd intern
   ```

2. **Install Frontend Dependencies:**
   ```bash
   npm install
   ```

3. **Install Backend Dependencies:**
   ```bash
   cd backend
   npm install
   ```

4. **Environment Variables:**
   Create a `.env` file in the `backend` folder and add the following:
   ```env
   PORT=5000
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret_key
   ```

## 🏃‍♂️ Running the Application

You will need to run both the frontend and backend servers simultaneously.

**Start the Backend Server (from the /backend directory):**
```bash
npm start
# or for development:
npm run dev
```

**Start the Frontend Server (from the root directory):**
```bash
npm run dev
```

The frontend will be running on `http://localhost:5173` and the backend API on `http://localhost:5000`.

## 🚀 Deployment Guide

**1. Deploying the Frontend (Vercel):**
This project includes a `vercel.json` file to handle React Router redirects. 
Simply import your GitHub repository into Vercel. Vercel will automatically detect that it is a Vite project and deploy it.

**2. Deploying the Backend (Render / Heroku):**
- Import the `backend` folder as a Web Service on Render.
- Set the Build Command to `npm install`.
- Set the Start Command to `node server.js`.
- Add your `MONGO_URI` and `JWT_SECRET` as Environment Variables.

*Note: Once your backend is deployed, you will need to update the API base URL in your frontend code (e.g. replacing `http://localhost:5000` with your new deployed backend URL) before deploying the frontend.*

## 🤝 Demo Accounts

- **Student:** `student@internshala.com` / `password`
- **Employer:** `admin@internshala.com` / `password`
