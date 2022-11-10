import "./accordion.scss";

// useState, useEffect
import { useState, useEffect } from "react";

// API 
import { getFaq } from "../../helpers/apikald";

// COMPONENTS
import Loader from "./../loader/Loader";
import ErrorMessage from "./../errormessage/ErrorMessage";

const Accordion = () => {

  // State til om den skal expand eller modsat
  const [isActive, setIsActive] = useState(false);

  const [faq, setFaq] = useState()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)

  // Opkald til API'et når component er loadet
  useEffect(() => {

    setLoading(true) // vis en loader mens api'et kaldes (og endnu ikke har svaret)

    getFaq()
      .then((response) => {
        setFaq(response.data) // put data fra api'et i state
        setError(false) 
      })
      .catch((err) => {
        setError(true) // nulstill en evt. tidligere fejl
        setFaq()
      })
      .finally(() => {
        setLoading(false)
      })

  }, [])

  return (
      <div className="Accordion">
        {error && <ErrorMessage />}
        {loading && <Loader />}
        
        <div className="accordionContainer">
          
            <div
            className="accordionTitle"
            onClick={() => setIsActive(!isActive)}
            >
              {/* <div>{faq.question}</div> */}
              <span className="material-symbols-outlined">{isActive ? "expand_less" : "expand_more"}</span>
            </div>

              {isActive && 
                <div className="accordionContent">
                {/* <p>{faq.answer}</p> */}
                </div>}
            

        </div>
        
      </div>
  );
};

export default Accordion;
