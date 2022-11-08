// SCSS
import "./forside.scss";

// React useState, useEffect
import { useState, useEffect } from "react";

// API
import { forsideSlider } from "../helpers/apikald";

// COMPONENTS
import ErrorMessage from "../components/errormessage/ErrorMessage";
import Loader from "../components/loader/Loader";
import ButtonToTop from "./../components/buttontotop/ButtonToTop";
import Slider from "../components/slider/Slider";
import About from "../components/about/About";
import NeedHelp from "../components/needhelp/NeedHelp";
import VoresService from "../components/voresservice/VoresService";
import VoresKunder from "../components/voreskunder/VoresKunder";
import VoresTeam from "../components/voresteam/VoresTeam";

const Forside = () => {

  const [sliderData, setSliderData] = useState()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)

    // Opkald til API'et når component er loadet
    useEffect(() => {

      setLoading(true) // vis en loader mens api'et kaldes (og endnu ikke har svaret)
  
      forsideSlider()
        .then((response) => {
          setSliderData(response.data) // put data fra api'et i state
          setError(false) 
        })
        .catch((err) => {
          setError(true) // nulstill en evt. tidligere fejl
          setSliderData()
        })
        .finally(() => {
          setLoading(false)
        })
  
    }, [])

  return (

  <>

    <header className="Forside">
      
      {error && <ErrorMessage />}
      {loading && <Loader />}

      { sliderData && 

          <Slider 
        sliderImages={sliderData} 
        imagePath="http://localhost:5333/images/slider/"
        />
      
      }

      <ButtonToTop />
    </header>
    
      <About />
      <NeedHelp />
      <VoresService />
      <VoresKunder />
      <VoresTeam />
  </> 

  );

};

export default Forside;