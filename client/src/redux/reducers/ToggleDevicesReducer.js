import * as actions from "../actions/actionTypes";

const initialState = {
  activeDevice: "",
  selectedRoom: "",
};

export default function (state = initialState, action) {
  switch (action.type) {
    case actions.SELECTED_DEVICE: {
      return {
        ...state,
        activeDevice: action.payload,
      };
    }
    case actions.SELECTED_ROOM: {
      return {
        ...state,
        selectedRoom: action.payload,
      };
    }
    default:
      return state;
  }
}
