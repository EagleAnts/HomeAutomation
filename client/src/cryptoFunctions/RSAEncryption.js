import JSEncrypt from "jsencrypt";
import { keyEncryption } from "./keyEncrypt";
import axios from "axios";

const PUBLIC_KEY = `-----BEGIN PUBLIC KEY-----
    MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAyUR+y+uiC6TOKTGYimBT
    DNivrxv4H98IJt9BAoX6c43Fe0yRrMoARzNDQi26m3z6Jbptw0yZ3NNAfbGs1cyA
    USC2k4OD6y8as1oCGBa/Ij/EkZJvt4i8Ol0kMEG/tkExQTGc8cd4Iz0/NyPhfiml
    6D0BwsheYAHhMXTqgxgesnQlmkd40FbvmCKBGPmKUj2/Uf/tgyotkhRvejIzx5D4
    er9HrpcTuq9bTiv/jIflCorODZCRHH3ZcJ0pkH2p15kx/iztLMz4gsxuHH3I3moV
    eWIRYeCi6pg4XCke0AwW5SgqBpkVbNNz4r9/s3op7Ke/R6+ew/G5OTKwjehQkpYz
    2wIDAQAB
    -----END PUBLIC KEY-----`;

export default async function rsaEncrypt(data, typeRSA) {
  try {
    const aesKey = await keyEncryption();
    let path = "";
    if (typeRSA === "login") {
      path = "auth/login";
    } else if (typeRSA === "register") {
      path = "users";
    } else if (typeRSA === "setUp") {
      path = "setup";
    }

    const crypt = new JSEncrypt({ default_key_size: 2048 });
    crypt.setPublicKey(PUBLIC_KEY);

    const key = JSON.stringify({ data, aesKey });
    const key_data = crypt.encrypt(key);
    const res = await axios.post(`http://localhost:5000/api/${path}`, {
      key_data,
      typeRSA,
    });
    return res;
  } catch (err) {
    console.log(err);
  }
}
