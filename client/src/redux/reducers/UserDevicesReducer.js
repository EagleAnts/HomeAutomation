import produce from "immer";
import * as actions from "../actions/actionTypes";

const initialState = {
  myDevices: [],
};

const DevicesReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case actions.GET_MY_DEVICES:
        draft.myDevices = action.payload;
        break;

      case actions.GET_CURRENT_ROOM_DEVICES:
        draft.currentRoom = action.payload;
        break;

      case actions.REFRESH_USER_DEVICES:
        draft.myDevices[action.payload.area].push(action.payload);
        break;

      case actions.REMOVE_DEVICE:
        draft.myDevices[action.payload.deviceArea] = draft.myDevices[
          action.payload.deviceArea
        ].filter((el) => el.deviceID !== action.payload.deviceID);
        break;
      default:
        break;
    }
  });

export default DevicesReducer;
