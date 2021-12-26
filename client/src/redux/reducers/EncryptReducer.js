import produce from "immer";
import * as actions from "../actions/actionTypes";

const initialState = {
  value: "",
  IValue: "",
};

const EncryptReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case actions.AES_UPDATED:
        draft.value = action.payload.value;
        draft.IValue = action.payload.IValue;
        break;
      default:
        break;
    }
  });

export default EncryptReducer;
