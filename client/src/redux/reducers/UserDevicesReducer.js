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

      case actions.ADD_DEVICE:
        const area = action.payload.area;
        if (!draft.myDevices[area]) {
          const newDevice = {};
          newDevice[area] = [];
          newDevice[area].push(action.payload);
          draft.myDevices = newDevice;
        } else draft.myDevices[area].push(action.payload);
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
