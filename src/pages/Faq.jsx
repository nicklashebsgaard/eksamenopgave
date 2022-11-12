// SCSS
import "./faq.scss";

// React useState, useEffect
import React, { useState, useEffect } from "react";

// LINK
import { Link } from "react-router-dom";

// API
import { getFaq } from "./../helpers/apikald";

// COMPONENTS
import Accordion from "../components/accordion/Accordion";
import Loader from "./../components/loader/Loader";
import ErrorMessage from "./../components/errormessage/ErrorMessage";
import ButtonToTop from "./../components/buttontotop/ButtonToTop";
const Faq = () => {

  const [faq, setFaq] = useState();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  // Opkald til API'et når component er loadet
  useEffect(() => {
    setLoading(true); // vis en loader mens api'et kaldes (og endnu ikke har svaret)

    getFaq()
      .then((response) => {
        setFaq(response.data); // put data fra api'et i state
        setError(false);
      })
      .catch((err) => {
        setError(true); // nulstill en evt. tidligere fejl
        setFaq();
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (

    <section className='Faq'>

      {error && <ErrorMessage />}
      {loading && <Loader />}

      <div className="flexContainer">
        <div className="titleText">
          <h1>FAQ</h1>
        </div>

        <div className="breadcrumbContainer">
          <ul className="breadcrumb">
            
          <Link to="/">
              <li>Forsiden</li>
            </Link>
            <span className="material-symbols-outlined expand_more">
              expand_more
            </span>
            <Link to="/faq">
              <li className="color">FAQ</li>
            </Link>

          </ul>
        </div>
      </div>

        {faq && faq.map((faq, i) => (

          <Accordion faq={faq} key={"faq" + i}/>

        ))}

    <ButtonToTop />
    
    </section>

  );

};

export default Faq;