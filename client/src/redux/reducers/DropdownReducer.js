import * as actions from "../actions/actionTypes";

const initialState = {
  isOpen: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case actions.SHOW_DROPDOWN:
      return {
        isOpen: action.payload,
      };
    default:
      return state;
  }
}
