import { Box, Typography } from "@mui/material";

export default function FAQItem({ question, answer }) {
  return (
    <Box>
      <Typography fontWeight={700}>{question}</Typography>

      <Typography color="#666">{answer}</Typography>
    </Box>
  );
}
