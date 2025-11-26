# 🔗 URL Shortener API  
_A simple idea → turned into my first real backend project._

This is a backend API similar to **Bitly** or **TinyURL**.  
You send a long URL → it returns a short link.  
Simple, fast, and fully working online.

---

## 🚀 Live API  
You can test it without installing anything.

**Base URL:**  
`https://r-url-shortener-api.onrender.com`

---

## 📌 What This API Can Do

- Shortens long URLs into 6-character codes  
- Redirects users to the original URL  
- Tracks how many times a short link is clicked  
- Shows stats: original URL + click count  
- Includes a health/status check route

---

## 🔄 How It Works (Simple Flow)

| Step | You Do | API Response |
|------|--------|--------------|
| 1️⃣ | Send a long URL | Returns a short URL |
| 2️⃣ | Open the short link | Redirects to original URL |
| 3️⃣ | Check stats | Returns click count + URL |

---

### ✅ 1. Create a Short URL

**POST** `/api/url`  
**Body:**
```json
{
  "longUrl": "https://www.facebook.com"
}
```

**Response:**
```json
{
  "shortUrl": "https://r-url-shortener-api.onrender.com/a1b2c3"
}
```

---

### ✅ 2. Redirect to Original URL

Open this in a browser:  
```
https://r-url-shortener-api.onrender.com/a1b2c3
```

Redirects to:  
```
https://www.facebook.com
```

---

### ✅ 3. Get URL Stats

**GET** `/api/stats/a1b2c3`  
**Response:**
```json
{
  "longUrl": "https://www.facebook.com",
  "clickCount": 4
}
```

---

### ✅ 4. API Health Check

**GET** `/health`  
**Response:**
```json
{
  "status": "API is healthy",
  "db": "connected"
}
```

---

## ⚙️ Tech Stack

| Layer     | Technology          |
|-----------|----------------------|
| Backend   | Node.js + Express    |
| Database  | MongoDB + Mongoose   |
| Deployment| Render               |

---

## 💻 Run Locally (Setup Guide)

### 1. Clone the Repository
```bash
git clone https://github.com/YOUR_USERNAME/url-shortener-api.git
cd url-shortener-api
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Add Environment Variables  
Create a `.env` file in the project root:
```
MONGO_URI=your_mongodb_connection_string
```

### 4. Start the Server
```bash
node index.js
```

App runs on:  
`http://localhost:8082`

---

## 📁 API Endpoints Summary

| Method | Route                        | Description                    |
|--------|-------------------------------|--------------------------------|
| POST   | `/api/url`                   | Create a short URL             |
| GET    | `/:shortCode`                | Redirect to original URL       |
| GET    | `/api/stats/:shortCode`      | Get URL details + click count  |
| GET    | `/health`                    | Check API and database status  |

---

## 👨‍💻 About This Project

This is **my first backend project**.  
I built it to learn and understand:  
- How REST APIs work  
- How to connect Node.js with MongoDB  
- How to deploy APIs online  
- How URL shorteners work behind the scenes

