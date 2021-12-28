import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import App from "./App";
import Loading from "./Loading";
import Login from "./components/Login";
import axios from "axios";
import rsaEncrypt from "./cryptoFunctions/RSAEncryption";
import { addUserDetails } from "./redux/actions/action";

axios.defaults.withCredentials = true;

const LoginSession = () => {
  const dispatch = useDispatch();
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
      const res = await axios.post(
        `http://localhost:${process.env.PORT || 5000}/`,
        {}
      );
      if (res.data.sessionExist === true) {
        dispatch(
          addUserDetails({
            userID: res.data.userID,
            username: res.data.username,
          })
        );
        style.href = "./css/default.css";
        rsaEncrypt({}, "setUp")
          .then((res) => console.log(res))
          .catch((err) => console.log(err));
        console.log("qwerty1");

        setLogHomeFlag(true);
      } else {
        style.href = "./css/loginStyle.css";
      }
      console.log("//");
      console.log(res);
      console.log("//");
      // return data;
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
