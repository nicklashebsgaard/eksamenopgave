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
import About from "../components/about/About";
import VoresKunder from "../components/voreskunder/VoresKunder";
import VoresTeam from "../components/voresteam/VoresTeam";

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

    <>

    <section className="Omos">

      {error && <ErrorMessage />}
      {loading && <Loader />}
      
      <div className="flexContainer">

        <div className="titleText">
          <h1>Om os</h1>
        </div>

        <div className="breadcrumbContainer">
          <ul class="breadcrumb">
            <li>Forsiden</li>
            <span className="material-symbols-outlined expand_more">
              expand_more
            </span>
            <li>Om os</li>
          </ul>
        </div>

      </div>

      <div className="wrapper">
      <div className="contentContainer">
            {
                omOs && 
                <>
                    <h2>{omOs.title}</h2>
                    <p>{omOs.teaser}</p>
                </>
            }
      </div>

      {
        omOs && 

        <>
          <article>{Parser(omOs.content)}</article>
        
        </>
        
      }
      </div>

    </section>

    <VoresKunder />

    <VoresTeam />

    </>

  );

};

export default Omos;