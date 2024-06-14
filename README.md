# SemiColon Registration System - Backend

Technologies: Node.js, Express.js, TypeScript, MongoDB, mongoose, jest, JWT, passport, bcrypt, nodemailer.

This is the backend that supports the websites of the system and manages the database.

Deployment & Swagger: https://semicolon-registration-backend.onrender.com/ (May take up to 2 mins to wake up the server)

## SemiColon Registration System

For information about the whole system, look [here](https://github.com/Deadreyo/SemiColon-dashboard-frontend?tab=readme-ov-file#semicolon-registration-system).

## API Reference

Documentation of the API can be found in the [Swagger](https://semicolon-registration-backend.onrender.com/).

![image](https://github.com/Deadreyo/SemiColon-backend/assets/52013393/6499d2d4-73c4-4713-9dd0-f0d768a44d12)

## Backend Features

The focus of this section is about the quality of the backend codebase and the maintainability of the system.

### Functional Features

The backend enables all the features of the system, which are described [here](https://github.com/Deadreyo/SemiColon-dashboard-frontend?tab=readme-ov-file#semicolon-registration-system-features).

### Non-Functional Features: Code Quality and Maintainability

The focus of the backend is to provide a clean and maintainable codebase. This is achieved by:

- Full Test Coverage
    - Tests are written for all the endpoints and services. Both unit and integration tests are written.
    - The tests are written using Jest.
    - The tests are run on every pull request to the repository.
- CI/CD
    - The backend is deployed on every push to the repository.
    - The test suite is run on every pull request to ensure that the code is working as expected.
    - The deployment is done using Render.
- Code Quality
    - The code is written in TypeScript, which provides type safety and better code quality.
    - Code quality is guaranteed through code reviews on every pull request.
- Project Structure and Maintainability
    - The project is structured in a way that makes it easy to navigate and understand.
    - The project uses MVC architecture.
    - The project can easily be extended and maintained.
- Multiple Environments
    - The project can be run in development, testing, and production environments. This protects the production data during development.
    - The project uses environment variables for configuration.
- API Documentation
    - The API is documented using Swagger.
    - The documentation is automatically generated from the codebase.

## Run Locally

Clone the project

```bash
  git clone https://github.com/Deadreyo/SemiColon-backend.git
```

Go to the project directory

```bash
  cd SemiColon-backend
```

Install dependencies

```bash
  npm install
```

Edit the `example.env` file and rename it to `.env` and add the required values.

Start the server. For Windows `dev-windows` and for Linux `dev-linux`

```bash
  npm run dev-windows
```

## Authors

- [@bobo122b](https://github.com/bobo122b)
- [@Deadreyo](https://github.com/Deadreyo)
- [@Ahmed-Khaled24](https://github.com/Ahmed-Khaled24)
- [@Ofahmy143](https://github.com/Ofahmy143)
