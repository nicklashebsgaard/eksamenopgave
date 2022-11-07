// SCSS
import "./navbar.scss";

// react-router-dom
import { NavLink, Link } from "react-router-dom";

// useContext useState
import { useContext, useState } from "react";
import { LoginContext } from "./../../../context/LoginContext";

// COMPOENTS
import Logout from "../../logout/Logout";
import SearchInput from "../../searchinput/SearchInput";

const Navbar = () => {

  // user bruges til at finde ud af om logget ind eller ej
  const { user } = useContext(LoginContext);

  // State til at gemme kick på burger-button
  const [showMenu, setShowMenu] = useState(false);

  return (

    <nav className="Navbar"> 

      {/* BRAND */}
      <Link className="navbar-brand" to="/">(Brand)</Link>

      {/* BURGER */}
      <div className={showMenu === true ? "burger-button open" : "burger-button"} onClick={ () => setShowMenu(!showMenu)}>
        <span className="bar bar1"></span>
        <span className="bar bar2"></span>
        <span className="bar bar3"></span>
      </div>
    
      <div className={showMenu === true ? "navbar-container active" : "navbar-container"}>
        <ul>

          <li className="menuItem">
            {/* End tilføjet for at ungå at hom har active konstant */}
          <NavLink to="/" end>Home</NavLink> 
          </li>

          <li className="menuItem">
          <NavLink to="om-os">About</NavLink> 
          </li>

          <li className="menuItem">
          <NavLink to="kontakt">Contact</NavLink> 
          </li>
          <li className="menuItem">
          <NavLink to="tours">Tours (pageination)</NavLink> 
          </li>

          {
            !user && 
            <li className="menuItem">
              <NavLink to="login">Login</NavLink> 
            </li>
          }

          {
            user && 
            <>
            <li className="menuItem">
              <NavLink to="admin">Admin</NavLink> 
            </li>
            <div className="logoutContainer">
              <li className="noHover">
                <Logout />
              </li>
            </div>
            </>
          }

          <div className="searchContainer">
            <li>
              <SearchInput />
            </li>
          </div>
          
        </ul>
      </div>

    </nav>

  );

};

export default Navbar;