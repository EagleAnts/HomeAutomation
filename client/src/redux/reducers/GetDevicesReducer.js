import produce from "immer";
import * as actions from "../actions/actionTypes";

const initialState = {
  currentRoom: [],
  myDevices: [],
};

const GetDevicesReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case actions.GET_MY_DEVICES:
        draft.myDevices = action.payload;
        draft.currentRoom = action.payload;
        break;

      case actions.GET_CURRENT_ROOM_DEVICES:
        draft.currentRoom = action.payload;
        break;

      case actions.UPDATE_DEVICES:
        draft.myDevices.push(action.payload);
        break;

      default:
        break;
    }
  });

export default GetDevicesReducer;
