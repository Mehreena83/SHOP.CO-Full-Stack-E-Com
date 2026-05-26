import Navbar from "./Navbar";
import Footer from "./Footer";
import AnnouncementBar from "../common/AnnouncementBar";
import { Box } from "@mui/material";

export default function MainLayout({ children }) {
  return (
    <>
      <AnnouncementBar />
      <Navbar />

      <Box minHeight="80vh">{children}</Box>

      <Footer />
    </>
  );
}
