import axios from "axios";
import encryptData from "./cryptoFunctions/encrypt";
import decryptData from "./cryptoFunctions/decryption";

const encryptedPost = async (data, route, encryptedReturn=false) => {
  console.log(data);
  const encryptedData = encryptData(data);
  console.log(encryptedData);

  const res = await axios.post("http://localhost:5000/" + route, {
    Data : encryptedData,
  });
  if(encryptedReturn){
    const decryptedData = await decryptData(res.data.Data);
    console.log(decryptedData.encryptUserData)
    return decryptedData.encryptUserData;
  }
  console.log(res);
  return res;
};

export default encryptedPost;
