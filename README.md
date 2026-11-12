<h1 align="center"> O-API </h1>
<h2 align="center"> v0.13.0-beta </h2>
<br>
<br>

<div align="center">
<div align="center">

[![My Skills](https://skillicons.dev/icons?i=ts,nodejs,express,nestjs,mongodb,docker,redis,gitaction&theme=dark)](https://skillicons.dev)

</div>

![Mongoose](https://img.shields.io/badge/Mongoose-880000?style=for-the-badge&logo=mongoose&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-black?style=for-the-badge&logo=JSON%20web%20tokens&logoColor=white)
![Bcrypt](https://img.shields.io/badge/Bcrypt-000000?style=for-the-badge&logo=letsencrypt&logoColor=white)
![Zod](https://img.shields.io/badge/Zod-3E67B1?style=for-the-badge&logo=zod&logoColor=white)
<br>
![DDD](https://img.shields.io/badge/Architecture-DDD-blue?style=for-the-badge)
![Clean Architecture](https://img.shields.io/badge/Architecture-Clean-brightgreen?style=for-the-badge)
![Swagger](https://img.shields.io/badge/Swagger-85EA2D?style=for-the-badge&logo=swagger&logoColor=black)

</div>




<div align="center">

![CI](https://github.com/mhndsy37-cmd/O-API/actions/workflows/ci.yml/badge.svg)

</div>

# O-API (E-Commerce Backend)

A production-ready, highly scalable RESTful API for a modern e-commerce platform. Built with **NestJS** and **TypeScript**, strictly following **Domain-Driven Design (DDD)** and **Clean Architecture** principles.

## Key Features

- **Passwordless Authentication**: Secure OTP-based login/registration via SMS or Email (powered by Redis).
- **High-Performance Cart**: Shopping cart is stored in Redis for lightning-fast read/write operations.
- **Role-Based Access Control (RBAC)**: Distinct permissions for `ADMIN`, `SELLER`, and `CUSTOMER`.
- **Full E-Commerce Flow**: Complete implementation of Cart, Checkout, Orders, and Payment abstraction.
- **Event-Driven Architecture**: Decoupled modules communicating via Domain Events (e.g., triggering notifications on successful payment).
- **Robust Security**: JWT, Helmet, Rate Limiting (Throttler), and Input Validation.
- **Comprehensive Documentation**: Fully documented interactive API using Swagger.
- **DevOps Ready**: Dockerized environment, automated CI/CD via GitHub Actions, Pino logging, and Sentry monitoring.

## Architecture Overview

This project is structured into three distinct layers to ensure separation of concerns:
- **Domain Layer**: Contains Entities, Value Objects, Domain Events, and core business rules. (Zero dependencies on frameworks).
- **Application Layer**: Orchestrates use cases, containing Services, DTOs, and Controllers.
- **Infrastructure Layer**: Handles technical details like MongoDB Schemas, Repositories, and external Gateways.

## Tech Stack

- **Framework**: NestJS
- **Language**: TypeScript
- **Database**: MongoDB (Mongoose)
- **Cache / Temp Storage**: Redis (ioredis)
- **Authentication**: JWT, Bcrypt
- **Documentation**: Swagger (OpenAPI)
- **DevOps**: Docker, Docker Compose, GitHub Actions
- **Observability**: Pino (Logging), Sentry (Error Tracking)

---

## Getting Started

### Option 1: Running with Docker (Recommended)

The easiest way to run the entire stack (API + MongoDB + Redis) is using Docker.

1. Clone the repository:
   ```bash
   git clone https://github.com/mhndsy37-cmd/O-API.git
   cd O-API
   ```

2. Create a `.env` file in the root directory (or copy from `.env.example`) and fill in the required variables.

3. Build and start the containers:
   ```bash
   docker compose up -d --build
   ```

4. Access the API:
   - **Base URL**: `http://localhost:3000`
   - **Swagger Documentation**: `http://localhost:3000/api`

### Option 2: Local Development

1. Install dependencies:
   ```bash
   pnpm install
   # or if you have peer dependency issues: pnpm install --config.strict-peer-dependencies=false
   ```

2. Start MongoDB and Redis (using Docker):
   ```bash
   docker compose up -d mongodb redis
   ```

3. Run the application:
   ```bash
   pnpm run start:dev
   ```

---

## API Documentation

Once the application is running, navigate to `http://localhost:3000/api` to access the interactive **Swagger UI**. 

### Core Modules Overview:

- **Auth**: OTP request and verification, Passwordless login.
- **Users**: Registration, Login, Profile management, Role promotion.
- **Products**: CRUD operations, Stock management, Image uploads.
- **Categories**: Nested category tree management.
- **Cart**: Add/Remove items, Update quantities (Stored in Redis).
- **Orders**: Checkout process, Order status tracking.
- **Payments**: Initiate and verify transactions (Mock gateway included).

---

## Roadmap

- [x] Core Domain & DDD Setup
- [x] User Authentication & RBAC
- [x] Product & Category Management
- [x] Redis Integration (OTP & Cart)
- [x] Payment & Order Processing (Mock)
- [x] Swagger Documentation
- [x] CI/CD Pipeline (GitHub Actions)
- [ ] Real Payment Gateway Integration (ZarinPal)
- [ ] Address Management Module
- [ ] Product Reviews & Ratings
- [ ] Automated Unit & E2E Testing

---

## License

This project is licensed under the [MIT License](LICENSE).
