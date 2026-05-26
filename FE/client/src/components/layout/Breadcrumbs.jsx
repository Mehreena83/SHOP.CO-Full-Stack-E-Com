import { Breadcrumbs, Typography, Link } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function CustomBreadcrumbs({ current, showShop = false }) {
  const navigate = useNavigate();

  return (
    <Breadcrumbs sx={{ mb: 3 }}>
      {/* HOME */}
      <Link
        underline="hover"
        sx={{
          cursor: "pointer",
          color: "#555",
          fontWeight: 500,
        }}
        onClick={() => navigate("/")}
      >
        Home
      </Link>

      {/* SHOP */}
      {showShop && (
        <Link
          underline="hover"
          sx={{
            cursor: "pointer",
            color: "#555",
            fontWeight: 500,
          }}
          onClick={() => navigate("/shop")}
        >
          Shop
        </Link>
      )}

      <Typography
        sx={{
          color: "#000",
          fontWeight: 600,
        }}
      >
        {current}
      </Typography>
    </Breadcrumbs>
  );
}
