// COMPONENTS
import Header from "./header/Header";
import Navbar from "./navbar/Navbar";
import Footer from "./footer/Footer";

// Outlet react-router-dom
import { Outlet } from "react-router-dom";

const Layout = () => {

  return (

    <div className="Layout">

      <Header />
      <Navbar />

      <Outlet />

      <Footer />
    </div>

  );

};

export default Layout;
