// SCSS
import "./voresservice.scss";
import React from 'react'

// Icons
import {BsCircle} from "react-icons/bs";

// image
import ServiceWorker from "./../../assets/image/about/1.png";

// API 
import {getService} from "./../../helpers/apikald";

// React useState, useEffect
import { useState, useEffect } from "react";

// COMPONENTS
import ErrorMessage from "./../errormessage/ErrorMessage";
import Loader from "./../loader/Loader";

const VoresService = () => {

    const [service, setService] = useState()
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)

    // Opkald til API'et når component er loadet
    useEffect(() => {

        setLoading(true) // vis en loader mens api'et kaldes (og endnu ikke har svaret)
    
        getService()
          .then((response) => {
            setService(response.data) // put data fra api'et i state
            setError(false) 
          })
          .catch((err) => {
            setError(true) // nulstill en evt. tidligere fejl
            setService()
          })
          .finally(() => {
            setLoading(false)
          })
    
      }, [])

  return (

    <section className='VoresService'>

    {error && <ErrorMessage />}
    {loading && <Loader />}

    <div className="titleContainer">
    <h2>Vores <span>services</span></h2>

    <p>lorem ipsum dolor sit amet consectetur adipsicing elit sed do eiusm tempor</p>
    <BsCircle className="circle" style={{ color: "#FF6600ff"}}/>
    </div>

    <div className="imageContainer">
        <img src={ServiceWorker} alt="Service worker" />
    </div>
    
    {service && service.map(s =>

    <div className="serviceContent" key={s._id}>
    <h2>{s.title}</h2>
    <p>{s.teaser}</p>
 
    </div>
    )}

    </section>

  );

};

export default VoresService;