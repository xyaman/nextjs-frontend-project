import { Action, ActionType } from "./actions";
import { State } from "./types";

export const stateReducer = (state: State, action: Action): State => {
  switch (action.type) {
    case ActionType.INSERT_USERS:
      return { ...state, users: action.payload };
    case ActionType.CREATE_USER:
      return state;
    case ActionType.CREATE_USER:
      return state;
    case ActionType.CREATE_USER:
      return state;

    default:
      return state;
  }
};
