﻿# Pos-Backend

# Complete CRUD Point of Sale (POS) System

**Technologies Used**:  
- **Backend**: Express.js, Node.js  
- **Database**: MongoDB  
- **Authentication**: JWT (JSON Web Token)  
- **Middleware**: Custom middleware for authentication, error handling, etc.  
- **WebSocket**: For real-time updates  
- **Data**: JSON for request/response formatting  

## Overview

The **Complete CRUD Point of Sale (POS) System** is designed to manage sales transactions efficiently in a retail or business setting. It allows users to perform the following operations:  
- **Create**: Add products, customers, and sales orders.  
- **Read**: View product details, customer information, and sales reports.  
- **Update**: Modify product or customer details.  
- **Delete**: Remove products or customers from the system.

This project utilizes **Node.js**, **Express.js**, and **MongoDB** to build a robust and scalable backend. JWT is used for secure authentication, and WebSockets provide real-time updates, such as notifications for new sales transactions or inventory changes.

## Features

- **User Authentication**: JWT-based authentication with token verification.
- **Product Management**: Add, update, and delete products in the inventory.
- **Customer Management**: Manage customer details and sales transactions.
- **Sales Transactions**: Record sales transactions and update inventory.
- **Real-time Updates**: Use WebSocket for real-time sales notifications and inventory updates.
- **Data Validation**: Middleware for request validation and error handling.
- **Secure API**: Secure API endpoints with JWT and role-based access control.
- **CRUD Operations**: Full CRUD operations for products, customers, and sales.

## Tech Stack

- **Backend**: Node.js, Express.js  
- **Database**: MongoDB (Mongoose ORM)  
- **Authentication**: JWT (JSON Web Token)  
- **Middleware**: Custom middleware for authentication, validation, and error handling  
- **WebSocket**: For real-time updates  
- **Other Libraries**:  
  - Mongoose (for MongoDB object modeling)  
  - dotenv (for environment variable management)  
  - bcryptjs (for password hashing)  
  - jsonwebtoken (for generating and verifying JWT tokens)  
  - moment (for date formatting)  

### Prerequisites

Ensure you have the following tools installed:
- Node.js
- npm (Node Package Manager)
- MongoDB (or use MongoDB Atlas for cloud-based MongoDB)
- Postman or any API testing tool for testing the API
