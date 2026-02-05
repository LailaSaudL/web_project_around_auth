// src/components/ProtectedRoute/ProtectedRoute.jsx
// This component protects routes that require authentication

import { Navigate } from "react-router-dom";

function ProtectedRoute({ children, isLoggedIn }) {
  // If user is not logged in, redirect to signin page
  // If user is logged in, show the protected content (children)
  return isLoggedIn ? children : <Navigate to="/signin" replace />;
}

export default ProtectedRoute;
