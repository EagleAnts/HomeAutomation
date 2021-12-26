const CryptoJS = require("crypto-js");

function encryptUserData(req, res) {
  let encryptUserData = req.encryptUserData;
  var ciphertext = CryptoJS.AES.encrypt(
    JSON.stringify({encryptUserData}),
    req.session.encryptParams.key
  ).toString();
  res.json({ Data:ciphertext});
}

module.exports = encryptUserData;
