const express = require("express");
const router = express.Router();
const { handleTransaction } = require("../controllers/transactionController");

router.post("/transfer", handleTransaction);

module.exports = router;
