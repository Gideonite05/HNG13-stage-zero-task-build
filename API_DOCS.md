#### Overview
This is a simple RESTful API built with Node.js and Express.js. It exposes a single GET endpoint `/me` that returns static profile information combined with dynamic data: a current UTC timestamp and a random cat fact fetched from the external [Cat Facts API](https://catfact.ninja/fact).

- **Base URL**: Locally: `http://localhost:3000`  
  Deployed: Use the hosting platform's provided URL (e.g., on Railway: `https://your-app.up.railway.app`).
- **Content-Type**: All responses are in `application/json`.
- **Authentication**: None required (public endpoint).
- **Rate Limiting**: Not implemented (add via `express-rate-limit` npm package if needed for production).
- **CORS**: Optional middleware is commented in the code; enable if consuming from a frontend.
- **Error Handling**: 
  - If the external Cat Facts API fails (e.g., network error, timeout), a fallback fact ("No cat fact available") is used, and the error is logged. The endpoint still returns 200 OK with "success" status.
  - Server errors return 500 Internal Server Error with `{ "status": "error", "message": "Internal server error" }`.
- **Best Practices Followed**:
  - Uses environment variables (e.g., `PORT`).
  - Logging via `console.log` for requests and errors.
  - Timeout (5 seconds) on external API calls.
  - ESM syntax for modern JavaScript.
  - Graceful fallbacks and HTTP status codes.

#### Endpoints

##### GET /me
- **Description**: Retrieves profile information with a dynamic timestamp and cat fact.
- **Method**: GET
- **Path**: `/me`
- **Query Parameters**: None
- **Request Body**: None
- **Success Response**:
  - **Status Code**: 200 OK
  - **Headers**: `Content-Type: application/json`
  - **Body**:
    ```json
    {
      "status": "success",
      "user": {
        "email": "<your-email>",  // e.g., "you@example.com"
        "name": "<your-full-name>",  // e.g., "John Doe"
        "stack": "<your-stack>"  // e.g., "Node.js/Express"
      },
      "timestamp": "2025-10-16T12:34:56.789Z",  // Current UTC ISO 8601 format, updates per request
      "fact": "<random cat fact>"  // Fetched dynamically, e.g., "Cats have five toes on their front paws."
    }
    ```
- **Error Response**:
  - **Status Code**: 500 Internal Server Error (if unexpected server issue)
  - **Body**:
    ```json
    {
      "status": "error",
      "message": "Internal server error"
    }
    ```
- **cURL Example**:
  ```
  curl -X GET http://localhost:3000/me
  ```
- **Postman Usage** (as per earlier steps):
  - Create a GET request to `[base-url]/me`.
  - Send and inspect the JSON response.
  - Test multiple times to see varying `timestamp` and `fact`.

#### External API Integration
- **Cat Facts API**: `https://catfact.ninja/fact` (GET request).
- **Behavior**: Fetched on every `/me` request using Node's built-in `https` module.
- **Timeout**: 5000ms (5 seconds).
- **Fallback**: If unavailable, uses "No cat fact available" without failing the endpoint.

#### Dependencies
- Runtime: `express` (^4.18.0 or latest).
- Dev: `nodemon` (^3.0.0 or latest).
- No additional fetch libraries (uses built-in `https`).

#### Testing
- Locally: Run `npm run top` and hit the endpoint.
- Error Simulation: Modify the cat API URL in code to a invalid one and test fallback.

For updates, refer to the source code in `app.js`.
