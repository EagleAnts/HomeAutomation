import * as actions from "../actions/actionTypes";
import produce from "immer";

const initialState = [];

const DeviceStatusReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case actions.CHANGE_DEVICE_STATUS:
        const index = draft.findIndex((el) => el.id === action.payload.id);
        if (index !== -1) {
          draft[index].active = !draft[index].active;
        } else {
          draft.push(action.payload);
        }
        break;

      default:
        break;
    }
  });

export default DeviceStatusReducer;
