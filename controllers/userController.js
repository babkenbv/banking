// controllers/userController.js

const db = require("../db/db");

// Register a new user with an optional initial balance
const registerUser = async (req, res) => {
  const { email, password, balance } = req.body;

  // Validate inputs
  if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required" });
  }

  const initialBalance = parseFloat(balance) || 0.0; // Ensure balance is a float, defaults to 0

  try {
    // Register the user and set the initial balance
    const [result] = await db.query(
      "INSERT INTO users (email, password, balance) VALUES (?, ?, ?)",
      [email, password, initialBalance]
    );

    res.status(201).json({
      message: "User registered successfully",
      userId: result.insertId,
    });
  } catch (error) {
    console.error(error); // Log error for debugging
    res.status(500).json({ error: "Error registering user" });
  }
};

// Update user balance
const updateUserBalance = async (req, res) => {
  const { email, amount } = req.body;

  // Validate inputs
  if (!email || amount == null) {
    return res.status(400).json({ error: "Email and amount are required" });
  }

  const updateAmount = parseFloat(amount); // Ensure amount is a float

  try {
    const [user] = await db.query("SELECT id FROM users WHERE email = ?", [
      email,
    ]);

    if (!user.length) {
      return res.status(404).json({ error: "User not found" });
    }

    // Update the user's balance
    await db.query("UPDATE users SET balance = balance + ? WHERE email = ?", [
      updateAmount,
      email,
    ]);

    res.status(200).json({ message: "User balance updated successfully" });
  } catch (error) {
    console.error(error); // Log error for debugging
    res.status(500).json({ error: "Error updating balance" });
  }
};

module.exports = { registerUser, updateUserBalance };
