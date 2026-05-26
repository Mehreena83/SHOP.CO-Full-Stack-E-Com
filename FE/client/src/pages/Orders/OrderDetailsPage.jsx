import { Box, Typography, Card, Stack, Divider } from "@mui/material";

import { useEffect, useState } from "react";

import { useParams } from "react-router-dom";

import axios from "axios";

import { Button } from "@mui/material";
import { cancelOrder } from "../../api/orderApi";
import CustomSnackbar from "../../components/common/CustomSnackbar";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@mui/material";

export default function OrderDetailsPage() {
  const { id } = useParams();

  const [order, setOrder] = useState(null);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });
  const [openCancelDialog, setOpenCancelDialog] = useState(false);
  const handleCancelOrder = async () => {
    try {
      await cancelOrder(order.id);
      setOpenCancelDialog(false); // <-- ADD THIS

      setSnackbar({
        open: true,
        message: "Order Cancelled Successfully",
        severity: "success",
      });
      fetchOrder();
    } catch (error) {
      console.log(error);

      setSnackbar({
        open: true,
        message: "Cannot cancel order",
        severity: "error",
      });
    }
  };
  const handleCloseSnackbar = () => {
    setSnackbar((prev) => ({
      ...prev,
      open: false,
    }));
  };

  useEffect(() => {
    fetchOrder();
  }, []);

  const fetchOrder = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await axios.get(
        `http://127.0.0.1:8000/api/orders/${id}/`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      setOrder(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  if (!order) {
    return (
      <Box p={5}>
        <Typography>Loading...</Typography>
      </Box>
    );
  }

  return (
    <>
      <Box
        sx={{
          minHeight: "100vh",
          background: "#f5f5f5",
          p: {
            xs: 2,
            md: 5,
          },
        }}
      >
        <Box
          sx={{
            maxWidth: "1000px",
            mx: "auto",
          }}
        >
          <Typography
            sx={{
              fontSize: {
                xs: "2rem",
                md: "3rem",
              },
              fontWeight: 900,
              mb: 4,
            }}
          >
            Order Details
          </Typography>

          <Card
            sx={{
              borderRadius: 6,
              p: 4,
              boxShadow: "0 10px 40px rgba(0,0,0,0.05)",
            }}
          >
            {/* HEADER */}

            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
              mb={3}
            >
              <Box>
                <Typography
                  sx={{
                    fontSize: "1.5rem",
                    fontWeight: 800,
                  }}
                >
                  Order #{order.id}
                </Typography>

                <Typography color="text.secondary">
                  {new Date(order.created_at).toLocaleDateString()}
                </Typography>
              </Box>

              <Box
                sx={{
                  px: 2.5,
                  height: "42px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: "999px",
                  backgroundColor: "#ecfdf3",
                  border: "1px solid #bbf7d0",
                  minWidth: "130px",
                }}
              >
                <Typography
                  sx={{
                    color: "#15803d",
                    fontWeight: 700,
                  }}
                >
                  {order.status}
                </Typography>
              </Box>
            </Stack>

            <Divider sx={{ mb: 3 }} />

            {/* CUSTOMER */}

            <Typography
              sx={{
                fontWeight: 800,
                mb: 2,
              }}
            >
              Customer Details
            </Typography>

            <Typography color="text.secondary">
              Name : {order.full_name}
            </Typography>

            <Typography color="text.secondary">
              Phone : {order.phone}
            </Typography>

            <Typography color="text.secondary">
              Address : {order.address}
            </Typography>

            <Typography color="text.secondary">City : {order.city}</Typography>

            <Typography color="text.secondary">
              Pincode : {order.pincode}
            </Typography>

            <Divider sx={{ my: 3 }} />

            {/* PRODUCTS */}

            <Typography
              sx={{
                fontWeight: 800,
                mb: 2,
              }}
            >
              Products
            </Typography>

            {order.items.map((item) => (
              <Stack
                key={item.id}
                direction="row"
                spacing={2}
                alignItems="center"
                sx={{
                  p: 2,
                  borderRadius: 4,
                  background: "#fafafa",
                  border: "1px solid #eee",
                  mb: 2,
                }}
              >
                <Box
                  component="img"
                  src={`http://127.0.0.1:8000${item.product_image}`}
                  alt={item.product_name}
                  sx={{
                    width: 100,
                    height: 100,
                    borderRadius: 4,
                    objectFit: "cover",
                  }}
                />

                <Box sx={{ flex: 1 }}>
                  <Typography
                    sx={{
                      fontWeight: 700,
                      mb: 1,
                    }}
                  >
                    {item.product_name}
                  </Typography>

                  <Typography color="text.secondary">
                    Quantity : {item.quantity}
                  </Typography>

                  <Typography color="text.secondary">
                    Size : {item.size || "-"}
                  </Typography>

                  <Typography color="text.secondary">
                    Color : {item.color || "-"}
                  </Typography>
                </Box>

                <Typography
                  sx={{
                    fontWeight: 800,
                    fontSize: "1.2rem",
                  }}
                >
                  ₹{item.price}
                </Typography>
              </Stack>
            ))}
            {/* CANCEL BUTTON */}

            <Box sx={{ mt: 3 }}>
              <Button
                variant="contained"
                color="error"
                fullWidth
                onClick={() => setOpenCancelDialog(true)}
                sx={{
                  height: "50px",
                  borderRadius: 3,
                  fontWeight: 700,
                  fontSize: "1rem",
                }}
              >
                Cancel Order
              </Button>
            </Box>
            <Divider sx={{ my: 3 }} />

            {/* TOTAL */}

            {/* TOTAL SECTION */}

            <Box
              sx={{
                background: "#111",
                color: "white",
                p: 3,
                borderRadius: 4,
              }}
            >
              {/* SUBTOTAL */}

              <Stack
                direction="row"
                justifyContent="space-between"
                sx={{ mb: 1.5 }}
              >
                <Typography sx={{ color: "#d1d5db" }}>Subtotal</Typography>

                <Typography sx={{ fontWeight: 700 }}>
                  ₹{order.subtotal || order.total_price}
                </Typography>
              </Stack>

              {/* DELIVERY */}

              <Stack
                direction="row"
                justifyContent="space-between"
                sx={{ mb: 1.5 }}
              >
                <Typography sx={{ color: "#d1d5db" }}>Delivery Fee</Typography>

                <Typography sx={{ fontWeight: 700 }}>
                  ₹{order.delivery_fee || 15}
                </Typography>
              </Stack>

              {/* DISCOUNT */}

              <Stack
                direction="row"
                justifyContent="space-between"
                sx={{ mb: 2 }}
              >
                <Typography sx={{ color: "#d1d5db" }}>Discount</Typography>

                <Typography
                  sx={{
                    fontWeight: 700,
                    color: "#4ade80",
                  }}
                >
                  -₹{order.discount || 0}
                </Typography>
              </Stack>

              <Divider
                sx={{
                  borderColor: "rgba(255,255,255,0.1)",
                  mb: 2,
                }}
              />

              {/* GRAND TOTAL */}

              <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
              >
                <Typography
                  sx={{
                    fontWeight: 700,
                    fontSize: "1.5rem",
                  }}
                >
                  Grand Total
                </Typography>

                <Typography
                  sx={{
                    fontWeight: 800,
                    fontSize: "1.7rem",
                    letterSpacing: "2px",
                  }}
                >
                  ₹{order.total_price}
                </Typography>
              </Stack>
            </Box>
          </Card>
        </Box>
      </Box>
      <Dialog
        open={openCancelDialog}
        onClose={() => setOpenCancelDialog(false)}
        PaperProps={{
          sx: {
            borderRadius: "28px",
            p: 1,
            width: "100%",
            maxWidth: "420px",
            overflow: "hidden",
            boxShadow: "0 25px 60px rgba(0,0,0,0.18)",
          },
        }}
      >
        <DialogTitle
          sx={{
            fontWeight: 900,
            fontSize: "2rem",
            pb: 1,
            pt: 3,
            px: 3,
            letterSpacing: "-1px",
          }}
        >
          Cancel Order?
        </DialogTitle>

        <DialogContent sx={{ px: 3 }}>
          <DialogContentText
            sx={{
              color: "#666",
              fontSize: "1rem",
              lineHeight: 1.7,
            }}
          >
            This action cannot be undone. Your order will be cancelled
            immediately.
          </DialogContentText>
        </DialogContent>

        <DialogActions
          sx={{
            px: 3,
            pb: 3,
            pt: 2,
            gap: 1.5,
          }}
        >
          <Button
            fullWidth
            onClick={() => setOpenCancelDialog(false)}
            sx={{
              height: "52px",
              borderRadius: "16px",
              fontWeight: 700,
              color: "#111",
              background: "#f3f4f6",

              "&:hover": {
                background: "#e5e7eb",
              },
            }}
          >
            Keep Order
          </Button>

          <Button
            fullWidth
            variant="contained"
            color="error"
            onClick={handleCancelOrder}
            sx={{
              height: "52px",
              borderRadius: "16px",
              fontWeight: 800,
              boxShadow: "none",

              "&:hover": {
                boxShadow: "none",
              },
            }}
          >
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
      <CustomSnackbar
        open={snackbar.open}
        handleClose={handleCloseSnackbar}
        message={snackbar.message}
        severity={snackbar.severity}
      />
    </>
  );
}
