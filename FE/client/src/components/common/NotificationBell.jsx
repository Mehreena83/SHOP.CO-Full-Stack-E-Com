import {
  Badge,
  IconButton,
  Menu,
  Typography,
  Box,
  Divider,
  Stack,
  Fade,
  Avatar,
} from "@mui/material";

import NotificationsRoundedIcon from "@mui/icons-material/NotificationsRounded";
import DeleteOutlineRoundedIcon from "@mui/icons-material/DeleteOutlineRounded";
import DoneAllRoundedIcon from "@mui/icons-material/DoneAllRounded";
import CircleIcon from "@mui/icons-material/Circle";

import { useState } from "react";

import { useNotifications } from "../../context/NotificationContext";

export default function NotificationBell() {
  const [anchorEl, setAnchorEl] = useState(null);

  const { notifications, markAllRead, clearNotifications } = useNotifications();

  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <>
      {/* ================= BELL ================= */}

      <IconButton
        onClick={(e) => setAnchorEl(e.currentTarget)}
        sx={{
          width: 44,
          height: 44,

          borderRadius: "15px",

          background: "#fff",

          border: "1px solid #ececec",

          transition: "0.25s ease",

          "&:hover": {
            background: "#fafafa",

            transform: "translateY(-2px)",

            boxShadow: "0 10px 24px rgba(0,0,0,0.08)",
          },
        }}
      >
        <Badge
          badgeContent={unreadCount}
          invisible={unreadCount === 0}
          overlap="circular"
          sx={{
            "& .MuiBadge-badge": {
              background: "linear-gradient(135deg,#ff4d4d 0%, #ff1f1f 100%)",

              color: "#fff",

              fontSize: "0.45rem",

              fontWeight: 800,

              minWidth: "17px",
              height: "17px",

              borderRadius: "999px",

              border: "2px solid #fff",

              top: 4,
              right: 4,

              boxShadow: "0 5px 14px rgba(255,0,0,0.28)",
            },
          }}
        >
          <NotificationsRoundedIcon
            sx={{
              fontSize: 22,
              color: "#111",
            }}
          />
        </Badge>
      </IconButton>

      {/* ================= MENU ================= */}

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={() => setAnchorEl(null)}
        TransitionComponent={Fade}
        PaperProps={{
          elevation: 0,

          sx: {
            width: 360,

            mt: 1.5,

            borderRadius: "24px",

            overflow: "hidden",

            border: "1px solid #ededed",

            background: "#ffffff",

            backdropFilter: "blur(18px)",

            boxShadow: "0 25px 60px rgba(0,0,0,0.12)",
          },
        }}
      >
        {/* ================= HEADER ================= */}

        <Box
          sx={{
            px: 2.5,
            py: 2.2,

            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",

            background: "linear-gradient(to bottom,#ffffff,#fafafa)",
          }}
        >
          <Box>
            <Typography
              sx={{
                fontWeight: 800,
                fontSize: "1.08rem",
                color: "#111827",
              }}
            >
              Notifications
            </Typography>

            <Typography
              sx={{
                fontSize: "0.78rem",
                color: "#9ca3af",
                mt: 0.2,
              }}
            >
              {unreadCount} unread notification
              {unreadCount !== 1 && "s"}
            </Typography>
          </Box>

          <Stack direction="row" spacing={1}>
            <IconButton
              onClick={markAllRead}
              size="small"
              sx={{
                width: 34,
                height: 34,

                borderRadius: "10px",

                background: "#eff6ff",

                "&:hover": {
                  background: "#dbeafe",
                },
              }}
            >
              <DoneAllRoundedIcon
                sx={{
                  fontSize: 18,
                  color: "#2563eb",
                }}
              />
            </IconButton>

            <IconButton
              onClick={clearNotifications}
              size="small"
              sx={{
                width: 34,
                height: 34,

                borderRadius: "10px",

                background: "#f3f4f6",

                "&:hover": {
                  background: "#e5e7eb",
                },
              }}
            >
              <DeleteOutlineRoundedIcon
                sx={{
                  fontSize: 18,
                  color: "#444",
                }}
              />
            </IconButton>
          </Stack>
        </Box>

        <Divider />

        {/* ================= BODY ================= */}

        <Box
          sx={{
            maxHeight: 430,

            overflowY: "auto",

            background: "#fcfcfc",

            p: 1.5,
          }}
        >
          {notifications.length === 0 ? (
            <Box
              sx={{
                py: 7,

                display: "flex",
                flexDirection: "column",

                alignItems: "center",

                justifyContent: "center",
              }}
            >
              <Avatar
                sx={{
                  width: 64,
                  height: 64,

                  background: "#f3f4f6",

                  mb: 2,
                }}
              >
                <NotificationsRoundedIcon
                  sx={{
                    color: "#cbd5e1",
                    fontSize: 32,
                  }}
                />
              </Avatar>

              <Typography
                sx={{
                  fontWeight: 700,
                  color: "#374151",
                }}
              >
                No Notifications
              </Typography>

              <Typography
                sx={{
                  mt: 0.5,
                  fontSize: "0.82rem",
                  color: "#9ca3af",
                }}
              >
                You're all caught up
              </Typography>
            </Box>
          ) : (
            notifications.map((item) => (
              <Box
                key={item.id}
                sx={{
                  p: 2,

                  mb: 1.3,

                  borderRadius: "18px",

                  background: item.read ? "#fff" : "#f8fbff",

                  border: item.read ? "1px solid #f0f0f0" : "1px solid #dbeafe",

                  transition: "all 0.22s ease",

                  "&:hover": {
                    transform: "translateY(-2px)",

                    boxShadow: "0 10px 24px rgba(0,0,0,0.05)",
                  },
                }}
              >
                <Stack direction="row" spacing={1.4} alignItems="flex-start">
                  {!item.read && (
                    <CircleIcon
                      sx={{
                        fontSize: 9,
                        color: "#2563eb",
                        mt: 0.7,
                      }}
                    />
                  )}

                  <Box flex={1}>
                    <Typography
                      sx={{
                        fontSize: "0.92rem",

                        lineHeight: 1.55,

                        color: "#111827",

                        fontWeight: item.read ? 500 : 700,
                      }}
                    >
                      {item.message}
                    </Typography>

                    <Typography
                      sx={{
                        fontSize: "0.74rem",

                        color: "#9ca3af",

                        mt: 1,
                      }}
                    >
                      {item.time}
                    </Typography>
                  </Box>
                </Stack>
              </Box>
            ))
          )}
        </Box>
      </Menu>
    </>
  );
}
