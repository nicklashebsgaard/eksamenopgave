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

        {error && <ErrorMessage />}
        {loading && <Loader />}

      <div className="footerContent">
        
        <div className="gridContainer">
        
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

      <div className="linksContainer">
        <h4>Link</h4>
        <ul>
          <div className="listItemContainer">
            <li>
              <span className="material-symbols-outlined expand_more">
              expand_more
              </span> FAQ
            </li>
          </div>
          <div className="listItemContainer">
            <li>
              <span className="material-symbols-outlined expand_more">
              expand_more
              </span> Om os
            </li>
          </div>
          <div className="listItemContainer">
            <li>
              <span className="material-symbols-outlined expand_more">
              expand_more
              </span> Kontakt os
            </li>
          </div>
          <div className="listItemContainer">
            <li>
              <span className="material-symbols-outlined expand_more">
              expand_more
              </span> Services
            </li>
          </div>
        </ul>
      </div>

      {
        contactInfo && (
          <>
            <div className="contactContainer">
              <h4>Kontakt os</h4>
              <p><span>Adresse:</span> {contactInfo.address}, {contactInfo.zipcity}</p>
              <p><span>Telefon:</span> {contactInfo.phone}</p>
              <p><span>Email:</span> {contactInfo.email}</p>
            </div>
          </>
        )
      }
      <div className="newsLetter">
        <h4>Nyhedsbrev</h4>
        <p>Tilmeld dig vores nyhedsbrev her</p>

        <form>
          <div className="inputContainer">
            <input type="email" placeholder="Din Email" required/>
          </div>

          <button className="buttonStyle" type="submit">tilmeld</button>
        </form>
      </div>

      </div>

      
      <div className="copyRight">
        <p><span>Strøm</span> &copy; 2017 All Right Reserved</p>
      </div>

      <div className="iconContainer">
        {contactInfo && contactInfo.some.map (c =>

          <div className="icon" key={c._id}>
            <span>{c.icon}</span>
          </div>
         )}
      </div>
    
    </footer>

  );

};

export default Footer;