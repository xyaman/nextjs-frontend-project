import { User } from "./types";

export enum ActionType {
  INSERT_USERS = "INSERT_USERS",
  CREATE_USER = "CREATE_USER",
  EDIT_USER = "EDIT_USER",
  REMOVE_USER = "REMOVE_USER",

  SET_EDITING_USER = "SET_EDITING_USER",
}

export type Action =
  | { type: ActionType.INSERT_USERS; payload: User[] }
  | { type: ActionType.CREATE_USER; payload: User }
  | { type: ActionType.EDIT_USER; payload: User }
  | { type: ActionType.REMOVE_USER; payload: User }
  | { type: ActionType.SET_EDITING_USER; payload: User | null };
