# 🏫 School Management API

A proximity-based school directory API system built using Node.js, Express, and MySQL. It allows users to register new schools with exact geographical coordinates and search for schools sorted by distance from their current location using the **Haversine Formula**.

---

## 🚀 Tech Stack
* **Runtime:** Node.js
* **Framework:** Express.js
* **Database:** MySQL
* **DB Client:** `mysql2/promise` (Connection pool with Async/Await)
* **Configurations:** Dotenv, CORS, Nodemon (Development)

---

## 📂 Project Structure
```text
backend/
├── src/
│   ├── config/db.js          # MySQL connection pool configuration
│   ├── controllers/          # Business logic handlers (addSchool, listSchools)
│   ├── routes/               # API endpoint routing
│   ├── utils/distance.js     # Mathematical engine (Haversine formula)
│   └── server.js             # Main server bootstrap file
├── .env                      # Local environment configurations (ignored in git)
├── .gitignore                # Safeguards node_modules and secret credentials
├── package.json              # Script runners and dependencies list
└── README.md                 # Project documentation
```

---

## 🛠️ Getting Started & Local Setup

### 1. Database Setup
Log in to your MySQL server (via MySQL Workbench or terminal) and execute this query to set up the database and table:

```sql
CREATE DATABASE school_management_db;
USE school_management_db;

CREATE TABLE school (
    id INT AUTO_INCREMENT PRIMARY KEY,
    school_name VARCHAR(255) NOT NULL UNIQUE,
    school_address VARCHAR(255) NOT NULL,
    school_latitude DECIMAL(10, 8) NOT NULL,
    school_longitude DECIMAL(11, 8) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### 2. Configure Environment Variables
Create a `.env` file in the root `backend/` directory:
```env
PORT=7000
DATABASE_HOST=localhost
DATABASE_USER=your_mysql_username
DATABASE_NAME=school_management_db
```
*(⚠️ Replace `your_mysql_username` with your local MySQL username).*

### 3. Install & Run
```bash
# Navigate to backend folder
cd backend

# Install dependencies
npm install

# Run in development mode
npm run dev
```

---

## 📡 API Documentation & Examples

### 1. Add School
* **Endpoint:** `POST /api/schools/addSchool`
* **Content-Type:** `application/json`
* **Request Payload:**
```json
{
    "name": "Modern School, Barakhamba Road",
    "address": "Barakhamba Rd, Todermal Road Area, Mandi House",
    "latitude": 28.6295,
    "longitude": 77.2284
}
```
* **Response (201 Created):**
```json
{
    "status": "success",
    "message": "School added successfully!",
    "data": {
        "id": 1,
        "name": "Modern School, Barakhamba Road",
        "address": "Barakhamba Rd, Todermal Road Area, Mandi House",
        "latitude": 28.6295,
        "longitude": 77.2284
    }
}
```

### 2. List Schools (Sorted by Proximity)
* **Endpoint:** `GET /api/schools/listSchools`
* **Query Parameters:** `lat` (User Latitude), `long` (User Longitude)
* **Example URL:** `http://localhost:7000/api/schools/listSchools?lat=28.6304&long=77.2177`
* **Response (200 OK):**
```json
{
    "status": "success",
    "message": "Schools fetched successfully!",
    "results": 1,
    "data": [
        {
            "id": 1,
            "school_name": "Modern School, Barakhamba Road",
            "school_address": "Barakhamba Rd, Todermal Road Area, Mandi House",
            "school_latitude": "28.62950000",
            "school_longitude": "77.22840000",
            "distance": 1.05
        }
    ]
}
```
