import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  Stack,
} from "@mui/material";

import { useState } from "react";

import axios from "axios";
import CustomSnackbar from "../../components/common/CustomSnackbar";
import { useNotifications } from "../../context/NotificationContext";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const { addNotification } = useNotifications();
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });
  const handleForgotPassword = async () => {
    try {
      await axios.post("http://127.0.0.1:8000/api/users/forgot-password/", {
        email,
      });

      setSnackbar({
        open: true,
        message: "Reset link sent to your email",
        severity: "success",
      });
      addNotification("Password reset link sent");
    } catch (error) {
      console.log(error);
      setSnackbar({
        open: true,
        message: "Something went wrong",
        severity: "error",
      });
    }
  };

  return (
    <>
      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Paper
          sx={{
            p: 5,
            width: 400,
            borderRadius: "20px",
          }}
        >
          <Typography variant="h4" fontWeight="bold" mb={3}>
            Forgot Password
          </Typography>

          <Stack spacing={2}>
            <TextField
              label="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <Button variant="contained" onClick={handleForgotPassword}>
              Send Reset Link
            </Button>
          </Stack>
        </Paper>
      </Box>
      <CustomSnackbar
        open={snackbar.open}
        message={snackbar.message}
        severity={snackbar.severity}
        handleClose={() => setSnackbar({ ...snackbar, open: false })}
      />
    </>
  );
}
