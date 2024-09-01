const db = require("../db/db");

const handleTransaction = async (req, res) => {
  const { senderEmail, receiverEmail, amount } = req.body;

  if (!senderEmail || !receiverEmail || !amount) {
    return res
      .status(400)
      .json({ error: "Sender, receiver, and amount are required" });
  }

  const connection = await db.getConnection();

  try {
    // Start a new transaction
    await connection.beginTransaction();

    // Get sender details and check balance
    const [sender] = await connection.query(
      "SELECT id, balance FROM users WHERE email = ? FOR UPDATE",
      [senderEmail]
    );
    if (!sender.length) throw new Error("Sender not found");
    if (sender[0].balance < amount) throw new Error("Insufficient funds");

    // Get receiver details
    const [receiver] = await connection.query(
      "SELECT id FROM users WHERE email = ? FOR UPDATE",
      [receiverEmail]
    );
    if (!receiver.length) throw new Error("Receiver not found");

    // Deduct from sender
    await connection.query(
      "UPDATE users SET balance = balance - ? WHERE id = ?",
      [amount, sender[0].id]
    );

    // Add to receiver
    await connection.query(
      "UPDATE users SET balance = balance + ? WHERE id = ?",
      [amount, receiver[0].id]
    );

    // Record the transaction
    await connection.query(
      "INSERT INTO transactions (sender_id, receiver_id, amount) VALUES (?, ?, ?)",
      [sender[0].id, receiver[0].id, amount]
    );

    // Commit the transaction
    await connection.commit();
    res.status(200).json({ message: "Transaction successful" });
  } catch (error) {
    // Rollback transaction in case of error
    await connection.rollback();
    res.status(500).json({ error: error.message });
  } finally {
    // Release the connection back to the pool
    connection.release();
  }
};

module.exports = { handleTransaction };
