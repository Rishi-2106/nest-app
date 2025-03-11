
# 📄 Document Management System (NestJS)  

This is a NestJS-based Document Management System that includes JWT-based authentication, role-based access control, document CRUD operations, and ingestion tracking. The backend is built using NestJS, PostgreSQL, and Prisma/TypeORM, with API documentation via Swagger/OpenAPI.


## 🚀 Features  
✔ JWT Authentication & Role-Based Access  
✔ Document CRUD Operations (Upload, Retrieve, Update, Delete)  
✔ Ingestion API (Triggers External Python API)  
✔ Database: PostgreSQL with Prisma/TypeORM  
✔ API Documentation using Swagger  
✔ Unit Testing  

---
## 🛠 **1. Project Setup & Configuration**  

##  📌 Installation & Setup

🔹 Prerequisites

     Node.js (v22)

     PostgreSQL (v14+)

     NestJS CLI (npm install -g @nestjs/cli)

🔹 Clone the Repository

### 📥 Clone Repository  
```sh
git https://github.com/Rishi-2106/nest-app.git
cd document-management-system

## Project setup

```bash
$ npm install
```

## Create a .env file and add the following variables 

DATABASE_URL=postgresql://user:password@localhost:5432/dbname
JWT_SECRET=your_jwt_secret
PORT=3000

## Database Setup (PostgreSQL & Prisma/TypeORM)
```bash
$ npx prisma migrate dev --name init
$ npx prisma db push 
$ npx prisma generate

```

## Compile and run the project

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Run tests

```bash
# unit tests
$ npm run test

```
## 📌 API Documentation
API documentation is available via Swagger:

http://localhost:3000/api/docs

## 📌 API Endpoints

🔹 Authentication APIs (/api/v1/auth)

Method      Endpoint       Description

POST        /sign-up       User Registration

POST        /sign-in       User Login

POST        /logout        User Logout


Request Example (Sign Up)
roles = "ADMIN","EDITOR","VIEWER"

{
  "role": "ADMIN",
  "email": "john@example.com",
  "password": "SecurePass123!"
}



🔹 Document APIs (/api/v1/document)

Method      Endpoint      Description

POST        /upload       Upload a document

GET          /all         Get all documents

GET          /:id         Get document by ID

PUT          /:id          Update document

DELETE       /:id          Delete document

🔸 Request Example (Upload Document)

payload :
{
  "ownerId": "id",
  "filename": "file.pdf"
}


Ingestion APIs (/api/v1/ingestion)

Method      Endpoint       Description

POST        /:documentId    Trigger ingestion

GET         /:documentId/status    Check ingestion status


🔸 Response Example (Check Ingestion Status)

{
  "documentId": "12345",
  "status": "Processing",
  "lastUpdated": "2025-03-12T12:00:00Z"
}
