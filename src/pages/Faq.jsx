// SCSS
import "./faq.scss";

// React useState, useEffect
import React, { useState, useEffect } from "react";

// API
import { getFaq } from "./../helpers/apikald";

// COMPONENTS
import Accordion from "../components/accordion/Accordion";
import Loader from "./../components/loader/Loader";
import ErrorMessage from "./../components/errormessage/ErrorMessage";

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
          <h1>Service</h1>
        </div>

        <div className="breadcrumbContainer">
          <ul className="breadcrumb">
            
            <li>Forsiden</li>

            <span className="material-symbols-outlined expand_more">
              expand_more
            </span>

            <li>FAQ</li>

          </ul>
        </div>
      </div>

        {faq && faq.map((faq) => (

          <Accordion faq={faq} />
        ))}
    
    </section>

  );

};

export default Faq;