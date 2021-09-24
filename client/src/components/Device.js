import React from "react";
import Switch from "@mui/material/Switch";
import { IconContext } from "react-icons";
import { alpha, styled } from "@mui/system";
import { amber } from "@mui/material/colors";

const AmberSwitch = styled(Switch)(({ theme }) => ({
  "& .MuiSwitch-switchBase.Mui-checked": {
    color: amber[700],
  },
  "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
    backgroundColor: amber[700],
  },
}));

export const Device = (props) => {
  const [status, setStatus] = React.useState(0);

  const onClickHandler = () => {
    setStatus(!status);
  };

  return (
    <div className={status ? "note active-note" : "note"}>
      <p id="status">{status ? "ON" : "OFF"}</p>
      <AmberSwitch onChange={onClickHandler} />
      <IconContext.Provider value={{ className: "react-icons" }}>
        {props.img == null ? (
          props.icon
        ) : (
          <img src={props.img} alt="device-icon" />
        )}
      </IconContext.Provider>
      <p>{props.name}</p>
    </div>
  );
};
