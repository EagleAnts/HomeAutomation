import React from "react";
import { useState } from "react";
import rsaEncrypt from "../cryptoFunctions/RSAEncryption";
const Login = (props) => {
  const [regFlag, setRegFlag] = useState(false);
  const [passwd, setPasswd] = useState("");
  const [confPasswd, setConfPasswd] = useState("");
  const [passwdFlag, setPasswdFlag] = useState(true);
  const [errMess, setErrMess] = useState("");

  function confirmPasswd(e) {
    const val = e.target.value;
    setConfPasswd(val);
    val === passwd ? setPasswdFlag(true) : setPasswdFlag(false);
  }

  function loginUser(e) {
    e.preventDefault();
    const target = e.target;
    const val = {};
    val[target[0].name] = target[0].value;
    val[target[1].name] = target[1].value;
    rsaEncrypt(val, "login")
      .then((res) => {
        if (res.status === 200) props.redirectHome();
        else {
          setRegFlag(false);
          setErrMess(res.data);
        }
      })
      .catch((error) => {
        console.error("The Promise is rejected!", error);
      });
  }

  function regUser(e) {
    e.preventDefault();
    const target = e.target;
    const val = {};
    let i = 0;
    while (i < 6) {
      val[target[i].name] = target[i].value;
      i++;
    }

    rsaEncrypt(val, "register")
      .then((res) => {
        if (res.status === 200) props.redirectHome();
        else {
          setRegFlag(false);
          setErrMess(res.data);
        }
      })
      .catch((error) => {
        console.error("The Promise is rejected!", error);
      });
  }

  return (
    <div className="form-container">
      <header>
        <h1>Home Automation</h1>
      </header>
      <form
        id={regFlag ? "register" : "login"}
        className="create-note"
        method="post"
        onSubmit={regFlag ? regUser : loginUser}
      >
        <h1>{regFlag ? "Register" : "Login"}</h1>
        <h5 className={!errMess ? "no-error" : "error"}>{errMess}</h5>
        {regFlag && (
          <label htmlFor="First Name">
            <input
              type="text"
              name="firstName"
              placeholder="First Name"
              required
            />
          </label>
        )}
        {regFlag && (
          <label htmlFor="MiddleName">
            <input type="text" name="middleName" placeholder="Middle Name" />
          </label>
        )}
        {regFlag && (
          <label htmlFor="Last Name">
            <input type="text" name="lastName" placeholder="Last Name" />
          </label>
        )}
        <label htmlFor="Email">
          <input
            type="email"
            name="email"
            onInput={() => {
              setErrMess("");
            }}
            placeholder="Email Address"
            required
          />
        </label>
        {/* {regFlag && (
          <label htmlFor="PhoneNo">
            <p>Mobile Number : </p>
            <input
              type="tel"
              name="phoneNumber"
              placeholder="Mobile Number"
              required
            />
          </label>
        )} */}
        {/* {regFlag&&<button>Verify</button>} */}
        <label htmlFor="Password">
          <input
            onChange={(e) => {
              setPasswd(e.target.value);
            }}
            onInput={() => {
              setErrMess("");
            }}
            type="password"
            name="password"
            placeholder="Password"
            value={passwd}
            required
          />
        </label>
        {regFlag && (
          <label htmlFor="ConfirmPassword">
            <input
              type="password"
              name="confirmPassword"
              onChange={confirmPasswd}
              value={confPasswd}
              placeholder="Confirm Password"
              required
            />
            <h5 className="error">{!passwdFlag && "Passwords Do Not Match"}</h5>
          </label>
        )}
        <button className="submit-button">Submit</button>
        <h5 className="expand-form" onClick={() => setRegFlag(!regFlag)}>
          {regFlag
            ? "Already have an account? Click to Login"
            : "New User? Click to Register"}
        </h5>
      </form>
      <footer>
        <p>{new Date().getFullYear()}</p>
      </footer>
    </div>
  );
};

export default Login;
