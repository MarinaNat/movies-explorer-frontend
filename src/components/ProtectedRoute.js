import React from "react";
import { Navigate } from "react-router-dom";

  const ProtectedRoute = ({ children, isLoggedIn }) => {
    return isLoggedIn ? children : <Navigate to="/" replace />
  }

// const ProtectedRoute = ({ component: Component, ...props }) => {
//   return props.loggedIn ? (
//     <Component {...props} />
//   ) : (
//     <Navigate to="/signin" replace />
//   );
// };

export default ProtectedRoute;
