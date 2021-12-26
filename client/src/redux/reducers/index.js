import { combineReducers } from "redux";

import ToggleDevices from "./ToggleDevicesReducer";
import UserDevices from "./UserDevicesReducer";
import AllDevices from "./AllDevicesReducer";
import DeviceStatus from "./DeviceStatusReducer";
import SomeObject from "./EncryptReducer";

export default combineReducers({
  ToggleDevices,
  UserDevices,
  AllDevices,
  DeviceStatus,
  SomeObject,
});
