# SaaS Authentication Backend Template

This is a template for an authentication microservice built with Node.js, Express, Docker, Docker Compose, NGINX, Jenkins, Sentry, Prisma ORM, Zod, Redis, and Swagger. It follows a microservices architecture with an MVC design and service-oriented principles.

## Authors

- [@venkatesan](https://www.github.com/VenkatMastercoder)

## Tech Stack

- Node.js
- Express.js
- Postgresql (or your preferred database)
- Docker
- Docker Compose
- NGINX
- Jenkins
- Sentry
- Prisma ORM
- Zod
- Redis
- swagger

# Project structure

```
project-root/
|-- 📂 microservices/
|   |-- 📂 authentication/
|   |   |-- 📂 src/
|   |   |   |-- 📄 server.ts
|   |   |   |-- 📂 api/
|   |   |       |-- 📂 v1/
|   |   |           |-- 📂 controllers/
|   |   |           |   |-- 📄 AuthController.ts
|   |   |           |-- 📂 models/
|   |   |           |   |-- 📂 prisma/
|   |   |           |       |-- 📄 client.ts
|   |   |           |       |-- 📂 migrations/
|   |   |           |           |-- ...
|   |   |           |       |-- 📄 User.ts
|   |   |           |-- 📂 routes/
|   |   |           |   |-- 📄 authRoutes.ts
|   |   |           |-- 📂 services/
|   |   |           |   |-- 📄 AuthService.ts
|   |   |           |-- 📂 types/
|   |   |               |-- 📄 AuthTypes.ts
|   |   |-- 📂 config/
|   |   |   |-- 📂 swagger/
|   |   |       |-- 📄 api.yaml
|   |   |   |-- 📄 constants.ts
|   |   |-- 📂 prisma/
|   |   |   |-- 📄 schema.prisma
|   |   |   |-- 📄 client.ts
|   |   |-- 📂 scripts/
|   |   |   |-- 📄 seed.ts
|   |   |   |-- 📄 migrate.ts
|   |   |   |-- 📄 test.ts
|-- 📂 Jenkins/
|   |-- 📄 Jenkinsfile
|-- 📂 nginx/
|   |-- 📄 default.conf
|-- 📄 docker-compose-dev.yml
|-- 📄 docker-compose-prod.yml
|-- 📄 docker-compose.yml
|-- 🔒 .env
|-- 📄 tsconfig.json
|-- 📄 package.json
|-- 📄 README.md
```

## API Reference

#### Test Microservices Service

```http
  GET /v1/microservices/test
```

## API Reference

#### Authentication Routes

```http
POST /v1/auth/register
```

- Description: Register a new user.
- Request body:
  - username: User's username (required)
  - email: User's email address (required)
  - password: User's password (required)
- Response:
  - 201 Created: If the user is successfully registered.
  - 400 Bad Request: If the request body is invalid or incomplete.
  - 409 Conflict: If a user with the provided username or email already exists.
  - 500 Internal Server Error: If there's an error processing the request.

```http
POST /v1/auth/login
```

- Description: Authenticate a user.
- Request body:
  - username: User's username (required)
  - password: User's password
- Response:

  - 200 OK: Returns an authentication token if the credentials are valid.
  - 401 Unauthorized: If the credentials are invalid.
  - 500 Internal Server Error: If there's an error processing the request.

```http
POST /v1/auth/refresh-token
```

- Description: Refresh authentication token.
- Request body:
  - refresh_token: Refresh token (required)
  - user_id : User Id (required)
- Response:

  - 200 OK: Returns a new authentication token if the refresh token is valid.
  - 401 Unauthorized: If the refresh token is invalid or expired.
  - 500 Internal Server Error: If there's an error processing the request.

```http
POST /v1/auth/activate-account
```

- Description: Activate user account using activation token.
- Request body:
  - token: Activation token (required)
- Response:
  - 200 OK: If the account is successfully activated.
  - 400 Bad Request: If the activation token is invalid or expired.
  - 500 Internal Server Error: If there's an error processing the request.

```http POST
/v1/auth/verify-email
```

- Description: Verify user email address.
- Request body:
  - user_id : User Id (required)
  - email: Email verification token (required)
- Response:

  - 200 OK: If the email is successfully verified.
  - 400 Bad Request: If the email verification token is invalid or expired.
  - 500 Internal Server Error: If there's an error processing the request.

```http POST
POST /v1/auth/change-password
```

- Description: Change user password.
- Request body:
  - user_id : User Id (required)
  - old_password: User's old password (required)
  - new_password: User's new password (required)
- Response:

  - 200 OK: If the password is successfully changed.
  - 400 Bad Request: If the request body is invalid or incomplete.
  - 401 Unauthorized: If the old password is incorrect.
  - 500 Internal Server Error: If there's an error processing the request.

```http 
POST /v1/auth/forgot-password
```

- Description: Initiate password reset process.
- Request body:
  - email: User's email address (required)
- Response:

  - 200 OK: If the password reset process is successfully initiated.
  - 400 Bad Request: If the request body is invalid or incomplete.
  - 404 Not Found: If no user is found with the provided email address.
  - 500 Internal Server Error: If there's an error processing the request.

```http 
POST /v1/auth/reset-password
```
  - Description: Reset user password using reset token.
  - Request body:
    - user_id : User Id (required)
    - password: User's new password (required)
    - token: Password reset token (required)
    
  - Response:
    - 200 OK: If the password is successfully reset.
    - 400 Bad Request: If the request body is invalid or incomplete.
    - 401 Unauthorized: If the reset token is invalid or expired.
    - 500 Internal Server Error: If there's an error processing the request.

Feel free to adjust the descriptions and details according to your specific implementation and requirements.

## Deployment

Clone the repository

```bash
git clone https://github.com/VenkatMastercoder/SaaS-Backend-Starter-Template
```

```bash
cd SaaS-Backend-Authentication-Starter-Template
```

Docker Setup

Use Docker and Docker Compose to simplify the deployment process.

```bash
docker-compose up
```

## Support

For support, email venkatesangunaraj@gmail.com

## License

[MIT](https://choosealicense.com/licenses/mit/)

Feel free to modify and expand upon this template based on your specific project structure and needs.
