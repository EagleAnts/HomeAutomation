import axios from "axios";
import decryptData from "./cryptoFunctions/decryption";

const decryptedGet = async (route) => {
  const res = await axios(`http://localhost:5000/${route}`);
  const decryptedData = await decryptData(res.data.Data);
  // console.log(decryptedData.encryptUserData);
  return decryptedData.encryptUserData;
};

export default decryptedGet;
