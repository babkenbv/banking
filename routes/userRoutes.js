const express = require("express");
const router = express.Router();
const {
  registerUser,
  updateUserBalance,
} = require("../controllers/userController");

router.post("/register", registerUser);

router.put("/balance", updateUserBalance);

module.exports = router;
