import { Navigate, useLocation } from "react-router-dom";
import useUser from "../context/userContext";
export function Authenticate({children}) {
  const { user, loading } = useUser();
  const location = useLocation();
  if (loading) return <div>Loading...</div>;

  
  if (!user) return <Navigate to="/auth/login" replace state={{ from: location }} />;
  if(user && !user.access_token) return <Navigate to="/auth/connect/instagram" replace state={{ from: location }} />;

  return children;
}
