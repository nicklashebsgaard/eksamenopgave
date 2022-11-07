// SCSS
import './adminlayout.scss';

// COMPOENTENS
import AdminFooter from "./../adminfooter/AdminFooter";
import AdminHeader from "./../adminheader/AdminHeader";
import AdminNavbar from "./../adminnavbar/AdminNavbar";

// useContext
import React, {useContext} from 'react';

// CONTEXT (adgang til login, logud - og om en bruger er logget ind)
import { LoginContext } from '../../../../context/LoginContext';

//  react-router-dom
import { Outlet, Navigate} from "react-router-dom";

const AdminLayout = () => {

  // Hent user fra LoginContext - hvis user = loggetind
  const {user} = useContext(LoginContext)
  console.log(user);

  if(!user) {
    return <Navigate to="/login" replace/>
  }

  return (

  <>

    <div className="Adminlayout">

      <AdminHeader />

      <div className="adminContainer">

        <AdminNavbar />
        {/*  Outlet Repæsenterer childs fra App.jsx */}
        <Outlet />

      </div>
      
      <AdminFooter />

    </div>
    
  </>

  );

};

export default AdminLayout;