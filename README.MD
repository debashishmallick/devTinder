# DevTinder API Documentation

This document provides a detailed overview of the API endpoints, their descriptions, expected request data, and possible status codes.

---

## Authentication Endpoints

### **POST** `/signup`
- **Description**: Register a new user.
- **Request Body**:
  ```json
  {
    "firstName": "John",
    "lastName": "Doe",
    "emailId": "john.doe@example.com",
    "password": "StrongPassword123!"
  }