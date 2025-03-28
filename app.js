require("dotenv").config();
const express = require("express");
const app = express();
const connectDB = require("./db/connect");
const productsRouter = require('./routes/products')
require('express-async-errors')


const notFoundMiddleware = require("./middleware/not-found");
const errorMiddleware = require("./middleware/error-handler");

// Middleware
app.use(express.json());

// Routes
app.get("/", (req, res) => {
  res.send('<h1>Store API</h1> <a href="/api/v1/products"> Products Routes</a>');
});

app.use('/api/v1/products', productsRouter)

// Middleware for handling errors
app.use(notFoundMiddleware);
app.use(errorMiddleware);

const port = process.env.PORT || 5000;

const start = () => {
  app.listen(port, async () => {
    console.log(`Server is listening on port ${port}`);

    try {
      await connectDB(); // Connect to MongoDB AFTER server starts
    } catch (error) {
      console.error("MongoDB connection failed:", error);
    }
  });
};

start();

