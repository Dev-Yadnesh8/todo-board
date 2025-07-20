import { LOGOUT_ENPOINT } from "../utils/api/api_enpoints";
import { axiosPrivateInstance } from "../Utils/api/axios";
import useStore from "../store";

function useLogout() {
  const { setSignedIn, setUser } = useStore();

  const logout = async () => {
    try {
      setSignedIn(false);
      setUser(undefined);
      await axiosPrivateInstance.post(LOGOUT_ENPOINT);
    } catch (error) {
      console.error("Error while logout", error);
    }
  };

  return logout;
}

export default useLogout;
