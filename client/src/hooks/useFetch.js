import { useState, useLayoutEffect } from "react";
import { useDispatch } from "react-redux";
import { Redirect } from "react-router-dom";
import decryptUserData from "../cryptoFunctions/decryption";

import { getDevices, loadUserDevices } from "../redux/actions/action";

export const useFetch = (initialState) => {
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(initialState);

  useLayoutEffect(() => {
    async function fetchDevices() {
      try {
        const res = await fetch("http://localhost:5000/api/device");
        const data = await res.json();
        const { Data, password } = data;
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

    fetchDevices();
  }, []);

  return [loading, setLoading];
};
