const CryptoJS = require("crypto-js");
const salt_len = 16;
const iv_len = 16;

function decryptUserData(req, res, next) {
  if (req.method === "POST") {
    console.log("Decrypting...");
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

    const decrypted = CryptoJS.AES.decrypt(
      {
        ciphertext: CryptoJS.lib.WordArray.create(
          encrypted.words.slice((salt_len + iv_len) / 4)
        ),
      },
      key,
      { iv: iv }
    );
    req.body = JSON.parse(decrypted.toString(CryptoJS.enc.Utf8));
  }
  next();
}

module.exports = decryptUserData;
