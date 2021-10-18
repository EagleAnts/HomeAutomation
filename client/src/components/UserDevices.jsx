import React, { useEffect } from "react";
import { connect } from "react-redux";
import { getDevices } from "../redux/actions/action";

import { Device } from "./Device";

const UserDevices = (props) => {
  const divColors = ["#7D61CE", "#DB947E", "#F4C426", "#FF9160", "#3ACBE8"];

  const { getDevices: fetchDevices, myDevices } = props;

  const generateRandomColors = () => {
    let color = divColors[Math.floor(Math.random() * divColors.length)];
    return color;
  };

  useEffect(() => {
    fetchDevices();
  }, []);

  const myDevicesList = myDevices.map((el) => {
    return (
      <Device
        key={el.id}
        id={el.name}
        backgroundColor={generateRandomColors()}
      />
    );
  });
  return <>{myDevicesList}</>;
};

const mapStateToProps = (state) => ({
  myDevices: state.DeviceStatus.myDevices,
});

export default connect(mapStateToProps, { getDevices })(UserDevices);
