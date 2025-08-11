import { Navigate, useLocation } from "react-router-dom";
import toast from "react-hot-toast";

export default function ProtectedRoute({ children }) {
  const location = useLocation();

  let currentUser = null;
  try {
    currentUser = JSON.parse(localStorage.getItem("currentUser"));
  } catch (e) {
    currentUser = null;
  }

  if (!currentUser) {
    toast.error("Un-authorised user : Please log in");
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
}
