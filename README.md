# HNG13-stage-zero-task-build
Real-time Project based application of Knowledge: Build a simple RESTful API endpoint that returns my profile information along with a dynamic cat fact fetched from an external API.

# Profile API with Cat Fact

A simple RESTful API that returns profile information along with a dynamic cat fact fetched from an external API. Built as a backend task to demonstrate API consumption, JSON formatting, and dynamic responses.

## Features
- GET `/me` endpoint returning JSON with profile, UTC timestamp, and random cat fact.
- Integrates with [Cat Facts API](https://catfact.ninja/fact).
- Uses Node.js built-in `https` module for external fetches (no extra packages like axios).
- Error handling with fallbacks and logging.
- ESM syntax, environment variables, and best practices.

## Tech Stack
- **Runtime**: Node.js (v18+), Express.js
- **Modules**: ESM (import/export)
- **Dependencies**: 
  - `express` (for server)
- **Dev Dependencies**: 
  - `nodemon` (for auto-restart in dev)
- **Version Control**: Git

## Prerequisites
- Node.js (v18+)
- npm (v8+)
- Git
- VSCode (or any editor)

## Setup and Installation
1. Clone the repo:
   ```
   git clone https://github.com/your-username/repo-clone.git
   cd repo-clone
   ```
2. Install dependencies:
   ```
   npm install
   ```
3. Update profile details in `app.js` (replace placeholders in the response object):
   - `email`, `name`, `stack`.
4. Run locally:
   - Development: `npm run top` (uses nodemon)
   - Production: `npm start`

The server runs on `http://localhost:3000` (or PORT from env).


