import { useState, useLayoutEffect } from "react";
import { useDispatch } from "react-redux";
import { getDevices, loadUserDevices } from "../redux/actions/action";

export const useFetch = (initialState) => {
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(initialState);

  useLayoutEffect(() => {
    async function fetchDevices() {
      try {
        const res = await fetch("http://localhost:5000/api/device");
        const data = await res.json();
        if (data.length === 0) throw new Error("No Data");
        else saveDevices(data);
      } catch (err) {
        console.log(err.message);
      }
    }

    function saveDevices(data) {
      const sortDeviceByArea = {};
      data.forEach((el) => {
        if (!sortDeviceByArea[el.area]) {
          sortDeviceByArea[el.area] = [];
        } else {
          sortDeviceByArea[el.area].push(el);
        }
      });

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
