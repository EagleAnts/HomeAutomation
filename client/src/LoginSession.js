import React, { useState, useEffect } from "react";
import App from "./App";
import Loading from "./Loading";
import Login from "./components/Login";
import axios from "axios";
import rsaEncrypt from "./cryptoFunctions/RSAEncryption";

axios.defaults.withCredentials = true;

const LoginSession = () => {
  const [logHomeFlag, setLogHomeFlag] = useState(false);
  const [loading, setLoading] = useState(true);
  const [style] = useState(document.getElementById("style-direction"));
  const redirectHome = () => {
    if (!logHomeFlag) style.href = "./css/default.css";
    else style.href = "./css/loginStyle.css";
    setLogHomeFlag(!logHomeFlag);
  };
  useEffect(() => {
    const checkLoggedIn = async (setLogHomeFlag, style) => {
      const data = await axios.post(
        `http://localhost:${process.env.PORT || 5000}/`,
        {}
      );
      if (data.data === true) {
        style.href = "./css/default.css";
        rsaEncrypt({}, "setUp")
          .then((data) => console.log(data))
          .catch((err) => console.log(err));
        console.log("qwerty1");

        setLogHomeFlag(true);
      } else {
        style.href = "./css/loginStyle.css";
      }
      console.log("//");
      console.log(data);
      console.log("//");
      return data;
    };
    checkLoggedIn(setLogHomeFlag, style).then(() => setLoading(false));
  }, []);

  return loading ? (
    <Loading />
  ) : !logHomeFlag ? (
    <Login redirectHome={redirectHome} />
  ) : (
    <App />
  );
};

export default LoginSession;
