import React from "react";
// import { connect } from "react-redux";

import { useSelector } from "react-redux";

import { Device } from "./Device";

const divColors = [
  "#7D61CE",
  "#DB947E",
  "#F4C426",
  "#FF9160",
  "#3ACBE8",
  "#29388B",
  "#CB207C",
  "#0586ED",
  "#2C5533",
  "#7C839A",
  "#65A5AB",
  "#C6C116",
  "#31EE97",
  "#7A58C4",
  "#FEB6B8",
  "#28A2C9",
  "#E4C0D2",
  "#A13480",
];

const generateRandomColors = () => {
  return divColors[Math.floor(Math.random() * divColors.length)];
};

const UserDevices = () => {
  const myDevices = useSelector((state) => state.UserDevices.myDevices);

  const myDevicesList = myDevices.slice(0, 4).map((el) => {
    return (
      <Device
        key={el.deviceID}
        id={el.deviceID}
        description={el.name}
        icon={el.description.icon}
        area={el.area}
        backgroundColor={generateRandomColors()}
      />
    );
  });
  return <>{myDevicesList}</>;
};

export default UserDevices;
