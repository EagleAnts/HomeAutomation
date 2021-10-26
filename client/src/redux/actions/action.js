import * as actions from "./actionTypes";

export const getDevices = () => async (dispatch) => {
  const res = await fetch("http://localhost:5000/api/devices");
  const data = await res.json();
  dispatch({ type: actions.GET_MY_DEVICES, payload: data });
};

export const selectedDevice = (id) => ({
  type: actions.SELECTED_DEVICE,
  payload: id,
});

export const changeStatus = (status) => ({
  type: actions.CHANGE_DEVICE_STATUS,
  payload: status,
});
