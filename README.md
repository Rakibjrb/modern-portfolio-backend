# Node.js Express.js TypeScript Backend Boilerplate

**Project Name:** Node.js Express.js TypeScript Backend Boilerplate
**Tech Stack:** Node.js + Express.js + TypeScript + MongoDB + Mongoose
**Purpose:** A robust and scalable backend API boilerplate designed to jumpstart new Node.js, Express.js, and MongoDB projects with TypeScript, emphasizing best practices and developer experience.

---

## ✨ Project Overview

This is a modern, type-safe backend API boilerplate built with TypeScript for enhanced maintainability, scalability, and developer experience. It provides a solid foundation for building RESTful services, integrating essential features like authentication, data validation, and error handling out-of-the-box. This boilerplate is intended to be a starting point for various backend applications.

---

## 🚀 Tech Stack

This project is built using a powerful and popular set of technologies for backend development:

- **Runtime:** Node.js (v20+)
- **Framework:** Express.js
- **Language:** TypeScript
- **Database:** MongoDB
- **ODM (Object Data Modeling):** Mongoose
- **Authentication:** JWT (JSON Web Tokens) + bcryptjs
- **Validation:** Zod (schema declaration and validation library)
- **Security:** Helmet (secures HTTP headers), CORS (Cross-Origin Resource Sharing)
- **Logging:** Morgan
- **Development Tools:**
  - `ts-node-dev`: For hot-reloading TypeScript files during development.
  - `nodemon`: Monitors for changes in source and automatically restarts the server.

---

## 🛠️ Key Features

This boilerplate comes packed with features to accelerate your development:

- **Type-Safety:** Full TypeScript integration ensures robust and maintainable code.
- **Modular Structure:** Organized into `modules` for clear separation of concerns (e.g., for `auth`, `users`, `products`, etc.).
- **Authentication Ready:** Secure user authentication setup using JWT and password hashing with `bcryptjs`.
- **Data Validation:** Powerful schema validation with `Zod` for incoming request data.
- **Centralized Error Handling:** Custom error classes and handlers for consistent and predictable error responses.
- **Configuration Management:** Environment-specific configuration using `.env` files.
- **Database Integration:** Seamless MongoDB integration with Mongoose ODM.
- **Security Best Practices:** Includes `helmet` and `cors` for enhanced API security.
- **Asynchronous Utility:** `catchAsync` utility for simplifying asynchronous route handling and error propagation.
- **Standardized Responses:** `sendResponse` utility for consistent API response formatting.

---

## 📁 Folder Structure

The project follows a well-organized folder structure to promote modularity and maintainability:

```bash
|-- src
|   |-- app
|   |    |-- config                # Application configuration (env variables, database connection)
|   |    |   |-- env.ts
|   |    |   |-- database.ts
|   |    |-- errors                # Custom error classes and global error handling middlewares
|   |    |   |-- AppError.ts
|   |    |   |-- handleCastError.ts
|   |    |   |-- handleDuplicateError.ts
|   |    |   |-- handleValidationError.ts
|   |    |   |-- handleZodError.ts
|   |    |-- middlewares           # Express middleware functions (authentication, request validation)
|   |    |   |-- auth.ts
|   |    |   |-- validateRequest.ts
|   |    |-- utils                 # Generic utility functions (async wrappers, token operations, password hashing, response formatting)
|   |    |   |-- catchAsync.ts
|   |    |   |-- extractTokens.ts
|   |    |   |-- hashPassword.ts
|   |    |   |-- sendResponse.ts
|   |    |-- modules               # Feature-specific modules (e.g., users, authentication, products, etc.)
|   |    |   |-- auth              # Example module for authentication
|   |    |-- routes                # Centralized Express route definitions
|   |    |-- types                 # Custom TypeScript types/interfaces
|   |    |-- app.ts                # Main Express application setup and global middlewares
|   |    |-- server.ts             # Server entry point and database connection logic
|-- .env                          # Environment variables configuration
|-- .gitignore                    # Files/folders ignored by Git
|-- package.json                  # Project dependencies and scripts
|-- README.md                     # Project documentation
|-- tsconfig.json                 # TypeScript compiler configuration
```

---

## 🚀 Getting Started

Follow these steps to get this boilerplate up and running on your local machine:

1.  **Clone the Repository:**

    ```bash
    git clone https://github.com/Rakibjrb/node-express-backend-boilerplate.git
    cd node-express-backend-boilerplate
    ```

2.  **Install Dependencies:**

    ```bash
    npm install
    ```

3.  **Environment Variables:**
    Create a `.env` file in the root directory of the project. This file will store sensitive configuration details.

    ```bash
    #app and environment
    NODE_ENV=development
    FRONTEND_URL=http://localhost:3000
    APP_VERSION=1.0.0
    #encryption round
    BCRYPT_SALT_ROUNDS=14
    # database
    CLUSTER_URL=mongodb+srv://username:password@cluster0.e9dao1z.mongodb.net/database-name?retryWrites=true&w=majority
    DATABASE_NAME=database-name
    ```

4.  **Run in Development Mode (with hot reload):**

    ```bash
    npm run dev
    ```

    The API will listen on `http://localhost:8001` by default (or the `PORT` specified in your `.env` file).

5.  **Build for Production:**

    ```bash
    npm run build
    ```

    This command compiles all TypeScript files into JavaScript in the `dist` directory.

6.  **Run in Production Mode:**
    ```bash
    npm start
    ```
    This will execute the compiled JavaScript files from the `dist` directory.

---

## ✅ Health Check

To verify the server is running correctly, you can send a `GET` request to the root endpoint:

```bash
curl http://localhost:8001/
```

(Replace `8001` with your actual port if different)

---

## ⚙️ Configuration Details

### `tsconfig.json`

The TypeScript compiler configuration ensures proper compilation and type checking:

```json
{
  "compilerOptions": {
    "target": "ESNext",
    "module": "CommonJS",
    "moduleResolution": "node",
    "outDir": "./dist",
    "rootDir": "./src",
    "esModuleInterop": true,
    "skipLibCheck": true,
    "skipDefaultLibCheck": true,
    "noEmitOnError": false,
    "checkJs": false,
    "strict": false,
    "baseUrl": ".",
    "types": ["node"],
    "typeRoots": ["node_modules/@types"]
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "dist", "**/*.spec.ts"]
}
```

- `outDir`: Specifies the output directory for compiled JavaScript files.
- `rootDir`: Specifies the root directory of TypeScript source files.
- `esModuleInterop`: Enables compatibility with CommonJS and ES Modules.
- `skipLibCheck`: Skips type checking of declaration files, improving compilation speed.
- `strict`: Set to `false` for initial flexibility, but consider enabling for stricter type checking.

### `package.json` Scripts

Key scripts defined for development and production workflows:

```json
"scripts": {
  "dev": "ts-node-dev --respawn --transpile-only src/app/server.ts",
  "build": "tsc",
  "start": "node dist/app/server.js"
}
```

- `dev`: Starts the server in development mode using `ts-node-dev` for automatic restarts on code changes, ideal for active development.
- `build`: Compiles all TypeScript files (`.ts`) to JavaScript (`.js`), placing them into the `dist` directory. This step is crucial before deploying to production.
- `start`: Runs the compiled application from the `dist` directory. This is the command to use for production deployments.

---

## 🤝 Contribution

This boilerplate is open to improvements! Feel free to fork the repository, open issues for suggestions or bugs, or submit pull requests with enhancements.

---

## 📄 License

This project is open-source and available under the [MIT License](LICENSE).
(Note: You should create a `LICENSE` file in the root directory if you plan to distribute or share this boilerplate publicly).
