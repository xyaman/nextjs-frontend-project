import { ActionType } from "@/store/actions";
import { StateContext } from "@/store/context";
import { User } from "@/store/types";
import {
  Avatar,
  Box,
  Button,
  Container,
  Divider,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useRouter } from "next/navigation";
import { useContext, useState } from "react";

type UserFormProps = {
  user: User;
  isEdit: boolean;
};

export default function UserForm(props: UserFormProps) {
  const { state, dispatch } = useContext(StateContext);
  const { user, isEdit } = props;

  const [tempUser, setTempUser] = useState<User>(user);
  const router = useRouter();

  const handleSubmit = () => {
    if (isEdit) {
      dispatch({ type: ActionType.EDIT_USER, payload: tempUser });
    } else {
      dispatch({ type: ActionType.CREATE_USER, payload: tempUser });
    }

    router.push("/");
  };

  // we will use MUI
  return (
    <Container>
      <Paper
        component="form"
        elevation={2}
        noValidate
        autoComplete="off"
        sx={{ marginTop: 2, padding: 3 }}
      >
        <Stack spacing={3} direction="column">
          <Typography variant="h4">Edit User</Typography>

          {/* User avatar (Not modifable) */}
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <Avatar
              alt={tempUser.name}
              src={tempUser.image_url as string}
              sx={{ width: 150, height: 150 }}
            />
          </Box>

          {/* User name */}
          <TextField
            label="Name"
            value={tempUser.name}
            onChange={(e) => setTempUser({ ...tempUser, name: e.target.value })}
          />

          {/* User ID (disabled) */}
          <TextField label="User ID" value={tempUser.id} disabled />

          {/* User username */}
          <TextField
            label="Username"
            value={tempUser.username}
            onChange={(e) =>
              setTempUser({ ...tempUser, username: e.target.value })
            }
          />

          {/* User email */}
          <TextField
            label="Email"
            value={tempUser.email}
            onChange={(e) =>
              setTempUser({ ...tempUser, email: e.target.value })
            }
          />

          {/* User phone */}
          <TextField
            label="Phone"
            value={tempUser.phone}
            onChange={(e) =>
              setTempUser({ ...tempUser, phone: e.target.value })
            }
          />

          {/* User website */}
          <TextField
            label="Website"
            value={tempUser.website}
            onChange={(e) =>
              setTempUser({ ...tempUser, website: e.target.value })
            }
          />

          <Divider />
          <Typography variant="h6">Company</Typography>

          {/* User company name */}
          <TextField
            label="Company"
            value={tempUser.company.name}
            onChange={(e) =>
              setTempUser({
                ...tempUser,
                company: { ...tempUser.company, name: e.target.value },
              })
            }
          />

          {/* User company catch phrase */}
          <TextField
            label="Catch Phrase"
            value={tempUser.company.catchPhrase}
            onChange={(e) =>
              setTempUser({
                ...tempUser,
                company: { ...tempUser.company, catchPhrase: e.target.value },
              })
            }
          />

          {/* User company bs */}
          <TextField
            label="BS"
            value={tempUser.company.bs}
            onChange={(e) =>
              setTempUser({
                ...tempUser,
                company: { ...tempUser.company, bs: e.target.value },
              })
            }
          />

          <Divider />
          <Typography variant="h6">Address</Typography>

          {/* User address */}
          <TextField
            label="Street"
            value={tempUser.address.street}
            onChange={(e) =>
              setTempUser({
                ...tempUser,
                address: { ...tempUser.address, street: e.target.value },
              })
            }
          />

          {/* User address */}
          <TextField
            label="City"
            value={tempUser.address.city}
            onChange={(e) =>
              setTempUser({
                ...tempUser,
                address: { ...tempUser.address, city: e.target.value },
              })
            }
          />

          {/* Buttons Stack */}
          <Stack direction="row" spacing={2}>
            <Button
              variant="contained"
              color="primary"
              onClick={() => handleSubmit()}
            >
              Edit
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={() => router.push("/")}
            >
              Cancel
            </Button>
          </Stack>
        </Stack>
      </Paper>
    </Container>
  );
}
