import { Typography, Box, Stack, Button, Divider } from "@mui/material";

import StarIcon from "@mui/icons-material/Star";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { addToCart } from "../../api/cartApi";
import CustomSnackbar from "../common/CustomSnackbar";
import { useNotifications } from "../../context/NotificationContext";

export default function ProductInfo({ product }) {
  const navigate = useNavigate();
  const { addNotification } = useNotifications();
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState(product.sizes?.[0] || "");
  const [selectedColor, setSelectedColor] = useState(product.colors?.[0] || "");
  const colorMap = {
    Brown: "#5C4033",
    Blue: "#1E3A8A",
    Black: "#000000",
    White: "#FFFFFF",
    Grey: "#808080",
    Olive: "#556B2F",
  };
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const handleAddToCart = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login");
      return;
    }

    try {
      await addToCart({
        product_id: product.id,
        quantity: quantity,
        size: selectedSize,
        color: selectedColor,
      });

      setSnackbar({
        open: true,
        message: "Added to cart",
        severity: "success",
      });
      addNotification(`${product.name} added to cart`);

      window.dispatchEvent(new Event("cartUpdated"));

      setTimeout(() => {
        navigate("/cart");
      }, 800);
    } catch (error) {
      console.log(error);

      setSnackbar({
        open: true,
        message: "Failed to add cart",
        severity: "error",
      });
    }
  };
  return (
    <Box
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      {" "}
      {/* TITLE */}
      <Typography
        sx={{
          fontSize: { xs: "2.2rem", md: "3.4rem" },
          letterSpacing: "-1px",
          fontWeight: 800,
          lineHeight: 1.1,
          mb: 2,
        }}
      >
        {product.name}
      </Typography>
      {/* RATING */}
      <Stack
        direction="row"
        alignItems="center"
        spacing={0.5}
        sx={{
          mb: 2,
        }}
      >
        {[1, 2, 3, 4].map((s) => (
          <StarIcon
            key={s}
            sx={{
              color: "#FFC633",
              fontSize: "22px",
            }}
          />
        ))}

        <Typography
          sx={{
            color: "#555",
            fontSize: "15px",
            fontWeight: 500,
            ml: 1,
          }}
        >
          {product.rating} Rating
        </Typography>
      </Stack>
      {/* PRICE */}
      <Stack
        direction="row"
        alignItems="center"
        spacing={2}
        sx={{
          mb: 3,
        }}
      >
        {product.old_price && (
          <Typography
            sx={{
              textDecoration: "line-through",
              color: "#9ca3af",
              fontSize: "29px",
              fontWeight: 700,
            }}
          >
            ₹{product.old_price}
          </Typography>
        )}
        <Typography
          sx={{
            fontWeight: 900,
            fontSize: {
              xs: "2.3rem",
              md: "3rem",
            },
            letterSpacing: "-1px",
            lineHeight: 1,
          }}
        >
          ₹{product.price}
        </Typography>
      </Stack>
      {/* OFFER + STOCK */}
      <Stack
        direction="row"
        spacing={1.5}
        alignItems="center"
        sx={{
          mb: 4,
        }}
      >
        {product.old_price && (
          <Box
            sx={{
              background: "#fee2e2",
              color: "#dc2626",
              px: 2.2,
              py: 0.9,
              borderRadius: "999px",
              fontWeight: 800,
              fontSize: "13px",
            }}
          >
            {Math.round(
              ((product.old_price - product.price) / product.old_price) * 100,
            )}
            % OFF
          </Box>
        )}

        <Box
          sx={{
            background: product.stock > 0 ? "#dcfce7" : "#fee2e2",

            color: product.stock > 0 ? "#15803d" : "#dc2626",

            px: 2.2,
            py: 0.9,
            borderRadius: "999px",
            fontWeight: 700,
            fontSize: "13px",
          }}
        >
          {product.stock > 0 ? `${product.stock} In Stock` : "Out Of Stock"}
        </Box>
      </Stack>
      <Typography
        sx={{
          color: "#666",
          lineHeight: 1.9,
          fontSize: "16px",
          mb: 5,
          maxWidth: "520px",
        }}
      >
        {product.description}
      </Typography>
      {/* <Divider sx={{ my: 4 }} /> */}
      <Divider
        sx={{
          mb: 5,
        }}
      />
      <Box sx={{ mb: 5 }}>
        <Typography
          sx={{
            fontWeight: 700,
            mb: 2.5,
            fontSize: "17px",
          }}
        >
          Select Color
        </Typography>

        <Stack direction="row" spacing={2}>
          {product.colors?.map((colorName) => (
            <Box
              key={colorName}
              onClick={() => setSelectedColor(colorName)}
              sx={{
                width: 56,
                height: 56,
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                transition: "0.25s",

                border:
                  selectedColor === colorName
                    ? "2px solid #111"
                    : "2px solid transparent",

                "&:hover": {
                  transform: "scale(1.08)",
                },
              }}
            >
              <Box
                sx={{
                  width: 38,
                  height: 38,
                  borderRadius: "50%",
                  background: colorMap[colorName] || "#ccc",

                  border: colorName === "White" ? "1px solid #ddd" : "none",

                  boxShadow:
                    selectedColor === colorName
                      ? "0 0 0 4px #fff inset"
                      : "none",
                }}
              />
            </Box>
          ))}
        </Stack>
      </Box>
      {/* SIZE */}
      <Box sx={{ mb: 5 }}>
        <Typography
          sx={{
            fontWeight: 700,
            mb: 2.5,
            fontSize: "17px",
          }}
        >
          Choose Size
        </Typography>

        <Stack direction="row" spacing={2} flexWrap="wrap">
          {product.sizes?.map((size) => (
            <Button
              key={size}
              onClick={() => setSelectedSize(size)}
              variant={selectedSize === size ? "contained" : "outlined"}
              sx={{
                borderRadius: "999px",
                minWidth: "68px",
                height: "48px",

                fontWeight: 700,
                fontSize: "15px",

                background: selectedSize === size ? "#000" : "#fff",

                color: selectedSize === size ? "#fff" : "#111",

                border: "1px solid #ddd",

                boxShadow: "none",

                "&:hover": {
                  background: "#000",
                  color: "#fff",
                  borderColor: "#000",
                },
              }}
            >
              {size}
            </Button>
          ))}
        </Stack>
      </Box>
      {/* QUANTITY + CART */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 2.5,
          mt: 1,

          flexDirection: {
            xs: "column",
            sm: "row",
          },
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",

            border: "1px solid #e5e7eb",

            borderRadius: "999px",

            height: 60,

            px: 1.2,

            minWidth: {
              xs: "100%",
              sm: "170px",
            },

            background: "#fafafa",
          }}
        >
          <Button
            onClick={() => setQuantity((q) => Math.max(1, q - 1))}
            sx={{
              minWidth: 40,
              color: "#111",
              fontSize: "20px",
              fontWeight: 700,
            }}
          >
            -
          </Button>

          <Typography
            sx={{
              fontWeight: 800,
              fontSize: "18px",
            }}
          >
            {quantity}
          </Typography>

          <Button
            onClick={() => setQuantity((q) => q + 1)}
            sx={{
              minWidth: 40,
              color: "#111",
              fontSize: "20px",
              fontWeight: 700,
            }}
          >
            +
          </Button>
        </Box>

        {/* ADD TO CART */}
        <Button
          variant="contained"
          fullWidth
          disabled={product.stock === 0}
          onClick={handleAddToCart}
          sx={{
            flex: 1,
            height: 60,
            borderRadius: "999px",
            fontWeight: 800,
            fontSize: "15px",
            letterSpacing: "1px",
            textTransform: "uppercase",
            background: product.stock === 0 ? "#9ca3af" : "#000",
            boxShadow:
              product.stock === 0 ? "none" : "0 12px 30px rgba(0,0,0,0.18)",
            transition: "all 0.3s ease",
            "&:hover": {
              background: product.stock === 0 ? "#9ca3af" : "#111",
              transform: product.stock === 0 ? "none" : "translateY(-3px)",
              boxShadow:
                product.stock === 0 ? "none" : "0 16px 35px rgba(0,0,0,0.22)",
            },
          }}
        >
          {product.stock === 0 ? "OUT OF STOCK" : "ADD TO CART"}
        </Button>
      </Box>
      <CustomSnackbar
        open={snackbar.open}
        message={snackbar.message}
        severity={snackbar.severity}
        handleClose={() => setSnackbar({ ...snackbar, open: false })}
      />
    </Box>
  );
}
