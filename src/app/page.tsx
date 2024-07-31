// MUI Fonts
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

// Components
import { Container } from "@mui/material";
import UsersTable from "@/components/UsersTable";

export default function Home() {
  return (
    <>
      <Container>
        {/* Users Table */}
        <UsersTable />
      </Container>
    </>
  );
}
