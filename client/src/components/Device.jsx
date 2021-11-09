import React, { useContext, useEffect } from "react";
import { SocketContext } from "../context/socket";

import { changeStatus } from "../redux/actions/action";

import { useDispatch, useSelector } from "react-redux";
import { Zoom, Tooltip, Typography } from "@mui/material";

import { IconContext } from "react-icons";
import { AmberSwitch } from "./Switch";

const DeviceStatus = (props) => {
  const dispatch = useDispatch();

  const [isActive, setActive] = React.useState(false);

  const [deviceActive] = useSelector((state) =>
    state.UserDevices.DeviceStatus.filter((el) => el.id === props.id).map(
      (el) => el.active
    )
  );

  const currentSocket = useContext(SocketContext);
  const onClickHandler = (deviceID) => {
    dispatch(changeStatus({ id: deviceID, active: !isActive }));
    setActive(!isActive);
    currentSocket.emit("device_event", { id: deviceID, active: !isActive });
  };

  useEffect(() => {
    setActive(deviceActive);
  }, [deviceActive]);
  return (
    <>
      <p id="device-status">{isActive ? "ON" : "OFF"}</p>
      <AmberSwitch
        checked={isActive || false}
        onChange={() => onClickHandler(props.id)}
      />
    </>
  );
};

export const Device = (props) => {
  return (
    <Tooltip
      key={props.id}
      title={
        <Typography sx={{ textTransform: "capitalize" }} fontSize="1rem">
          {props.area}
        </Typography>
      }
      arrow
      TransitionComponent={Zoom}
    >
      <div
        id={props.description + "-" + props.area}
        className="note"
        style={{
          backgroundColor: props.backgroundColor,
        }}
      >
        <DeviceStatus id={props.id} />
        {/* <p id="device-status">{isActive ? "ON" : "OFF"}</p>
        <AmberSwitch onChange={() => onClickHandler(props.id)} /> */}

        <IconContext.Provider value={{ className: "react-icons" }}>
          <div>
            <img src={props.icon} alt="icon" height="60px" width="60px" />
          </div>
        </IconContext.Provider>
        <p>{props.description}</p>
      </div>
    </Tooltip>
  );
};
