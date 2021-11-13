import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";

import { getDevices, loadUserDevices } from "../redux/actions/action";

export const useFetch = (initialState) => {
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(initialState);

  useEffect(() => {
    const fetchDevice = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/device");
        const data = await res.json();
        if (data.length === 0) throw new Error("No Data");
        await dispatch(getDevices(data));
        await data.forEach((el) =>
          dispatch(loadUserDevices({ id: el.deviceID, active: el.status }))
        );
      } catch (err) {
        console.log(err.message);
        if (err.message === "No Data") {
          console.log("Refetching....");
          fetchDevice();
        }
      }
      setLoading(false);
    };

    fetchDevice();
  }, [dispatch]);

  return [loading, setLoading];
};
