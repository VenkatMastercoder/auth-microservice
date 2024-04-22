# SaaS Backend Template

This is a template for a SaaS (Software as a Service) backend project built with Node.js, Express, Docker, Docker Compose, NGINX, Jenkins, Sentry, Prisma ORM, Zod, Redis, Swagger. It follows a microservices architecture with an MVC design and service-oriented principles.

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

#### Test Micro Service One

```http
  GET /v1/service-one/test
```

## Deployment

Clone the repository

```bash
git clone https://github.com/VenkatMastercoder/SaaS-Backend-Starter-Template
```

```bash
cd SaaS-Backend-Starter-Template
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
