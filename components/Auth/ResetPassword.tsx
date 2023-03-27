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
import { resetPassword } from "@/utils/request";
import { useRouter } from "next/router";
import AlertSnackbar from "../Snackbar/Snackbar";
import { SnackbarOptions } from "@/types/tasks";

const ResetPassword = () => {
  const [oldPassword, setOldPassword] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [openSnackbar, setOpenSnackbar] = useState<boolean>(false);
  const router = useRouter();
  const [snackbarOptions, setSnackbarOptions] = useState<SnackbarOptions>({
    message: "",
    variant: "error",
  });

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const token = router.query.token;
    if (token) {
      setIsLoading(true);

      try {
        await resetPassword({
          token: token as string,
          password,
        });
        router.push("/login");
      } catch (e: any) {
        console.error(e);
        setOpenSnackbar(true);
        setSnackbarOptions({ message: e.message, variant: "error" });
      }
      setIsLoading(false);
    }
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
            Create new password
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
              name="oldPassword"
              label="Old Password"
              type="password"
              id="oldPassword"
              autoComplete="current-password"
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
            />
            <br />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="New Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
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

export default ResetPassword;
