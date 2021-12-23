const CryptoJS = require("crypto-js");

// program to generate random strings

// declare all characters
const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

const specialCharacters = "!@#$%^&*(){}[]";

function generateString(length) {
  let result = "";
  const charactersLength = characters.length;
  const specialCharactersLength = specialCharacters.length;
  for (let i = 0; i < length; i++) {
    result +=
      Math.random() < 0.75
        ? characters.charAt(Math.floor(Math.random() * charactersLength))
        : specialCharacters.charAt(
            Math.floor(Math.random() * specialCharactersLength)
          );
  }

  return result;
}

export default function encryptUserData(data) {
  const password = generateString(32);

  const salt = CryptoJS.lib.WordArray.random(16);
  const iv = CryptoJS.lib.WordArray.random(16);

  const key = CryptoJS.PBKDF2(password, salt, {
    keySize: 256 / 32,
    iterations: 10000,
    hasher: CryptoJS.algo.SHA256,
  });

  const encrypted = CryptoJS.AES.encrypt(JSON.stringify(data), key, {
    iv: iv,
  }).ciphertext;

  const concatenned = CryptoJS.lib.WordArray.create()
    .concat(salt)
    .concat(iv)
    .concat(encrypted);

  return { Data: concatenned.toString(CryptoJS.enc.Base64), password };
}
