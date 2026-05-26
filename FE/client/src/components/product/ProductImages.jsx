import { Box } from "@mui/material";

export default function ProductImages({ product }) {
  return (
    <Box
      sx={{
        width: "100%",
        height: {
          xs: "400px",
          md: "650px",
        },

        borderRadius: "28px",
        overflow: "hidden",

        background: "#f5f5f5",

        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Box
        component="img"
        src={
          product.image?.startsWith("http")
            ? product.image
            : `http://127.0.0.1:8000${product.image}`
        }
        alt={product.name}
        sx={{
          width: "100%",
          maxWidth: "500px",
          height: { xs: "400px", md: "620px" },

          objectFit: "cover",

          borderRadius: "24px",

          transition: "0.4s",

          "&:hover": {
            transform: "scale(1.03)",
          },
        }}
      />
    </Box>
  );
}
