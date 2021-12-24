const CryptoJS = require("crypto-js");

export default function encryptUserData(key, iv, data) {
  const encrypted = CryptoJS.AES.encrypt(JSON.stringify(data), key, {
    iv: iv,
  }).ciphertext;

  const concatenned = CryptoJS.lib.WordArray.create().concat(encrypted);

  return { Data: concatenned.toString(CryptoJS.enc.Base64) };
}
