import HeroSection from "./sections/HeroSection";
import BrandStrip from "./sections/BrandStrip";
import NewArrivals from "./sections/NewArrivals";
import TopSelling from "./sections/TopSelling";
import Testimonials from "./sections/Testimonials";
import OnSale from "./sections/OnSale";
import { Box } from "@mui/material";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";

export default function HomePage() {
  const location = useLocation();

  useEffect(() => {
    if (location.state?.scrollTo) {
      const element = document.getElementById(location.state.scrollTo);

      if (element) {
        setTimeout(() => {
          element.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        }, 100);
      }
    }
  }, [location]);
  return (
    <>
      <HeroSection />
      <Box
        sx={{
          position: "relative",
          mt: { xs: -3, md: -8 },
          zIndex: 2,
        }}
      >
        <BrandStrip />
      </Box>
      <NewArrivals />
      <TopSelling />
      <OnSale />
      <Testimonials />
    </>
  );
}
