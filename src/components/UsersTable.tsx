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
} from "@mui/material";
import { User } from "@/store/types";

export default function UsersTable() {
  const { state } = useContext(StateContext);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);


  useEffect(() => console.log(state), [state]);

  const visibleRows = (): User[] => {
    let start = page * rowsPerPage;
    let end = start + rowsPerPage;
    if (end > state.users.length) {
      end = state.users.length;
    }

    return state.users.slice(start, end);
  };


  return (
    <Paper elevation={2} sx={{ width: '100%', overflow: 'hidden', backgroundImage: "none" }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader >
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Company</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {visibleRows().map((user) => (
              <TableRow key={user.id} onClick={() => console.log("clicked #", user.id)}>
                <TableCell align="left">#{user.id}</TableCell>
                <TableCell align="left">{user.name}</TableCell>
                <TableCell align="left">{user.company.name}</TableCell>
                <TableCell align="left">actions</TableCell>
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
        onRowsPerPageChange={(event) => { setRowsPerPage(+event.target.value); setPage(0); }}
      />
    </Paper>
  );
}
