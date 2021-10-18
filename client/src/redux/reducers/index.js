import { combineReducers } from "redux";
import DeviceStatus from "./DeviceReducer";
import SelectedDevice from "./ActiveDevice";
import ShowDropdown from "./DropdownReducer";

export default combineReducers({ DeviceStatus, SelectedDevice, ShowDropdown });
