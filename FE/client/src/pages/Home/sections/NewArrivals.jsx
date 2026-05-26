import { Box, Typography, Grid } from "@mui/material";
import ProductCard from "../../../components/product/ProductCard";
import useProducts from "../../../hooks/useProducts";

export default function NewArrivals() {
  const { products } = useProducts({});

  return (
    <Box
      id="new-arrivals"
      sx={{
        py: { xs: 6, md: 10 },
        px: { xs: 2, sm: 4, md: 6 },
        backgroundColor: "#f9f9f9",
      }}
    >
      {/* Heading */}
      <Box
        sx={{
          textAlign: "center",
          mb: { xs: 5, md: 7 },
        }}
      >
        <Typography
          sx={{
            fontWeight: 900,
            fontSize: {
              xs: "34px",
              sm: "42px",
              md: "58px",
            },
            letterSpacing: "-2px",
            lineHeight: 1,
          }}
        >
          NEW ARRIVALS
        </Typography>

        <Typography
          sx={{
            mt: 1.5,
            color: "#777",
            fontSize: {
              xs: "14px",
              md: "16px",
            },
          }}
        >
          Discover the latest trends and fresh styles
        </Typography>
      </Box>

      {/* Products */}
      <Grid container spacing={{ xs: 3, md: 4 }} justifyContent="center">
        {products.slice(0, 4).map((product) => (
          <Grid
            item
            xs={12}
            sm={6}
            md={3}
            key={product.id}
            sx={{
              display: "flex",
            }}
          >
            <Box
              sx={{
                width: "100%",
                transition: "0.3s",

                "&:hover": {
                  transform: "translateY(-6px)",
                },
              }}
            >
              <ProductCard product={product} />
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
