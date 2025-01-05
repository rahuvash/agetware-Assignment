import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";
import { Provider } from "react-redux";
import { useSelector } from "react-redux";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import ProductDetailsPage from "./pages/ProductDetailsPage";
import CartPage from "./pages/CartPage";
import Wishlist from "./pages/Wishlist";
import NotFound from "./pages/NotFound";

import Header from "./components/Header";

// Import updated PrivateRouteWrapper
import store from "./store";
import PrivateRoute from "./components/PrivateRoute";
import AdminDashboard from "./pages/AdminDashboard";

const App = () => {
  const AppLayout = ({ children }) => {
    const location = useLocation(); // Access the current location

    return (
      <>
        {/* Render Header only if the current path is not '/login' */}
        {location.pathname !== "/login" && <Header />}
        <main>{children}</main>
      </>
    );
  };

  return (
    <Provider store={store}>
      <Router>
        <AppLayout />
        <div className="App">
          <Routes>
            <Route
              path="/"
              element={
                <PrivateRoute
                  allowedRoles={["user", "admin"]}
                  element={<HomePage />}
                />
              }
            />
            <Route
              path="/dashboard"
              element={
                <PrivateRoute
                  allowedRoles={["admin"]}
                  element={<AdminDashboard />}
                />
              }
            />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/product/:id" element={<ProductDetailsPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/wishlist" element={<Wishlist />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </Router>
    </Provider>
  );
};

export default App;
