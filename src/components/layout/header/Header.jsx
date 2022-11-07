// SCSS
import "./header.scss";

// react-router-dom
import { Link } from "react-router-dom";

// Brand Logo
import Brand from "./../../../assets/image/logo.png";

const Header = () => {

  return (

    <section className="Header">
      
      <div className="contentContainer">
        {/* BRAND */}
        <div className="brandContainer">
          <Link className="navbarBrand" to="/"> <img src={Brand} alt="" /></Link>
        </div>
      </div>
      
      
      
    </section>

  );

};

export default Header;