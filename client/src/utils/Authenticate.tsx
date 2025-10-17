import { Navigate, Outlet, useLocation } from "react-router-dom";
import useUser from "../context/userContext";
import { Children } from "react";

export function Authenticate({children}) {
  const { user, loading } = useUser();
  const location = useLocation();
  if (loading) return <div>Loading...</div>;

  
  if (!user) return <Navigate to="/auth/login" replace state={{ from: location }} />;


  return children;
}
