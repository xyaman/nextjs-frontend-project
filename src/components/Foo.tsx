"use client";

import { ActionType } from "@/store/actions";
import { User } from "@/store/types";
import { StateContext } from "@/store/context";
import { useContext, useEffect, useState } from "react";

async function fetchUsersWithImages(): Promise<User[]> {
  const userRes = await fetch("https://jsonplaceholder.typicode.com/users");
  const userJSON: User[] = await userRes.json();

  const imgsRes = await fetch("https://picsum.photos/v2/list");
  const imgsJSON = await imgsRes.json();

  return userJSON.map((user, i) => {
    user.image_url = imgsJSON[i].download_url;
    return user;
  });
}

export default function Foo() {
  const { state, dispatch } = useContext(StateContext);
  const [isFetching, setIsFetching] = useState(true);

  useEffect(() => {
    fetchUsersWithImages()
      .then((users) => {
        dispatch({ type: ActionType.INSERT_USERS, payload: users });
        setIsFetching(false);
      })
      .catch((e) => alert("error while fetching: " + e));
  }, []);

  return (
    <div>
      {isFetching
        ? "Loading..."
        : `The amout of users is: ${state.users.length}.`}
    </div>
  );
}
