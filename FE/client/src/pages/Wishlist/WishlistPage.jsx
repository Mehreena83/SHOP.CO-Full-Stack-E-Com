import {
  Box,
  Typography,
  Grid,
  Card,
  CardMedia,
  CardContent,
  IconButton,
  Button,
} from "@mui/material";

import DeleteOutlineIcon from "@mui/icons-material/DeleteOutlineOutlined";
import { useEffect, useState } from "react";
import CustomSnackbar from "../../components/common/CustomSnackbar";
import { getWishlist, removeFromWishlist } from "../../api/wishlistApi";

import { useNavigate } from "react-router-dom";

export default function WishlistPage() {
  const [wishlistItems, setWishlistItems] = useState([]);

  const navigate = useNavigate();
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });
  useEffect(() => {
    fetchWishlist();
  }, []);

  const fetchWishlist = async () => {
    try {
      const response = await getWishlist();

      setWishlistItems(response.data);
    } catch (error) {
      console.log(error);
      setSnackbar({
        open: true,
        message: "Failed to load wishlist",
        severity: "error",
      });
    }
  };

  const handleRemove = async (id, productId) => {
    try {
      await removeFromWishlist(id);

      setWishlistItems((prev) => prev.filter((item) => item.id !== id));

      const wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

      const updatedWishlist = wishlist.filter(
        (item) => Number(item.productId) !== Number(productId),
      );

      localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));

      window.dispatchEvent(new Event("wishlistUpdated"));
      setSnackbar({
        open: true,
        message: "Removed from wishlist",
        severity: "success",
      });
    } catch (error) {
      console.log(error);

      setSnackbar({
        open: true,
        message: "Failed to remove wishlist item",
        severity: "error",
      });
    }
  };
  return (
    <>
      <Box
        sx={{
          px: {
            xs: 2,
            md: 6,
          },
          py: 5,
        }}
      >
        {/* TITLE */}
        <Typography
          sx={{
            fontSize: "2.2rem",
            fontWeight: 800,
            mb: 5,
          }}
        >
          My Wishlist
        </Typography>

        {wishlistItems.length === 0 ? (
          <Typography>Wishlist is empty</Typography>
        ) : (
          <Grid container spacing={4}>
            {wishlistItems.map((item) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={item.id}>
                <Card
                  sx={{
                    borderRadius: "20px",
                    boxShadow: "none",
                    border: "1px solid #eee",
                    position: "relative",
                    height: "100%",
                  }}
                >
                  {/* REMOVE BUTTON */}
                  <IconButton
                    onClick={() => handleRemove(item.id, item.product)}
                    sx={{
                      position: "absolute",
                      top: 10,
                      right: 10,
                      bgcolor: "#fff",

                      "&:hover": {
                        bgcolor: "#fff",
                      },
                    }}
                  >
                    <DeleteOutlineIcon
                      sx={{
                        color: "red",
                      }}
                    />
                  </IconButton>

                  {/* IMAGE */}
                  <CardMedia
                    component="img"
                    image={`http://127.0.0.1:8000${item.product_image}`}
                    alt={item.product_name}
                    sx={{
                      height: 280,
                      objectFit: "contain",
                      p: 2,
                      bgcolor: "#f8f8f8",
                    }}
                  />

                  {/* CONTENT */}
                  <CardContent>
                    <Typography fontWeight={700} fontSize="18px" mb={1}>
                      {item.product_name}
                    </Typography>

                    <Typography fontWeight={800} fontSize="24px">
                      ₹{item.product_price}
                    </Typography>

                    <Button
                      fullWidth
                      variant="contained"
                      onClick={() => navigate(`/product/${item.product_slug}`)}
                      sx={{
                        mt: 3,
                        borderRadius: "14px",
                        bgcolor: "#000",
                        textTransform: "none",
                        fontWeight: 700,

                        "&:hover": {
                          bgcolor: "#111",
                        },
                      }}
                    >
                      View Product
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}
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
