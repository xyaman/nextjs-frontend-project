import { Action, ActionType } from "./actions";
import { State } from "./types";

export const stateReducer = (state: State, action: Action): State => {
  switch (action.type) {
    // This always reset the store.
    // Should only be called when fetching for the first time, full update, etc
    case ActionType.INSERT_USERS:
      return { ...state, users: action.payload };

    case ActionType.CREATE_USER:
      const newUser = action.payload;
      newUser.id = state.users.length + 1;
      return { ...state, users: [...state.users, newUser] };

    case ActionType.EDIT_USER:
      // We shoudnt modify directly the state, this is not very efficient,
      // but we are going to clone the whole users data, then edit.
      const editUsers = state.users.map((user) => {
        if (user.id === action.payload.id) {
          return action.payload;
        }
        return user;
      });

      return { editingUser: null, users: editUsers };

    case ActionType.REMOVE_USER:
      // We shoudnt modify directly the state, this is not very efficient,
      // but we are going to clone the whole users data, then edit.
      const removeUsers = state.users.filter((user) => user.id !== action.payload.id);

      return { editingUser: null, users: removeUsers };

    case ActionType.SET_EDITING_USER:
      return { ...state, editingUser: action.payload };

    default:
      return state;
  }
};
