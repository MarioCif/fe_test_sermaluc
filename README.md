# Project: Test-Sermaluc - Frontend

Frontend wab application for the Sermaluc challenge. It is a single-page application which consists of a table as a user maintainer, which allows viewing all existing users, basic LogIn to refresh access token, function to delete users and registration of new users. The user deletion function is protected, so LogIn is required.

## Project Structure Overview

### Directory Structure

Project structure:

- **`src`**: Source code directory.
  - **`assets`**: Static resources to use in components
  - **`components`**: Html pages with css that load on the main page
  - **`interfaces`**: Interfaces for object management and communication with the backend
  - **`services`**: Consumption of services and communication functions with backend
  - **`app.tsx`**
  - **`app.css`**
  - **`main.tsx`** 
- **`.eslintrc.js`**: rules to good programming practices.
- **`.index.html`**: rules to good programming practices.
- **`.gitignore`**: Files and directories should be ignored by Git version control.
- **`.prettierrc.js`**: Configuration file to work fine with eslint.
- **`package.json`**: Npm configuration file.
- **`tsconfig.json`**: TypeScript configuration file.

### Development and Deployment Commands

- `npm run dev`: Compile TypeScript files to JavaScript and run the app.
 
### Dependences

- **react - 19.0.0**: A JavaScript library for building user interfaces, allowing for efficient rendering and state management of components.
- **react-dom - 19.0.0**: Provides methods for rendering React components into the DOM and managing component lifecycles in a browser environment.
- **react-hot-toast - 2.5.2**: A lightweight library for displaying customizable toast notifications in a React application.


### devDependences

- **@types/**: Provides TypeScript type definitions for libraries, ensuring type safety during development.
- **eslint**: Lints code to enforce coding standards and best practices.
- **prettier**: Automatically formats code to maintain consistency, complementing eslint.
- **vite**: A build tool that enables fast development and testing environments.

### Installation Commands
  Important: Have NodeJs and Install Vite.
- General dependencies: `npm install` or `npm i`
- Validate the conection with the backend and run `npm run dev` to start the app.