import {
  Box,
  TextField,
  Button,
  Typography,
  Paper,
  Stack,
  InputAdornment,
  // CircularProgress,
} from "@mui/material";
import CustomSnackbar from "../../components/common/CustomSnackbar";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import { useNotifications } from "../../context/NotificationContext";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { loginUser } from "../../api/authApi";

export default function LoginPage() {
  const navigate = useNavigate();
  const { addNotification } = useNotifications();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const handleLogin = async () => {
    try {
      setLoading(true);

      const response = await loginUser({
        username: email,
        password: password,
      });

      localStorage.setItem("token", response.data.access);

      localStorage.setItem("refresh", response.data.refresh);

      localStorage.setItem(
        "user",
        JSON.stringify({
          name: email.split("@")[0],
          email: email,
        }),
      );

      setSnackbar({
        open: true,
        message: "Login Successful",
        severity: "success",
      });
      addNotification("Logged into your account");

      setTimeout(() => {
        navigate("/");
        window.location.reload();
      }, 1000);
    } catch (error) {
      console.log(error);

      setSnackbar({
        open: true,
        message: "Invalid credentials",
        severity: "error",
      });
    } finally {
      setLoading(false);
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
            <ShoppingBagOutlinedIcon
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
            Welcome Back
          </Typography>

          <Typography
            variant="body1"
            textAlign="center"
            sx={{
              color: "#777",
              mb: 4,
            }}
          >
            Login to continue your shopping experience
          </Typography>

          {/* FORM */}
          <Stack spacing={2.5}>
            <TextField
              label="Email Address"
              type="email"
              fullWidth
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              variant="outlined"
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

            <Typography
              variant="body2"
              textAlign="right"
              onClick={() => navigate("/forgot-password")}
              sx={{
                color: "#555",
                cursor: "pointer",
                fontWeight: 500,
                "&:hover": {
                  textDecoration: "underline",
                },
              }}
            >
              Forgot Password?
            </Typography>

            <Button
              variant="contained"
              size="large"
              onClick={handleLogin}
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
              Login
            </Button>

            {/* SIGN UP */}
            <Typography
              variant="body2"
              textAlign="center"
              sx={{
                mt: 1,
                color: "#666",
              }}
            >
              <Box component="span">Don&apos;t have an account? </Box>

              <Box
                component="span"
                sx={{
                  cursor: "pointer",
                  fontWeight: 700,
                  color: "#000",
                  transition: "0.2s",

                  "&:hover": {
                    textDecoration: "underline",
                  },
                }}
                onClick={() => navigate("/register")}
              >
                Sign Up
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
