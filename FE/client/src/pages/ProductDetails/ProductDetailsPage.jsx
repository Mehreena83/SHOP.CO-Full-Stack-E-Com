import {
  Box,
  Grid,
  Typography,
  Divider,
  CircularProgress,
} from "@mui/material";

import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import ProductCard from "../../components/product/ProductCard";
import CustomBreadcrumbs from "../../components/layout/Breadcrumbs";
import ProductImages from "../../components/product/ProductImages";
import ProductInfo from "../../components/product/ProductInfo";
import ProductTabs from "../../components/product/ProductTabs";
import CustomSnackbar from "../../components/common/CustomSnackbar";
import { getReviews, createReview } from "../../api/reviewApi";

export default function ProductDetailsPage() {
  const { slug } = useParams();

  const [product, setProduct] = useState(null);

  const [loading, setLoading] = useState(true);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [reviews, setReviews] = useState([]);

  const [rating, setRating] = useState(5);

  const [comment, setComment] = useState("");
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });
  useEffect(() => {
    fetchReviews();
  }, [product]);

  const fetchReviews = async () => {
    if (!product) return;

    try {
      const response = await getReviews(product.id);

      // DB reviews
      const apiReviews = response.data || [];

      // Backend static reviews
      const backendReviews =
        product.reviews?.map((review, index) => ({
          id: `static-${index}`,

          user_name: review.user || review.name || "Anonymous",

          rating: review.rating || 5,

          comment: review.comment,

          created_at: new Date().toISOString(),
        })) || [];

      // merge both
      setReviews([...backendReviews, ...apiReviews]);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    axios
      .get(`http://127.0.0.1:8000/api/products/${slug}/`)
      .then((response) => {
        setProduct(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });

    axios
      .get("http://127.0.0.1:8000/api/products/")
      .then((response) => {
        const filteredProducts = response.data.filter(
          (item) => item.slug !== slug,
        );

        setRelatedProducts(filteredProducts.slice(0, 4));
      })
      .catch((error) => {
        console.log(error);
      });
  }, [slug]);

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          py: 10,
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (!product) {
    return <Typography sx={{ p: 5 }}>Product not found</Typography>;
  }

  return (
    <>
      <Box
        sx={{
          background: "#fafafa",
          py: 6,
        }}
      >
        <Box
          sx={{
            maxWidth: "1300px",
            mx: "auto",
            px: { xs: 2, md: 4 },
          }}
        >
          <CustomBreadcrumbs current={product.name} showShop />

          <Box
            sx={{
              background: "#fff",
              borderRadius: "28px",
              p: { xs: 3, md: 6 },
              boxShadow: "0 10px 40px rgba(0,0,0,0.05)",
              mt: 3,
            }}
          >
            <Grid container spacing={{ xs: 4, md: 8 }} alignItems="flex-start">
              {/* LEFT IMAGE */}
              <Grid item xs={12} md={6}>
                <Box
                  sx={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  <ProductImages product={product} />
                </Box>
              </Grid>

              {/* RIGHT INFO */}
              <Grid item xs={12} md={6}>
                <Box
                  sx={{
                    width: "100%",
                    maxWidth: "520px",
                  }}
                >
                  <ProductInfo product={product} />
                </Box>
              </Grid>
            </Grid>
          </Box>
          <ProductTabs
            product={product}
            reviews={reviews}
            rating={rating}
            setRating={setRating}
            comment={comment}
            setComment={setComment}
            handleSubmitReview={async () => {
              const token = localStorage.getItem("token");

              if (!token) {
                setSnackbar({
                  open: true,
                  message: "Please login first",
                  severity: "warning",
                });

                return;
              }

              if (!comment.trim()) {
                setSnackbar({
                  open: true,
                  message: "Please enter comment",
                  severity: "warning",
                });

                return;
              }

              if (rating < 1 || rating > 5) {
                setSnackbar({
                  open: true,
                  message: "Rating must be between 1 and 5",
                  severity: "warning",
                });

                return;
              }

              try {
                await createReview(product.id, {
                  rating,
                  comment,
                });

                setComment("");
                setRating(5);

                fetchReviews();

                setSnackbar({
                  open: true,
                  message: "Review added successfully",
                  severity: "success",
                });
              } catch (error) {
                setSnackbar({
                  open: true,
                  message: "Review submit failed",
                  severity: "error",
                });
              }
            }}
          />
          {/* REVIEWS SECTION */}

          <Divider sx={{ my: 10 }} />
          <Box sx={{ mt: 10 }}>
            <Typography variant="h4" fontWeight={800} mb={4} textAlign="center">
              You May Also Like
            </Typography>

            <Grid container spacing={3}>
              {relatedProducts.map((item) => (
                <Grid item xs={12} sm={6} md={3} key={item.id}>
                  <ProductCard product={item} />
                </Grid>
              ))}
            </Grid>
          </Box>
        </Box>
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
