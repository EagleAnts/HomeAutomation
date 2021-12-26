import * as actions from "./actionTypes";

export const getDevices = (data) => ({
  type: actions.GET_MY_DEVICES,
  payload: data,
});
export const refreshDevices = (devices) => ({
  type: actions.REFRESH_USER_DEVICES,
  payload: devices,
});

export const refreshDeviceStatus = (device) => ({
  type: actions.REFRESH_DEVICE_STATUS,
  payload: device,
});

export const addDevice = (device) => ({
  type: actions.ADD_DEVICE,
  payload: device,
});

export const removeDevice = (deviceInfo) => ({
  type: actions.REMOVE_DEVICE,
  payload: deviceInfo,
});

export const removeStatus = (deviceInfo) => ({
  type: actions.REMOVE_STATUS,
  payload: deviceInfo,
});

export const removeDeviceArea = (deviceArea) => ({
  type: actions.REMOVE_DEVICE_AREA,
  payload: deviceArea,
});

export const selectedDevice = (id) => ({
  type: actions.SELECTED_DEVICE,
  payload: id,
});

export const loadUserDevices = (data) => ({
  type: actions.LOAD_USER_DEVICES,
  payload: data,
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

export const showLoadingIcon = (status) => ({
  type: actions.SHOW_LOADING,
  payload: status,
});

export const updateAES = (data) => ({
  type: actions.AES_UPDATED,
  payload: data,
});
