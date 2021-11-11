import produce from "immer";
import * as actions from "../actions/actionTypes";

const initialState = {
  selectedDevice: "",
};

const AllDevicesReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case actions.SHOW_DEVICE_DETAILS:
        draft.selectedDevice = action.payload;
        break;
      default:
        break;
    }
  });

export default AllDevicesReducer;
