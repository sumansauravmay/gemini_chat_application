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




