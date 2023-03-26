import React, { useState } from "react";
import {
  TextField,
  Container,
  Paper,
  Box,
  Typography,
  CssBaseline,
  Avatar,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { LoadingButton } from "@mui/lab";
import { registerUser } from "@/utils/request";
import { useRouter } from "next/router";
import AlertSnackbar from "../Snackbar/Snackbar";
import { SnackbarOptions } from "@/types/tasks";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [openSnackbar, setOpenSnackbar] = useState<boolean>(false);
  const router = useRouter();
  const [snackbarOptions, setSnackbarOptions] = useState<SnackbarOptions>({
    message: "",
    variant: "error",
  });

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    try {
      await registerUser({
        email,
        password,
        name,
      });
      router.push("/login");
    } catch (e: any) {
      console.error(e);
      setOpenSnackbar(true);
      setSnackbarOptions({ message: e.message, variant: "error" });
    }
    setIsLoading(false);
  };

  const onCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Paper elevation={3} sx={{ padding: 4 }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Register
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1, width: "100%" }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <br />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <br />
            <TextField
              type="text"
              label="Name"
              variant="outlined"
              color="secondary"
              fullWidth
              value={name}
              margin="normal"
              required
              name="name"
              id="name"
              autoComplete="current-password"
              onChange={(e) => setName(e.target.value)}
            />
            <br />
            <LoadingButton
              loading={isLoading}
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Register
            </LoadingButton>
          </Box>
        </Box>
      </Paper>
      {openSnackbar && (
        <AlertSnackbar
          openStatus={openSnackbar}
          options={snackbarOptions}
          onClose={onCloseSnackbar}
        />
      )}
    </Container>
  );
};

export default Register;
