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
      <div key={el.name}>
        <input
          type="radio"
          name="buttonGroup"
          id={el.name}
          onChange={handleOnChange.bind(this)}
        />
        <label htmlFor={el.name}>
          <CgSmartHomeRefrigerator fontSize="50px" />
          {el.name}
        </label>
      </div>
    );
  });
};

const ToggleDevices = () => {
  console.log("Rendering Toggle Devices....");

  const dispatch = useDispatch();

  const currentRoomDevices = useSelector(
    (state) => state.GetUserDevices.myDevices
  );

  const toggleDevicesList = buildToggleDevices(dispatch, currentRoomDevices);

  return <>{toggleDevicesList}</>;
};

export default ToggleDevices;
