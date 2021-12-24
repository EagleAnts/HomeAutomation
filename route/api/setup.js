const express = require("express");
const router = express.Router();
const CryptoJS = require("crypto-js");

const salt_len = 16;
const iv_len = 16;

function aesKeyGenerater(req) {
  const encrypted = CryptoJS.enc.Base64.parse(req.body.Data);

  const salt = CryptoJS.lib.WordArray.create(
    encrypted.words.slice(0, salt_len / 4)
  );

  const iv = CryptoJS.lib.WordArray.create(
    encrypted.words.slice(0 + salt_len / 4, (salt_len + iv_len) / 4)
  );

  const key = CryptoJS.PBKDF2(req.body.password, salt, {
    keySize: 256 / 32,
    iterations: 10000,
    hasher: CryptoJS.algo.SHA256,
  });

  //Store key and iv here at this moment
}

router.post("/", function (req, res) {
  console.log(req.body);
  aesKeyGenerater(req);
  res.send("OK");
});

module.exports = router;
