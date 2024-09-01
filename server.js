const express = require("express");
const app = express();
const userRoutes = require("./routes/userRoutes");
const transactionRoutes = require("./routes/transactionRoutes");
require("dotenv").config();

// Middleware to parse JSON bodies
app.use(express.json());

// Routes
app.use("/api/users", userRoutes);
app.use("/api/transactions", transactionRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something went wrong!");
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
