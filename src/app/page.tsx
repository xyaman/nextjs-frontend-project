// MUI Fonts
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

// Components
import Foo from "@/components/Foo";
import StateProvider from "./StateProvider";
import { Container, CssBaseline } from "@mui/material";
import NavBar from "@/components/NavBar";
import UsersTable from "@/components/UsersTable";

export default function Home() {

  return (
    <>
      <CssBaseline />
      <NavBar />
      <StateProvider>
        <Container>
          <Foo />
          <UsersTable />
        </Container>
      </StateProvider>
    </>
  );
}
