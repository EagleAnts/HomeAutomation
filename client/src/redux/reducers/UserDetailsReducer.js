import * as actions from "../actions/actionTypes";
import produce from "immer";

const initialState = {
  userID: "",
  username: "",
};

const UserDetailsReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case actions.ADD_USER_DETAILS:
        draft.userID = action.payload.userID;
        draft.username = action.payload.username;
        break;
      default:
        break;
    }
  });

export default UserDetailsReducer;
