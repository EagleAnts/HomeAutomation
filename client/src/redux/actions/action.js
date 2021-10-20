import * as actions from "./actionTypes";

export const getDevices = () => (dispatch) => {
  fetch("http://localhost:5000/api/devices")
    .then((res) => res.json())
    .then((devices) => {
      dispatch({
        type: actions.GET_MY_DEVICES,
        payload: devices,
      });
    });
};

export const selectedDevice = (id) => ({
  type: actions.SELECTED_DEVICE,
  payload: id,
});
