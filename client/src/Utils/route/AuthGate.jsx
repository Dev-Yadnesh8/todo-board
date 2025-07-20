import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import useRefreshToken from "../../hooks/useRefreshToken";
import useStore from "../../store";


function AuthGate() {
  const refresh = useRefreshToken();
  const { user, loader } = useStore();

  useEffect(() => {
    const verifyToken = async () => {
      if (!user?.accessToken) {
        await refresh();
      } else {
        // Just stop the loader
        useStore.getState().setLoader(false);
      }
    };

    verifyToken();
  }, []);

  if (loader) return <div>loadeing</div>;
  return <Outlet />;
}

export default AuthGate;
