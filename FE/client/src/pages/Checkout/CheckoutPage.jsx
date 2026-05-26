import {
  Box,
  Typography,
  TextField,
  Button,
  MenuItem,
  Paper,
  Grid,
  Divider,
  Stack,
  Avatar,
} from "@mui/material";

import { useState } from "react";
import { createOrder } from "../../api/orderApi";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import CustomSnackbar from "../../components/common/CustomSnackbar";
import { useNotifications } from "../../context/NotificationContext";
import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined";
import PaymentsOutlinedIcon from "@mui/icons-material/PaymentsOutlined";
import ShieldOutlinedIcon from "@mui/icons-material/ShieldOutlined";

export default function CheckoutPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { addNotification } = useNotifications();
  const {
    subtotal = 0,
    delivery = 15,
    discount = 0,
    total = 0,
    appliedCoupon = "",
  } = location.state || {};
  const [loading, setLoading] = useState(false);

  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const [formData, setFormData] = useState({
    full_name: "",
    phone: "",
    address: "",
    city: "",
    pincode: "",
    payment_method: "COD",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      addNotification("Checkout process started");

      if (formData.payment_method === "ONLINE") {
        await handlePayment();
      } else {
        await createOrder({
          ...formData,
          subtotal,
          delivery_fee: delivery,
          discount,
          total_price: total,
          coupon_code: appliedCoupon,
        });
        setSnackbar({
          open: true,
          message: "Order Placed Successfully",
          severity: "success",
        });

        addNotification("Your order has been placed successfully");

        navigate("/orders");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handlePayment = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await axios.post(
        "http://127.0.0.1:8000/api/orders/create-payment/",
        {
          amount: total,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      const order = response.data;

      const options = {
        key: "rzp_test_Sqqz6UTq0sH7SW",

        amount: order.amount,

        currency: order.currency,

        name: "SHOP.CO",

        description: "Order Payment",

        order_id: order.id,

        handler: async function () {
          await createOrder({
            ...formData,
            subtotal,
            delivery_fee: delivery,
            discount,
            total_price: total,
            coupon_code: appliedCoupon,
          });
          setSnackbar({
            open: true,
            message: "Payment Successful",
            severity: "success",
          });

          addNotification("Payment completed successfully");

          addNotification("Your order has been placed");

          navigate("/orders");
        },

        theme: {
          color: "#111",
        },
      };

      const razorpay = new window.Razorpay(options);

      razorpay.open();
    } catch (error) {
      console.log(error);

      setSnackbar({
        open: true,
        message: "Payment Failed",
        severity: "error",
      });

      addNotification("Payment failed. Please try again");
    }
  };

  return (
    <>
      <Box
        sx={{
          minHeight: "100vh",
          background: "#f5f5f5",
          py: { xs: 4, md: 8 },
          px: 2,
        }}
      >
        <Paper
          elevation={0}
          sx={{
            maxWidth: "1100px",
            mx: "auto",
            borderRadius: "28px",
            overflow: "hidden",
            border: "1px solid #e8e8e8",
            background: "#fff",
          }}
        >
          <Grid container>
            {/* LEFT */}
            <Grid
              item
              xs={12}
              md={7}
              sx={{
                p: { xs: 3, md: 6 },
              }}
            >
              <Typography
                sx={{
                  fontSize: { xs: "2rem", md: "2.8rem" },
                  fontWeight: 800,
                  color: "#111",
                  mb: 1,
                }}
              >
                Checkout
              </Typography>

              <Typography
                sx={{
                  color: "#666",
                  mb: 5,
                  fontSize: "15px",
                }}
              >
                Enter your delivery details below
              </Typography>

              <Box component="form" onSubmit={handleSubmit}>
                <Stack spacing={3}>
                  <TextField
                    fullWidth
                    label="Full Name"
                    name="full_name"
                    value={formData.full_name}
                    onChange={handleChange}
                    required
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        borderRadius: "16px",
                        background: "#fafafa",
                      },
                    }}
                  />

                  <TextField
                    fullWidth
                    label="Phone Number"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        borderRadius: "16px",
                        background: "#fafafa",
                      },
                    }}
                  />

                  <TextField
                    fullWidth
                    multiline
                    rows={4}
                    label="Address"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    required
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        borderRadius: "16px",
                        background: "#fafafa",
                      },
                    }}
                  />

                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label="City"
                        name="city"
                        value={formData.city}
                        onChange={handleChange}
                        required
                        sx={{
                          "& .MuiOutlinedInput-root": {
                            borderRadius: "16px",
                            background: "#fafafa",
                          },
                        }}
                      />
                    </Grid>

                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label="Pincode"
                        name="pincode"
                        value={formData.pincode}
                        onChange={handleChange}
                        required
                        sx={{
                          "& .MuiOutlinedInput-root": {
                            borderRadius: "16px",
                            background: "#fafafa",
                          },
                        }}
                      />
                    </Grid>
                  </Grid>

                  <TextField
                    fullWidth
                    select
                    label="Payment Method"
                    name="payment_method"
                    value={formData.payment_method}
                    onChange={handleChange}
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        borderRadius: "16px",
                        background: "#fafafa",
                      },
                    }}
                  >
                    <MenuItem value="COD">Cash on Delivery</MenuItem>

                    <MenuItem value="ONLINE">Online Payment</MenuItem>
                  </TextField>

                  <Button
                    fullWidth
                    type="submit"
                    variant="contained"
                    disabled={loading}
                    sx={{
                      mt: 2,
                      height: "58px",
                      borderRadius: "16px",
                      bgcolor: "#111",
                      textTransform: "none",
                      fontWeight: 700,
                      fontSize: "16px",
                      boxShadow: "none",

                      "&:hover": {
                        bgcolor: "#000",
                        boxShadow: "none",
                      },
                    }}
                  >
                    {loading
                      ? "Processing..."
                      : formData.payment_method === "ONLINE"
                        ? "Pay Now"
                        : "Place Order"}
                  </Button>
                </Stack>
              </Box>
            </Grid>

            {/* RIGHT */}

            <Grid
              item
              xs={12}
              md={5}
              sx={{
                background: "linear-gradient(180deg,#111 0%, #1c1c1c 100%)",
                color: "#fff",
                p: { xs: 4, md: 5 },
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                position: "relative",
              }}
            >
              {/* TOP TITLE */}
              <Box>
                <Typography
                  sx={{
                    fontSize: "2.1rem",
                    fontWeight: 900,
                    mb: 1,
                    letterSpacing: "-0.5px",
                  }}
                >
                  Order Summary
                </Typography>

                <Typography
                  sx={{
                    color: "#9ca3af",
                    fontSize: "14px",
                    mb: 4,
                  }}
                >
                  Review your payment details
                </Typography>

                {/* SUMMARY CARD */}
                <Box
                  sx={{
                    background: "rgba(255,255,255,0.05)",
                    borderRadius: "26px",
                    p: 4,
                    border: "1px solid rgba(255,255,255,0.08)",
                    backdropFilter: "blur(12px)",
                    mb: 3,
                  }}
                >
                  {/* SUBTOTAL */}
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      mb: 3,
                    }}
                  >
                    <Typography
                      sx={{
                        color: "#bdbdbd",
                        fontSize: "15px",
                      }}
                    >
                      Subtotal
                    </Typography>

                    <Typography
                      sx={{
                        fontWeight: 700,
                        fontSize: "16px",
                      }}
                    >
                      ₹{subtotal}
                    </Typography>
                  </Box>

                  {/* SHIPPING */}
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      mb: 3,
                    }}
                  >
                    <Typography
                      sx={{
                        color: "#bdbdbd",
                        fontSize: "15px",
                      }}
                    >
                      Shipping Fee
                    </Typography>

                    <Typography
                      sx={{
                        fontWeight: 700,
                        fontSize: "16px",
                        color: "#fff",
                      }}
                    >
                      ₹15
                    </Typography>
                  </Box>
                  {/* DISCOUNT */}
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      mb: 3,
                    }}
                  >
                    <Typography
                      sx={{
                        color: "#bdbdbd",
                        fontSize: "15px",
                      }}
                    >
                      Discount
                    </Typography>

                    <Typography
                      sx={{
                        fontWeight: 700,
                        fontSize: "16px",
                        color: "#4ade80",
                      }}
                    >
                      -₹{discount}
                    </Typography>
                  </Box>
                  {/* TAX */}
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      mb: 3,
                    }}
                  >
                    <Typography
                      sx={{
                        color: "#bdbdbd",
                        fontSize: "15px",
                      }}
                    >
                      Platform Fee
                    </Typography>

                    <Typography
                      sx={{
                        fontWeight: 700,
                        fontSize: "16px",
                      }}
                    >
                      ₹0
                    </Typography>
                  </Box>

                  <Divider
                    sx={{
                      borderColor: "rgba(255,255,255,0.08)",
                      my: 3,
                    }}
                  />

                  {/* TOTAL */}
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <Box>
                      <Typography
                        sx={{
                          fontSize: "15px",
                          color: "#bdbdbd",
                        }}
                      >
                        Total Amount
                      </Typography>

                      <Typography
                        sx={{
                          fontSize: "13px",
                          color: "#7d7d7d",
                          mt: 0.5,
                        }}
                      >
                        Including shipping charges
                      </Typography>
                    </Box>

                    <Typography
                      sx={{
                        fontSize: "2rem",
                        fontWeight: 900,
                        letterSpacing: "-1px",
                      }}
                    >
                      ₹{total}
                    </Typography>
                  </Box>
                </Box>

                {/* FEATURES */}
                <Stack spacing={2.5} mt={5}>
                  {/* DELIVERY */}
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 2,
                      p: 2,
                      borderRadius: "18px",
                      background: "rgba(255,255,255,0.04)",
                      border: "1px solid rgba(255,255,255,0.06)",
                    }}
                  >
                    <Avatar
                      sx={{
                        bgcolor: "rgba(255,255,255,0.08)",
                        width: 48,
                        height: 48,
                      }}
                    >
                      <LocalShippingOutlinedIcon />
                    </Avatar>

                    <Box>
                      <Typography
                        sx={{
                          fontWeight: 700,
                          fontSize: "15px",
                        }}
                      >
                        Fast Delivery
                      </Typography>

                      <Typography
                        sx={{
                          color: "#9ca3af",
                          fontSize: "13px",
                        }}
                      >
                        Delivery within 2-4 days
                      </Typography>
                    </Box>
                  </Box>

                  {/* PAYMENT */}
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 2,
                      p: 2,
                      borderRadius: "18px",
                      background: "rgba(255,255,255,0.04)",
                      border: "1px solid rgba(255,255,255,0.06)",
                    }}
                  >
                    <Avatar
                      sx={{
                        bgcolor: "rgba(255,255,255,0.08)",
                        width: 48,
                        height: 48,
                      }}
                    >
                      <PaymentsOutlinedIcon />
                    </Avatar>

                    <Box>
                      <Typography
                        sx={{
                          fontWeight: 700,
                          fontSize: "15px",
                        }}
                      >
                        Secure Payment
                      </Typography>

                      <Typography
                        sx={{
                          color: "#9ca3af",
                          fontSize: "13px",
                        }}
                      >
                        Razorpay protected transactions
                      </Typography>
                    </Box>
                  </Box>

                  {/* SECURITY */}
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 2,
                      p: 2,
                      borderRadius: "18px",
                      background: "rgba(255,255,255,0.04)",
                      border: "1px solid rgba(255,255,255,0.06)",
                    }}
                  >
                    <Avatar
                      sx={{
                        bgcolor: "rgba(255,255,255,0.08)",
                        width: 48,
                        height: 48,
                      }}
                    >
                      <ShieldOutlinedIcon />
                    </Avatar>

                    <Box>
                      <Typography
                        sx={{
                          fontWeight: 700,
                          fontSize: "15px",
                        }}
                      >
                        Safe Checkout
                      </Typography>

                      <Typography
                        sx={{
                          color: "#9ca3af",
                          fontSize: "13px",
                        }}
                      >
                        Your data is encrypted securely
                      </Typography>
                    </Box>
                  </Box>
                </Stack>
              </Box>

              {/* FOOTER */}
              <Box
                sx={{
                  mt: 5,
                  pt: 3,
                  borderTop: "1px solid rgba(255,255,255,0.08)",
                }}
              >
                <Typography
                  sx={{
                    color: "#8b8b8b",
                    lineHeight: 1.8,
                    fontSize: "13px",
                    textAlign: "center",
                  }}
                >
                  Secure payments powered by Razorpay.
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Paper>
      </Box>

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
