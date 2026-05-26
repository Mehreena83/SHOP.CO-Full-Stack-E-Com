import { useState, useEffect } from "react";

import {
  Box,
  Typography,
  IconButton,
  TextField,
  Button,
  Rating,
} from "@mui/material";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

import CustomSnackbar from "../../../components/common/CustomSnackbar";

// DEFAULT DATA
const defaultTestimonials = [
  {
    name: "Sarah M.",
    review:
      "I'm blown away by the quality and style of the clothes I received from Shop.co.",
    rating: 5,
  },
  {
    name: "Alex K.",
    review:
      "Finding clothes that align with my personal style became easy with Shop.co.",
    rating: 4,
  },
  {
    name: "James L.",
    review:
      "I'm thrilled to have stumbled upon Shop.co for unique fashion pieces.",
    rating: 5,
  },
  {
    name: "Emily R.",
    review: "Excellent quality, fast delivery and amazing customer support.",
    rating: 4,
  },
  {
    name: "David T.",
    review: "One of the best online shopping experiences I've ever had.",
    rating: 5,
  },
  {
    name: "Sophia W.",
    review: "Their styles are trendy, modern and extremely comfortable.",
    rating: 5,
  },
];

export default function Testimonials() {
  // SNACKBAR
  const [open, setOpen] = useState(false);

  const [errorOpen, setErrorOpen] = useState(false);

  const [message, setMessage] = useState("");

  // LOCAL STORAGE DATA
  const [testimonials, setTestimonials] = useState(() => {
    const saved = localStorage.getItem("testimonials");

    return saved ? JSON.parse(saved) : defaultTestimonials;
  });

  // AUTO SAVE
  useEffect(() => {
    localStorage.setItem("testimonials", JSON.stringify(testimonials));
  }, [testimonials]);

  // FORM STATES
  const [name, setName] = useState("");

  const [feedback, setFeedback] = useState("");

  const [rating, setRating] = useState(5);

  // SLIDER
  const [slide, setSlide] = useState(0);

  const cardsPerView = 3;

  // NEXT
  const handleNext = () => {
    if (slide < testimonials.length - cardsPerView) {
      setSlide(slide + 1);
    }
  };

  // PREV
  const handlePrev = () => {
    if (slide > 0) {
      setSlide(slide - 1);
    }
  };

  // ADD FEEDBACK
  const handleAddFeedback = () => {
    // VALIDATION
    if (!name || !feedback) {
      setMessage("Please fill all fields");

      setErrorOpen(true);

      return;
    }

    const newFeedback = {
      name,
      review: feedback,
      rating,
    };

    // ADD NEW FEEDBACK
    setTestimonials((prev) => [newFeedback, ...prev]);

    // RESET
    setName("");
    setFeedback("");
    setRating(5);

    // GO START
    setSlide(0);

    // SUCCESS
    setOpen(true);
  };

  // SHOW ONLY 3
  const visibleTestimonials = testimonials.slice(slide, slide + cardsPerView);

  return (
    <>
      <Box
        sx={{
          py: { xs: 7, md: 10 },
          px: {
            xs: 2,
            sm: 4,
            md: 6,
          },
          backgroundColor: "#fafafa",
        }}
      >
        {/* HEADER */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 6,
            flexWrap: "wrap",
            gap: 2,
          }}
        >
          {/* LEFT */}
          <Box>
            <Typography
              sx={{
                fontWeight: 900,
                fontSize: {
                  xs: "34px",
                  md: "56px",
                },
                lineHeight: 1,
                letterSpacing: "-2px",
              }}
            >
              OUR HAPPY CUSTOMERS
            </Typography>

            <Typography
              sx={{
                color: "#777",
                mt: 1,
              }}
            >
              Real experiences from our customers
            </Typography>
          </Box>

          {/* BUTTONS */}
          <Box
            sx={{
              display: "flex",
              gap: 1,
            }}
          >
            {/* LEFT */}
            <IconButton
              onClick={handlePrev}
              disabled={slide === 0}
              sx={{
                bgcolor: "#fff",

                border: "1px solid #e5e5e5",

                opacity: slide === 0 ? 0.4 : 1,

                "&:hover": {
                  bgcolor: "#f3f3f3",
                },
              }}
            >
              <ArrowBackIcon />
            </IconButton>

            {/* RIGHT */}
            <IconButton
              onClick={handleNext}
              disabled={slide >= testimonials.length - cardsPerView}
              sx={{
                bgcolor: "#000",

                color: "#fff",

                opacity: slide >= testimonials.length - cardsPerView ? 0.5 : 1,

                "&:hover": {
                  bgcolor: "#222",
                },

                "&.Mui-disabled": {
                  bgcolor: "#000",
                  color: "#fff",
                },
              }}
            >
              <ArrowForwardIcon />
            </IconButton>
          </Box>
        </Box>

        {/* CARDS */}
        <Box
          sx={{
            display: "grid",

            gridTemplateColumns: {
              xs: "1fr",
              md: "repeat(3,1fr)",
            },

            gap: 4,
          }}
        >
          {visibleTestimonials.map((item, index) => (
            <Box
              key={index}
              sx={{
                bgcolor: "#fff",

                borderRadius: "24px",

                p: 4,

                border: "1px solid #eee",

                transition: "0.3s",

                "&:hover": {
                  transform: "translateY(-6px)",

                  boxShadow: "0 12px 30px rgba(0,0,0,0.08)",
                },
              }}
            >
              {/* RATING */}
              <Rating
                value={item.rating}
                readOnly
                sx={{
                  mb: 2,
                }}
              />

              {/* NAME */}
              <Box
                sx={{
                  display: "flex",

                  alignItems: "center",

                  gap: 1,

                  mb: 2,
                }}
              >
                <Typography
                  sx={{
                    fontWeight: 700,

                    fontSize: "18px",
                  }}
                >
                  {item.name}
                </Typography>

                <CheckCircleIcon
                  sx={{
                    color: "#00C853",

                    fontSize: "18px",
                  }}
                />
              </Box>

              {/* REVIEW */}
              <Typography
                sx={{
                  color: "#666",

                  lineHeight: 1.8,

                  fontSize: "15px",
                }}
              >
                "{item.review}"
              </Typography>
            </Box>
          ))}
        </Box>

        {/* FORM */}
        <Box
          sx={{
            mt: 8,

            maxWidth: "700px",

            mx: "auto",

            bgcolor: "#fff",

            borderRadius: "24px",

            p: {
              xs: 3,
              md: 5,
            },

            border: "1px solid #eee",
          }}
        >
          <Typography
            sx={{
              fontWeight: 800,

              fontSize: "28px",

              mb: 1,

              textAlign: "center",
            }}
          >
            Share Your Feedback
          </Typography>

          <Typography
            sx={{
              color: "#777",

              textAlign: "center",

              mb: 4,
            }}
          >
            We'd love to hear your shopping experience
          </Typography>

          {/* NAME */}
          <TextField
            fullWidth
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            sx={{
              mb: 2,

              "& .MuiOutlinedInput-root": {
                borderRadius: "14px",

                bgcolor: "#fafafa",
              },
            }}
          />

          {/* RATING */}
          <Box sx={{ mb: 3 }}>
            <Typography
              sx={{
                mb: 1,
                fontWeight: 600,
              }}
            >
              Your Rating
            </Typography>

            <Rating
              value={rating}
              onChange={(event, newValue) => {
                setRating(newValue);
              }}
              size="large"
            />
          </Box>

          {/* FEEDBACK */}
          <TextField
            fullWidth
            multiline
            rows={5}
            placeholder="Write your feedback here..."
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            sx={{
              mb: 3,

              "& .MuiOutlinedInput-root": {
                borderRadius: "16px",

                bgcolor: "#fafafa",
              },
            }}
          />

          {/* BUTTON */}
          <Button
            fullWidth
            onClick={handleAddFeedback}
            sx={{
              bgcolor: "#000",

              color: "#fff",

              height: "54px",

              borderRadius: "14px",

              fontWeight: 700,

              fontSize: "15px",

              "&:hover": {
                bgcolor: "#222",
              },
            }}
          >
            Submit Feedback
          </Button>
        </Box>
      </Box>

      {/* SUCCESS */}
      <CustomSnackbar
        open={open}
        handleClose={() => setOpen(false)}
        severity="success"
        message="Feedback submitted 🎉"
      />

      {/* ERROR */}
      <CustomSnackbar
        open={errorOpen}
        handleClose={() => setErrorOpen(false)}
        severity="error"
        message={message}
      />
    </>
  );
}
