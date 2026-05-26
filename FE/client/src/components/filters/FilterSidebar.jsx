import {
  Box,
  Typography,
  Button,
  Divider,
  Slider,
  Stack,
  IconButton,
} from "@mui/material";
import TuneIcon from "@mui/icons-material/Tune";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { useState } from "react";

export default function FilterSidebar({ setFilters }) {
  const [price, setPrice] = useState(5000);
  const [openFilters, setOpenFilters] = useState(true);
  const [openType, setOpenType] = useState(true);
  const [openPrice, setOpenPrice] = useState(true);
  const [openColors, setOpenColors] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedColor, setSelectedColor] = useState("");

  const applyFilters = () => {
    setFilters({
      category: selectedCategory,
      max_price: price,
      color: selectedColor,
    });
  };

  return (
    <Box
      sx={{
        border: "1px solid #e5e7eb",
        borderRadius: "24px",
        p: 3,
        backgroundColor: "#fff",
        transition: "0.3s",
        boxShadow: "0 4px 20px rgba(0,0,0,0.04)",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          width: "100%",
          mb: 2,
        }}
      >
        <Typography
          fontWeight="bold"
          fontSize="20px"
          sx={{
            flex: 1,
          }}
        >
          Filters
        </Typography>

        <IconButton
          onClick={() => setOpenFilters(!openFilters)}
          sx={{
            transform: openFilters ? "rotate(180deg)" : "rotate(0deg)",
            transition: "0.3s",
          }}
        >
          <TuneIcon />
        </IconButton>
      </Box>

      {openFilters && (
        <>
          <Divider sx={{ mb: 2 }} />
          <Box mb={3}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                cursor: "pointer",
              }}
              onClick={() => setOpenType(!openType)}
            >
              <Typography fontWeight="bold">Type</Typography>
              <KeyboardArrowDownIcon
                sx={{
                  transform: openType ? "rotate(180deg)" : "rotate(0deg)",
                  transition: "0.3s",
                }}
              />
            </Box>

            {openType && (
              <Stack spacing={1.2} mt={2}>
                {[
                  { label: "T-Shirts", value: "T-shirts" },
                  { label: "Shirts", value: "Shirts" },
                  { label: "Jeans", value: "Jeans" },
                  { label: "Shorts", value: "Shorts" },
                ].map((item) => (
                  <Box
                    key={item}
                    onClick={() => setSelectedCategory(item.value)}
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      cursor: "pointer",

                      px: 1.5,
                      py: 1.2,

                      borderRadius: "12px",

                      background:
                        selectedCategory === item.value ? "#000" : "#f8f8f8",

                      color: selectedCategory === item.value ? "#fff" : "#222",

                      transition: "0.2s",

                      "&:hover": {
                        background:
                          selectedCategory === item.value ? "#000" : "#f1f1f1",
                      },
                    }}
                  >
                    <Typography
                      sx={{
                        fontWeight: selectedCategory === item.value ? 700 : 500,

                        fontSize: "14px",
                      }}
                    >
                      {item.label}
                    </Typography>
                  </Box>
                ))}
              </Stack>
            )}
          </Box>

          <Divider sx={{ mb: 3, mt: 3 }} />
          <Box mb={4}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                cursor: "pointer",
                mb: 1,
              }}
              onClick={() => setOpenPrice(!openPrice)}
            >
              <Typography
                sx={{
                  fontWeight: 700,
                  fontSize: "15px",
                }}
              >
                Price
              </Typography>

              <KeyboardArrowDownIcon
                sx={{
                  transform: openPrice ? "rotate(180deg)" : "rotate(0deg)",
                  transition: "0.3s",
                }}
              />
            </Box>

            {openPrice && (
              <Box mt={3}>
                <Slider
                  value={price}
                  onChange={(e, value) => setPrice(value)}
                  min={100}
                  max={10000}
                  sx={{
                    color: "#000",

                    "& .MuiSlider-thumb": {
                      width: 20,
                      height: 20,
                      backgroundColor: "#fff",
                      border: "4px solid #000",

                      "&:hover": {
                        boxShadow: "0 0 0 8px rgba(0,0,0,0.08)",
                      },
                    },

                    "& .MuiSlider-track": {
                      border: "none",
                      height: 6,
                      borderRadius: "999px",
                    },

                    "& .MuiSlider-rail": {
                      height: 6,
                      borderRadius: "999px",
                      backgroundColor: "#e5e7eb",
                      opacity: 1,
                    },
                  }}
                />

                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    mt: 2,
                    px: 1,
                  }}
                >
                  <Typography
                    sx={{
                      fontSize: "13px",
                      color: "#888",
                      fontWeight: 500,
                    }}
                  >
                    ₹100
                  </Typography>

                  <Box
                    sx={{
                      px: 2,
                      py: 0.7,
                      borderRadius: "999px",
                      background: "#000",
                      color: "#fff",
                      fontWeight: 700,
                      fontSize: "13px",
                      minWidth: "80px",
                      textAlign: "center",
                      boxShadow: "0 4px 12px rgba(0,0,0,0.12)",
                    }}
                  >
                    ₹{price}
                  </Box>
                </Box>
              </Box>
            )}
          </Box>

          <Divider sx={{ mb: 3, mt: 3 }} />
          <Box mb={4}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                cursor: "pointer",
                mb: 1,
              }}
              onClick={() => setOpenColors(!openColors)}
            >
              <Typography
                sx={{
                  fontWeight: 700,
                  fontSize: "15px",
                }}
              >
                Colors
              </Typography>

              <KeyboardArrowDownIcon
                sx={{
                  transform: openColors ? "rotate(180deg)" : "rotate(0deg)",
                  transition: "0.3s",
                }}
              />
            </Box>

            {openColors && (
              <Stack spacing={1.8} mt={2}>
                {[
                  { name: "Brown", code: "rgb(80, 53, 32)", value: "Brown" },
                  { name: "White", code: "#ffffff", value: "White" },
                  { name: "Olive", code: "#4e6856", value: "Olive" },
                  { name: "Blue", code: "#1E3A8A", value: "Blue" },
                  { name: "Grey", code: "#777f8a", value: "Grey" },
                  { name: "Black", code: "#000000", value: "Black" },
                ].map((item) => (
                  <Box
                    key={item.code}
                    onClick={() => setSelectedColor(item.value)}
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 1.5,
                      cursor: "pointer",
                    }}
                  >
                    <Box
                      sx={{
                        width: 22,
                        height: 22,
                        borderRadius: "50%",
                        backgroundColor: item.code,

                        border:
                          selectedColor === item.value
                            ? "3px solid #000"
                            : "1px solid #ddd",

                        transition: "0.2s",
                      }}
                    />

                    <Typography
                      sx={{
                        fontSize: "14px",
                        fontWeight: selectedColor === item.code ? 700 : 500,

                        color: selectedColor === item.code ? "#000" : "#555",
                      }}
                    >
                      {item.name}
                    </Typography>
                  </Box>
                ))}
              </Stack>
            )}
          </Box>

          <Divider sx={{ mb: 3, mt: 3 }} />

          <Button
            fullWidth
            variant="outlined"
            onClick={() => {
              setSelectedCategory("");
              setSelectedColor("");
              setPrice(5000);

              setFilters({});
            }}
            sx={{
              borderRadius: "30px",
              py: 1.3,
              mb: 1.5,

              textTransform: "none",

              borderColor: "#ddd",
              color: "#111",

              fontWeight: 700,

              "&:hover": {
                borderColor: "#000",
                background: "#fafafa",
              },
            }}
          >
            Clear Filters
          </Button>
          {/* APPLY BUTTON */}
          <Button
            fullWidth
            variant="contained"
            onClick={applyFilters}
            sx={{
              borderRadius: "30px",
              py: 1.4,
              backgroundColor: "#000",
              textTransform: "none",
              fontWeight: "bold",

              "&:hover": {
                backgroundColor: "#222",
              },
            }}
          >
            Apply Filter
          </Button>
        </>
      )}
    </Box>
  );
}
