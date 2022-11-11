// SCSS
import "./navbar.scss";

// react-router-dom
import { NavLink } from "react-router-dom";

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

      {/* BURGER */}
      <div className={showMenu === true ? "burger-button open" : "burger-button"} onClick={ () => setShowMenu(!showMenu)}>
        <span className="bar bar1"></span>
        <span className="bar bar2"></span>
        <span className="bar bar3"></span>
      </div>
    
      <div className={showMenu === true ? "navbar-container active" : "navbar-container"}>
      {/* <div className="navbar-container active"> */}
        <ul>
          
          <li className="menuItem">
            {/* End tilføjet for at ungå at hom har active konstant */}
            <NavLink to="/" end>FORSIDE</NavLink> 
          </li>

          <li className="menuItem">
            <NavLink to="om-os">OM OS</NavLink> 
          </li>

          <li className="menuItem">
            <NavLink to="service">SERVICE</NavLink> 
          </li>

          <li className="menuItem">
            <NavLink to="faq">FAQ</NavLink> 
          </li>

          <li className="menuItem">
            <NavLink to="nyheder">NYHEDER</NavLink> 
          </li>

          <li className="menuItem">
            <NavLink to="kontakt">KONTAKT OS</NavLink> 
          </li>

          {/* {
            !user && 
            <li className="menuItem">
              <NavLink to="login">Login</NavLink> 
            </li>
          } */}

          {
            user && 
            <>
            <li className="menuItem">
              <NavLink to="admin">Admin</NavLink> 
            </li>
            
              <li className="noHover logoutContainer">
                <Logout />
              </li>
            </>
          }

            <li className="searchContainer">
              <SearchInput />
            </li>
          
        </ul>
      </div>

    </nav>

  );

};

export default Navbar;