"use client";

import { Fab } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { usePathname, useRouter } from "next/navigation";

const fabStyle = {
  position: "sticky",
  float: "right",
  bottom: 16,
  right: 16,
  backgroundColor: "#212a40",
  opacity: "0.9",
  color: "#f26c69",
};

export default function FloatingAddUserButton() {
  const router = useRouter();
  const pathname = usePathname();

  // get current path client component
  if (pathname !== "/") return <> </>;

  return (
    <Fab sx={fabStyle} aria-label="add" onClick={() => router.push("/add")}>
      <AddIcon />
    </Fab>
  );
}
