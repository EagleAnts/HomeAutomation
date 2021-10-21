import React from "react";

import { changeStatus } from "../redux/actions/action";
import { connect } from "react-redux";
// Icons

// import { CgBolt } from "react-icons/cg";
// import { CgSmartHomeRefrigerator } from "react-icons/cg";
// import { HiOutlineLightBulb } from "react-icons/hi";
import { FaFan } from "react-icons/fa";
import { IconContext } from "react-icons";
import { AmberSwitch } from "./Switch";

const DeviceComponent = (props) => {
  const [active, setActive] = React.useState(false);

  const onClickHandler = (e) => {
    const id = e.target.id;
    props.changeStatus({ id, active: !active });
    setActive(!active);
  };

  return (
    <div
      id={props.id}
      className="note"
      style={{
        backgroundColor: props.backgroundColor,
      }}
    >
      <p id="status">{active ? "ON" : "OFF"}</p>
      <AmberSwitch id={props.id} onChange={onClickHandler.bind(this)} />

      <IconContext.Provider value={{ className: "react-icons" }}>
        {/* {props.img == null ? (
          props.icon
        ) : (
          <img src={props.img} alt="device-icon" />
        )} */}
        <FaFan />
      </IconContext.Provider>
      <p>{props.description}</p>
    </div>
  );
};

export const Device = connect(null, { changeStatus })(DeviceComponent);
