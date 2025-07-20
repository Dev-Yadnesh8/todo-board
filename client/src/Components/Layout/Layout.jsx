import { Outlet } from "react-router-dom";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import { Toaster } from "react-hot-toast";
import useStore from "../../store";

function Layout() {
  const {isSignedIn} = useStore();
  console.log(isSignedIn);
  
  return (
    <>
      <Header />
      <main>
        <Outlet />
        <Toaster position="top-right" />
      </main>
      {!isSignedIn && <Footer />}
    </>
  );
}

export default Layout;
