import { combineReducers } from "redux";
import DeviceStatus from "./DeviceReducer";
import SelectedDevice from "./ActiveDevice";
import DeviceStatusReducer from "./DeviceStatusReducer";

export default combineReducers({
  DeviceStatus,
  SelectedDevice,
  DeviceStatusReducer,
});
