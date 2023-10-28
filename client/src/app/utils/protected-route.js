"use client";

import { Navigate } from "react-router-dom";
import { useUserAuth } from "../components/auth/auth";

const ProtectedRoute = ({ children }) => {
  const { user } = useUserAuth();

  console.log("Check user in Private: ", user);
  if (!user) {
    return <Navigate to="/" />;
  }
  console.log("children..", children);
  return children;
};

export default ProtectedRoute;
