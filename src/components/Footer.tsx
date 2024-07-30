import React from "react";

import { Box, Typography } from "@mui/material";

export default function Footer() {
  return (
    <Box sx={{ padding: 3, marginTop: 6 }} component="footer">
      <Typography variant="h6" align="center">
        Made by Diego Barria
      </Typography>
      <Typography
        variant="subtitle1"
        align="center"
        color="text.secondary"
        component="p"
      >
        INYOU Test Project - 2024
      </Typography>
    </Box>
  );
}
