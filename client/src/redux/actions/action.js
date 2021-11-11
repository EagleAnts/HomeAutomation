import * as actions from "./actionTypes";

export const refreshDevices = (devices) => ({
  type: actions.UPDATE_DEVICES,
  payload: devices,
});

export const getDevices = (data) => ({
  type: actions.GET_MY_DEVICES,
  payload: data,
});

export const selectedDevice = (id) => ({
  type: actions.SELECTED_DEVICE,
  payload: id,
});

export const loadUserDevices = (id) => ({
  type: actions.LOAD_USER_DEVICES,
  payload: id,
});

export const changeStatus = (status) => ({
  type: actions.CHANGE_DEVICE_STATUS,
  payload: status,
});

export const roomSelected = (room) => ({
  type: actions.SELECTED_ROOM,
  payload: room,
});

export const changeDeviceValue = (data) => ({
  type: actions.CHANGE_DEVICE_VALUE,
  payload: data,
});

export const showDeviceDetails = (deviceID) => ({
  type: actions.SHOW_DEVICE_DETAILS,
  payload: deviceID,
});
