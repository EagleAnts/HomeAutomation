import axios from "axios";
import decryptData from "./cryptoFunctions/decryption";

export const decryptedPost = async (route) => {
  const res = await axios(`http://localhost:5000/${route}`);
  const decryptedData = await decryptData(res.data.Data);
  console.log(decryptedData.encryptUserData)
  return decryptedData.encryptUserData;
};

export default decryptedPost;
