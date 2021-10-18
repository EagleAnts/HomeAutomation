import React from "react";

// Icons

// import { CgBolt } from "react-icons/cg";
// import { CgSmartHomeRefrigerator } from "react-icons/cg";
// import { HiOutlineLightBulb } from "react-icons/hi";
import { FaFan } from "react-icons/fa";

import { IconContext } from "react-icons";

import { AmberSwitch } from "./Switch";

export const Device = (props) => {
  const [status, setStatus] = React.useState(0);

  const onClickHandler = () => {
    setStatus(!status);
  };

  return (
    <div
      id={props.id}
      className="note"
      style={{
        backgroundColor: props.backgroundColor,
      }}
    >
      <p id="status">{status ? "ON" : "OFF"}</p>
      <AmberSwitch onChange={onClickHandler} />

      <IconContext.Provider value={{ className: "react-icons" }}>
        {/* {props.img == null ? (
          props.icon
        ) : (
          <img src={props.img} alt="device-icon" />
        )} */}
        <FaFan />
      </IconContext.Provider>
      <p>{props.id}</p>
    </div>
  );
};
