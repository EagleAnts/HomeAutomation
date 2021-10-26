import React from "react";
import { useDispatch } from "react-redux";
import { selectedDevice } from "../redux/actions/action";
import { CgSmartHomeRefrigerator } from "react-icons/cg";
import { useSelector } from "react-redux";

const buildToggleDevices = (dispatch, devicesList) => {
  const handleOnChange = (e) => {
    dispatch(selectedDevice(e.target.id));
  };
  return devicesList.map((el) => {
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
};

const ToggleDevices = (props) => {
  console.log("Rendering Toggle Devices....");

  const dispatch = useDispatch();

  const currentRoomDevices = useSelector(
    (state) => state.GetUserDevices.currentRoom
  );

  const toggleDevicesList = buildToggleDevices(dispatch, currentRoomDevices);

  return <>{toggleDevicesList}</>;
};

export default ToggleDevices;
