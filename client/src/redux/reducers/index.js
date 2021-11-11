import { combineReducers } from "redux";

import ToggleDevices from "./ToggleDevicesReducer";
import UserDevices from "./UserDevicesReducer";
import AllDevices from "./AllDevicesReducer";

export default combineReducers({
  ToggleDevices,
  UserDevices,
  AllDevices,
});
