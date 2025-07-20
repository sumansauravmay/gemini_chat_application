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

| Area            | Tech                         |
|-----------------|------------------------------|
| Backend         | Node.js + Express            |
| Database        | PostgreSQL                   |
| Queue System    | Redis Queue / BullMQ         |
| Caching         | Redis / Node-cache           |
| Auth            | JWT + Custom OTP system      |
| Payment         | Stripe (sandbox)             |
| External API    | Google Gemini API            |
| Deployment      | Render / Railway / EC2       |

---

## 🧱 System Architecture

User ↔️ Auth API (OTP/JWT) ↔️ Chatroom Service ↔️ Redis Queue ↔️ Gemini API
↘️ PostgreSQL
Stripe ↔️ Webhook Listener ↔️ Subscription Manager

---

## 📦 Project Setup

1. **Clone the Repo**

```bash
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



