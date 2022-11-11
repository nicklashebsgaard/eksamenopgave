// SCSS 
import "./adminnavbar.scss";

import { NavLink } from "react-router-dom";
import Logout from "../../../logout/Logout";

const AdminNavbar = () => {

  return (

    <nav className="AdminNavbar"> 

      <ul>
        <li>
          {/* End tilføjet for at ungå at home har active konstant */}
         <NavLink to="/admin" end>ADMIN Home</NavLink> 
        </li>
        <li>
         <NavLink to="adminnews">ADMIN News(Opret-Ret-Slet)</NavLink> 
        </li>
        <li>
         <NavLink to="adminaboutret">Ret "Om os"</NavLink> 
        </li>
        <li>
          {/* End tilføjet for at ungå at home har active konstant */}
         <NavLink to="/" end>Home (Public)</NavLink> 
        </li>
      </ul>

      <Logout />

    </nav>

  );

};

export default AdminNavbar;