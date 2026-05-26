import {
  Box,
  Typography,
  Tabs,
  Tab,
  Divider,
  Grid,
  Stack,
  TextField,
  Button,
  IconButton,
} from "@mui/material";
import { Rating } from "@mui/material";

import { useState } from "react";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import FAQItem from "./FAQItem";

export default function ProductTabs({
  product,
  reviews,
  rating,
  setRating,
  comment,
  setComment,
  handleSubmitReview,
}) {
  const [tab, setTab] = useState(0);
  const [page, setPage] = useState(0);

  const reviewsPerPage = 4;

  const totalPages = Math.ceil(reviews.length / reviewsPerPage);

  const displayedReviews = reviews.slice(
    page * reviewsPerPage,
    page * reviewsPerPage + reviewsPerPage,
  );
  return (
    <Box sx={{ mt: 8 }}>
      <Tabs
        value={tab}
        onChange={(e, v) => setTab(v)}
        centered
        sx={{
          "& .MuiTabs-indicator": {
            background: "#000",
            height: "3px",
            borderRadius: "10px",
          },
        }}
      >
        <Tab label="Product Details" />
        <Tab label="Rating & Reviews" />
        <Tab label="FAQs" />
      </Tabs>

      <Divider sx={{ mb: 4 }} />

      {/* DETAILS */}
      {tab === 0 && (
        <Typography color="#666" lineHeight={1.8}>
          {product.description}
        </Typography>
      )}

      {/* REVIEWS */}
      {tab === 1 && (
        <Box
          sx={{
            mt: 5,
            background: "#fff",
            borderRadius: "24px",
          }}
        >
          {/* REVIEW SUMMARY */}
          <Box
            sx={{
              textAlign: "center",
              mb: 6,
              pt: 4,
            }}
          >
            <Typography variant="h4" fontWeight={700}>
              {reviews.length > 0
                ? (
                    reviews.reduce((acc, item) => acc + item.rating, 0) /
                    reviews.length
                  ).toFixed(1)
                : "0.0"}
              / 5
            </Typography>

            <Rating
              value={
                reviews.length > 0
                  ? reviews.reduce((acc, item) => acc + item.rating, 0) /
                    reviews.length
                  : 0
              }
              precision={0.5}
              readOnly
              size="large"
            />

            <Typography color="text.secondary" sx={{ mt: 1 }}>
              Based on {reviews.length} reviews
            </Typography>
          </Box>

          {/* REVIEW FORM */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              mb: 8,
            }}
          >
            <Box
              sx={{
                width: "100%",
                maxWidth: "650px",
                background: "#fafafa",
                border: "1px solid #eee",
                borderRadius: "20px",
                p: 4,
              }}
            >
              <Typography
                variant="h6"
                fontWeight={700}
                mb={3}
                textAlign="center"
              >
                Write a Review
              </Typography>

              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 3,
                }}
              >
                <Box>
                  <Typography sx={{ mb: 1, fontWeight: 500 }}>
                    Rating
                  </Typography>

                  <Rating
                    value={rating}
                    onChange={(event, newValue) => {
                      setRating(newValue);
                    }}
                    size="large"
                  />
                </Box>

                <TextField
                  fullWidth
                  multiline
                  rows={4}
                  label="Write your review"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      borderRadius: "12px",
                    },
                  }}
                />

                <Button
                  variant="contained"
                  onClick={handleSubmitReview}
                  sx={{
                    bgcolor: "#000",
                    textTransform: "none",
                    borderRadius: "12px",
                    py: 1.5,
                    fontWeight: 600,
                    fontSize: "1rem",

                    "&:hover": {
                      bgcolor: "#222",
                    },
                  }}
                >
                  Submit Review
                </Button>
              </Box>
            </Box>
          </Box>

          <Divider sx={{ mb: 5 }} />

          {/* REVIEW CARDS */}
          {reviews.length === 0 ? (
            <Typography color="text.secondary" textAlign="center">
              No reviews yet
            </Typography>
          ) : (
            <>
              <Grid
                container
                spacing={4}
                justifyContent="center"
                sx={{
                  maxWidth: "1400px",
                  mx: "auto",
                  px: { xs: 1, sm: 2, md: 3 },
                }}
              >
                {displayedReviews.map((review) => (
                  <Grid item xs={12} sm={6} md={4} lg={3} key={review.id}>
                    <Box
                      sx={{
                        border: "1px solid #f0f0f0",
                        borderRadius: "24px",
                        p: 3.5,
                        background: "#fff",
                        height: "100%",
                        minHeight: "240px",

                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "space-between",

                        transition: "all 0.3s ease",

                        "&:hover": {
                          transform: "translateY(-6px)",
                          boxShadow: "0 12px 30px rgba(0,0,0,0.08)",
                        },
                      }}
                    >
                      <Typography
                        fontWeight={700}
                        fontSize="1.05rem"
                        mb={1}
                        sx={{
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                        }}
                      >
                        {review.user_name}
                      </Typography>

                      <Rating value={review.rating} readOnly size="small" />

                      {/* <Typography
                      color="text.secondary"
                      sx={{
                        mt: 2,
                        lineHeight: 1.7,
                      }}
                    > */}
                      <Typography
                        color="text.secondary"
                        sx={{
                          mt: 2,
                          lineHeight: 1.8,
                          fontSize: "0.95rem",

                          display: "-webkit-box",
                          WebkitLineClamp: 4,
                          WebkitBoxOrient: "vertical",
                          overflow: "hidden",
                        }}
                      >
                        {review.comment}
                      </Typography>

                      <Typography
                        variant="body2"
                        sx={{
                          mt: 3,
                          color: "#999",
                          fontSize: "0.82rem",
                        }}
                      >
                        {new Date(review.created_at).toLocaleDateString()}
                      </Typography>
                    </Box>
                  </Grid>
                ))}
              </Grid>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  gap: 2,
                  mt: 6,
                  mb: 2,
                }}
              >
                <IconButton
                  onClick={() => setPage((prev) => prev - 1)}
                  disabled={page === 0}
                  sx={{
                    width: 44,
                    height: 44,
                    border: "1px solid #e5e5e5",
                    borderRadius: "50%",
                    bgcolor: "#fff",
                    color: "#222",
                    transition: "all 0.25s ease",

                    "&:hover": {
                      bgcolor: "#000",
                      color: "#fff",
                      transform: "translateX(-2px)",
                    },

                    "&.Mui-disabled": {
                      opacity: 0.4,
                      bgcolor: "#fafafa",
                    },
                  }}
                >
                  <ArrowBackIosNewIcon sx={{ fontSize: "16px" }} />
                </IconButton>

                <Box
                  sx={{
                    px: 3,
                    py: 1,
                    borderRadius: "999px",
                    bgcolor: "#f7f7f7",
                    border: "1px solid #eee",
                    minWidth: "90px",
                    textAlign: "center",
                  }}
                >
                  <Typography
                    sx={{
                      fontWeight: 700,
                      fontSize: "0.95rem",
                      color: "#222",
                      letterSpacing: "0.5px",
                    }}
                  >
                    {page + 1} / {totalPages}
                  </Typography>
                </Box>

                <IconButton
                  onClick={() => setPage((prev) => prev + 1)}
                  disabled={page === totalPages - 1}
                  sx={{
                    width: 44,
                    height: 44,
                    border: "1px solid #e5e5e5",
                    borderRadius: "50%",
                    bgcolor: "#fff",
                    color: "#222",
                    transition: "all 0.25s ease",

                    "&:hover": {
                      bgcolor: "#000",
                      color: "#fff",
                      transform: "translateX(2px)",
                    },

                    "&.Mui-disabled": {
                      opacity: 0.4,
                      bgcolor: "#fafafa",
                    },
                  }}
                >
                  <ArrowForwardIosIcon sx={{ fontSize: "16px" }} />
                </IconButton>
              </Box>
            </>
          )}
        </Box>
      )}

      {/* FAQ */}
      {tab === 2 && (
        <Stack spacing={3}>
          {" "}
          {product?.faq?.map((item, index) => (
            <FAQItem
              key={index}
              question={item.question}
              answer={item.answer}
            />
          ))}{" "}
        </Stack>
      )}
    </Box>
  );
}
