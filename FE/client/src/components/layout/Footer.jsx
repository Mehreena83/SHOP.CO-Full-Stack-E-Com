import {
  Box,
  Container,
  Grid,
  Typography,
  IconButton,
  Stack,
} from "@mui/material";
import { Facebook, Twitter, Instagram, GitHub } from "@mui/icons-material";
import AppleIcon from "@mui/icons-material/Apple";
import NewsletterSection from "../../pages/Home/sections/NewsletterSection";
export default function Footer() {
  return (
    <Box
      sx={{
        mt: { xs: 6, md: 2 },
        position: "relative",
      }}
    >
      {" "}
      {/* Newsletter Banner */}
      <NewsletterSection />
      {/* Footer Main */}
      <Box
        sx={{
          bgcolor: "#F0F0F0",
          pt: "110px",
          pb: 5,
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={5}>
            {/* Left */}
            <Grid item xs={12} md={3}>
              <Typography
                sx={{
                  fontWeight: 900,
                  fontSize: "32px",
                  mb: 2,
                }}
              >
                SHOP.CO
              </Typography>

              <Typography
                sx={{
                  color: "#6B6B6B",
                  fontSize: "14px",
                  lineHeight: 1.7,
                  mb: 3,
                  maxWidth: "250px",
                }}
              >
                We have clothes that suits your style and which you're proud to
                wear. From women to men.
              </Typography>

              <Stack direction="row" spacing={1}>
                {[
                  <Twitter fontSize="small" sx={{ color: "#000" }} />,
                  <Facebook fontSize="small" sx={{ color: "#000" }} />,
                  <Instagram fontSize="small" sx={{ color: "#000" }} />,
                  <GitHub fontSize="small" sx={{ color: "#000" }} />,
                ].map((icon, i) => (
                  <IconButton
                    key={i}
                    sx={{
                      width: 34,
                      height: 34,
                      bgcolor: "#fff",
                      border: "1px solid #ddd",
                    }}
                  >
                    {icon}
                  </IconButton>
                ))}
              </Stack>
            </Grid>

            {/* Right Columns */}
            <Grid item xs={12} md={9}>
              <Grid container spacing={4}>
                {[
                  {
                    title: "COMPANY",
                    items: ["About", "Features", "Works", "Career"],
                  },
                  {
                    title: "HELP",
                    items: [
                      "Customer Support",
                      "Delivery Details",
                      "Terms & Conditions",
                      "Privacy Policy",
                    ],
                  },
                  {
                    title: "FAQ",
                    items: [
                      "Account",
                      "Manage Deliveries",
                      "Orders",
                      "Payments",
                    ],
                  },
                  {
                    title: "RESOURCES",
                    items: [
                      "Free eBooks",
                      "Development Tutorial",
                      "How to - Blog",
                      "Youtube Playlist",
                    ],
                  },
                ].map((section, idx) => (
                  <Grid item xs={6} md={3} key={idx}>
                    <Typography
                      sx={{
                        fontWeight: 700,
                        fontSize: "14px",
                        letterSpacing: "1px",
                        mb: 2,
                      }}
                    >
                      {section.title}
                    </Typography>

                    <Stack spacing={1.3}>
                      {section.items.map((item, i) => (
                        <Typography
                          key={i}
                          sx={{
                            color: "#6B6B6B",
                            fontSize: "14px",
                          }}
                        >
                          {item}
                        </Typography>
                      ))}
                    </Stack>
                  </Grid>
                ))}
              </Grid>
            </Grid>
          </Grid>

          {/* Bottom */}
          <Box
            sx={{
              borderTop: "1px solid #D9D9D9",
              mt: 6,
              pt: 3,
              display: "flex",
              flexDirection: { xs: "column", md: "row" },
              justifyContent: "space-between",
              alignItems: "center",
              gap: 2,
            }}
          >
            <Typography
              sx={{
                color: "#6B6B6B",
                fontSize: "14px",
              }}
            >
              Shop.co © 2000-2023, All Rights Reserved
            </Typography>

            <Stack direction="row" spacing={1.5} flexWrap="wrap">
              {/* VISA */}
              <Box
                sx={{
                  bgcolor: "#fff",
                  borderRadius: "8px",
                  width: 70,
                  height: 42,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  boxShadow: "0 1px 4px rgba(0,0,0,0.06)",
                }}
              >
                <Typography
                  sx={{
                    color: "#1A49B8",
                    fontWeight: 900,
                    fontStyle: "italic",
                    fontSize: "16px",
                  }}
                >
                  VISA
                </Typography>
              </Box>

              {/* MasterCard */}
              <Box
                sx={{
                  bgcolor: "#fff",
                  borderRadius: "8px",
                  width: 70,
                  height: 42,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  boxShadow: "0 1px 4px rgba(0,0,0,0.06)",
                  position: "relative",
                }}
              >
                <Box
                  sx={{
                    width: 20,
                    height: 20,
                    bgcolor: "#EA001B",
                    borderRadius: "50%",
                    position: "absolute",
                    left: 22,
                  }}
                />
                <Box
                  sx={{
                    width: 20,
                    height: 20,
                    bgcolor: "#F79E1B",
                    borderRadius: "50%",
                    position: "absolute",
                    left: 34,
                    opacity: 0.95,
                  }}
                />
              </Box>

              {/* PayPal */}
              <Box
                sx={{
                  bgcolor: "#fff",
                  borderRadius: "8px",
                  width: 70,
                  height: 42,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  boxShadow: "0 1px 4px rgba(0,0,0,0.06)",
                }}
              >
                <Typography
                  sx={{
                    fontWeight: 800,
                    fontStyle: "italic",
                    fontSize: "15px",
                    lineHeight: 1,
                  }}
                >
                  <span style={{ color: "#003087" }}>Pay</span>
                  <span style={{ color: "#00AEEF" }}>Pal</span>
                </Typography>
              </Box>

              {/* Apple Pay */}
              <Box
                sx={{
                  bgcolor: "#fff",
                  borderRadius: "8px",
                  width: 70,
                  height: 42,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 0.5,
                  boxShadow: "0 1px 4px rgba(0,0,0,0.06)",
                }}
              >
                <AppleIcon sx={{ fontSize: 18, color: "#000" }} />
                <Typography
                  sx={{
                    fontWeight: 700,
                    fontSize: "14px",
                    color: "#000",
                  }}
                >
                  Pay
                </Typography>
              </Box>

              {/* Google Pay */}
              <Box
                sx={{
                  bgcolor: "#fff",
                  borderRadius: "8px",
                  width: 70,
                  height: 42,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  boxShadow: "0 1px 4px rgba(0,0,0,0.06)",
                }}
              >
                <Typography sx={{ fontWeight: 700, fontSize: "15px" }}>
                  <span style={{ color: "#4285F4" }}>G</span>
                  <span style={{ color: "#000" }}>Pay</span>
                </Typography>
              </Box>
            </Stack>
          </Box>
        </Container>
      </Box>
    </Box>
  );
}
