import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  getDevices,
  loadUserDevices,
  addUserDetails,
} from "../redux/actions/action";
import encryptedGet from "../encryptedGet";

export const useFetch = (initialState) => {
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(initialState);

  useEffect(() => {
    console.log("Fetching Devices");
    async function fetchDevices() {
      try {
        const res = await encryptedGet("api/device");
        let data = res.device;
        dispatch(addUserDetails(res.userData));
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
          area.push(el.area);
          sortDeviceByArea[el.area] = [];
        }
        sortDeviceByArea[el.area].push(el);
      });
      dispatch(getDevices(sortDeviceByArea));

      const deviceList = data.map((el) => {
        return { id: el.deviceID, active: el.status };
      });
      dispatch(loadUserDevices(deviceList));

      setLoading(false);
    }

    fetchDevices();
  }, [dispatch]);

  return [loading, setLoading];
};
