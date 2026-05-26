import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "./components/layout/MainLayout";
import HomePage from "./pages/Home/HomePage";
import ShopPage from "./pages/Shop/ShopPage";
import CartPage from "./pages/Cart/CartPage";
import LoginPage from "./pages/Auth/LoginPage";
import ProductDetailsPage from "./pages/ProductDetails/ProductDetailsPage";
import RegisterPage from "./pages/Auth/RegisterPage";
import ProtectedRoute from "./routes/ProtectedRoute";
import OrdersPage from "./pages/Orders/OrdersPage";
import WishlistPage from "./pages/Wishlist/WishlistPage";
import CheckoutPage from "./pages/Checkout/CheckoutPage";
import OrderDetailsPage from "./pages/orders/OrderDetailsPage";
import ResetPasswordPage from "./pages/auth/ResetPasswordPage";
import ForgotPasswordPage from "./pages/Auth/ForgotPasswordPage";
export default function App() {
  return (
    <BrowserRouter>
      <MainLayout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/shop" element={<ShopPage />} />
          <Route path="/product/:slug" element={<ProductDetailsPage />} />
          <Route
            path="/cart"
            element={
              <ProtectedRoute>
                <CartPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/orders"
            element={
              <ProtectedRoute>
                <OrdersPage />
              </ProtectedRoute>
            }
          />
          <Route path="/orders/:id" element={<OrderDetailsPage />} />
          <Route
            path="/checkout"
            element={
              <ProtectedRoute>
                <CheckoutPage />
              </ProtectedRoute>
            }
          />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route
            path="/reset-password/:uid/:token"
            element={<ResetPasswordPage />}
          />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          {/* <Route path="/orders" element={<OrdersPage />} /> */}
          <Route path="/wishlist" element={<WishlistPage />} />
        </Routes>
      </MainLayout>
    </BrowserRouter>
  );
}
