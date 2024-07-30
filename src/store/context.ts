"use client";

import { createContext, Dispatch } from "react";
import { initialState, State } from "./types";
import { Action } from "./actions";

// We create a context with the initial state and with a dispatch that
// returns undefined.
//
// The reason of why it returns undefined is because when we make a change in
// the global state/store, it returns nothing.
export const StateContext = createContext<{
  state: State;
  dispatch: Dispatch<Action>;
}>({ state: initialState, dispatch: () => undefined });
