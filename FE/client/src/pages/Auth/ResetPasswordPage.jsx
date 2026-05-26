import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  Stack,
} from "@mui/material";
import { useNotifications } from "../../context/NotificationContext";
import { useState } from "react";

import { useParams } from "react-router-dom";
import CustomSnackbar from "../../components/common/CustomSnackbar";

import axios from "axios";

export default function ResetPasswordPage() {
  const { uid, token } = useParams();
  const { addNotification } = useNotifications();
  const [password, setPassword] = useState("");
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const handleReset = async () => {
    try {
      await axios.post(
        `http://127.0.0.1:8000/api/users/reset-password/${uid}/${token}/`,
        {
          password,
        },
      );

      setSnackbar({
        open: true,
        message: "Password reset successful",
        severity: "success",
      });
      addNotification("Password changed successfully");
      setTimeout(() => {
        window.location.href = "/login";
      }, 1800);
    } catch (error) {
      console.log(error);

      setSnackbar({
        open: true,
        message: "Reset failed",
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
            Reset Password
          </Typography>

          <Stack spacing={2}>
            <TextField
              label="New Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <Button variant="contained" onClick={handleReset}>
              Reset Password
            </Button>
          </Stack>
        </Paper>
      </Box>
      <CustomSnackbar
        open={snackbar.open}
        message={snackbar.message}
        severity={snackbar.severity}
        handleClose={() =>
          setSnackbar({
            ...snackbar,
            open: false,
          })
        }
      />
    </>
  );
}
