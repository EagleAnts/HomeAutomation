import { combineReducers } from "redux";

import ToggleDevices from "./ToggleDevicesReducer";
import UserDevices from "./UserDevicesReducer";

export default combineReducers({
  ToggleDevices,
  UserDevices,
});
