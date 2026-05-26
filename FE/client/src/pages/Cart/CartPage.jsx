import {
  Box,
  Typography,
  Grid,
  Card,
  IconButton,
  Button,
  Stack,
  Divider,
  TextField,
  Container,
  Fade,
  Chip,
} from "@mui/material";

import DeleteOutlineIcon from "@mui/icons-material/DeleteOutlineOutlined";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import LocalOfferOutlinedIcon from "@mui/icons-material/LocalOfferOutlined";
import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined";
import { applyCoupon } from "../../api/couponApi";
import { useEffect, useState } from "react";

import InputAdornment from "@mui/material/InputAdornment";

import CustomBreadcrumbs from "../../components/layout/Breadcrumbs";

import { getCart, removeFromCart, updateCartQuantity } from "../../api/cartApi";

import CustomSnackbar from "../../components/common/CustomSnackbar";

import { useNavigate } from "react-router-dom";

import { useNotifications } from "../../context/NotificationContext";

/* ================= SUMMARY ROW ================= */

function SummaryRow({ label, value, color, bold }) {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        py: 1.5,
      }}
    >
      <Typography
        sx={{
          color: "#777",
          fontSize: "15px",
          fontWeight: 500,
        }}
      >
        {label}
      </Typography>

      <Typography
        sx={{
          color: color || "#111",
          fontWeight: bold ? 900 : 700,
          fontSize: bold ? "20px" : "16px",
        }}
      >
        {value}
      </Typography>
    </Box>
  );
}

