// SCSS
import "./omos.scss";

// React useState, useEffect
import { useState, useEffect } from "react";

import Parser from "html-react-parser";

// API 
import { getOmos } from "../helpers/apikald";

// COMPONENTS
import ErrorMessage from "../components/errormessage/ErrorMessage";
import Loader from "../components/loader/Loader";

const Omos  = () => {

  const [omOs, setOmOs] = useState()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)

  // Opkald til API'et når component er loadet
  useEffect(() => {

    setLoading(true) // vis en loader mens api'et kaldes (og endnu ikke har svaret)

    getOmos()
      .then((response) => {
        setOmOs(response.data) // put data fra api'et i state
        setError(false) 
      })
      .catch((err) => {
        setError(true) // nulstill en evt. tidligere fejl
        setOmOs()
      })
      .finally(() => {
        setLoading(false)
      })

  }, [])

  return (

    <section className="Omos">

      {error && <ErrorMessage />}
      {loading && <Loader />}
      
      <h1>Om os</h1>

      {
        omOs && 

        <>
          <article>{Parser(omOs.content)}</article>
        
        </>
        
      }
      
    
    
    
    
    </section>

  );

};

export default Omos;