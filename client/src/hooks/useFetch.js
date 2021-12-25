import { useState, useLayoutEffect } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { getDevices, loadUserDevices } from "../redux/actions/action";

export const useFetch = (initialState) => {
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(initialState);

  useLayoutEffect(() => {
    async function fetchDevices() {
      try {
        const res = await axios("http://localhost:5000/api/device");
        const data = res.data;
        if (data.length === 0) throw new Error("No Data");
        else saveDevices(data);
      } catch (err) {
        setLoading(false);
        console.log(err.message);
      }
    }

    function saveDevices(data) {
      const area = [];
      const sortDeviceByArea = {};
      data.forEach((el) => {
        if (!area.includes(el.area)) {
          sortDeviceByArea[el.area] = [];
        }
        sortDeviceByArea[el.area].push(el);
      });

      console.log(sortDeviceByArea);
      dispatch(getDevices(sortDeviceByArea));

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
