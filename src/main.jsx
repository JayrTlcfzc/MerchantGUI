import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import RegisterSubscriber from "./pages/AccountManagement/registerSubscriber";
import SearchSubscriber from "./pages/AccountManagement/searchSubscriber";
import ViewPendingSubscriber from "./pages/AccountManagement/viewPendingSubscriber";
import ViewWebUsers from "./pages/WebUsers/viewWebUsers";
import RegisterNewUsers from "./pages/WebUsers/registerNewUser";
import AuditTrail from "./pages/AuditTrail/auditTrail";
import AllocateCash from "./pages/Funds/allocateCash";
import WalletToBank from "./pages/Funds/walletToBank";
import BatchUploadedFiles from "./pages/Funds/batchUploadedFiles";
import BatchPaymentUpload from "./pages/Funds/batchPaymentUpload";
import BatchFiles from "./pages/Funds/batchFiles";
import RequestReports from "./pages/Reports/requestReports";

import Layout from "./components/Layout";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Router>
      <Routes>
        {/* Public route */}
        <Route path="/" element={<Login />} />

        {/* Protected routes wrapped with Layout */}
        {/* Account Management */}
        <Route path="/dashboard" element={<Layout username="John Doe"><SearchSubscriber /></Layout>} />
        <Route path="/account/register" element={<Layout username="John Doe"><RegisterSubscriber /></Layout>} />
        <Route path="/account/search" element={<Layout username="John Doe"><SearchSubscriber /></Layout>} />
        <Route path="/account/view-pending" element={<Layout username="John Doe"><ViewPendingSubscriber /></Layout>} />

        {/* Web Users */}
        <Route path="/web-users/view-web-users" element={<Layout username="John Doe"><ViewWebUsers /></Layout>} />
        <Route path="/web-users/register-new-user" element={<Layout username="John Doe"><RegisterNewUsers /></Layout>} />
        
        {/* Funds */}
        <Route path="/funds/allocate-cash" element={<Layout username="John Doe"><AllocateCash /></Layout>} />
        <Route path="/funds/wallet-to-bank" element={<Layout username="John Doe"><WalletToBank /></Layout>} />
        <Route path="/funds/batch-uploaded-files" element={<Layout username="John Doe"><BatchUploadedFiles /></Layout>} />
        <Route path="/funds/batch-payment-upload" element={<Layout username="John Doe"><BatchPaymentUpload /></Layout>} />
        <Route path="/funds/batch-files" element={<Layout username="John Doe"><BatchFiles /></Layout>} />

        {/* Reports */}
        <Route path="/reports/request-reports" element={<Layout username="John Doe"><RequestReports /></Layout>} />
        
        
        {/* Audit Trail */}
        <Route path="/audit-trail" element={<Layout username="John Doe"><AuditTrail /></Layout>} />

      </Routes>
    </Router>
  </React.StrictMode>
);
