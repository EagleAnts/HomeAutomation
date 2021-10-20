import { combineReducers } from "redux";
import DeviceStatus from "./DeviceReducer";
import SelectedDevice from "./ActiveDevice";

export default combineReducers({ DeviceStatus, SelectedDevice });
