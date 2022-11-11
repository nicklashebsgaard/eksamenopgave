// SCSS
import "./kontakt.scss";

// React useState, useEffect
import React, { useState, useEffect } from "react";

// API
import { contactInformation } from "./../helpers/apikald";

// ICONS
import { MdPlace } from "react-icons/md";
import { FaPhoneAlt } from "react-icons/fa";
import { MdEmail } from "react-icons/md";

// COMPONENTS
import ButtonToTop from "./../components/buttontotop/ButtonToTop";
import Loader from "./../components/loader/Loader";
import ErrorMessage from "./../components/errormessage/ErrorMessage";
import ContactForm from "./../components/contactform/ContactForm";

const Kontakt = () => {
  const [contactInfo, setContactInfo] = useState();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  // Opkald til API'et når component er loadet
  useEffect(() => {
    setLoading(true); // vis en loader mens api'et kaldes (og endnu ikke har svaret)

    contactInformation()
      .then((response) => {
        setContactInfo(response.data); // put data fra api'et i state
        setError(false);
      })
      .catch((err) => {
        setError(true); // nulstill en evt. tidligere fejl
        setContactInfo();
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <section className="Kontakt">
      {error && <ErrorMessage />}
      {loading && <Loader />}

      <div className="flexContainer">
        <div className="titleText">
          <h1>Kontakt</h1>
        </div>

        <div className="breadcrumbContainer">
          <ul className="breadcrumb">
            <li>Forsiden</li>

            <span className="material-symbols-outlined expand_more">
              expand_more
            </span>

            <li>Kontakt</li>
          </ul>
        </div>
      </div>

      <div className="wrapper">
        <div className="contaktInfomationBox">
          {contactInfo && (
            <>
              <div className="infoContainer">
                <div className="infoContentAddress">
                  <MdPlace style={{ color: "#ff6600ff" }} />
                  <p>{contactInfo.address}, </p>
                  <p>{contactInfo.zipcity}</p>
                </div>

                <div className="infoContentPhone">
                  <FaPhoneAlt style={{ color: "#ff6600ff" }} />
                  <p>{contactInfo.phone}</p>
                </div>

                <div className="infoContentEmail">
                  <MdEmail style={{ color: "#ff6600ff" }} />
                  <p>{contactInfo.email}</p>
                </div>
              </div>
            </>
          )}
        </div>

        <ContactForm />
        
            {/* Google map */}
        <div className="mapouter">
          <div className="gmap_canvas">
            <iframe
              title="myFrame"
              width="100%"
              height="100%"
              id="gmap_canvas"
              src="https://maps.google.com/maps?q=ydesvej%202&t=&z=13&ie=UTF8&iwloc=&output=embed"
              frameBorder="0"
              scrolling="no"
              marginHeight="0"
              marginWidth="0"
            ></iframe>
          </div>
        </div>
      </div>

      <ButtonToTop />
    </section>
  );
};

export default Kontakt;
