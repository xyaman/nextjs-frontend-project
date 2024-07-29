"use client"

import { ActionType } from "@/store/actions";
import { StateContext } from "@/store/context";
import { useContext, useEffect, useState } from "react";

export default function Card() {
  const { state, dispatch } = useContext(StateContext);
  const [isFetching, setIsFetching] = useState(true);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then(data => data.json())
      .then(json => {
        dispatch({ type: ActionType.INSERT_USERS, payload: json });
        setIsFetching(false);
      });
  }, []);

  return (
    <div>
      {isFetching ? "Loading..." :
        `The amout of users is: ${state.users.length}.`}
    </div>
  )
}
