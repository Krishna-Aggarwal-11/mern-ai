import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Registration from "./components/User/Registration";
import Login from "./components/User/Login";
import Dashboard from "./components/User/Dashboard";
import PublicNav from "./components/Navbar/PublicNav";
import PrivateNavbar from "./components/Navbar/PrivateNav";
import Home from "./components/Home/Home";
import { useAuth } from "./AuthContext/AuthContext";
import AuthRoute from "./components/AuthRoute/AuthRoute";
import BlogPostAIAssistant from "./components/ContentGeneration/ContentGeneration";
import Plans from "./components/Plans/Plan";
import FreePlanSignup from "./components/StripePayment/FreePlanSignup";
import CheckoutForm from "./components/StripePayment/CheckoutForm";
import PaymentSuccess from "./components/StripePayment/PaymentSuccess";
import History from "./components/User/History";
import AppFeatures from "./components/Features/Features";
import AboutUs from "./components/About/About";

const App = () => {
  const { isAuthenticated } = useAuth();
  return (
    <div>
      <BrowserRouter>
        {isAuthenticated ? <PrivateNavbar /> : <PublicNav />}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/plans" element={<Plans />} />
          <Route path="/register" element={<Registration />} />
          <Route path="/login" element={<Login />} />
          <Route path="/features" element={<AppFeatures />} />
          <Route
            path="/free-plan"
            element={
              <AuthRoute>
                <FreePlanSignup />
              </AuthRoute>
            }
          />
          <Route
            path="/checkout/:plan"
            element={
              <AuthRoute>
                <CheckoutForm />
              </AuthRoute>
            }
          />
          <Route
            path="/success"
            element={
              <AuthRoute>
                <PaymentSuccess />
              </AuthRoute>
            }
          />
          <Route
            path="/dashboard"
            element={
              <AuthRoute>
                <Dashboard />
              </AuthRoute>
            }
          />
          <Route
            path="/generate-content"
            element={
              <AuthRoute>
                <BlogPostAIAssistant />
              </AuthRoute>
            }
          />
          <Route
            path="/history"
            element={
              <AuthRoute>
                <History />
              </AuthRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
