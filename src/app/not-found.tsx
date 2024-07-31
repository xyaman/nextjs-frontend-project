"use client";

import { Box, Typography } from "@mui/material";
import Link from "next/link";

export default function NotFound() {
  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      flexDirection="column"
    >
      <Typography variant="h2">404 Not found</Typography>
      <Typography>{"Couldn't find requested resources."}</Typography>
      <Link href="/">Go back to home</Link>
    </Box>
  );
}
