import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { RootState } from "@/redux/store"; // Import your root state type

const PrivateRoute: React.FC = () => {
  // Retrieve the JWT token from the Redux store
  const token = useSelector((state: RootState) => state.auth.token);

  // If using localStorage, you could do something like:
  // const token = localStorage.getItem('token');

  // Check if we have a token
  if (!token) {
    // User is not authenticated, redirect to the login page
    return <Navigate to="/" replace />;
  }

  // User is authenticated, render the children routes
  return <Outlet />;
};

export default PrivateRoute;
