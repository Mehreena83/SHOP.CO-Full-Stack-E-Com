import { Box, Stack, Typography } from "@mui/material";

const brands = [
  {
    name: "VERSACE",
    style: {
      fontFamily: "Arial, sans-serif",
      fontWeight: 500,
      letterSpacing: "1px",
      fontSize: { xs: "18px", sm: "22px", md: "34px" },
    },
  },
  {
    name: "ZARA",
    style: {
      fontFamily: "'Times New Roman', serif",
      fontWeight: 700,
      letterSpacing: "-2px",
      fontSize: { xs: "20px", sm: "24px", md: "40px" },
    },
  },
  {
    name: "GUCCI",
    style: {
      fontFamily: "'Georgia', serif",
      fontWeight: 500,
      letterSpacing: "2px",
      fontSize: { xs: "18px", sm: "22px", md: "34px" },
    },
  },
  {
    name: "PRADA",
    style: {
      fontFamily: "'Times New Roman', serif",
      fontWeight: 700,
      letterSpacing: "4px",
      fontSize: { xs: "20px", sm: "24px", md: "42px" },
    },
  },
  {
    name: "Calvin Klein",
    style: {
      fontFamily: "Helvetica, Arial, sans-serif",
      fontWeight: 300,
      letterSpacing: "-1px",
      fontSize: { xs: "16px", sm: "20px", md: "32px" },
    },
  },
];

export default function BrandStrip() {
  return (
    <Box
      sx={{
        bgcolor: "black",
        py: { xs: 3, md: 4 },
        px: { xs: 2, sm: 3, md: 8 },
        width: "100%",
        overflow: "hidden",
      }}
    >
      <Stack
        direction="row"
        justifyContent={{
          xs: "center",
          md: "space-evenly",
        }}
        alignItems="center"
        spacing={{ xs: 4, md: 8 }}
        sx={{
          width: "100%",
          flexWrap: {
            xs: "wrap",
            md: "nowrap",
          },
          rowGap: {
            xs: 3,
            md: 0,
          },
        }}
      >
        {brands.map((brand, index) => (
          <Box
            key={index}
            sx={{
              textAlign: "center",

              flex: {
                xs: "0 0 40%",
                sm: "0 0 30%",
                md: 1,
              },

              minWidth: 0,
            }}
          >
            <Typography
              sx={{
                color: "white",
                whiteSpace: "nowrap",
                transition: "0.3s",

                "&:hover": {
                  transform: "scale(1.05)",
                },

                ...brand.style,
              }}
            >
              {brand.name}
            </Typography>
          </Box>
        ))}
      </Stack>
    </Box>
  );
}
