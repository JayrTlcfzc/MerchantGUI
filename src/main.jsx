import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import RegisterSubscriber from "./pages/AccountManagement/registerSubscriber";
import SearchSubscriber from "./pages/AccountManagement/searchSubscriber";
import Layout from "./components/Layout";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Router>
      <Routes>
        {/* Public route */}
        <Route path="/" element={<Login />} />

        {/* Protected routes wrapped with Layout */}
        <Route path="/dashboard" element={<Layout username="John Doe"><Dashboard /></Layout>} />
        <Route path="/account/register" element={<Layout username="John Doe"><RegisterSubscriber /></Layout>} />
        <Route path="/account/search" element={<Layout username="John Doe"><SearchSubscriber /></Layout>} />
      </Routes>
    </Router>
  </React.StrictMode>
);
