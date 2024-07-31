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
  const { dispatch } = useContext(StateContext);
  const { user, isEdit } = props;

  const [tempUser, setTempUser] = useState<User>(user);
  const router = useRouter();

  const [validation, setValidation] = useState({
    name: false,
    username: false,
    email: false,
    phone: false,
    website: false,
    company: {
      name: false,
      catchPhrase: false,
      bs: false,
    },
    address: {
      street: false,
      city: false,
    },
  });

  const handleSubmit = () => {
    // Check is there are empty fields
    // Can the app crash if we don't check this?
    // Actually not, becuase there arent null values, just empty strings
    if (
      tempUser.name === "" ||
      tempUser.username === "" ||
      tempUser.email === "" ||
      tempUser.phone === "" ||
      tempUser.website === "" ||
      tempUser.company.name === "" ||
      tempUser.company.catchPhrase === "" ||
      tempUser.company.bs === "" ||
      tempUser.address.street === "" ||
      tempUser.address.city === ""
    ) {
      setValidation({
        name: tempUser.name === "",
        username: tempUser.username === "",
        email: tempUser.email === "",
        phone: tempUser.phone === "",
        website: tempUser.website === "",
        company: {
          name: tempUser.company.name === "",
          catchPhrase: tempUser.company.catchPhrase === "",
          bs: tempUser.company.bs === "",
        },
        address: {
          street: tempUser.address.street === "",
          city: tempUser.address.city === "",
        },
      });

      return;
    }

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
          {isEdit ? (
            <Typography variant="h4">Edit User</Typography>
          ) : (
            <Typography variant="h4">Create User</Typography>
          )}

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
            error={validation.name}
            helperText={validation.name && "This field is required"}
            value={tempUser.name}
            onChange={(e) => setTempUser({ ...tempUser, name: e.target.value })}
          />

          {/* User ID (disabled) */}
          {isEdit && <TextField label="User ID" value={tempUser.id} disabled />}

          {/* User username */}
          <TextField
            label="Username"
            error={validation.username}
            helperText={validation.username && "This field is required"}
            value={tempUser.username}
            onChange={(e) =>
              setTempUser({ ...tempUser, username: e.target.value })
            }
          />

          {/* User email */}
          <TextField
            label="Email"
            error={validation.email}
            helperText={validation.email && "This field is required"}
            value={tempUser.email}
            onChange={(e) =>
              setTempUser({ ...tempUser, email: e.target.value })
            }
          />

          {/* User phone */}
          <TextField
            label="Phone"
            error={validation.phone}
            helperText={validation.phone && "This field is required"}
            value={tempUser.phone}
            onChange={(e) =>
              setTempUser({ ...tempUser, phone: e.target.value })
            }
          />

          {/* User website */}
          <TextField
            label="Website"
            error={validation.website}
            helperText={validation.website && "This field is required"}
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
            error={validation.company.name}
            helperText={validation.company.name && "This field is required"}
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
            error={validation.company.catchPhrase}
            helperText={
              validation.company.catchPhrase && "This field is required"
            }
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
            error={validation.company.bs}
            helperText={validation.company.bs && "This field is required"}
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
            error={validation.address.street}
            helperText={validation.address.street && "This field is required"}
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
            error={validation.address.city}
            helperText={validation.address.city && "This field is required"}
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
            <Button onClick={() => handleSubmit()}>
              {isEdit ? "Edit" : "Create"}
            </Button>
            <Button onClick={() => router.push("/")}>Cancel</Button>
          </Stack>
        </Stack>
      </Paper>
    </Container>
  );
}
