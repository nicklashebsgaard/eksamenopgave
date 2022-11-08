// SCSS
import "./voresteam.scss";

// API 
import { getTeam } from "../../helpers/apikald";

// React useState, useEffect
import { useState, useEffect } from "react";

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
            </div>

        <div className="contentContainer">

            {team && team.map(t =>

                <div className="size" key={t._id}>
                    
                    <div className="imageContainer">
                            <img src={"http://localhost:5333/images/team/" + t.image} alt="vores team" />
                        <div className="hoverCard" >
                            {t.name}
                            {t.title}
                        </div>
                    </div>

                </div>
            )}

        </div>
    
    </section>

  );

};

export default VoresTeam;