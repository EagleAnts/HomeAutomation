import produce from "immer";
import * as actions from "../actions/actionTypes";

const initialState = {
  DeviceStatus: null,
  myDevices: [],
};

const DevicesReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case actions.GET_MY_DEVICES:
        draft.myDevices = action.payload;
        break;

      case actions.LOAD_USER_DEVICES:
        draft.DeviceStatus = action.payload;
        break;

      case actions.GET_CURRENT_ROOM_DEVICES:
        draft.currentRoom = action.payload;
        break;

      case actions.UPDATE_DEVICES:
        draft.myDevices.push(action.payload);
        break;

      case actions.CHANGE_DEVICE_STATUS:
        const index = draft.DeviceStatus.findIndex(
          (el) => el.id === action.payload.id
        );
        if (index !== -1) {
          draft.DeviceStatus[index].active = action.payload.active;
        } else {
          draft.DeviceStatus.push(action.payload);
        }
        break;

      case actions.CHANGE_DEVICE_VALUE:
        const deviceIndex = draft.DeviceStatus.findIndex(
          (el) => el.id === action.payload.deviceID
        );
        draft.DeviceStatus[deviceIndex].value = action.payload.newValue;
        break;

      default:
        break;
    }
  });

export default DevicesReducer;
