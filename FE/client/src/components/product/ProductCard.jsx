import {
  Card,
  CardContent,
  Typography,
  CardMedia,
  Box,
  IconButton,
} from "@mui/material";

import StarIcon from "@mui/icons-material/Star";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";

import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

import { addToWishlist, removeFromWishlist } from "../../api/wishlistApi";
import { useState, useEffect } from "react";

export default function ProductCard({ product }) {
  const navigate = useNavigate();

  const [wishlisted, setWishlisted] = useState(false);

  useEffect(() => {
    const checkWishlist = () => {
      const wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

      const exists = wishlist.some(
        (item) => Number(item.productId) === Number(product.id),
      );

      setWishlisted(exists);
    };

    checkWishlist();

    window.addEventListener("wishlistUpdated", checkWishlist);

    return () => {
      window.removeEventListener("wishlistUpdated", checkWishlist);
    };
  }, [product.id]);
  const rating = product.rating || 4;

  const discount =
    product.old_price && product.price
      ? Math.round(
          ((product.old_price - product.price) / product.old_price) * 100,
        )
      : null;

  const formatPrice = (price) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(price);
  };

  const handleNavigate = () => {
    navigate(`/product/${product.slug}`);
  };

  const handleWishlist = async (e) => {
    e.stopPropagation();

    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login");
      return;
    }

    try {
      const wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

      // REMOVE
      if (wishlisted) {
        const existingItem = wishlist.find(
          (item) => Number(item.productId) === Number(product.id),
        );

        const wishlistItemId = existingItem?.wishlistId;
        if (wishlistItemId) {
          await removeFromWishlist(wishlistItemId);
        }

        setWishlisted(false);
        const updatedWishlist = wishlist.filter(
          (item) => Number(item.productId) !== Number(product.id),
        );
        localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));

        window.dispatchEvent(new Event("wishlistUpdated"));

        return;
      }

      // ADD
      const response = await addToWishlist({
        product_id: product.id,
      });

      setWishlisted(true);

      product.wishlist_item_id = response.data.id;

      localStorage.setItem(
        "wishlist",
        JSON.stringify([
          ...wishlist,
          {
            productId: product.id,
            wishlistId: response.data.id,
          },
        ]),
      );

      window.dispatchEvent(new Event("wishlistUpdated"));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Card
      elevation={0}
      onClick={handleNavigate}
      sx={{
        borderRadius: "22px",

        overflow: "hidden",

        background: "#fff",

        cursor: "pointer",

        position: "relative",

        border: "1px solid #ececec",

        transition: "all 0.35s ease",

        display: "flex",

        flexDirection: "column",

        height: "100%",

        "&:hover": {
          transform: "translateY(-8px)",

          boxShadow: "0 18px 40px rgba(0,0,0,0.10)",
        },
      }}
    >
      {/* WISHLIST BUTTON */}
      <Box
        sx={{
          position: "absolute",

          top: 14,

          right: 14,

          zIndex: 5,
        }}
      >
        <IconButton
          onClick={handleWishlist}
          sx={{
            bgcolor: "#fff",

            width: 42,

            height: 42,

            boxShadow: "0 6px 18px rgba(0,0,0,0.10)",

            "&:hover": {
              bgcolor: "#fff",
            },
          }}
        >
          {wishlisted ? (
            <FavoriteIcon
              sx={{
                color: "#ff3b5c",
                fontSize: 22,
              }}
            />
          ) : (
            <FavoriteBorderIcon
              sx={{
                fontSize: 22,
              }}
            />
          )}
        </IconButton>
      </Box>

      {/* IMAGE SECTION */}
      <Box
        sx={{
          width: "100%",

          height: 320,

          background: "#f7f7f7",

          overflow: "hidden",

          position: "relative",
        }}
      >
        <CardMedia
          component="img"
          image={
            product.image
              ? `http://127.0.0.1:8000${product.image}`
              : "/placeholder.png"
          }
          alt={product.name}
          sx={{
            width: "100%",

            height: "100%",

            objectFit: "cover",

            transition: "0.4s ease",

            "&:hover": {
              transform: "scale(1.08)",
            },
          }}
        />
      </Box>

      {/* CONTENT */}
      <CardContent
        sx={{
          p: 2.5,

          display: "flex",

          flexDirection: "column",

          flexGrow: 1,
        }}
      >
        {/* PRODUCT NAME */}
        <Typography
          sx={{
            fontSize: "18px",

            fontWeight: 700,

            color: "#111",

            lineHeight: 1.4,

            minHeight: 52,

            display: "-webkit-box",

            WebkitLineClamp: 2,

            WebkitBoxOrient: "vertical",

            overflow: "hidden",
          }}
        >
          {product.name}
        </Typography>

        {/* RATING */}
        <Box
          sx={{
            display: "flex",

            alignItems: "center",

            gap: 0.4,

            mt: 1,

            mb: 2,
          }}
        >
          {Array.from({
            length: Math.floor(rating),
          }).map((_, index) => (
            <StarIcon
              key={index}
              sx={{
                color: "#ffb400",

                fontSize: 18,
              }}
            />
          ))}

          <Typography
            sx={{
              fontSize: "13px",

              color: "#666",

              fontWeight: 600,

              ml: 0.5,
            }}
          >
            {rating}/5
          </Typography>
        </Box>

        {/* PRICE */}
        <Box
          sx={{
            display: "flex",

            alignItems: "center",

            gap: 1,

            flexWrap: "wrap",

            mt: "auto",
          }}
        >
          {/* CURRENT PRICE */}
          <Typography
            sx={{
              fontSize: "32px",

              fontWeight: 800,

              color: "#000",

              lineHeight: 1,
            }}
          >
            {formatPrice(product.price)}
          </Typography>

          {/* OLD PRICE */}
          {product.old_price && (
            <Typography
              sx={{
                fontSize: "16px",

                color: "#9e9e9e",

                textDecoration: "line-through",

                fontWeight: 600,
              }}
            >
              {formatPrice(product.old_price)}
            </Typography>
          )}

          {/* DISCOUNT */}
          {discount && (
            <Box
              sx={{
                background: "linear-gradient(135deg,#ffe5ea,#ffd2dc)",

                color: "#e63946",

                px: 1.3,

                py: 0.5,

                borderRadius: "999px",

                fontSize: "12px",

                fontWeight: 700,
              }}
            >
              -{discount}%
            </Box>
          )}
        </Box>
      </CardContent>
    </Card>
  );
}

ProductCard.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.number.isRequired,

    slug: PropTypes.string,

    name: PropTypes.string.isRequired,

    image: PropTypes.string,

    price: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,

    old_price: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),

    rating: PropTypes.number,
  }).isRequired,
};
