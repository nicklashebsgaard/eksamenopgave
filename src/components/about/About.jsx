// SCSS
import "./about.scss";

// React useState, useEffect
import { useState, useEffect } from "react";

// API
import { getOmos } from "./../../helpers/apikald";

// COMPONENTS
import ErrorMessage from "./../errormessage/ErrorMessage";
import Loader from "./../loader/Loader";
import Button from "../button/Button";

const About = () => {

    const [about, setAbout] = useState()
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)
  
      // Opkald til API'et når component er loadet
      useEffect(() => {
  
        setLoading(true) // vis en loader mens api'et kaldes (og endnu ikke har svaret)
    
        getOmos()
          .then((response) => {
            setAbout(response.data) // put data fra api'et i state
            setError(false) 
          })
          .catch((err) => {
            setError(true) // nulstill en evt. tidligere fejl
            setAbout()
          })
          .finally(() => {
            setLoading(false)
          })
    
      }, [])

  return (

    <section className="About">

      {error && <ErrorMessage />}
      {loading && <Loader />}

        <div className="contentContainer">
            {
                about && 
                <>
                    <h2>{about.title}</h2>
                    <p>{about.teaser}</p>
                </>
            }
            
            <button className="buttonLæsMere">LÆS MERE</button>
        </div>
        
    </section>

  );

};

export default About;