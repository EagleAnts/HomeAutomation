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

export const changeStatus = (status) => ({
  type: actions.CHANGE_DEVICE_STATUS,
  payload: status,
});
