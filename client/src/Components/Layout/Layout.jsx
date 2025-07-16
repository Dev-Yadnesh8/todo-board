import { Outlet } from "react-router-dom";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import { Toaster } from "react-hot-toast";

function Layout() {
  return (
    <>
      <Header />
      <main>
        <Outlet />
        <Toaster position="top-right" />
      </main>
      <Footer />
    </>
  );
}

export default Layout;
