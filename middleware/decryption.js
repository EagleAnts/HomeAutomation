require("dotenv").config();
const CryptoJS = require("crypto-js");
const crypto = require("crypto");

// function encryptionParams(data) {
//   const key = CryptoJS.lib.WordArray.create(
//     CryptoJS.enc.Base64.parse(data.key)
//   );
//   return { key };
// }

function aesDataDecryption(req) {
  const bytes = CryptoJS.AES.decrypt(
    req.body.Data,
    req.session.encryptParams.key
  );
  // console.log(JSON.parse(bytes.toString(CryptoJS.enc.Utf8)));
  req.body = JSON.parse(bytes.toString(CryptoJS.enc.Utf8)).encryptUserData;
}

function rsaDataDecryption(req) {
  const privateKey = process.env.PRIVATE_KEY.replace(/\\n/g, "\n");
  const rsaPrivateKey = {
    key: privateKey,
    passphrase: "",
    padding: crypto.constants.RSA_PKCS1_PADDING,
  };

  const decryptedMessage = crypto.privateDecrypt(
    rsaPrivateKey,
    Buffer.from(req.body.key_data, "base64")
  );

  req.body = JSON.parse(decryptedMessage.toString("utf8"));
}

function decryptUserData(req, res, next) {
  if (req.method === "POST") {
    console.log("Decrypting...");
    if (req.body.typeRSA) {
      if (req.body.typeRSA === "setUp") {
        rsaDataDecryption(req);
        req.session.encryptParams = req.body.aesKey;
        req.session.save();
      } else {
        rsaDataDecryption(req);
        req.encryptParams = req.body.aesKey;
      }
      req.body = req.body.data;
    } else {
      aesDataDecryption(req);
    }
  }
  console.log("Decrypting...2");
  next();
}

module.exports = decryptUserData;
