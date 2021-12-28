import axios from "axios";
import decryptData from "./cryptoFunctions/decryption";
import { useSelector } from "react-redux";

const decryptedGet = async (route, userID) => {
  const res = await axios(`http://localhost:5000/${route}`, {
    headers: {
      userid: userID,
    },
  });
  const decryptedData = await decryptData(res.data.Data);
  // console.log(decryptedData.encryptUserData);
  return decryptedData.encryptUserData;
};

export default decryptedGet;