export default function CartPage() {
  const [cartItems, setCartItems] = useState([]);

  const navigate = useNavigate();

  const { addNotification } = useNotifications();
  const [couponCode, setCouponCode] = useState("");

  const [discount, setDiscount] = useState(0);
  const [appliedCoupon, setAppliedCoupon] = useState("");

  /* ================= LOAD CART ================= */

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const response = await getCart();

        setCartItems(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchCart();
  }, []);

  /* ================= SNACKBAR ================= */

  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  /* ================= UPDATE QUANTITY ================= */

  const updateQty = async (id, type) => {
    const updatedCart = [...cartItems];

    const itemIndex = updatedCart.findIndex((item) => item.id === id);

    if (itemIndex === -1) return;

    if (type === "inc") {
      updatedCart[itemIndex].quantity += 1;
    } else if (type === "dec" && updatedCart[itemIndex].quantity > 1) {
      updatedCart[itemIndex].quantity -= 1;
    }

    setCartItems(updatedCart);

    try {
      await updateCartQuantity(id, {
        quantity: updatedCart[itemIndex].quantity,
      });

      window.dispatchEvent(new Event("cartUpdated"));

      setSnackbar({
        open: true,
        message: "Cart updated",
        severity: "success",
      });

      addNotification("Cart quantity updated");
    } catch (error) {
      console.log(error);
    }
  };

  /* ================= REMOVE ================= */

  const removeItem = async (id) => {
    try {
      await removeFromCart(id);

      setCartItems(cartItems.filter((item) => item.id !== id));

      window.dispatchEvent(new Event("cartUpdated"));

      setSnackbar({
        open: true,
        message: "Item removed from cart",
        severity: "success",
      });

      addNotification("Item removed from cart");
    } catch (error) {
      console.log(error);
    }
  };

  /* ================= TOTAL ================= */

  const subtotal = cartItems.reduce(
    (acc, item) => acc + Number(item.product_price) * item.quantity,
    0,
  );

  const delivery = cartItems.length > 0 ? 15 : 0;

  const total = subtotal + delivery - discount;

  /* ================= CHECKOUT ================= */
  const handleApplyCoupon = async () => {
    // EMPTY
    if (!couponCode) {
      setSnackbar({
        open: true,
        message: "Enter coupon code",
        severity: "error",
      });

      return;
    }

    try {
      const response = await applyCoupon({
        code: couponCode,
      });

      // SUCCESS
      if (response.data.success) {
        const discountAmount = (subtotal * response.data.discount) / 100;

        setDiscount(discountAmount);
        setAppliedCoupon(couponCode);

        setSnackbar({
          open: true,
          message: "Coupon Applied 🎉",
          severity: "success",
        });
      } else {
        setDiscount(0);

        setAppliedCoupon("");
        setSnackbar({
          open: true,
          message: "Invalid Coupon",
          severity: "error",
        });
      }
    } catch (error) {
      console.log(error);
      setDiscount(0);

      setAppliedCoupon("");
      setSnackbar({
        open: true,
        message: "Something went wrong",
        severity: "error",
      });
    }
  };

  const handleCheckout = () => {
    navigate("/checkout", {
      state: {
        subtotal,
        delivery,
        discount,
        total,
        appliedCoupon,
      },
    });
  };

  return (
    <>
      <Box
        sx={{
          background: "linear-gradient(to bottom,#fafafa,#f5f5f5)",
          minHeight: "100vh",
          py: {
            xs: 4,
            md: 6,
          },
        }}
      >
        <Container maxWidth="xl">
          {/* BREADCRUMB */}
          <Box mb={3}>
            <CustomBreadcrumbs current="Cart" />
          </Box>

          {/* TITLE */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: "wrap",
              gap: 2,
              mb: 5,
            }}
          >
            <Box>
              <Typography
                sx={{
                  fontWeight: 900,
                  fontSize: {
                    xs: "2rem",
                    md: "3rem",
                  },
                  letterSpacing: "-2px",
                }}
              >
                YOUR CART
              </Typography>

              <Typography
                sx={{
                  color: "#777",
                  mt: 1,
                }}
              >
                Manage your selected products
              </Typography>
            </Box>

            <Chip
              icon={<ShoppingBagOutlinedIcon />}
              label={`${cartItems.length} Items`}
              sx={{
                height: 42,
                px: 1,
                fontWeight: 700,
                borderRadius: "999px",
                bgcolor: "#fff",
                border: "1px solid #e8e8e8",
              }}
            />
          </Box>

          <Grid container spacing={4}>
            {/* ================= LEFT ================= */}

            <Grid item xs={12} lg={8}>
              <Card
                elevation={0}
                sx={{
                  borderRadius: "30px",
                  border: "1px solid #ececec",
                  overflow: "hidden",
                  backgroundColor: "#fff",
                }}
              >
                {cartItems.length === 0 ? (
                  <Box
                    sx={{
                      py: 12,
                      textAlign: "center",
                    }}
                  >
                    <ShoppingBagOutlinedIcon
                      sx={{
                        fontSize: 70,
                        color: "#bbb",
                        mb: 2,
                      }}
                    />

                    <Typography
                      sx={{
                        fontWeight: 800,
                        fontSize: "26px",
                        mb: 1,
                      }}
                    >
                      Your cart is empty
                    </Typography>

                    <Typography
                      sx={{
                        color: "#777",
                        mb: 4,
                      }}
                    >
                      Looks like you haven’t added anything yet
                    </Typography>

                    <Button
                      variant="contained"
                      sx={{
                        borderRadius: "14px",
                        px: 4,
                        py: 1.4,
                        bgcolor: "#111",

                        "&:hover": {
                          bgcolor: "#222",
                        },
                      }}
                    >
                      Continue Shopping
                    </Button>
                  </Box>
                ) : (
                  cartItems.map((item, index) => (
                    <Fade in={true} timeout={500} key={item.id}>
                      <Box>
                        <Box
                          sx={{
                            p: {
                              xs: 2.5,
                              md: 4,
                            },
                          }}
                        >
                          <Stack
                            direction={{
                              xs: "column",
                              sm: "row",
                            }}
                            spacing={3}
                          >
                            {/* IMAGE */}

                            <Box
                              component="img"
                              src={item.product_image}
                              alt={item.product_name}
                              sx={{
                                width: {
                                  xs: "100%",
                                  sm: 180,
                                },

                                height: {
                                  xs: 240,
                                  sm: 180,
                                },

                                borderRadius: "24px",

                                objectFit: "cover",

                                transition: "0.4s",

                                "&:hover": {
                                  transform: "scale(1.03)",
                                },
                              }}
                            />

                            {/* DETAILS */}

                            <Box
                              sx={{
                                flex: 1,
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: "space-between",
                              }}
                            >
                              <Box>
                                <Typography
                                  sx={{
                                    fontWeight: 800,
                                    fontSize: {
                                      xs: "1.3rem",
                                      md: "1.5rem",
                                    },

                                    mb: 1,
                                  }}
                                >
                                  {item.product_name}
                                </Typography>

                                <Typography
                                  sx={{
                                    color: "#777",
                                    mb: 1,
                                  }}
                                >
                                  Size : <b>{item.size}</b>
                                </Typography>

                                <Typography
                                  sx={{
                                    color: "#777",
                                  }}
                                >
                                  Color : <b>{item.color}</b>
                                </Typography>

                                <Chip
                                  icon={<LocalShippingOutlinedIcon />}
                                  label="Free Delivery"
                                  size="small"
                                  sx={{
                                    mt: 2,
                                    bgcolor: "#eefaf0",
                                    color: "#1f8a46",
                                    fontWeight: 700,
                                  }}
                                />
                              </Box>

                              <Typography
                                sx={{
                                  mt: 3,
                                  fontWeight: 900,
                                  fontSize: {
                                    xs: "1.7rem",
                                    md: "1.5rem",
                                  },

                                  letterSpacing: "-1px",
                                }}
                              >
                                ₹{item.product_price}
                              </Typography>
                            </Box>

                            {/* ACTIONS */}
                            <Stack
                              justifyContent="center"
                              alignItems="flex-end"
                              sx={{
                                minWidth: "110px",
                                gap: 1,
                              }}
                            >
                              {/* DELETE BUTTON */}

                              <IconButton
                                onClick={() => removeItem(item.id)}
                                sx={{
                                  width: 48,
                                  height: 48,

                                  borderRadius: "16px",

                                  background:
                                    "linear-gradient(135deg, #fff5f5 0%, #ffeaea 100%)",

                                  border: "1px solid #ffd6d6",

                                  color: "#ff5a5f",

                                  boxShadow: "0 6px 18px rgba(255,90,95,0.12)",

                                  transition: "all 0.25s ease",

                                  "&:hover": {
                                    background:
                                      "linear-gradient(135deg,#ff6b6b,#ff4d4f)",

                                    color: "#fff",

                                    borderColor: "#ff6b6b",

                                    transform: "translateY(-2px) scale(1.05)",

                                    boxShadow:
                                      "0 12px 24px rgba(255,90,95,0.28)",
                                  },
                                }}
                              >
                                <DeleteOutlineIcon
                                  sx={{
                                    fontSize: 22,
                                  }}
                                />
                              </IconButton>

                              {/* QUANTITY SECTION */}

                              <Box
                                sx={{
                                  mt: {
                                    xs: 3,
                                    sm: 0,
                                  },

                                  display: "flex",

                                  alignItems: "center",

                                  justifyContent: "space-between",

                                  width: 120,

                                  height: 50,

                                  px: 1,

                                  borderRadius: "18px",

                                  background:
                                    "linear-gradient(145deg,#fafafa,#f2f2f2)",

                                  border: "1px solid #ececec",

                                  boxShadow:
                                    "inset 0 1px 1px rgba(255,255,255,0.8), 0 5px 14px rgba(0,0,0,0.05)",
                                }}
                              >
                                <IconButton
                                  size="small"
                                  onClick={() => updateQty(item.id, "dec")}
                                  sx={{
                                    width: 34,
                                    height: 34,

                                    backgroundColor: "#fff",

                                    border: "1px solid #ededed",

                                    color: "#444",

                                    transition: "0.25s",

                                    "&:hover": {
                                      backgroundColor: "#111",

                                      color: "#fff",

                                      transform: "scale(1.08)",
                                    },
                                  }}
                                >
                                  <RemoveIcon
                                    sx={{
                                      fontSize: 18,
                                    }}
                                  />
                                </IconButton>

                                <Typography
                                  sx={{
                                    minWidth: 28,

                                    textAlign: "center",

                                    fontWeight: 900,

                                    fontSize: "16px",

                                    color: "#111",

                                    letterSpacing: "0.5px",
                                  }}
                                >
                                  {item.quantity}
                                </Typography>

                                <IconButton
                                  size="small"
                                  onClick={() => updateQty(item.id, "inc")}
                                  sx={{
                                    width: 34,
                                    height: 34,

                                    backgroundColor: "#111",

                                    color: "#fff",

                                    transition: "0.25s",

                                    "&:hover": {
                                      backgroundColor: "#000",

                                      transform: "scale(1.08)",
                                    },
                                  }}
                                >
                                  <AddIcon
                                    sx={{
                                      fontSize: 18,
                                    }}
                                  />
                                </IconButton>
                              </Box>
                            </Stack>
                          </Stack>
                        </Box>

                        {index !== cartItems.length - 1 && <Divider />}
                      </Box>
                    </Fade>
                  ))
                )}
              </Card>
            </Grid>

            {/* ================= RIGHT ================= */}

            <Grid item xs={12} lg={4}>
              <Box
                sx={{
                  position: {
                    lg: "sticky",
                  },
                  top: 100,
                }}
              >
                <Card
                  elevation={0}
                  sx={{
                    borderRadius: "30px",
                    border: "1px solid #ececec",
                    p: {
                      xs: 3,
                      md: 4,
                    },
                    backgroundColor: "#fff",
                  }}
                >
                  {/* TITLE */}

                  <Typography
                    sx={{
                      fontWeight: 900,
                      fontSize: "2rem",
                      mb: 4,
                    }}
                  >
                    Order Summary
                  </Typography>

                  {/* FREE DELIVERY BAR */}

                  {/* SUMMARY */}

                  <SummaryRow label="Subtotal" value={`₹${subtotal}`} />

                  <SummaryRow
                    label="Discount"
                    value={`-₹${discount}`}
                    color="#ff4d4d"
                  />

                  <SummaryRow label="Delivery Fee" value={`₹${delivery}`} />

                  <Divider
                    sx={{
                      my: 3,
                    }}
                  />

                  <SummaryRow label="Total" value={`₹${total}`} bold />

                  {/* PROMO */}

                  {/* COUPON SECTION */}

                  <Box
                    sx={{
                      mt: 4,
                      p: 2.5,
                      borderRadius: "20px",
                      background: "linear-gradient(135deg,#f8f8f8,#f1f1f1)",
                      border: "1px solid #ececec",
                    }}
                  >
                    {/* TOP TEXT */}

                    <Typography
                      sx={{
                        fontWeight: 800,
                        fontSize: "17px",
                        mb: 0.5,
                      }}
                    >
                      Apply Coupon
                    </Typography>

                    <Typography
                      sx={{
                        color: "#777",
                        fontSize: "14px",
                        mb: 2.5,
                      }}
                    >
                      Save more with exclusive offers
                    </Typography>

                    {/* INPUT + BUTTON */}

                    <Stack
                      direction={{
                        xs: "column",
                        sm: "row",
                      }}
                      spacing={1.5}
                    >
                      <TextField
                        fullWidth
                        placeholder="Enter coupon code"
                        value={couponCode}
                        onChange={(e) => setCouponCode(e.target.value)}
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <LocalOfferOutlinedIcon
                                sx={{
                                  color: "#666",
                                }}
                              />
                            </InputAdornment>
                          ),
                        }}
                        sx={{
                          "& .MuiOutlinedInput-root": {
                            height: 55,
                            borderRadius: "14px",
                            backgroundColor: "#fff",

                            "& fieldset": {
                              border: "1px solid #e5e5e5",
                            },

                            "&:hover fieldset": {
                              borderColor: "#000",
                            },

                            "&.Mui-focused fieldset": {
                              borderColor: "#000",
                            },
                          },
                        }}
                      />

                      <Button
                        variant="contained"
                        onClick={handleApplyCoupon}
                        sx={{
                          height: 55,
                          minWidth: "130px",
                          borderRadius: "14px",
                          backgroundColor: "#000",
                          fontWeight: 700,
                          textTransform: "none",
                          fontSize: "15px",
                          boxShadow: "none",

                          "&:hover": {
                            backgroundColor: "#222",
                          },
                        }}
                      >
                        Apply
                      </Button>
                    </Stack>

                    {/* AVAILABLE COUPON */}

                    {appliedCoupon ? (
                      <Box
                        sx={{
                          mt: 2.5,
                          p: 1.8,
                          borderRadius: "16px",
                          background: "linear-gradient(135deg,#eefaf0,#f7fff8)",

                          border: "1px solid #d7f0dd",

                          display: "flex",
                          justifyContent: "space-between",

                          alignItems: "center",

                          flexWrap: "wrap",

                          gap: 1.5,
                        }}
                      >
                        <Box>
                          <Typography
                            sx={{
                              fontWeight: 800,
                              fontSize: "15px",
                              color: "#1f8a46",
                            }}
                          >
                            Coupon Applied 🎉
                          </Typography>

                          <Typography
                            sx={{
                              fontSize: "13px",
                              color: "#666",
                              mt: 0.3,
                            }}
                          >
                            {appliedCoupon} applied successfully
                          </Typography>
                        </Box>

                        <Chip
                          label={`-₹${discount}`}
                          sx={{
                            bgcolor: "#1f8a46",
                            color: "#fff",
                            fontWeight: 800,
                          }}
                        />
                      </Box>
                    ) : (
                      <Box
                        sx={{
                          mt: 2.5,
                          p: 1.5,
                          borderRadius: "14px",
                          backgroundColor: "#fff",
                          border: "1px dashed #d5d5d5",

                          display: "flex",
                          justifyContent: "space-between",

                          alignItems: "center",

                          flexWrap: "wrap",

                          gap: 1,
                        }}
                      >
                        <Box>
                          <Typography
                            sx={{
                              fontWeight: 800,
                              fontSize: "15px",
                            }}
                          >
                            SHOP20
                          </Typography>

                          <Typography
                            sx={{
                              fontSize: "13px",
                              color: "#777",
                            }}
                          >
                            Get 20% OFF on your order
                          </Typography>
                        </Box>

                        <Chip
                          label="20% OFF"
                          sx={{
                            backgroundColor: "#111",
                            color: "#fff",
                            fontWeight: 700,
                          }}
                        />
                      </Box>
                    )}
                  </Box>

                  {/* CHECKOUT */}

                  <Button
                    fullWidth
                    variant="contained"
                    onClick={handleCheckout}
                    endIcon={<ArrowForwardRoundedIcon />}
                    sx={{
                      mt: 4,

                      height: 60,

                      borderRadius: "18px",

                      background: "linear-gradient(135deg,#000,#2d2d2d)",

                      textTransform: "none",

                      fontWeight: 800,

                      fontSize: "16px",

                      boxShadow: "none",

                      transition: "0.3s",

                      "&:hover": {
                        transform: "translateY(-2px)",

                        background: "linear-gradient(135deg,#111,#3a3a3a)",

                        boxShadow: "0 12px 25px rgba(0,0,0,0.18)",
                      },
                    }}
                  >
                    Go to Checkout
                  </Button>
                </Card>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* SNACKBAR */}

      <CustomSnackbar
        open={snackbar.open}
        message={snackbar.message}
        severity={snackbar.severity}
        handleClose={() =>
          setSnackbar({
            ...snackbar,
            open: false,
          })
        }
      />
    </>
  );
}
