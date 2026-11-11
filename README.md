<h1 align="center"> O-API </h1>
<h2 align="center"> v0.10.0-beta </h2>
<br>
<br>

<div align="center">
<div align="center">

[![My Skills](https://skillicons.dev/icons?i=ts,nodejs,express,nestjs,mongodb,docker&theme=dark)](https://skillicons.dev)

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




#  E-Commerce API (NestJS + DDD)

A robust, scalable, and maintainable RESTful API for an e-commerce platform. Built with **NestJS** and strictly following **Domain-Driven Design (DDD)** and **Clean Architecture** principles.

##  Architecture & Features
- **Domain-Driven Design**: Separated into Domain, Application, and Infrastructure layers.
- **Event-Driven Architecture**: Uses `EventEmitter2` for decoupled modules (e.g., Notifications triggering on Payment success).
- **Authentication**: JWT-based auth with Role-Based Access Control (RBAC).
- **Dockerized**: Fully containerized for seamless deployment.
- **Logging & Monitoring**: Pino for logs, Sentry for error tracking.

##  API Documentation

**Base URL:** `http://localhost:3000`
**Headers:** `Authorization: Bearer <your_jwt_token>` (Required for protected routes)

###  User Module
| Method | Endpoint | Access | Description |
| :--- | :--- | :--- | :--- |
| `POST` | `/users/register` | Public | Register a new admin/seller. |
| `POST` | `/users/register-customer` | Public | Register a customer (No password required). |
| `POST` | `/users/login/email-password` | Public | Login with email and password. |
| `POST` | `/users/login/phone-password` | Public | Login with phone and password. |
| `POST` | `/users/login/username-password` | Public | Login with username and password. |
| `POST` | `/users/login/check-identifier` | Public | Smart login: checks if user needs a password. |
| `POST` | `/users/activate` | Public | Activate a pending user. |
| `GET` | `/users/me` | User | Get current user profile. |
| `PATCH` | `/users/me` | User | Update profile (username, fullname). |
| `PATCH` | `/users/me/password` | User | Change current password. |
| `PATCH` | `/users/admin/:id/block` | Admin | Block a user. |
| `PATCH` | `/users/admin/:id/unblock` | Admin | Unblock a user. |
| `PATCH` | `/users/admin/:id/role` | Admin | Change a user's role. |
| `PATCH` | `/users/admin/:id/promote` | Admin | Promote customer to seller/admin (assigns credentials). |

###  Category Module
| Method | Endpoint | Access | Description |
| :--- | :--- | :--- | :--- |
| `GET` | `/categories` | Public | Get the category tree. |
| `POST` | `/categories` | Admin | Create a new category/subcategory. |

###  Product Module
| Method | Endpoint | Access | Description |
| :--- | :--- | :--- | :--- |
| `GET` | `/products` | Public | Get products (Visibility depends on role). |
| `GET` | `/products/:id` | Public | Get single product details. |
| `POST` | `/products` | Admin/Seller | Create a new product. |
| `PATCH` | `/products/:id` | Admin/Seller | Update product details. |
| `PATCH` | `/products/:id/publish` | Admin/Seller | Publish a draft product. |
| `PATCH` | `/products/:id/archive` | Admin/Seller | Archive a product. |
| `PATCH` | `/products/:id/restock` | Admin/Seller | Add stock to inventory. |
| `PATCH` | `/products/:id/category` | Admin/Seller | Change product category. |
| `POST` | `/products/:id/images` | Admin/Seller | Upload product image. |

### 🛒 Cart Module
| Method | Endpoint | Access | Description |
| :--- | :--- | :--- | :--- |
| `GET` | `/cart` | User | Get current user's cart. |
| `POST` | `/cart/items` | User | Add item to cart. |
| `PATCH` | `/cart/items/:productId` | User | Update item quantity. |
| `DELETE` | `/cart/items/:productId` | User | Remove item from cart. |
| `DELETE` | `/cart` | User | Clear the entire cart. |

###  Order Module
| Method | Endpoint | Access | Description |
| :--- | :--- | :--- | :--- |
| `POST` | `/orders/checkout` | User | Convert cart to a PENDING order. |
| `GET` | `/orders/my-orders` | User | Get current user's orders. |
| `POST` | `/orders/:id/pay` | User | Initiate payment for an order. |
| `PATCH` | `/orders/:id/status` | Admin/Seller | Update order status manually. |

###  Payment Module
| Method | Endpoint | Access | Description |
| :--- | :--- | :--- | :--- |
| `POST` | `/payments/initiate` | User | Start a payment transaction. |
| `GET` | `/payments/verify` | Public | Bank callback to verify payment. |
| `POST` | `/payments/cancel/:authority` | User | Manually cancel a pending payment. |

---

## ⚙️ Installation & Setup (Docker)

The easiest way to run the project is using Docker.

1. **Clone the repository:**
   ```bash
   git clone https://github.com/mhndsy37-cmd/O-API.git
   cd O-API
   ```

2. **Set up environment variables:**
   Create a `.env` file in the root directory (You can copy `.env.example`).

3. **Run the containers:**
   ```bash
   docker compose up -d --build
   ```

4. **Access the API:**
   - API Base: `http://localhost:3000`
   - Swagger UI: will be added.
