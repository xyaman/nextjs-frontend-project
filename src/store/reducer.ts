import { Action, ActionType } from "./actions";
import { State } from "./types";

export const stateReducer = (state: State, action: Action): State => {
  switch (action.type) {
    // This always reset the store.
    // Should only be called when fetching for the first time, full update, etc
    case ActionType.INSERT_USERS:
      return { users: action.payload };

    case ActionType.CREATE_USER:
      return { ...state, users: [...state.users, action.payload] };

    case ActionType.EDIT_USER:
      // We shoudnt modify directly the state, this is not very efficient,
      // but we are going to clone the whole users data, then edit.
      const editUsers = state.users.slice();
      const editUser = action.payload;
      if (editUser.id < editUsers.length) {
        editUsers[editUser.id] = editUser;
      }

      return { ...state, users: editUsers };

    case ActionType.REMOVE_USER:
      // We shoudnt modify directly the state, this is not very efficient,
      // but we are going to clone the whole users data, then edit.
      const removeUsers = state.users.slice();
      const removeUser = action.payload;
      if (removeUser.id < removeUsers.length) {
        removeUsers.splice(removeUser.id, 0);
      }
      return { ...state, users: removeUsers };

    default:
      return state;
  }
};
