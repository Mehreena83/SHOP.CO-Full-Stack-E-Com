import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Stack,
  IconButton,
  InputBase,
  Drawer,
  Button,
} from "@mui/material";
import CustomSnackbar from "../common/CustomSnackbar";
import Badge from "@mui/material/Badge";
import SearchIcon from "@mui/icons-material/Search";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import PersonIcon from "@mui/icons-material/Person";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { getCart } from "../../api/cartApi";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import NotificationBell from "../common/NotificationBell";
import { getWishlist } from "../../api/wishlistApi";

export default function Navbar() {
  const [openMenu, setOpenMenu] = useState(false);
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const location = useLocation();
  const [cartCount, setCartCount] = useState(0);
  const [wishlistCount, setWishlistCount] = useState(0);
  const [anchorEl, setAnchorEl] = useState(null);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    const fetchCartCount = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        setCartCount(0);
        return;
      }

      try {
        const response = await getCart();

        const totalQty = response.data.reduce(
          (acc, item) => acc + item.quantity,
          0,
        );

        setCartCount(totalQty);
      } catch (error) {
        console.log(error);
      }
    };

    fetchCartCount();
    fetchWishlistCount();

    window.addEventListener("cartUpdated", fetchCartCount);

    window.addEventListener("wishlistUpdated", fetchWishlistCount);

    return () => {
      window.removeEventListener("cartUpdated", fetchCartCount);

      window.removeEventListener("wishlistUpdated", fetchWishlistCount);
    };
  }, []);

  const fetchWishlistCount = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      setWishlistCount(0);
      return;
    }

    try {
      const response = await getWishlist();

      setWishlistCount(response.data.length);
    } catch (error) {
      console.log(error);
    }
  };
  const scrollToSection = (id) => {
    if (location.pathname === "/") {
      const element = document.getElementById(id);

      if (element) {
        element.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    } else {
      navigate("/", { state: { scrollTo: id } });
    }

    setOpenMenu(false);
  };
  const handleOpenMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");

    localStorage.removeItem("user");

    handleCloseMenu();

    setSnackbar({
      open: true,
      message: "Logout successfully",
      severity: "success",
    });

    setTimeout(() => {
      navigate("/");
      window.location.reload();
    }, 1500);
  };

  return (
    <>
      <AppBar
        position="sticky"
        elevation={0}
        sx={{
          top: 0,
          bgcolor: "white",
          color: "black",
          borderBottom: "1px solid #eee",
          zIndex: 1100,
        }}
      >
        <Toolbar
          sx={{
            px: { xs: 2, md: 6 },
            py: 1,
            minHeight: "70px",
          }}
        >
          {/* MOBILE MENU BUTTON */}
          <IconButton
            sx={{
              display: { xs: "flex", md: "none" },
              mr: 1,
              color: "black",
            }}
            onClick={() => setOpenMenu(true)}
          >
            <MenuIcon />
          </IconButton>

          {/* LOGO */}
          <Typography
            variant="h5"
            onClick={() => navigate("/")}
            sx={{
              fontWeight: 900,
              color: "#000",
              fontSize: { xs: "1.3rem", md: "1.8rem" },
              cursor: "pointer",
            }}
          >
            SHOP.CO
          </Typography>

          {/* DESKTOP MENU */}
          <Stack
            direction="row"
            spacing={4}
            alignItems="center"
            sx={{
              ml: 5,
              display: { xs: "none", md: "flex" },
            }}
          >
            <Typography
              sx={{ cursor: "pointer" }}
              onClick={() => navigate("/shop")}
            >
              Shop
            </Typography>

            <Typography
              sx={{ cursor: "pointer" }}
              onClick={() => scrollToSection("new-arrivals")}
            >
              New Arrivals
            </Typography>

            <Typography
              sx={{ cursor: "pointer" }}
              onClick={() => scrollToSection("top-selling")}
            >
              Top Selling
            </Typography>

            <Typography
              sx={{ cursor: "pointer" }}
              onClick={() => scrollToSection("on-sale")}
            >
              On Sale
            </Typography>
          </Stack>

          {/* SPACE */}
          <Box sx={{ flexGrow: 1 }} />

          {/* SEARCH */}
          {/* SEARCH */}
          <Box
            sx={{
              display: {
                xs: "none",
                sm: "flex",
              },
              alignItems: "center",
              bgcolor: "#f5f5f5",
              px: 2,
              py: 0.5,
              borderRadius: 5,
              width: { sm: 180, md: 300 },
              mr: 2,
            }}
          >
            <SearchIcon sx={{ mr: 1, color: "#777" }} />

            <InputBase
              placeholder="Search products..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();

                  navigate(`/shop?search=${encodeURIComponent(search)}`);
                }
              }}
              sx={{ flex: 1 }}
            />

            {search && (
              <IconButton
                size="small"
                onClick={() => {
                  setSearch("");
                  navigate("/shop");
                }}
                sx={{
                  ml: 1,
                  p: 0.5,
                }}
              >
                <CloseIcon
                  sx={{
                    fontSize: 18,
                    color: "#666",
                  }}
                />
              </IconButton>
            )}
          </Box>

          {/* MOBILE SEARCH ICON */}
          <IconButton
            sx={{
              display: { xs: "flex", sm: "none" },
              color: "black",
            }}
          >
            <SearchIcon />
          </IconButton>

          {/* ICONS */}
          <Stack direction="row" spacing={0.5}>
            {/* NOTIFICATION */}
            <NotificationBell />

            <IconButton
              sx={{
                width: 42,
                height: 42,
                borderRadius: "14px",
                background: "#fff",
                border: "1px solid #ececec",
                transition: "all 0.25s ease",

                "&:hover": {
                  background: "#fff5f7",
                  transform: "translateY(-2px)",
                  boxShadow: "0 8px 20px rgba(255,0,85,0.08)",
                },
              }}
              onClick={() => {
                const token = localStorage.getItem("token");

                if (token) {
                  navigate("/wishlist");
                } else {
                  navigate("/login");
                }
              }}
            >
              <Badge
                badgeContent={wishlistCount}
                overlap="circular"
                sx={{
                  "& .MuiBadge-badge": {
                    background:
                      "linear-gradient(135deg, #ff4d6d 0%, #ff1744 100%)",

                    color: "#fff",

                    fontWeight: 800,

                    fontSize: "0.45rem",

                    minWidth: "17px",
                    height: "17px",

                    borderRadius: "999px",

                    border: "2px solid white",

                    boxShadow: "0 4px 12px rgba(255,23,68,0.35)",

                    top: 4,
                    right: 4,
                  },
                }}
              >
                <FavoriteBorderIcon
                  sx={{
                    color: "#111",
                    fontSize: 23,
                  }}
                />
              </Badge>
            </IconButton>

            <IconButton
              sx={{
                width: 42,
                height: 42,
                borderRadius: "14px",
                background: "#fff",
                border: "1px solid #ececec",
                transition: "all 0.25s ease",

                "&:hover": {
                  background: "#f5f7ff",
                  transform: "translateY(-2px)",
                  boxShadow: "0 8px 20px rgba(37,99,235,0.10)",
                },
              }}
              onClick={() => {
                const token = localStorage.getItem("token");

                if (token) {
                  navigate("/cart");
                } else {
                  navigate("/login");
                }
              }}
            >
              <Badge
                badgeContent={cartCount}
                overlap="circular"
                sx={{
                  "& .MuiBadge-badge": {
                    background:
                      "linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)",

                    color: "#fff",

                    fontWeight: 800,

                    fontSize: "0.45rem",

                    minWidth: "17px",
                    height: "17px",

                    borderRadius: "999px",

                    border: "2px solid white",

                    boxShadow: "0 4px 12px rgba(37,99,235,0.35)",

                    top: 3,
                    right: 4,
                  },
                }}
              >
                <ShoppingCartIcon
                  sx={{
                    color: "#111",
                    fontSize: 23,
                  }}
                />
              </Badge>
            </IconButton>
            {user ? (
              <Avatar
                onClick={handleOpenMenu}
                sx={{
                  width: 40,
                  height: 40,
                  bgcolor: "#000",
                  cursor: "pointer",
                  fontSize: "15px",
                  fontWeight: 700,
                  transition: "0.2s",

                  "&:hover": {
                    transform: "scale(1.05)",
                  },
                }}
              >
                {user.name?.charAt(0).toUpperCase()}
              </Avatar>
            ) : (
              <IconButton
                sx={{ color: "black" }}
                onClick={() => navigate("/login")}
              >
                <PersonIcon />
              </IconButton>
            )}
          </Stack>
        </Toolbar>
      </AppBar>

      {/* MOBILE DRAWER */}
      <Drawer anchor="left" open={openMenu} onClose={() => setOpenMenu(false)}>
        <Box
          sx={{
            width: 260,
            p: 3,
          }}
        >
          {/* TOP */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              mb: 4,
            }}
          >
            <Typography variant="h6" fontWeight={700}>
              MENU
            </Typography>

            <IconButton onClick={() => setOpenMenu(false)}>
              <CloseIcon />
            </IconButton>
          </Box>

          {/* MENU ITEMS */}
          <Stack spacing={3}>
            <Typography sx={{ cursor: "pointer" }}>Shop</Typography>

            <Typography
              sx={{ cursor: "pointer" }}
              onClick={() => scrollToSection("new-arrivals")}
            >
              New Arrivals
            </Typography>

            <Typography
              sx={{ cursor: "pointer" }}
              onClick={() => scrollToSection("top-selling")}
            >
              Top Selling
            </Typography>

            <Typography
              sx={{ cursor: "pointer" }}
              onClick={() => scrollToSection("on-sale")}
            >
              On Sale
            </Typography>
          </Stack>
        </Box>
      </Drawer>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleCloseMenu}
        PaperProps={{
          sx: {
            width: 280,
            borderRadius: "22px",
            mt: 1.5,
            overflow: "visible",
            boxShadow: "0 12px 40px rgba(0,0,0,0.12)",
          },
        }}
      >
        <Box
          sx={{
            p: 3,
            textAlign: "center",
          }}
        >
          {/* BIG AVATAR */}
          <Avatar
            sx={{
              width: 85,
              height: 85,
              bgcolor: "#000",
              fontSize: "34px",
              fontWeight: 700,
              mx: "auto",
              mb: 2,
            }}
          >
            {user?.name?.charAt(0).toUpperCase()}
          </Avatar>

          {/* NAME */}
          <Typography
            sx={{
              fontSize: "22px",
              fontWeight: 700,
              mb: 0.5,
              color: "#111",
              textTransform: "capitalize",
            }}
          >
            {user?.name}
          </Typography>

          {/* EMAIL */}
          <Typography
            sx={{
              fontSize: "14px",
              color: "#777",
              mb: 3,
              wordBreak: "break-word",
            }}
          >
            {user?.email}
          </Typography>

          {/* DIVIDER */}
          <Box
            sx={{
              height: "1px",
              bgcolor: "#eee",
              mb: 3,
            }}
          />
          <Button
            fullWidth
            variant="outlined"
            onClick={() => {
              navigate("/orders");
              handleCloseMenu();
            }}
            sx={{
              mb: 2,
              borderRadius: "14px",
              textTransform: "none",
              fontWeight: 700,
            }}
          >
            My Orders
          </Button>

          {/* LOGOUT BUTTON */}
          <Button
            fullWidth
            variant="contained"
            onClick={handleLogout}
            sx={{
              bgcolor: "#000",
              py: 1.3,
              borderRadius: "14px",
              textTransform: "none",
              fontWeight: 700,
              fontSize: "15px",
              boxShadow: "none",

              "&:hover": {
                bgcolor: "#111",
                boxShadow: "0 8px 20px rgba(0,0,0,0.15)",
              },
            }}
          >
            Logout
          </Button>
        </Box>
      </Menu>
      <CustomSnackbar
        open={snackbar.open}
        message={snackbar.message}
        severity={snackbar.severity}
        handleClose={() => setSnackbar({ ...snackbar, open: false })}
      />
    </>
  );
}
