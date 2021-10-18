import React from "react";
import { connect } from "react-redux";
import { selectedDevice } from "../redux/actions/action";
import { CgSmartHomeRefrigerator } from "react-icons/cg";

const ToggleDevices = (props) => {
  const handleOnChange = (e) => {
    props.selectedDevice(e.target.id);
  };

  const toggleDevicesList = props.currentRoom.map((el) => {
    return (
      <div key={el.id}>
        <input
          type="radio"
          name="buttonGroup"
          id={el.id}
          onChange={handleOnChange.bind(this)}
        />
        <label htmlFor={el.id}>
          <CgSmartHomeRefrigerator fontSize="50px" />
          {el.name}
        </label>
      </div>
    );
  });

  return <>{toggleDevicesList}</>;
};

const mapStateToProps = (state) => ({
  currentRoom: state.DeviceStatus.currentRoom,
});

export default connect(mapStateToProps, { selectedDevice })(ToggleDevices);
