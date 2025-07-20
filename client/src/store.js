import { create } from "zustand";
import { devtools } from "zustand/middleware";

const store = (set) => ({
  loader: true,
  isSignedIn: false,
  user: null,

  setSignedIn: (status) => {
    set({ isSignedIn: status }, false, "setSignedIn");
  },

  setLoader: (value) => {
    set({ loader: value }, false, "setLoader");
  },

  setUser: (data) => {
    set({ user: data }, false, "setUser");
  },
});

const useStore = create(devtools(store));
export default useStore;
