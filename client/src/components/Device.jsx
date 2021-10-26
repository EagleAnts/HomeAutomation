import React, { useContext } from "react";
import { SocketContext } from "../context/socket";

import { changeStatus } from "../redux/actions/action";
import { connect } from "react-redux";

import { FaFan } from "react-icons/fa";
import { IconContext } from "react-icons";
import { AmberSwitch } from "./Switch";

const DeviceComponent = (props) => {
  const [active, setActive] = React.useState(false);

  const currentSocket = useContext(SocketContext);

  const onClickHandler = (e) => {
    const id = e.target.id;
    props.changeStatus({ id, active: !active });
    setActive(!active);
    currentSocket.emit("device_event", { id: id, active: !active });
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
