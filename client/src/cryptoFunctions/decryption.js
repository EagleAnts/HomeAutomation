const CryptoJS = require("crypto-js");
let decryptParams;

export const getEncryptParams = () => {
  return decryptParams;
};

export const setDecryptParams = (val) => {
  decryptParams = val;
};

export default function decryptData(Data) {
  const bytes = CryptoJS.AES.decrypt(Data, decryptParams.value);
  console.log(JSON.parse(bytes.toString(CryptoJS.enc.Utf8)));
  return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
}
