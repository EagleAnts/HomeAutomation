import * as actions from "../actions/actionTypes";

const initialState = {
  activeDevice: " ",
};

export default function (state = initialState, action) {
  switch (action.type) {
    case actions.SELECTED_DEVICE: {
      return {
        activeDevice: action.payload,
      };
    }
    default:
      return state;
  }
}
