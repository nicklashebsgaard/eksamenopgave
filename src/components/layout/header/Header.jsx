// SCSS
import "./header.scss";

// react-router-dom
import { Link } from "react-router-dom";

// useState, useEffect
import { useState, useEffect } from "react";

// API 
import {contactInformation} from "./../../../helpers/apikald";

// Brand Logo
import Brand from "./../../../assets/image/logo.png";

// ICONS 
import {MdPlace} from "react-icons/md";
import {BiTime} from "react-icons/bi";
import {FaPhoneAlt} from "react-icons/fa";

// COMPONENTS
import Loader from "./../../loader/Loader";
import ErrorMessage from "./../../errormessage/ErrorMessage";


const Header = () => {

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

    <section className="Header">

      {error && <ErrorMessage />}
      {loading && <Loader />}
      
      <div className="contentContainer">
        {/* BRAND */}
        <div className="brandContainer">
          <Link className="navbarBrand" to="/"> <img src={Brand} alt="Logo" /></Link>
        </div>

        <div className="contaktInfomationBox">

          {
            contactInfo && (

              <>

                <div className="infoContainer">
                  
                  <div className="infoContent">
                    <MdPlace style={{color: '#ff6600ff'}}/>
                    <p>{contactInfo.address}, </p>
                    <p>{contactInfo.zipcity}</p>
                  </div>

                  <div className="infoContent">
                    <BiTime style={{color: '#ff6600ff'}}/>
                    <p>{contactInfo.openinghours}</p>
                  </div>

                  <div className="infoContent">
                    <FaPhoneAlt style={{color: '#ff6600ff'}}/>
                    <p>{contactInfo.phone}</p>
                  </div>
                </div>
              
              </>
            )
          }
        </div>
      </div>
      
      
      
    </section>

  );

};

export default Header;