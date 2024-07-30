import { Avatar, Box, Button, List, ListItem, ListItemText, Modal, Stack, Typography } from "@mui/material";
import { User } from "@/store/types";
import Link from "next/link";
import { StateContext } from "@/store/context";
import { useContext, useState } from "react";
import { ActionType } from "@/store/actions";
import ConfirmDeleteDialog from "./ConfirmDeleteDialog";

const BoxStyle = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "#fff",
  boxShadow: 24,
  padding: 4,
  outline: 0,
};

type UserModalProps = {
  user: User | null;
  show: boolean;
  onClose: () => void;
};

// UserModal is a modal component that displays user information in a simple layout.
export default function UserModal(props: UserModalProps) {

  const { user, show, onClose } = props;
  const { dispatch } = useContext(StateContext);

  const [showDialog, setShowDialog] = useState(false);

  // If user is null, return an empty fragment.
  // According to MUI docs, the Modal shouldnt be rendered is open prop is false.
  // but just in case, we return an empty fragment.
  if (!user) return <> </>;

  const removeUser = () => {
    dispatch({ type: ActionType.REMOVE_USER, payload: user });
    setShowDialog(false);
    onClose();
  };

  return (
    <Modal open={show} onClose={onClose}>
      <Box sx={BoxStyle}>
        <Stack direction="column" spacing={2}>
          {/* Title */}
          <Typography variant="h6">User Information</Typography>

          {/* Avatar + Name */}
          <Stack direction="row" spacing={2} alignItems="center">
            <Avatar
              alt={user?.name}
              src={user?.image_url as string}
              sx={{ width: 56, height: 56 }}
            />
            <Typography variant="h6" component="h2">
              {user && user.name}
            </Typography>
          </Stack>

          {/* User Information */}
          <List>
            <ListItem>
              <ListItemText primary="Username" secondary={user?.username} />
            </ListItem>
            <ListItem>
              <ListItemText primary="Email" secondary={user?.email} />
            </ListItem>
            <ListItem>
              <ListItemText primary="Phone" secondary={user?.phone} />
            </ListItem>
            <ListItem>
              <ListItemText primary="Website" secondary={user?.website} />
            </ListItem>
            <ListItem>
              <ListItemText primary="Company" secondary={user?.company.name} />
            </ListItem>
            <ListItem>
              <ListItemText primary="Address" secondary={`${user?.address.street}, ${user?.address.city}`} />
            </ListItem>
          </List>

          {/* Edit + Close Button */}
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Stack direction="row" spacing={2}>
              <Link href={`/edit/${user.id}`}>
                <Button onClick={onClose}>Edit</Button>
              </Link>
              <Button onClick={onClose}>Close</Button>
            </Stack>

            <Button color="error" onClick={() => setShowDialog(true)}>Delete User</Button>
          </Box>
        </Stack>
        <ConfirmDeleteDialog
          visible={showDialog}
          onConfirm={removeUser}
          onCancel={() => setShowDialog(false)}
          text={`Are you sure you want to delete ${user.name}?`}
          title="Delete User"
          okText="Delete"
          cancelText="Cancel"
        />
      </Box>
    </Modal>
  );
}

