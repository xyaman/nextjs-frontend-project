"use client";

import { StateContext } from "@/store/context";
import { useContext, useEffect, useState } from "react";
import {
  TableRow,
  Paper,
  Table,
  TableContainer,
  TableHead,
  TableCell,
  TableBody,
  TablePagination,
  Stack,
  Avatar,
  Typography,
  TextField,
  Box,
  CircularProgress,
  Button,
} from "@mui/material";

import { User } from "@/store/types";
import UserModal from "./UserModal";
import Fuse from "fuse.js";
import { fetchUsersWithImages } from "@/utils/api";
import { ActionType } from "@/store/actions";

const tableHeaderStyle = {
  paddingTop: 2,
  paddingBottom: 2,
  display: "flex",
  alignItems: { xs: "left", sm: "center" },
  justifyContent: { xs: "left", sm: "space-between" },
  flexDirection: { xs: "column", sm: "row" },

  "& > h5": {
    marginX: { xs: 2, sm: 4 },
    paddingBottom: { xs: 2, sm: 0 },
  },

  "& > div": {
    marginX: { xs: 2, sm: 4 },
    marginT: { xs: 2, sm: 0 },
  },
};

// ModalData is used in the state of the component
type ModalData = {
  user: User | null;
  show: boolean;
};

const initialModalData: ModalData = { user: null, show: false };

export default function UsersTable() {
  const { state, dispatch } = useContext(StateContext);

  // Pagination
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [modalData, setModalData] = useState(initialModalData);

  // Possible information + visibility
  const [inputText, setInputText] = useState("");
  const [currentRows, setCurrentRows] = useState<User[]>([]);

  // We fetch when this element is mounted
  useEffect(() => {
    // Prevent fetching if we already have users.
    // This could happen when the component is unmounted and mounted again.
    if (state.users.length > 0) return;

    fetchUsersWithImages()
      .then((users) => {
        dispatch({ type: ActionType.INSERT_USERS, payload: users });
      })
      .catch((e) => {
        console.log(e);
        dispatch({
          type: ActionType.SET_FETCH_ERROR,
          payload: "Failed to fetch users API",
        });
      });
  }, []);

  // This is triggered every time we change the page or the input text,
  // `state.users` list change or we change the rows per page.
  useEffect(() => {
    if (inputText.length > 0) {
      // Before any search, we reset the page to 0
      setPage(0);

      // We do a search using Fuse.js
      const options = {
        keys: ["name", "email", "id", "address.city", "company.name"],
        threshold: 0.2,
      };
      const fuse = new Fuse(state.users, options);

      // We map the results to get the original object
      const result = fuse.search(inputText).map((v) => v.item);
      setCurrentRows(result);
    } else {
      // We calculate the current rows to display
      let start = page * rowsPerPage;
      let end = start + rowsPerPage;
      if (end > state.users.length) {
        end = state.users.length;
      }
      setCurrentRows(state.users.slice(start, end));
    }
  }, [page, inputText, state.users]);

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

  return (
    <>
      <Paper elevation={2} sx={{ width: "100%", marginTop: 3, padding: 1 }}>
        {/* Table Title + Search */}
        <Box sx={tableHeaderStyle}>
          <Typography variant="h5">Users</Typography>
          <TextField
            label="Search"
            variant="outlined"
            value={inputText}
            onInput={(e: any) => setInputText(e.target.value)}
          />
        </Box>

        {/* Table itself */}
        <TableContainer>
          <Table stickyHeader>
            {/* Table Header */}
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>City</TableCell>
                <TableCell>Company</TableCell>
              </TableRow>
            </TableHead>

            {/* Table Body */}
            <TableBody>
              {currentRows.map((user) => (
                <TableRow
                  key={user.id}
                  onClick={() => {
                    setModalData({ user: user, show: true });
                    dispatch({
                      type: ActionType.SET_EDITING_USER,
                      payload: user,
                    });
                  }}
                >
                  {/* ID */}
                  <TableCell align="left">#{user.id}</TableCell>

                  {/* Name */}
                  <TableCell align="left">
                    <Stack direction="row" alignItems="center" spacing={2}>
                      <Avatar src={user?.image_url as string} />
                      <Stack direction="column" spacing={1}>
                        <Typography sx={{ fontWeight: "bold" }}>
                          {user.name}
                        </Typography>
                        <p>{user.email}</p>
                      </Stack>
                    </Stack>
                  </TableCell>

                  {/* City */}
                  <TableCell align="left">{user.address.city}</TableCell>

                  {/* Company */}
                  <TableCell align="left">{user.company.name}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10]}
          component="div"
          count={state.users.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={(_, page) => setPage(page)}
          onRowsPerPageChange={(event) => {
            setRowsPerPage(+event.target.value);
            setPage(0);
          }}
        />
      </Paper>
      <UserModal
        user={modalData.user}
        show={modalData.show}
        onClose={() => setModalData(initialModalData)}
      />
    </>
  );
}
