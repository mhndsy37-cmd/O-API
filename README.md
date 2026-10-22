<h1 align="center">O-API</h1>

<p align="center">
  A TypeScript API service built on Node.js with Express and NestJS.
</p>

---

## Overview

O-API is an early-stage backend project written in TypeScript and running on Node.js. It currently provides a partial set of user-related features and follows a Domain-Driven Design (DDD) structure.

Using zod validation for the `.env` security system.

Strict Use of JWT for High Security.

Features a nested category system for a cleaner product front-end.

A unique error-reporting system based on NestJS.

Respecting API privacy rights for every product seller.

This is the **secend beta release** (`v0.2.0-beta`). The project is under active development, and many modules are still empty placeholders.

## Tech Stack
[![My Skills](https://skillicons.dev/icons?i=ts,nodejs,express,nest,mongodb&theme=dark)](https://skillicons.dev)

| Layer       | Technology                |
| ----------- | ------------------------- |
| Language    | TypeScript                |
| Runtime     | Node.js                   |
| Frameworks  | Express, NestJS           |
| Database    | mongodb                   |
| Version     | `v0.2.0-beta` (secend beta)|

## Features

- Partial user features (create user, jwt and related endpoints only)
- Everything else is not implemented yet
## Notes
This project will undergo significant upgrades and will become the API for the main project—an e-commerce website.
</br>
</br>
Docker is not used in this project.
This is a beta release; 
</br>
APIs and structure may change.
</br>
</br>
Please report bugs.
## Project Structure

The codebase follows Domain-Driven Design (DDD) principles:
### dotenvconf
```text
# Server
NODE_ENV=development
PORT=3000

# Database
MONGO_URI=mongodb://localhost:27017/shop_db

# JWT
JWT_SECRET=your_super_secret_key_at_least_32_characters_long
JWT_EXPIRES_IN=1d
```
### Installation
```bash
npm install
```
### Build and Run
```bash
npm run build
npm run start
