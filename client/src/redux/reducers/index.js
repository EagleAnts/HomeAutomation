import { combineReducers } from "redux";

import UserDetails from "./UserDetailsReducer";
import ToggleDevices from "./ToggleDevicesReducer";
import UserDevices from "./UserDevicesReducer";
import AllDevices from "./AllDevicesReducer";
import DeviceStatus from "./DeviceStatusReducer";
import SomeObject from "./EncryptReducer";

export default combineReducers({
  UserDetails,
  ToggleDevices,
  UserDevices,
  AllDevices,
  DeviceStatus,
  SomeObject,
});
