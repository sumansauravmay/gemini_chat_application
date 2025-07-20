# 🚀 Gemini Backend Clone – Kuvaka Tech

A full-featured backend system built using **Node.js**, **PostgreSQL**, and **Stripe**, designed to replicate a Gemini-style chat platform. Includes OTP-based authentication, Gemini AI chatrooms, subscription handling, and more.

---

## 📌 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [System Architecture](#system-architecture)
- [Project Setup](#project-setup)
- [API Overview](#api-overview)
- [Queue System](#queue-system)
- [Caching](#caching)
- [Testing with Postman](#testing-with-postman)
- [Deployment](#deployment)
- [Design Decisions & Assumptions](#design-decisions--assumptions)

---

## ✅ Features

- 🔐 OTP-based login with JWT authentication
- 💬 Chatroom creation and Gemini AI conversation handling
- 🧾 Subscription plans using Stripe (Free and Pro tiers)
- 🔄 Asynchronous Gemini API call processing with Redis queue
- 🧠 Google Gemini API integration
- ⚡ Redis caching for frequently accessed routes
- 📊 Rate-limiting for Basic (Free) users

---

## 🛠 Tech Stack

| Area         | Tech                    |
| ------------ | ----------------------- |
| Backend      | Node.js + Express       |
| Database     | PostgreSQL              |
| Queue System | Redis Queue / BullMQ    |
| Caching      | Redis / Node-cache      |
| Auth         | JWT + Custom OTP system |
| Payment      | Stripe (sandbox)        |
| External API | Google Gemini API       |
| Deployment   | Render / Railway / EC2  |

---

## 🧱 System Architecture

User ↔️ Auth API (OTP/JWT) ↔️ Chatroom Service ↔️ Redis Queue ↔️ Gemini API
↘️ PostgreSQL
Stripe ↔️ Webhook Listener ↔️ Subscription Manager

---

## 📦 Project Setup

1. **Clone the Repo**

````bash
git clone https://github.com/sumansauravmay/gemini_chat_application.git
cd gemini_chat_application


2. **Install Dependencies**

```bash
npm install

Configure Environment Variables

Create a .env file:

```bash
PORT=5000
PG_USER=postgres
PG_PASSWORD=your_password
PG_HOST=localhost
PG_PORT=5432
PG_DATABASE=gemini_db

JWT_SECRET=your_jwt_secret
REDIS_URL=redis://localhost:6379

STRIPE_SECRET_KEY=your_stripe_key
STRIPE_PRO_PLAN_PRICE_ID=your_price_id

GEMINI_API_KEY=your_gemini_api_key




4. **Start Server**

```bash
npm start
````



📡 API Overview
Authentication
Method	Endpoint	Auth	Description
POST	/auth/signup	❌	Register new user
POST	/auth/send-otp	❌	Mock send OTP
POST	/auth/verify-otp	❌	Verify OTP & return JWT
POST	/auth/forgot-password	❌	Send OTP for password reset
POST	/auth/change-password	✅	Change password while logged in
GET	/user/me	✅	Get current user info
Chatroom
Method	Endpoint	Auth	Description
POST	/chatroom	✅	Create new chatroom
GET	/chatroom	✅	List all chatrooms (cached)
GET	/chatroom/:id	✅	Get a specific chatroom
POST	/chatroom/:id/message	✅	Send message to Gemini (async)
Subscriptions
Method	Endpoint	Auth	Description
POST	/subscribe/pro	✅	Start Stripe checkout
POST	/webhook/stripe	❌	Stripe webhook handler
GET	/subscription/status	✅	Check subscription tier
🧵 Queue System

    Used Redis Queue (BullMQ) for async Gemini API processing.

    When user sends a message, it's added to the queue.

    Worker picks up jobs and sends requests to Gemini API.

    Results are saved to the database and returned via polling or frontend refresh.

🧠 Gemini API Integration

    Every message sent to a chatroom is passed to the Google Gemini API.

    Handles token-based secure requests.

    Responses are stored along with message metadata.

🧊 Caching

    GET /chatroom is cached using Redis:

        Frequently accessed

        Low mutation rate

        Improves response time and reduces DB load

    Cache TTL: 10 minutes

🧪 Testing with Postman

    Use the provided Postman Collection in /postman_collection.json

    Set environment variables: JWT_TOKEN, BASE_URL

    Flow:

        /auth/signup → /auth/send-otp → /auth/verify-otp → Get JWT

        Use JWT in headers (Authorization: Bearer <token>)

        Test all chatroom, message, and subscription routes

☁️ Deployment

    Deployed on Render / Railway / EC2

    Public API URL: https://gemini-backend-clone.onrender.com

    DB: Remote PostgreSQL instance (e.g., Supabase)

    Redis: Upstash / Redis Cloud / Local instance

🧠 Design Decisions & Assumptions

    OTPs are mocked and returned in response (no SMS gateway)

    Gemini API is called asynchronously using queue to prevent timeouts

    Rate-limiting is applied via middleware for Basic tier users

    Redis used both for queue and cache for simplicity and performance

📂 Folder Structure

/src
  /allRoute
  /config
  /message
  /middlewares
  /module
  /services
  /utils
  server.js

🧾 License

MIT © [Your Name]


> ✅ You can save this as `README.md` in your root project directory.

Let me know if you'd like to:
- Convert it into PDF or `.md` file automatically
- Customize deployment URL or your name
- Auto-generate a Postman collection or `.env.example` file

Happy coding!





````
