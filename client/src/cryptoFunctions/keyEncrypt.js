import { setDecryptParams } from "./decryption";
import { setEncryptParams } from "./encrypt";
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

export function keyEncryption() {
  const password = generateString(32);

  setDecryptParams({ value: password });
  setEncryptParams({ value: password });

  return { key: password };
}
