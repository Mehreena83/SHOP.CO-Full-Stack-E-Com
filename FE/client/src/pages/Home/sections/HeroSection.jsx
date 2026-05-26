import { Box, Typography, Button, Grid } from "@mui/material";
import herosImage from "../../../assets/herosection.jpg";
import { useNavigate } from "react-router-dom";

export default function HeroSection() {
  const navigate = useNavigate();
  return (
    <Box
      sx={{
        px: { xs: 2, sm: 3, md: 8 },
        py: { xs: 4, md: 6 },
        backgroundColor: "#f5f5f5",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <Grid container alignItems="center" spacing={{ xs: 4, md: 2 }}>
        {/* LEFT CONTENT */}
        <Grid item xs={12} md={6}>
          <Typography
            sx={{
              fontSize: {
                xs: "34px",
                sm: "42px",
                md: "56px",
              },
              fontWeight: 900,
              lineHeight: 1.05,
              letterSpacing: "-1px",
              textAlign: { xs: "center", md: "left" },
            }}
          >
            FIND CLOTHES <br />
            THAT MATCHES <br />
            YOUR STYLE
          </Typography>

          <Typography
            sx={{
              mt: 3,
              color: "#666",
              maxWidth: "500px",
              fontSize: {
                xs: "14px",
                sm: "15px",
                md: "16px",
              },
              lineHeight: 1.7,
              mx: { xs: "auto", md: 0 },
              textAlign: { xs: "center", md: "left" },
            }}
          >
            Browse through our diverse range of meticulously crafted garments,
            designed to bring out your individuality and cater to your sense of
            style.
          </Typography>

          {/* BUTTON */}
          <Box
            sx={{
              display: "flex",
              justifyContent: {
                xs: "center",
                md: "flex-start",
              },
            }}
          >
            <Button
              onClick={() => navigate("/shop")}
              sx={{
                mt: 4,
                backgroundColor: "#000",
                color: "#fff",
                borderRadius: "30px",
                px: { xs: 5, md: 4 },
                py: 1.5,
                width: { xs: "100%", sm: "220px", md: "auto" },
                maxWidth: "320px",
                textTransform: "none",
                fontWeight: 600,
                fontSize: "16px",
                "&:hover": {
                  backgroundColor: "#222",
                },
              }}
            >
              Shop Now
            </Button>
          </Box>

          {/* STATS */}
          <Box
            sx={{
              mt: 5,
              display: "flex",
              justifyContent: {
                xs: "center",
                md: "flex-start",
              },
              alignItems: "center",
              flexWrap: "wrap",
              gap: { xs: 3, md: 0 },
              textAlign: { xs: "center", md: "left" },
            }}
          >
            {/* ITEM 1 */}
            <Box>
              <Typography
                sx={{
                  fontSize: { xs: 26, md: 32 },
                  fontWeight: 800,
                }}
              >
                200+
              </Typography>

              <Typography
                sx={{
                  fontSize: 13,
                  color: "#777",
                }}
              >
                International Brands
              </Typography>
            </Box>

            {/* DIVIDER */}
            <Box
              sx={{
                height: "40px",
                width: "1px",
                backgroundColor: "#ddd",
                mx: 3,
                display: { xs: "none", md: "block" },
              }}
            />

            {/* ITEM 2 */}
            <Box>
              <Typography
                sx={{
                  fontSize: { xs: 26, md: 32 },
                  fontWeight: 800,
                }}
              >
                2,000+
              </Typography>

              <Typography
                sx={{
                  fontSize: 13,
                  color: "#777",
                }}
              >
                High-Quality Products
              </Typography>
            </Box>

            {/* DIVIDER */}
            <Box
              sx={{
                height: "40px",
                width: "1px",
                backgroundColor: "#ddd",
                mx: 3,
                display: { xs: "none", md: "block" },
              }}
            />

            {/* ITEM 3 */}
            <Box>
              <Typography
                sx={{
                  fontSize: { xs: 26, md: 32 },
                  fontWeight: 800,
                }}
              >
                30,000+
              </Typography>

              <Typography
                sx={{
                  fontSize: 13,
                  color: "#777",
                }}
              >
                Happy Customers
              </Typography>
            </Box>
          </Box>
        </Grid>

        {/* RIGHT IMAGE */}
        <Grid item xs={12} md={6}>
          <Box
            component="img"
            src={herosImage}
            alt="hero"
            sx={{
              width: "100%",
              height: {
                xs: "350px",
                sm: "450px",
                md: "650px",
              },
              objectFit: "cover",
              borderRadius: { xs: "20px", md: 0 },

              ml: {
                xs: 0,
                md: 6,
              },

              transform: {
                xs: "none",
                md: "translateX(100px)",
              },
            }}
          />
        </Grid>
      </Grid>

      {/* BIG STAR */}
      <Box
        sx={{
          position: "absolute",
          top: {
            xs: "8%",
            md: "20%",
          },
          right: {
            xs: "8%",
            md: "8%",
          },
          width: {
            xs: "14px",
            md: "20px",
          },
          height: {
            xs: "14px",
            md: "20px",
          },
          backgroundColor: "#000",
          transform: "rotate(45deg)",
        }}
      />

      {/* SMALL STAR */}
      <Box
        sx={{
          position: "absolute",
          top: {
            xs: "48%",
            md: "45%",
          },
          right: {
            xs: "15%",
            md: "25%",
          },
          width: {
            xs: "8px",
            md: "10px",
          },
          height: {
            xs: "8px",
            md: "10px",
          },
          backgroundColor: "#000",
          transform: "rotate(45deg)",
        }}
      />
    </Box>
  );
}
