const express = require("express");
const router = express.Router();

const devices = [
  { id: "DEDEDJIEDDEJI", name: "Refrigerator" },
  { id: "SDSDJSDNVNJIF", name: "Fans" },
];

router.get("/", (req, res) => {
  res.json(devices);
});

module.exports = router;
