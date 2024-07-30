"use client";

import UserForm from "@/components/UserForm";
import { User } from "@/store/types";
import { ActionType } from "@/store/actions";
import { StateContext } from "@/store/context";
import { fetchUsersWithImages } from "@/utils/api";
import { useContext, useEffect } from "react";

type UserFormProps = {
  params: { id: string };
};

// AddUser is a copy of EditUser with a different name, the difference is that
// UserForm is called with isEdit={false} instead of isEdit={true}
export default function AddUser(props: UserFormProps) {
  const { state, dispatch } = useContext(StateContext);

  const user: User = {
    id: 99999,
    name: "",
    username: "",
    email: "",
    address: {
      street: "",
      city: "",
      // we ignore the rest of the address
      suite: null,
      zipcode: null,
      geo: null,
    },
    phone: "",
    website: "",
    company: {
      name: "",
      bs: "",
      catchPhrase: "",
    },
    image_url: "https://picsum.photos/200/300",
  };

  useEffect(() => {
    // Why do we fetch all the users if we only need to create one?
    // This is a demo project and doesn't have a real API, and because of that,
    // the reducers are not implemented to handle the creation of a new user
    // without fetching all the users first.
    if (state.users.length === 0) {
      fetchUsersWithImages()
        .then((users) => {
          dispatch({ type: ActionType.INSERT_USERS, payload: users });
        })
        .catch((e) => {
          console.error(e);
        });
    }
  }, []);

  return <UserForm user={user} isEdit={false} />;
}
