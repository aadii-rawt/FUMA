import { Navigate, useLocation } from "react-router-dom";
import useUser from "../context/userContext";
import Loading from "../components/shimmer/Loading";
export function Authenticate({children}) {
  const { user, loading } = useUser();
  const location = useLocation();
  if (loading) return <Loading />

  
  // if (!user) return <Navigate to="/auth/login" replace state={{ from: location }} />;
  // if(user && !user.access_token) return <Navigate to="/auth/connect/instagram" replace state={{ from: location }} />;

  return children;
}
