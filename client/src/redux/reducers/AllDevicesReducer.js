import produce from "immer";
import * as actions from "../actions/actionTypes";

const initialState = {
  selectedDevice: "",
  deviceArea: "",
  showLoading: false,
};

const AllDevicesReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case actions.SHOW_DEVICE_DETAILS:
        draft.deviceArea =
          action.payload === "" ? "" : action.payload.deviceArea;
        draft.selectedDevice =
          action.payload === "" ? "" : action.payload.deviceID;
        break;
      case actions.SHOW_LOADING:
        draft.showLoading = action.payload;
        break;
      default:
        break;
    }
  });

export default AllDevicesReducer;
