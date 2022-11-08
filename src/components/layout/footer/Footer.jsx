// SCSS
import "./footer.scss";

// react-router-dom
import { Link } from "react-router-dom";

// useState, useEffect
import { useState, useEffect } from "react";

// API 
import {contactInformation} from "./../../../helpers/apikald";

// Brand Logo
import Brand from "./../../../assets/image/logo.png";

// COMPONENTS
import Loader from "./../../loader/Loader";
import ErrorMessage from "./../../errormessage/ErrorMessage";

const Footer = () => {

  const [contactInfo, setContactInfo] = useState()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)

   // Opkald til API'et når component er loadet
   useEffect(() => {

    setLoading(true) // vis en loader mens api'et kaldes (og endnu ikke har svaret)

    contactInformation()
      .then((response) => {
        setContactInfo(response.data) // put data fra api'et i state
        setError(false) 
      })
      .catch((err) => {
        setError(true) // nulstill en evt. tidligere fejl
        setContactInfo()
      })
      .finally(() => {
        setLoading(false)
      })

  }, [])

  return (

    <footer className="Footer">
      <div className="footerContent">
      {error && <ErrorMessage />}
      {loading && <Loader />}
      

      {/* BRAND */}
      <div className="brandContainer">
          <Link className="navbarBrand" to="/"> <img src={Brand} alt="" /></Link>
      </div>

      <div className="textContainer">
        <p>Som medlem af elinstallatørernes
          Landsorganisation, ELFO, er vi tilsluttet
          et ankernævn og garantiordning.
        </p>
      </div>

      </div>

    
    
    </footer>

  );

};

export default Footer