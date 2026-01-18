  # Contacts API

  A RESTful API for managing contacts, built with Express and MongoDB Atlas.

  ## Deployment

  The API is deployed at: [https://contacts-api-cse341-z6ar.onrender.com/](https://contacts-api-cse341-z6ar.onrender.com/)
  ## Project Structure

  The project follows MVC architecture:
  - **Models** (`models/contactModel.js`): Handles MongoDB connection and database operations.
  - **Controllers** (`routes/contacts.js`): Defines Express routes and input validation.
  - **Server** (`server.js`): Initializes Express, connects routes, and starts the server.

  ## Setup

  1. Clone the repository:
     ```bash
     git clone 
     ```

  2. Install dependencies:
     ```bash
     npm install
     ```

  3. Create a `.env` file:
     ```bash
     echo "MONGO_URI=mongodb+srv://<user>:<password>@contactscluster.9rtk9fa.mongodb.net/contactsDB?retryWrites=true&w=majority" > .env
     ```

  4. Start the server:
     ```bash
     npm start
     ```

  ## API Routes

  - **GET /contacts**: Retrieve all contacts.
  - **GET /contacts/:id**: Retrieve a contact by ID.
  - **POST /contacts**: Create a new contact (requires `name`, `email`, `phone`).
  - **PUT /contacts/:id**: Update a contact by ID.
  - **DELETE /contacts/:id**: Delete a contact by ID.

  ## Example Request

  ```bash
  curl -X POST http://localhost:3000/contacts -H "Content-Type: application/json" -d '{"name":"John Doe","email":"john@example.com","phone":"123-456-7890"}'