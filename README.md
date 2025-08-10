# Library Management Backend (NestJS)

A backend application for managing a library system, built using [NestJS](https://nestjs.com/), TypeScript, PostgreSQL, Redis, and JWT authentication. This project follows clean code and best practices for scalable server-side development.

## Features
- User authentication (JWT)
- Book management (CRUD)
- Borrowing system
- Integration with Google Books API
- Redis caching
- API documentation with Swagger
- Environment-based configuration

## Project Structure
```
├── src/
│   ├── app/           # Main app module
│   ├── auth/          # Authentication (JWT, guards, strategies)
│   ├── books/         # Book CRUD operations
│   ├── borrow/        # Borrowing logic
│   ├── common/        # Shared modules/utilities
│   ├── entities/      # TypeORM entities (User, Book, Borrow)
│   ├── redis/         # Redis integration
│   ├── users/         # User management
│   └── main.ts        # Entry point
```

## Getting Started

### Prerequisites
- Node.js >= 18.x
- PostgreSQL database
- Redis server

### Installation
```bash
npm install
```

### Environment Variables
Copy `.env.example` to `.env` and fill in your credentials:
```
DATABASE_URL=postgres://user:password@localhost:5432/library_db
REDIS_URL=redis://localhost:6379
GOOGLE_BOOKS_API_KEY=your_google_books_api_key
JWT_SECRET=your_jwt_secret
```

### Running the Application
```bash
# Development
npm run start:dev

# Production
npm run build
npm run start:prod
```

### API Documentation
After starting the server, access Swagger UI at:
```
http://localhost:3000/api
```

## Modules
- **Auth**: Login, JWT, guards, user registration
- **Books**: CRUD for books, search, integration with Google Books API
- **Borrow**: Borrow and return books, history
- **Users**: User profile and management
- **Redis**: Caching for performance

## Testing
```bash
# Unit tests
npm run test

# End-to-end tests
npm run test:e2e

# Coverage
npm run test:cov
```

## Deployment
See [NestJS deployment docs](https://docs.nestjs.com/deployment) for best practices. You can use Docker or cloud platforms for production.

## License
This project is UNLICENSED. You may adapt as needed.

## Credits
Built with [NestJS](https://nestjs.com/), TypeORM, PostgreSQL, Redis, and Swagger.
