import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";

import { getDevices, loadUserDevices } from "../redux/actions/action";

export const useFetch = (initialState) => {
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(initialState);

  useEffect(() => {
    const fetchDevice = async () => {
      const res = await fetch("http://localhost:5000/api/device");
      const data = await res.json();
      dispatch(getDevices(data));
      data.forEach((el) => dispatch(loadUserDevices({ id: el.deviceID })));
      setLoading(false);
    };

    fetchDevice();
  }, [dispatch]);

  return [loading, setLoading];
};
