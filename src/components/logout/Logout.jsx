// SCSS
import "./logout.scss";

// Context hvor user gemmes (=logget ind) hvis match
import { LoginContext } from "../../context/LoginContext";
import { useContext } from "react";

// Button til logud
const Logout = () => {

  const { signOut } = useContext(LoginContext);

  return (

    <div className="Logout">

    <button title="Log ud" onClick={signOut}>
      <div className="buttonContent">
         <span className="material-symbols-outlined">
        logout
        </span>
        Log ud
      </div>
     
    </button>

    </div>

  );

};

export default Logout;