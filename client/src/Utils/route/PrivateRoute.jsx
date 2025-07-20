import { Navigate } from "react-router-dom";
import useStore from "../../store";

function PrivateRoute({ Component }) {
  const { isSignedIn, user } = useStore();

  if (!isSignedIn || !user?.accessToken) {
    return <Navigate to="/" replace />;
  }

  return <Component />;
}

export default PrivateRoute;
