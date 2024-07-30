import { AppBar, Box, Toolbar, Typography } from "@mui/material";

import IconButton from "@mui/material/IconButton";
import HomeIcon from "@mui/icons-material/Home";
import Link from "next/link";

export default function NavBar() {
  return (
    <Box>
      <AppBar position="static" sx={{ bgcolor: "#212a40", opacity: "0.9" }}>
        <Toolbar>
          <Link href="/">
            <IconButton
              size="large"
              edge="start"
              aria-label="menu"
              sx={{ mr: 2, color: "#f26c69" }}
            >
              <HomeIcon />
            </IconButton>
          </Link>

          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            NextJs Frontend
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
