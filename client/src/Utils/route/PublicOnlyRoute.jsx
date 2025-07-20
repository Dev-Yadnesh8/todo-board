import { Navigate } from "react-router-dom";
import useStore from "../../store";

function PublicOnlyRoute({ Component }) {
  const { isSignedIn } = useStore();
  return isSignedIn ? <Navigate to={"/board"} replace /> : <Component />;
}

export default PublicOnlyRoute;
