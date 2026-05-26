import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

export default function CustomSnackbar({
  open,
  handleClose,
  message,
  severity = "success",
}) {
  return (
    <Snackbar
      open={open}
      autoHideDuration={2200}
      onClose={handleClose}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "right",
      }}
    >
      <Alert
        onClose={handleClose}
        severity={severity}
        variant="filled"
        elevation={0}
        sx={{
          width: "100%",
          minWidth: "320px",
          borderRadius: "18px",
          fontWeight: 600,
          fontSize: "14px",
          py: 0.5,
          boxShadow: "0 12px 30px rgba(0,0,0,0.18)",

          "& .MuiAlert-icon": {
            fontSize: "22px",
          },
        }}
      >
        {message}
      </Alert>
    </Snackbar>
  );
}
