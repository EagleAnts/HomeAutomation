import * as actions from "./actionTypes";

export const getDevices = () => (dispatch) => {
  fetch("http://localhost:5000/api/devices")
    .then((res) => res.json())
    .then((devices) => {
      dispatch({
        type: actions.GET_CURRENT_ROOM_DEVICES,
        payload: devices,
      });
    });
};
