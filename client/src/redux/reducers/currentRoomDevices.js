import * as actions from "../actions/actionTypes";

const initialState = {
  items: [""],
};

export default function (state = initialState, action) {
  switch (action.type) {
    case actions.GET_CURRENT_ROOM_DEVICES: {
      return { ...state, items: action.payload };
    }

    default:
      return state;
  }
}
