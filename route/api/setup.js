const express = require("express");
const router = express.Router();
const CryptoJS = require("crypto-js");

router.post("/", function (req, res) {
  res.send("OK");
});

module.exports = router;
