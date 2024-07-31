"use client";

import UserForm from "@/components/UserForm";
import { User } from "@/store/types";
import { ActionType } from "@/store/actions";
import { StateContext } from "@/store/context";
import { fetchUsersWithImages } from "@/utils/api";
import { useContext, useEffect } from "react";
import {
  Box,
  Button,
  CircularProgress,
  Paper,
  Typography,
} from "@mui/material";

// AddUser is a copy of EditUser with a different name, the difference is that
// UserForm is called with isEdit={false} instead of isEdit={true}
export default function AddUser() {
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
          dispatch({
            type: ActionType.SET_FETCH_ERROR,
            payload: "Failed to fetch users",
          });
        });
    }
  }, []);

  if (state.fetchError) {
    return (
      <Paper elevation={2} sx={{ width: "100%", marginTop: 3, padding: 1 }}>
        {/* Reaload website element */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: 200,
            flexDirection: "column",
          }}
        >
          <Typography variant="h5">
            Error fetching users: {state.fetchError}
          </Typography>
          <a href="/">
            <Button>Reload</Button>
          </a>
        </Box>
      </Paper>
    );
  }

  if (state.users.length === 0) {
    return (
      <Paper elevation={2} sx={{ width: "100%", marginTop: 3, padding: 1 }}>
        {/* Center a loading element */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: 200,
          }}
        >
          <CircularProgress sx={{ color: "#f26c69" }} />
        </Box>
      </Paper>
    );
  }

  return <UserForm user={user} isEdit={false} />;
}
