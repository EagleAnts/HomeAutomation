import React from "react";
// import { connect } from "react-redux";

import { useSelector } from "react-redux";

import { Device } from "./Device";

const UserDevices = () => {
  const divColors = ["#7D61CE", "#DB947E", "#F4C426", "#FF9160", "#3ACBE8"];

  const generateRandomColors = () => {
    let color = divColors[Math.floor(Math.random() * divColors.length)];
    return color;
  };

  const myDevices = useSelector((state) => state.GetUserDevices.myDevices);

  const myDevicesList = myDevices.map((el) => {
    return (
      <Device
        key={el.id}
        id={el.id}
        description={el.name}
        backgroundColor={generateRandomColors()}
      />
    );
  });
  return <>{myDevicesList}</>;
};

// const mapStateToProps = (state) => ({
//   myDevices: state.DeviceStatus.myDevices,
// });

// export default connect(mapStateToProps)(UserDevices);
export default UserDevices;
