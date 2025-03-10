
# 📄 Document Management System (NestJS)  

A NestJS-based **Document Management System** with JWT-based authentication, role-based access control, document CRUD operations, and ingestion control via Python API.  

## 🚀 Features  
✔ JWT Authentication & Role-Based Access  
✔ Document CRUD Operations (Upload, Retrieve, Update, Delete)  
✔ Ingestion API (Triggers External Python API)  
✔ Database: PostgreSQL with Prisma/TypeORM  
✔ API Documentation using Swagger  
✔ Unit Testing  

---

## 🛠 **1. Project Setup & Configuration**  
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