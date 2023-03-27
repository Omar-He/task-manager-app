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
import { forgotPassword } from "@/utils/request";
import AlertSnackbar from "../Snackbar/Snackbar";
import { SnackbarOptions } from "@/types/tasks";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [openSnackbar, setOpenSnackbar] = useState<boolean>(false);
  const [snackbarOptions, setSnackbarOptions] = useState<SnackbarOptions>({
    message: "",
    variant: "error",
  });

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    try {
      await forgotPassword(email);
      setOpenSnackbar(true);
      setSnackbarOptions({
        message:
          "An email has been sent to you. please check your email to reset your password.",
        variant: "success",
      });
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
            ForgotPassword
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
            <LoadingButton
              loading={isLoading}
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Submit
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

export default ForgotPassword;
