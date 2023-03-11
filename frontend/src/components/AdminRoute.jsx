import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAdminStatus } from "../hooks/useAdminStatus";
import Spinner from "./Spinner";
const AdminRoute = () => {
  const { admin, checkingStatus } = useAdminStatus();
  if (checkingStatus) {
    return <Spinner />;
  }
  return admin ? <Outlet /> : <Navigate to="/" />;
};

export default AdminRoute;
