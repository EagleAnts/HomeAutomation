import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";

import { getDevices } from "../redux/actions/action";

export const useFetch = (initialState) => {
  const [loading, setLoading] = useState(initialState);

  const dispatch = useDispatch();
  useEffect(() => {
    const fetchDevice = async () => {
      const res = await fetch("http://192.168.0.118:5000/api/device");
      const data = await res.json();
      dispatch(getDevices(data));
      setLoading(false);
    };

    fetchDevice();
  }, [loading]);

  return [loading, setLoading];
};
