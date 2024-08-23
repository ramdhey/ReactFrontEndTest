import React from "react";
import { Navigate } from "react-router-dom";
import StoreState from "../state/store";

const ProtectedRoute = ({ children, requiredRole }) => {
  const { token, role } = StoreState();

  if (!token) {
    // Jika tidak ada token, arahkan ke halaman login
    return <Navigate to="/" replace />;
  }

  if (requiredRole && role !== requiredRole) {
    // Jika role tidak sesuai, arahkan ke halaman sesuai role
    if (role === "admin") {
      return <Navigate to="/beranda-admin" replace />;
    }
    if (role === "user") {
      return <Navigate to="/beranda-user" replace />;
    }
  }

  // Jika semua kondisi terpenuhi, render anak komponen
  return children;
};

export default ProtectedRoute;
