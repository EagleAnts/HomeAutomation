import { useState, useLayoutEffect } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import decryptUserData from "../cryptoFunctions/decryption";
import { getDevices, loadUserDevices } from "../redux/actions/action";
import JSEncrypt from "jsencrypt";
import { keyEncryption } from "../cryptoFunctions/keyEncrypt";

const PUBLIC_KEY = `-----BEGIN PUBLIC KEY-----
    MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAyUR+y+uiC6TOKTGYimBT
    DNivrxv4H98IJt9BAoX6c43Fe0yRrMoARzNDQi26m3z6Jbptw0yZ3NNAfbGs1cyA
    USC2k4OD6y8as1oCGBa/Ij/EkZJvt4i8Ol0kMEG/tkExQTGc8cd4Iz0/NyPhfiml
    6D0BwsheYAHhMXTqgxgesnQlmkd40FbvmCKBGPmKUj2/Uf/tgyotkhRvejIzx5D4
    er9HrpcTuq9bTiv/jIflCorODZCRHH3ZcJ0pkH2p15kx/iztLMz4gsxuHH3I3moV
    eWIRYeCi6pg4XCke0AwW5SgqBpkVbNNz4r9/s3op7Ke/R6+ew/G5OTKwjehQkpYz
    2wIDAQAB
    -----END PUBLIC KEY-----`;

export const useFetch = (initialState) => {
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(initialState);

  useLayoutEffect(() => {
    async function setupConnection() {
      try {
        const crypt = new JSEncrypt({ default_key_size: 2048 });
        crypt.setPublicKey(PUBLIC_KEY);

        const key = JSON.stringify(keyEncryption());
        const key_data = crypt.encrypt(key);

        const res = await axios.post("http://localhost:5000/api/setup", {
          key_data,
        });
      } catch (err) {
        console.log(err);
      }
    }

    async function fetchDevices() {
      try {
        const res = await axios("http://localhost:5000/api/device");
        const { Data, password } = res.data;
        const userData = await decryptUserData(Data, password);
        if (userData.length === 0) throw new Error("No userData");
        else saveDevices(userData);
      } catch (err) {
        console.log(err.message);
      }
    }

    function saveDevices(data) {
      dispatch(getDevices(data));
      const deviceList = data.map((el) => {
        return { id: el.deviceID, active: el.status };
      });
      dispatch(loadUserDevices(deviceList));

      setLoading(false);
    }

    setupConnection();
    fetchDevices();
  }, []);

  return [loading, setLoading];
};
