const CryptoJS = require("crypto-js");

let encryptParams;

export const getEncryptParams = () => {
  return encryptParams;
};

export const setEncryptParams = (val) => {
  encryptParams = val;
};
export default function encryptData(encryptUserData) {
  let ciphertext = CryptoJS.AES.encrypt(
    JSON.stringify({ encryptUserData }),
    encryptParams.value
  ).toString();
  return ciphertext;
}
