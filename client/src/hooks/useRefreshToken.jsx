import { REFRESH_TOKEN_ENPOINT } from "../Utils/api/api_endpoints";
import { axiosInstance } from "../Utils/api/axios";
import useStore from "../store";

function useRefreshToken() {
  const { setSignedIn, setUser, setLoader } = useStore();

  const refresh = async () => {
    try {
      const response = await axiosInstance.post(
        REFRESH_TOKEN_ENPOINT,
        {},
        {
          withCredentials: true,
        }
      );

      const result = response?.data;
      // console.log("REFRESH-TOKEN--RESULT----", result);

      const newAccessToken = result?.data?.accessToken;

      if (newAccessToken) {
        setUser({...result.data.user,accessToken:result.data.accessToken});
        setSignedIn(true);
      } else {
        setSignedIn(false);
      }

      return newAccessToken;
    } catch (error) {
      console.log("ERROR UPDATING TOKEN", error);
      setSignedIn(false);
    } finally {
      setLoader(false); // done loading either way
    }
  };

  return refresh;
}

export default useRefreshToken;
