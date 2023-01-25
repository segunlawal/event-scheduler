import React from "react";
import { Navigate } from "react-router-dom";
import { UserAuth } from "../context/AuthContext";

// eslint-disable-next-line react/prop-types
const ProtectedRoute = ({ children }) => {
  const { oneUser } = UserAuth();

  if (!oneUser) {
    return <Navigate to="/" />;
  }
  return children;
};

export default ProtectedRoute;
