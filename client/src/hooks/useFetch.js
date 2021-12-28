import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDevices, loadUserDevices } from "../redux/actions/action";
import encryptedGet from "../encryptedGet";

export const useFetch = (initialState) => {
  const dispatch = useDispatch();
  const userID = useSelector((state) => state.UserDetails.userID);
  const [loading, setLoading] = useState(initialState);

  useEffect(() => {
    console.log("Fetching Devices");
    async function fetchDevices() {
      const res = await encryptedGet("api/device", userID);
      try {
        let data = res.device;
        if (!data) throw new Error("No Data");
        else saveDevices(data);
      } catch (err) {
        console.log(err.message);
        setLoading(false);
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
