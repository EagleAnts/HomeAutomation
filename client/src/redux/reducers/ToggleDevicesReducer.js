import produce from "immer";
import * as actions from "../actions/actionTypes";

const initialState = {
  activeDevice: "",
  selectedRoom: "",
};

const ToggleDevices = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case actions.SELECTED_DEVICE:
        draft.activeDevice = action.payload;
        break;
      case actions.SELECTED_ROOM:
        draft.selectedRoom = action.payload;
        break;

      default:
        break;
    }
  });

export default ToggleDevices;
