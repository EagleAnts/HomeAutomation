import * as actions from "../actions/actionTypes";
import produce from "immer";

const initialState = {
  username: "",
};

const UserDetailsReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case actions.ADD_USER_DETAILS:
        draft.username = action.payload;
        break;
      default:
        break;
    }
  });

export default UserDetailsReducer;
