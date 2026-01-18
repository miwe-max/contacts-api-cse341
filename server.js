// Description: Main server file for Contacts API
const express = require('express');
const contactRoutes = require('./routes/contacts');
const { connectToMongoDB } = require('./models/contactModel');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

const app = express();
const port = 3000;

// Middleware to parse JSON
app.use(express.json());

// Swagger UI setup
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Root route
app.get('/', (req, res) => {
  res.send('Welcome to Contacts API');
});

// route Connect routes
app.use('/contacts', contactRoutes);

// Start server and connect to MongoDB
async function startServer() {
  await connectToMongoDB();
  app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
    console.log(`Swagger docs available at http://localhost:${port}/api-docs`);
  });
}

startServer();