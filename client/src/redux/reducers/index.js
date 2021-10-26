import { combineReducers } from "redux";
import GetUserDevices from "./GetDevicesReducer";
import SelectedDevice from "./ActiveDevice";
import DeviceStatusReducer from "./DeviceStatusReducer";

export default combineReducers({
  GetUserDevices,
  SelectedDevice,
  DeviceStatusReducer,
});
