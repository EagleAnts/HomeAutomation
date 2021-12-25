import React, { useRef } from "react";
// import { connect } from "react-redux";

import { useSelector } from "react-redux";

import { Device } from "./Device";

const divColors = [
  ["#7D61CE", "#DB947E", "#F4C426", "#E4C0D2"],
  ["#3ACBE8", "#29388B", "#CB207C", "#A13480"],
  ["#2C5533", "#7C839A", "#65A5AB", "#C6C116"],
  ["#31EE97", "#FF9160", "#FEB6B8", "#28A2C9"],
];
const generateRandomColors = (index) => {
  const color =
    divColors[index][Math.floor(Math.random() * divColors[index].length)];

  return color;
};

const UserDevices = () => {
  const myDevices = useSelector((state) => state.UserDevices.myDevices);
  const userDevicesList = [];
  Object.keys(myDevices).map((el) => {
    userDevicesList.push(...myDevices[el]);
  });
  userDevicesList.sort(() => 0.5 - Math.random());

  let myDevicesList = [];
  if (userDevicesList.length !== 0) {
    myDevicesList = userDevicesList.slice(0, 4).map((el, index) => {
      return (
        <Device
          key={el.deviceID}
          id={el.deviceID}
          description={el.name}
          icon={el.description.icon}
          area={el.area}
          backgroundColor={generateRandomColors(index)}
        />
      );
    });
  }
  return <>{myDevicesList.length !== 0 ? myDevicesList : "No Devices"}</>;
};

export default UserDevices;
