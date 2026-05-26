import { Box, Typography, Card, Stack, Divider } from "@mui/material";
import PendingOutlinedIcon from "@mui/icons-material/PendingOutlined";
import CheckCircleOutlineOutlinedIcon from "@mui/icons-material/CheckCircleOutlineOutlined";
import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import { useEffect, useState } from "react";
import { getOrders } from "../../api/orderApi";
import { useNavigate } from "react-router-dom";
import { Pagination } from "@mui/material";

export default function OrdersPage() {
  const [orders, setOrders] = useState([]);

  const navigate = useNavigate();
  const [page, setPage] = useState(1);

  const ordersPerPage = 4;

  const totalPages = Math.ceil(orders.length / ordersPerPage);

  const startIndex = (page - 1) * ordersPerPage;

  const endIndex = startIndex + ordersPerPage;

  const currentOrders = orders.slice(startIndex, endIndex);
  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await getOrders();

      setOrders(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  /* STATUS COLORS */

  const getStatusStyles = (status) => {
    switch (status) {
      case "PENDING":
        return {
          bg: "#fff7ed",
          color: "#ea580c",
          border: "#fdba74",
        };

      case "CONFIRMED":
        return {
          bg: "#ecfdf3",
          color: "#15803d",
          border: "#bbf7d0",
        };

      case "SHIPPED":
        return {
          bg: "#eff6ff",
          color: "#2563eb",
          border: "#93c5fd",
        };

      case "DELIVERED":
        return {
          bg: "#f0fdf4",
          color: "#166534",
          border: "#86efac",
        };

      case "CANCELLED":
        return {
          bg: "#fef2f2",
          color: "#dc2626",
          border: "#fca5a5",
        };

      default:
        return {
          bg: "#f5f5f5",
          color: "#444",
          border: "#ddd",
        };
    }
  };

  /* STATUS ICONS */

  const getStatusIcon = (status) => {
    switch (status) {
      case "PENDING":
        return <PendingOutlinedIcon sx={{ fontSize: 18, color: "#ea580c" }} />;

      case "CONFIRMED":
        return (
          <CheckCircleOutlineOutlinedIcon
            sx={{ fontSize: 18, color: "#15803d" }}
          />
        );

      case "SHIPPED":
        return (
          <LocalShippingOutlinedIcon sx={{ fontSize: 18, color: "#2563eb" }} />
        );

      case "DELIVERED":
        return (
          <CheckCircleOutlineOutlinedIcon
            sx={{ fontSize: 18, color: "#166534" }}
          />
        );

      case "CANCELLED":
        return <CancelOutlinedIcon sx={{ fontSize: 18, color: "#dc2626" }} />;

      default:
        return null;
    }
  };

  return (
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
        {/* PAGE TITLE */}

        <Typography
          sx={{
            fontSize: {
              xs: "2.2rem",
              md: "3rem",
            },

            fontWeight: 900,

            mb: 5,

            letterSpacing: "-2px",
          }}
        >
          My Orders
        </Typography>

        {/* EMPTY STATE */}

        {orders.length === 0 ? (
          <Card
            sx={{
              p: 5,
              borderRadius: 6,
              border: "1px solid #ececec",
            }}
          >
            <Box
              sx={{
                py: 8,
                textAlign: "center",
              }}
            >
              <Typography
                sx={{
                  fontSize: "1.8rem",
                  fontWeight: 800,
                  mb: 1,
                }}
              >
                No Orders Yet
              </Typography>

              <Typography color="text.secondary">
                Start shopping to see your orders here.
              </Typography>
            </Box>
          </Card>
        ) : (
          currentOrders.map((order) => {
            const statusStyles = getStatusStyles(order.status);

            return (
              <Card
                key={order.id}
                onClick={() => navigate(`/orders/${order.id}`)}
                sx={{
                  mb: 4,

                  borderRadius: 6,

                  p: {
                    xs: 2.5,
                    md: 4,
                  },

                  backgroundColor: "white",

                  border: "1px solid #ececec",

                  boxShadow: "0 10px 40px rgba(0,0,0,0.05)",

                  cursor: "pointer",

                  transition: "all 0.35s ease",

                  "&:hover": {
                    transform: "translateY(-6px)",

                    boxShadow: "0 25px 60px rgba(0,0,0,0.08)",
                  },
                }}
              >
                {/* TOP HEADER */}

                <Stack
                  direction={{
                    xs: "column",
                    sm: "row",
                  }}
                  justifyContent="space-between"
                  alignItems="center"
                  spacing={2}
                  mb={3}
                >
                  {/* LEFT */}

                  <Box>
                    <Typography
                      sx={{
                        fontWeight: 900,
                        fontSize: "1.5rem",
                        letterSpacing: "-1px",
                      }}
                    >
                      Order #{order.id}
                    </Typography>

                    <Typography color="text.secondary">
                      Date :{" "}
                      {new Date(order.created_at).toLocaleDateString("en-IN", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                    </Typography>

                    <Typography color="text.secondary">
                      Payment : {order.payment_method}
                    </Typography>
                  </Box>

                  {/* STATUS */}

                  <Box
                    sx={{
                      px: 2.5,

                      height: "42px",

                      display: "flex",

                      alignItems: "center",

                      justifyContent: "center",

                      gap: 1,

                      borderRadius: "999px",

                      backgroundColor: statusStyles.bg,

                      border: `1px solid ${statusStyles.border}`,

                      minWidth: "140px",
                    }}
                  >
                    {getStatusIcon(order.status)}

                    <Typography
                      sx={{
                        color: statusStyles.color,

                        fontWeight: 800,

                        fontSize: "0.85rem",

                        lineHeight: 1,
                      }}
                    >
                      {order.status}
                    </Typography>
                  </Box>
                </Stack>

                <Divider sx={{ mb: 3 }} />

                {/* CUSTOMER DETAILS */}

                <Box sx={{ mb: 4 }}>
                  <Typography
                    sx={{
                      fontWeight: 700,
                      mb: 1.5,
                    }}
                  >
                    Customer Details
                  </Typography>

                  <Typography
                    color="text.secondary"
                    sx={{
                      mb: 0.7,
                      fontSize: "0.95rem",
                    }}
                  >
                    Name : {order.full_name}
                  </Typography>

                  <Typography
                    color="text.secondary"
                    sx={{
                      mb: 0.7,
                      fontSize: "0.95rem",
                    }}
                  >
                    Phone : {order.phone}
                  </Typography>

                  <Typography
                    color="text.secondary"
                    sx={{
                      mb: 0.7,
                      fontSize: "0.95rem",
                    }}
                  >
                    Address : {order.address}
                  </Typography>

                  <Typography
                    color="text.secondary"
                    sx={{
                      mb: 0.7,
                      fontSize: "0.95rem",
                    }}
                  >
                    City : {order.city}
                  </Typography>

                  <Typography
                    color="text.secondary"
                    sx={{
                      mb: 0.7,
                      fontSize: "0.95rem",
                    }}
                  >
                    Pincode : {order.pincode}
                  </Typography>
                </Box>

                <Divider sx={{ mb: 3 }} />

                {/* PRODUCTS */}

                <Typography
                  sx={{
                    fontWeight: 700,
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
                      mb: 2.5,

                      p: 2,

                      borderRadius: 4,

                      backgroundColor: "#fafafa",

                      border: "1px solid #efefef",
                    }}
                  >
                    {/* PRODUCT IMAGE */}

                    <Box
                      component="img"
                      src={`http://127.0.0.1:8000${item.product_image}`}
                      alt={item.product_name}
                      sx={{
                        width: 110,

                        height: 110,

                        minWidth: 110,

                        borderRadius: 4,

                        objectFit: "cover",

                        border: "1px solid #eee",

                        backgroundColor: "#f5f5f5",

                        padding: 1,
                      }}
                    />

                    {/* PRODUCT DETAILS */}

                    <Box sx={{ flex: 1 }}>
                      <Typography
                        sx={{
                          fontWeight: 700,
                          mb: 0.5,
                          fontSize: "1rem",
                        }}
                      >
                        {item.product_name}
                      </Typography>

                      <Typography color="text.secondary">
                        Qty : {item.quantity}
                      </Typography>

                      <Typography color="text.secondary">
                        Size : {item.size || "-"}
                      </Typography>

                      <Typography color="text.secondary">
                        Color : {item.color || "-"}
                      </Typography>
                    </Box>

                    {/* PRICE */}

                    <Typography
                      sx={{
                        fontWeight: 800,
                        fontSize: "1.1rem",
                      }}
                    >
                      ₹{item.price}
                    </Typography>
                  </Stack>
                ))}

                <Divider sx={{ mt: 2, mb: 3 }} />

                {/* TOTAL */}

                <Box
                  sx={{
                    mt: 3,

                    p: 3,

                    borderRadius: 4,

                    background: "linear-gradient(135deg,#111,#1f1f1f)",

                    color: "white",

                    boxShadow: "0 15px 40px rgba(0,0,0,0.18)",
                  }}
                >
                  <Box sx={{ mb: 2 }}>
                    <Typography color="text.secondary">
                      Subtotal : ₹{order.subtotal}
                    </Typography>

                    <Typography color="text.secondary">
                      Delivery Fee : ₹{order.delivery_fee}
                    </Typography>

                    <Typography
                      sx={{
                        color: "#22c55e",
                        fontWeight: 700,
                      }}
                    >
                      Discount : -₹{order.discount}
                    </Typography>

                    {order.coupon_code && (
                      <Typography color="text.secondary">
                        Coupon : {order.coupon_code}
                      </Typography>
                    )}
                  </Box>
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
                      Grand Total :
                    </Typography>

                    <Typography
                      sx={{
                        fontWeight: 700,
                        fontSize: "1.7rem",
                        letterSpacing: "2px",
                      }}
                    >
                      ₹{order.total_price}
                    </Typography>
                  </Stack>
                </Box>
              </Card>
            );
          })
        )}
      </Box>

      {/* PAGINATION */}

      {orders.length > ordersPerPage && (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            mt: 5,
          }}
        >
          <Pagination
            count={totalPages}
            page={page}
            onChange={(event, value) => setPage(value)}
            shape="rounded"
            size="large"
            sx={{
              "& .MuiPaginationItem-root": {
                fontWeight: 700,
                borderRadius: "12px",
              },

              "& .Mui-selected": {
                backgroundColor: "#111 !important",
                color: "#fff",
              },
            }}
          />
        </Box>
      )}
    </Box>
  );
}
