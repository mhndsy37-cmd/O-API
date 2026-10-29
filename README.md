<h1 align="center"> O-API </h1>
<h2 align="center"> v0.9.0-beta </h2>
<br>
<br>

<div align="center">
<div align="center">

[![My Skills](https://skillicons.dev/icons?i=ts,nodejs,express,nestjs,mongodb&theme=dark)](https://skillicons.dev)

</div>

![Mongoose](https://img.shields.io/badge/Mongoose-880000?style=for-the-badge&logo=mongoose&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-black?style=for-the-badge&logo=JSON%20web%20tokens&logoColor=white)
![Bcrypt](https://img.shields.io/badge/Bcrypt-000000?style=for-the-badge&logo=letsencrypt&logoColor=white)
![Zod](https://img.shields.io/badge/Zod-3E67B1?style=for-the-badge&logo=zod&logoColor=white)
<br>
![DDD](https://img.shields.io/badge/Architecture-DDD-blue?style=for-the-badge)
![Clean Architecture](https://img.shields.io/badge/Architecture-Clean-brightgreen?style=for-the-badge)

</div>

---

## 📌 Project Status

The API is essentially ready, though it still has a long way to go before it is fully efficient. 
The API has seen significant progress; it performs the necessary functions and can be run on `localhost`—it can be successfully fetched by a frontend application. 

**Please note:** The code is quite strict in its operation. There may be bugs; I haven't thoroughly checked for them.

### In this update:
*   **Payment and Order Modules** have been added.
*   An **advanced logging system** has been implemented (using Pino - though there is still room for improvement).
*   A **request management and rate-limiting system** (to prevent spam/DDoS) has been added.
*   **Error handling** has been significantly improved.

### In the next update:
*   The codebase will be standardized, and professional code comments will be added.
*   We plan to include README files for each section, **Swagger documentation** for the entire project, **Docker** support, and an upgrade to ensure compatibility with various databases, among other enhancements.

---

## ⚙️ Installation & Running

**Note:** If you encounter issues during `npm install`, please append the `--legacy-peer-deps` flag to the command. This issue will be resolved in future updates.

```bash
# 1. Install packs
npm install
# or
npm install --legacy-peer-deps

# 2. Build the project
npm run build

# 3. Start the server
npm run start
```

---

## 📡 API Documentation

**BASE URL:** `http://localhost:3000`

- API methods are included in releases because, with each update, they may undergo changes (MAJOR), be added (MINOR), or have associated bugs patched (PATCH).