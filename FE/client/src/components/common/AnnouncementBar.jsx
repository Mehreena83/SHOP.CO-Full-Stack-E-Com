import { Box, Typography, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AnnouncementBar() {
  const [open, setOpen] = useState(true);
  const navigate = useNavigate();
  if (!open) return null;

  return (
    <Box
      sx={{
        width: "100%",
        bgcolor: "black",
        color: "white",
        py: 1,
        px: 2,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        position: "relative",
      }}
    >
      <Typography fontSize={14}>
        Sign up and get 20% off to your first order.{" "}
        <span
          onClick={() => navigate("/register")}
          style={{
            textDecoration: "underline",
            cursor: "pointer",
            fontWeight: 600,
          }}
        >
          Sign Up Now
        </span>
      </Typography>

      <IconButton
        size="small"
        onClick={() => setOpen(false)}
        sx={{
          color: "white",
          position: "absolute",
          right: 10,
        }}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </Box>
  );
}
