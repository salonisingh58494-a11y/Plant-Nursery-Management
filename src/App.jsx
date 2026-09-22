import { Routes, Route, useLocation } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { CartProvider } from "./context/CartContext";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Hero from "./components/Hero";
import TrustBar from "./components/TrustBar";
import FeaturedProducts from "./components/FeaturedProducts";
import Performance from "./components/Performance";
import LearnMore from "./components/LearnMore";
import PrivateRoute from "./PrivateRoute";
import Plants from "./pages/Plants";
import Seeds from "./pages/Seeds";
import Pots from "./pages/Pots";
import Fertilizer from "./pages/Fertilizer";
import Blog from "./pages/Blog";

// import LeafyAI from './components/LeafyAI';

import ProductDetail from "./pages/ProductDetail"; 
import SeedDetail from "./pages/SeedDetail";
import PotDetail from "./pages/PotDetail";
import FertDetail from "./pages/FertDetail";

import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import CartPage from "./pages/CartPage";
import Checkout from "./pages/Checkout";
import OrderProcessing from "./pages/OrderProcessing";
import OrderSuccess from "./pages/OrderSuccess";
import UserDashboard from "./pages/UserDashboard";
import ProfilePage from "./pages/ProfilePage";
import OrdersPage from "./pages/OrdersPage";
import NotificationsPage from "./pages/NotificationsPage";
import LogoutModal from "./pages/LogoutModal";
import WishlistPage from "./pages/WishlistPage";
import AdminLayout from "./components/Admin/AdminLayout";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminOrders from "./pages/admin/AdminOrdersPage";
import UsersPage from "./pages/admin/UsersPage";
import ProductsPage from "./pages/admin/ProductsPage";

function AppContent() {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith("/admin");

  return (
    <>
      {!isAdminRoute && <Header />}

      <Routes>
        <Route
          path="/"
          element={
            <>
              <Hero />
              <TrustBar />
              <FeaturedProducts />
              <Performance />
              <LearnMore />
            </>
          }
        />

        <Route path="/plants" element={<Plants />} />
        <Route path="/seeds" element={<Seeds />} />
        <Route path="/pots" element={<Pots />} />
        <Route path="/fertilizer" element={<Fertilizer />} />
        <Route path="/blog" element={<Blog />} />

        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/seed/:id" element={<SeedDetail />} />
        <Route path="/pot/:id" element={<PotDetail />} />
        <Route path="/fert-detail/:id" element={<FertDetail />} />

        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        <Route path="/cart" element={<CartPage />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/processing" element={<OrderProcessing />} />
        <Route path="/order-success" element={<OrderSuccess />} />

        <Route path="/dashboard" element={<PrivateRoute><UserDashboard /></PrivateRoute>} />
        <Route path="/profile" element={<PrivateRoute><ProfilePage /></PrivateRoute>} />
        <Route path="/orders" element={<PrivateRoute><OrdersPage /></PrivateRoute>} />
        <Route path="/notify" element={<PrivateRoute><NotificationsPage /></PrivateRoute>} />
        <Route path="/wishlist" element={<PrivateRoute><WishlistPage /></PrivateRoute>} />
        <Route path="/logout" element={<PrivateRoute><LogoutModal /></PrivateRoute>} />

        <Route
          path="/admin"
          element={
            <PrivateRoute>
              <AdminLayout />
            </PrivateRoute>
          }
        >
          <Route index element={<AdminDashboard />} />
          <Route path="orders" element={<AdminOrders />} />
          <Route path="users" element={<UsersPage />} />
          <Route path="products" element={<ProductsPage />} />
        </Route>
      </Routes>

      {/* {!isAdminRoute && <LeafyAI />} */}
      {!isAdminRoute && <Footer />}
    </>
  );
}

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <AppContent />
      </CartProvider>
    </AuthProvider>
  );
}

export default App;