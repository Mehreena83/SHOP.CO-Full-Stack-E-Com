import { Grid, Box, Typography, Pagination } from "@mui/material";
import { useState } from "react";
import { useLocation } from "react-router-dom";

import CustomBreadcrumbs from "../../components/layout/Breadcrumbs";
import FilterSidebar from "../../components/filters/FilterSidebar";
import ProductCard from "../../components/product/ProductCard";
import useProducts from "../../hooks/useProducts";
import { FormControl, Select, MenuItem } from "@mui/material";

export default function ShopPage() {
  const [filters, setFilters] = useState({});
  const [sort, setSort] = useState("");
  const [page, setPage] = useState(1);
  const location = useLocation();

  const searchQuery = new URLSearchParams(location.search).get("search") || "";

  // API FILTERS

  const { products, count } = useProducts({
    ...filters,
    search: searchQuery,
    sort,
    page,
  });

  return (
    <Box
      sx={{
        maxWidth: "1400px",
        mx: "auto",
        px: { xs: 2, md: 4 },
        py: 4,
      }}
    >
      <CustomBreadcrumbs current="Shop" />

      <Box
        sx={{
          display: "flex",
          gap: 4,
          alignItems: "flex-start",
        }}
      >
        {/* SIDEBAR */}
        <Box
          sx={{
            width: "280px",
            flexShrink: 0,
          }}
        >
          <FilterSidebar setFilters={setFilters} />
        </Box>

        {/* PRODUCTS */}
        <Box sx={{ flex: 1 }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mb: 4,
            }}
          >
            <Typography variant="h4" fontWeight="bold">
              All Products
            </Typography>

            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 2,
              }}
            >
              {/* PRODUCT COUNT */}

              <Box
                sx={{
                  height: "48px",

                  px: 2.5,

                  display: "flex",
                  alignItems: "center",

                  borderRadius: "14px",

                  background: "#fff",

                  border: "1px solid #e5e7eb",

                  boxShadow: "0 4px 14px rgba(0,0,0,0.05)",
                }}
              >
                <Typography
                  sx={{
                    color: "#555",
                    fontWeight: 600,
                    fontSize: "0.95rem",
                  }}
                >
                  {/* Showing {products.length} products */}
                  Showing {count} products
                </Typography>
              </Box>

              {/* SORT */}

              <FormControl size="small">
                <Select
                  value={sort}
                  onChange={(e) => setSort(e.target.value)}
                  displayEmpty
                  sx={{
                    minWidth: 220,

                    background: "#fff",

                    borderRadius: "14px",

                    fontWeight: 600,

                    height: "48px",

                    boxShadow: "0 4px 14px rgba(0,0,0,0.05)",

                    "& .MuiOutlinedInput-notchedOutline": {
                      border: "1px solid #e5e7eb",
                    },

                    "&:hover .MuiOutlinedInput-notchedOutline": {
                      border: "1px solid #111",
                    },

                    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                      border: "2px solid #111",
                    },

                    "& .MuiSelect-select": {
                      display: "flex",
                      alignItems: "center",
                    },
                  }}
                >
                  <MenuItem value="">Sort By</MenuItem>

                  <MenuItem value="price_low">Price: Low to High</MenuItem>

                  <MenuItem value="price_high">Price: High to Low</MenuItem>

                  <MenuItem value="newest">Newest Arrivals</MenuItem>
                </Select>
              </FormControl>
            </Box>
          </Box>

          <Grid container spacing={3}>
            {products.length === 0 ? (
              <Typography
                sx={{
                  width: "100%",
                  textAlign: "center",
                  py: 10,
                  color: "#777",
                  fontSize: "18px",
                  fontWeight: 500,
                }}
              >
                No products found
              </Typography>
            ) : (
              products.map((product) => (
                <Grid
                  item
                  xs={12}
                  sm={6}
                  md={4}
                  key={product.id}
                  sx={{ display: "flex" }}
                >
                  <ProductCard product={product} />
                </Grid>
              ))
            )}
          </Grid>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              mt: 6,
            }}
          >
            <Pagination
              count={Math.ceil(count / 6)}
              page={page}
              onChange={(event, value) => setPage(value)}
              shape="rounded"
              color="primary"
              sx={{
                "& .MuiPaginationItem-root": {
                  fontWeight: 600,
                },
              }}
            />
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
