import * as actions from "../actions/actionTypes";

const initialState = {
  currentRoom: [],
  myDevices: [],
};

export default function (state = initialState, action) {
  switch (action.type) {
    case actions.GET_MY_DEVICES: {
      return {
        ...state,
        myDevices: action.payload,
        currentRoom: action.payload,
      };
    }

    default:
      return state;
  }
}
