import { AppBar, Box, Toolbar, Typography } from "@mui/material";

import IconButton from "@mui/material/IconButton";
import HomeIcon from "@mui/icons-material/Home";

export default function NavBar() {
  return (
    <Box>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <HomeIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Users
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
