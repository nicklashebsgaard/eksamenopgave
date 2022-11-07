// SCSS
import "./login.scss";

// React
import React, { useContext, useState } from "react";

// Context hvor user gemmes (=logget ind) hvis match
import { LoginContext } from "../../context/LoginContext";

// react-router-dom
import { Navigate } from "react-router-dom";

const Login = () => {

  // Login-metode fra context + user som rummer en bruger hvis logget ind
  const { signIn, user } = useContext(LoginContext);

  // State til login fra formular
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();

  // state til eye icon i input password
  const [passwordShown, setPasswordShown] = useState(false);
  
  const togglePassword = () => {
    
    setPasswordShown(!passwordShown);
    
  };
  
  // hvis man allerde er logget ind - sendes user til admin
   if(user) { 
    return <Navigate to="/admin" replace/>
  }

  // Håndterer login - med inhold fra login-form
  const handleLogin = (e) => {

    e.preventDefault();
    signIn(username, password);

  };

  return (

    <div className="Login">

      {
        user && <h2>Bruger er logget ind: {user}</h2>
      }

      <div className="loginCardContainer">

        <form onSubmit={handleLogin}>

          <h2>Log ind</h2>

          <div className="inputContainer">
            <label htmlFor="inpBruger">Brugernavn:</label>
            <input
              type="text"
              onChange={(e) => setUsername(e.target.value)}
              id="inpBruger"
              placeholder="Brugernavn"
            />
          </div>

          <div className="inputContainer password-container">
            <label htmlFor="password">Adgangskode:</label>
            <input
              type={passwordShown ? "text" : "password"}
              onChange={(e) => setPassword(e.target.value)}
              id="password"
              placeholder="Adgangskode"
            />
            <span onClick={togglePassword} id="show-password" className="material-symbols-outlined visibility">
              {passwordShown ? "visibility_off" : "visibility"}
            </span>
          </div>

          <div className="cardButton">
            <button title="Log ind">
              <div className="buttonItem">
                Login
                <span className="material-symbols-outlined account_circle">
                  account_circle
                </span>
              </div>
            </button>
          </div>

        </form>

      </div>

    </div>

  );

};

export default Login;
