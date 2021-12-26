const CryptoJS = require("crypto-js");
const salt_len = 16;
const iv_len = 16;

export default function decryptDevices(key, iv, Data) {
  const encrypted = CryptoJS.enc.Base64.parse(Data);

  const decrypted = CryptoJS.AES.decrypt(
    {
      ciphertext: CryptoJS.lib.WordArray.create(
        encrypted.words.slice((salt_len + iv_len) / 4)
      ),
    },
    key,
    { iv: iv }
  );

  return JSON.parse(decrypted.toString(CryptoJS.enc.Utf8));
}
