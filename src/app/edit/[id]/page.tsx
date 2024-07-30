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
    // Ideally, if the user is not in the store, we fetch it.
    // But in this case, we are going to fetch all the users,
    // simply because this project is a demo and doesn't have a real API.
    if (state.users.length === 0) {
      fetchUsersWithImages()
        .then((users) => {
          dispatch({ type: ActionType.INSERT_USERS, payload: users });

          // Set the editing user
          // The ids as 1-based index
          dispatch({
            type: ActionType.SET_EDITING_USER,
            payload: users[parseInt(params.id) - 1],
          });
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
