// SCSS
import "./voresservice.scss";

// image
import ServiceWorker from "./../../assets/image/about/1.png";

// LINK
import { Link } from "react-router-dom";

// API
import { getService } from "./../../helpers/apikald";

// React useState, useEffect
import { useState, useEffect } from "react";

// COMPONENTS
import ErrorMessage from "./../errormessage/ErrorMessage";
import Loader from "./../loader/Loader";
import BookNow from "../booknow/BookNow";

const VoresService = () => {
  const [service, setService] = useState();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  // Opkald til API'et når component er loadet
  useEffect(() => {
    setLoading(true); // vis en loader mens api'et kaldes (og endnu ikke har svaret)

    getService()
      .then((response) => {
        setService(response.data); // put data fra api'et i state
        setError(false);
      })
      .catch((err) => {
        setError(true); // nulstill en evt. tidligere fejl
        setService();
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (

    <section className="VoresService">

      {error && <ErrorMessage />}
      {loading && <Loader />}

      <div className="wrapper">

        <div className="titleContainer">
          <h2>
            Vores <span>services</span>
          </h2>
          <p>
            lorem ipsum dolor sit amet consectetur adipsicing elit sed do eiusm
            tempor
          </p>
          <div className="CircleLineContainer">
            <div id="line1"></div>
            <div id="circle"></div>
            <div id="line2"></div>
          </div>
          
        </div>

        <div className="imageContainer">
          <img src={ServiceWorker} alt="Service worker" loading="lazy" />
        </div>

        <div className="subGrid">

        {service &&
          service.map((s, i) => (
            <div className="contentContainer" key={"services" + i}>
              <span className={s.icon}></span>
              <div className="subTitle">
                <h2>
                  <Link to="service">
                    {s.title}
                  </Link>
                </h2>
                <p>{s.teaser}</p>
              </div>
            </div>
          ))}
        </div>
          
      </div>
      <BookNow />
      
    </section>

  );

};

export default VoresService;
