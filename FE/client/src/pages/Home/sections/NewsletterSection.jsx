import { useState } from "react";

import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
  InputAdornment,
  CircularProgress,
} from "@mui/material";

import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import CustomSnackbar from "../../../components/common/CustomSnackbar";
import axios from "axios";

export default function NewsletterSection() {
  const [email, setEmail] = useState("");

  const [loading, setLoading] = useState(false);

  const [open, setOpen] = useState(false);

  const [errorOpen, setErrorOpen] = useState(false);

  const [message, setMessage] = useState("");

  // EMAIL VALIDATION
  const validateEmail = (email) => {
    return /\S+@\S+\.\S+/.test(email);
  };

  // SUBSCRIBE
  const handleSubscribe = async () => {
    // EMPTY
    if (!email) {
      setMessage("Please enter email");
      setErrorOpen(true);
      return;
    }

    // INVALID EMAIL
    if (!validateEmail(email)) {
      setMessage("Enter valid email");
      setErrorOpen(true);
      return;
    }

    try {
      setLoading(true);

      const response = await axios.post(
        "http://127.0.0.1:8000/api/newsletter/",
        {
          email,
        },
      );

      console.log(response.data);

      // SUCCESS
      setOpen(true);

      setEmail("");
    } catch (error) {
      console.log(error);

      // DUPLICATE EMAIL
      if (error.response?.data?.email) {
        setMessage("Email already subscribed");
      } else {
        setMessage("Something went wrong");
      }

      setErrorOpen(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Container
        maxWidth="lg"
        sx={{
          position: "relative",
          zIndex: 2,
        }}
      >
        <Box
          sx={{
            bgcolor: "#000",
            borderRadius: "28px",

            px: {
              xs: 3,
              md: 8,
            },

            py: {
              xs: 4,
              md: 5,
            },

            display: "flex",

            flexDirection: {
              xs: "column",
              md: "row",
            },

            justifyContent: "space-between",

            alignItems: "center",

            gap: 4,

            transform: "translateY(70px)",

            overflow: "hidden",

            position: "relative",
          }}
        >
          {/* LEFT */}
          <Box>
            <Typography
              sx={{
                color: "#fff",

                fontWeight: 900,

                fontSize: {
                  xs: "30px",
                  sm: "36px",
                  md: "44px",
                },

                lineHeight: 1.1,

                textTransform: "uppercase",

                maxWidth: "560px",

                letterSpacing: "-1px",
              }}
            >
              STAY UP TO DATE ABOUT
              <br />
              OUR LATEST OFFERS
            </Typography>

            <Typography
              sx={{
                color: "#bdbdbd",

                mt: 2,

                fontSize: {
                  xs: "14px",
                  md: "15px",
                },

                maxWidth: "500px",
              }}
            >
              Subscribe and get special offers, discounts, fashion updates and
              latest arrivals.
            </Typography>
          </Box>

          {/* RIGHT */}
          <Box
            sx={{
              width: {
                xs: "100%",
                md: "390px",
              },
            }}
          >
            {/* INPUT */}
            {/* INPUT */}
            <TextField
              fullWidth
              placeholder="Enter your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleSubscribe();
                }
              }}
              size="small"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Box
                      sx={{
                        width: 34,
                        height: 34,
                        borderRadius: "50%",
                        bgcolor: "#f3f3f3",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <EmailOutlinedIcon
                        sx={{
                          color: "#000",
                          fontSize: 18,
                        }}
                      />
                    </Box>
                  </InputAdornment>
                ),
              }}
              sx={{
                mb: 2,

                "& .MuiOutlinedInput-root": {
                  bgcolor: "#fff",
                  borderRadius: "999px",
                  height: "56px",
                  px: 1,

                  "& fieldset": {
                    border: "none",
                  },

                  "&:hover": {
                    bgcolor: "#fafafa",
                  },
                },

                "& input": {
                  fontSize: "15px",
                },

                "& input::placeholder": {
                  color: "#8A8A8A",
                  opacity: 1,
                },
              }}
            />

            {/* BUTTON */}
            <Button
              fullWidth
              onClick={handleSubscribe}
              disabled={loading}
              sx={{
                bgcolor: "#fff",

                color: "#000",

                borderRadius: "999px",

                height: "56px",

                textTransform: "none",

                fontWeight: 700,

                fontSize: "15px",

                transition: "0.3s",

                "&:hover": {
                  bgcolor: "#f2f2f2",
                },
              }}
            >
              {loading ? (
                <CircularProgress
                  size={24}
                  sx={{
                    color: "#000",
                  }}
                />
              ) : (
                "Subscribe to Newsletter"
              )}
            </Button>
          </Box>
        </Box>
      </Container>
      <CustomSnackbar
        open={open}
        handleClose={() => setOpen(false)}
        severity="success"
        message="Successfully subscribed 🎉"
      />
      <CustomSnackbar
        open={errorOpen}
        handleClose={() => setErrorOpen(false)}
        severity="error"
        message={message}
      />
    </>
  );
}
