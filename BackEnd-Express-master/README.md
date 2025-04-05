# Express Backend Module

This module serves as the backend for AGN-DB. It provides APIs for handling requests related to handling website search queries as SQL queries into the database and returning the results.

## Getting Started

To set up and run the backend module locally, follow these steps:

1. **Clone the repository:** `git clone https://github.com/Javk5pakfa/BackEnd-Express.git`
2. **Install dependencies:** `npm install`
3. **Start the server:** `npm start`
4. **Access the APIs:** The server will start on port 8082 by default. You can access the APIs using a tool like Postman or by making HTTP requests from your frontend application.

## Project Structure

- `index.js`: The main entry point of the application. It initializes the Express server, middleware, routes, and database connection.
- `middleware/logger.js`: Custom middleware for logging requests.
- `routes/api/db_router.js`: API routes for interacting with the database.
- `app/models/`: Directory containing database models and configurations using Sequelize.

## Available Scripts

- `npm start`: Start the server in production mode.
- `npm run dev`: Start the server in development mode with nodemon for automatic restarts on code changes.
- `npm test`: Run tests for the backend module.

## Environment Variables

- `PORT`: Port number for the Express server. Default is 8082.
- `DATABASE_URL`: URL for the database connection.

## Contributing

If you'd like to contribute to this project, please follow the [contribution guidelines](CONTRIBUTING.md).

## License

This project is licensed under the [MIT License](LICENSE).
