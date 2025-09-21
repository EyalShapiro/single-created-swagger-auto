# Swagger Automatic Example

This project is a Node.js application using Express and TypeScript to demonstrate automatic Swagger documentation generation with `swagger-autogen` and `swagger-ui-express`.

## Features

- **Express Server**: A simple server setup with Express.
- **TypeScript**: The project is written in TypeScript.
- **Automatic Swagger Generation**: Swagger documentation is generated automatically from the JSDoc comments in the controllers.
- **Swagger UI**: The API documentation is served using `swagger-ui-express`.
- **ESLint and Prettier**: For code linting and formatting.

## Getting Started

### Installation

1.  Clone the repository:
    ```bash
    git clone https://github.com/EyalShapiro/single-created-swagger-auto.git
    ```
2.  Navigate to the project directory:
    ```bash
    cd swagger-automatic-example
    ```
3.  Install the dependencies:
    ```bash
    npm install
    ```

### Configuration

The server configuration is located in `src/config/server.ts`. You can modify the port and host in your `.env` file.

```
PORT=3000
HOST=localhost
```

## Usage

### Available Scripts

- **`npm run build`**: Generates the Swagger documentation and compiles the TypeScript code to JavaScript.
- **`npm start`**: Starts the application from the compiled code in the `dist` directory.
- **`npm run dev`**: Starts the application in development mode using `ts-node`. The server will automatically restart on file changes.
- **`npm run lint`**: Lints the source code using ESLint.
- **`npm run format`**: Formats the source code using Prettier.

## API Endpoints

The following endpoints are available:

### Hello

- **`GET /api/hello`**: Returns a "Hello World!" message.
- **`POST /api/hello`**: Returns a "get back Hello World!" message along with the request body.

### Counter

- **`GET /api/counter`**: Gets the current value of the counter.
  - Aliases: `GET /api/counter/get`
- **`POST /api/counter/add`**: Increments the counter by one.
  - Aliases: `POST /api/counter/inc`, `POST /api/counter/plus`, `POST /api/counter/+`
- **`POST /api/counter/sub`**: Decrements the counter by one.
  - Aliases: `POST /api/counter/dec`, `POST /api/counter/minus`, `POST /api/counter/-`
- **`DELETE /api/counter`**: Resets the counter to zero.
  - Aliases: `DELETE /api/counter/0`, `DELETE /api/counter/reset`, `DELETE /api/counter/zero`

## Swagger Documentation

The Swagger documentation is automatically generated from the code. To view the documentation, start the server and navigate to `/api-docs` in your browser.

For example, if the server is running on `http://localhost:3000`, the Swagger UI will be available at `http://localhost:3000/api-docs`.
