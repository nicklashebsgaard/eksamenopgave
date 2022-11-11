// SCSS
import "./voresteam.scss";

// API 
import { getTeam } from "../../helpers/apikald";

// React useState, useEffect
import { useState, useEffect } from "react";

// ICON
import {FaFacebookF, FaTwitter, FaLinkedinIn, FaPinterestP} from "react-icons/fa";

// COMPONENTS
import ErrorMessage from "./../errormessage/ErrorMessage";
import Loader from "./../loader/Loader";

const VoresTeam = () => {

    const [team, setTeam] = useState()
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)

    // Opkald til API'et når component er loadet
    useEffect(() => {

        setLoading(true) // vis en loader mens api'et kaldes (og endnu ikke har svaret)
    
        getTeam()
          .then((response) => {
            setTeam(response.data) // put data fra api'et i state
            setError(false) 
          })
          .catch((err) => {
            setError(true) // nulstill en evt. tidligere fejl
            setTeam()
          })
          .finally(() => {
            setLoading(false)
          })
    
      }, [])

  return (

    <section className='VoresTeam'>

        {error && <ErrorMessage />}
        {loading && <Loader />}

            <div className="textContainer">
                <h2>Vores <span>team</span></h2>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit sed do eiusm tempor</p>
                <div className="CircleLineContainer">
                  <div id="line1"></div>
                  <div id="circle"></div>
                  <div id="line2"></div>
                </div>
            </div>

        <div className="contentContainer">

            {team && team.map((t, i) =>

                <div className="teamContainer" key={"team" + i}>
                    
                    <div className="imageContainer">
                        <div className="hoverCard" >
                            <div className="hoverContent">

                              <p>{t.name}</p>
                              <p>{t.title}</p>
                              <div className="iconcontianer">
                                <div className="iconFa">
                                <FaFacebookF />

                                </div>
                                <div className="iconFa">

                                <FaTwitter />
                                </div>
                                <div className="iconFa">

                                <FaLinkedinIn />
                                </div>
                                <div className="iconFa">

                                <FaPinterestP />
                                </div>
                              </div>
                            </div>
                        </div>
                      <div className="greyBg"></div>
                            <img src={"http://localhost:5333/images/team/" + t.image} alt="vores team" loading="lazy" />

                    </div>

                </div>
            )}

        </div>
    
    </section>

  );

};

export default VoresTeam;