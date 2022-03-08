import { Navigate } from "react-router-dom";

function PrivateRoute(props) {
  return props.auth !== false ? props.children : <Navigate to="/login" />;
};

export default PrivateRoute;