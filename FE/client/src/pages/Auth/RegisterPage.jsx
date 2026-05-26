import {
  Box,
  TextField,
  Button,
  Typography,
  Paper,
  Stack,
  InputAdornment,
} from "@mui/material";
import CustomSnackbar from "../../components/common/CustomSnackbar";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import StorefrontOutlinedIcon from "@mui/icons-material/StorefrontOutlined";
import { useNotifications } from "../../context/NotificationContext";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { registerUser } from "../../api/authApi";

export default function RegisterPage() {
  const navigate = useNavigate();
  const { addNotification } = useNotifications();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const handleRegister = async () => {
    try {
      await registerUser({
        name,
        email,
        password,
      });

      setSnackbar({
        open: true,
        message: "Registration Successful",
        severity: "success",
      });
      addNotification("Account created successfully");

      setTimeout(() => {
        navigate("/login");
      }, 1500);
    } catch (error) {
      console.log(error);

      setSnackbar({
        open: true,
        message: "Registration Failed",
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
          background:
            "linear-gradient(135deg, #f8f9fa 0%, #eef1f5 50%, #f4f4f4 100%)",
          px: 2,
          py: 4,
        }}
      >
        <Paper
          elevation={0}
          sx={{
            width: "100%",
            maxWidth: "430px",
            borderRadius: "28px",
            p: { xs: 3, sm: 5 },
            bgcolor: "#fff",
            border: "1px solid #ececec",
            boxShadow: "0 10px 40px rgba(0,0,0,0.08)",
          }}
        >
          {/* TOP ICON */}
          <Box
            sx={{
              width: 70,
              height: 70,
              borderRadius: "50%",
              bgcolor: "#000",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              mx: "auto",
              mb: 3,
            }}
          >
            <StorefrontOutlinedIcon
              sx={{
                color: "#fff",
                fontSize: 34,
              }}
            />
          </Box>

          {/* TITLE */}
          <Typography
            variant="h4"
            fontWeight={800}
            textAlign="center"
            sx={{
              mb: 1,
              letterSpacing: "-0.5px",
            }}
          >
            Create Account
          </Typography>

          <Typography
            variant="body1"
            textAlign="center"
            sx={{
              color: "#777",
              mb: 4,
            }}
          >
            Join us and start your shopping journey
          </Typography>

          {/* FORM */}
          <Stack spacing={2.5}>
            <TextField
              label="Full Name"
              fullWidth
              value={name}
              onChange={(e) => setName(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <PersonOutlineOutlinedIcon sx={{ color: "#888" }} />
                  </InputAdornment>
                ),
              }}
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: "14px",
                  bgcolor: "#fafafa",
                },
              }}
            />

            <TextField
              label="Email Address"
              type="email"
              fullWidth
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <EmailOutlinedIcon sx={{ color: "#888" }} />
                  </InputAdornment>
                ),
              }}
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: "14px",
                  bgcolor: "#fafafa",
                },
              }}
            />

            <TextField
              label="Password"
              type="password"
              fullWidth
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LockOutlinedIcon sx={{ color: "#888" }} />
                  </InputAdornment>
                ),
              }}
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: "14px",
                  bgcolor: "#fafafa",
                },
              }}
            />

            <Button
              variant="contained"
              size="large"
              onClick={handleRegister}
              sx={{
                bgcolor: "#000",
                py: 1.6,
                borderRadius: "14px",
                textTransform: "none",
                fontWeight: 700,
                fontSize: "16px",
                boxShadow: "none",

                "&:hover": {
                  bgcolor: "#111",
                  boxShadow: "0 8px 20px rgba(0,0,0,0.15)",
                },
              }}
            >
              Create Account
            </Button>

            {/* LOGIN */}
            <Typography
              variant="body2"
              textAlign="center"
              sx={{
                mt: 1,
                color: "#666",
              }}
            >
              <Box component="span">Already have an account? </Box>

              <Box
                component="span"
                sx={{
                  cursor: "pointer",
                  fontWeight: 700,
                  color: "#000",

                  "&:hover": {
                    textDecoration: "underline",
                  },
                }}
                onClick={() => navigate("/login")}
              >
                Login
              </Box>
            </Typography>
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
