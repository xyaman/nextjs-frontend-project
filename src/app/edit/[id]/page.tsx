"use client";

import UserForm from "@/components/UserForm";
import { ActionType } from "@/store/actions";
import { StateContext } from "@/store/context";
import { fetchUsersWithImages } from "@/utils/api";
import {
  Box,
  Button,
  CircularProgress,
  Paper,
  Typography,
} from "@mui/material";
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
          dispatch({
            type: ActionType.SET_FETCH_ERROR,
            payload: "Failed to fetch users API",
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

  if (!state.editingUser) {
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

  return <UserForm user={state.editingUser} isEdit={true} />;
}
