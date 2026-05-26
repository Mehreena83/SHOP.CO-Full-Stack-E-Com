import { Box, Typography } from "@mui/material";
import StarIcon from "@mui/icons-material/Star";

export default function ReviewCard({ review }) {
  return (
    <Box
      sx={{
        border: "1px solid #eee",
        borderRadius: "20px",
        p: 3,
        height: "100%",
      }}
    >
      <Typography fontWeight={700}>
        {review.user_name || review.name || review.user || "Anonymous"}
      </Typography>

      {/* STARS */}
      <Box
        sx={{
          display: "flex",
          gap: 0.5,
          my: 1,
        }}
      >
        {[...Array(review.rating)].map((_, index) => (
          <StarIcon
            key={index}
            sx={{
              color: "#FFC633",
              fontSize: "18px",
            }}
          />
        ))}
      </Box>

      {/* COMMENT */}
      <Typography color="#666">{review.comment}</Typography>
    </Box>
  );
}
