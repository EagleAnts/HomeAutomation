import produce from "immer";
import * as actions from "../actions/actionTypes";

const initialState = [];

const StatusReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case actions.LOAD_USER_DEVICES:
        return action.payload;

      case actions.REFRESH_DEVICE_STATUS:
        draft.push(action.payload);
        break;

      case actions.REMOVE_STATUS:
        return draft.filter((el) => el.deviceID !== action.payload);

      case actions.CHANGE_DEVICE_STATUS:
        const index = draft.findIndex((el) => el.id === action.payload.id);
        if (index !== -1) {
          draft[index].active = action.payload.active;
        } else {
          draft.push(action.payload);
        }
        break;
      case actions.CHANGE_DEVICE_VALUE:
        const deviceIndex = draft.findIndex(
          (el) => el.id === action.payload.deviceID
        );
        draft[deviceIndex].value = action.payload.newValue;
        break;
      default:
        break;
    }
  });

export default StatusReducer;
