"use client";

import UserForm from "@/components/UserForm";
import { ActionType } from "@/store/actions";
import { StateContext } from "@/store/context";
import { fetchUsersWithImages } from "@/utils/api";
import { useContext, useEffect } from "react";

type UserFormProps = {
  params: { id: string };
};


export default function EditUser(props: UserFormProps) {

  const { state, dispatch } = useContext(StateContext);
  const { params } = props;

  useEffect(() => {
    console.log(props);

    // Ideally, if the user is not in the store, we fetch it.
    // But in this case, we are going to fetch all the users,
    // simply because this project is a demo and doesn't have a real API.
    if (state.users.length === 0) {
      fetchUsersWithImages()
        .then((users) => {
          dispatch({ type: ActionType.INSERT_USERS, payload: users });
          dispatch({ type: ActionType.SET_EDITING_USER, payload: users[parseInt(params.id)] });
        })
        .catch((e) => {
          console.error(e);
        });
    }
  }, []);

  if (!state.editingUser) {
    return <div>Loading...</div>;
  }

  return <UserForm user={state.editingUser} isEdit={true} />;
}
