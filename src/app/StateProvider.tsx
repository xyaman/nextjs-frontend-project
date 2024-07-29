"use client"

import { StateContext } from "@/store/context";
import { stateReducer } from "@/store/reducer";
import { initialState } from "@/store/types";

import { useReducer, ReactNode } from "react";

export default function StateProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(stateReducer, initialState);

  return (
    <StateContext.Provider value={{ state, dispatch }
    } >
      {children}
    </StateContext.Provider>
  )
};
