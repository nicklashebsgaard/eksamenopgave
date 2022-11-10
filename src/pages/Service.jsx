// SCSS
import "./service.scss";

// React useState, useEffect
import { useState, useEffect } from "react";

// API 
import { getVoresService } from "../helpers/apikald";

// COMPONENTS
import ErrorMessage from "../components/errormessage/ErrorMessage";
import Loader from "../components/loader/Loader";
import ServiceId from "../components/serviceid/ServiceId";

const Service = () => {

  const [ServiceDataId, setServiceDataId] = useState();

  const [service, setService] = useState();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  // Opkald til API'et når component er loadet
  useEffect(() => {
    setLoading(true); // vis en loader mens api'et kaldes (og endnu ikke har svaret)

    getVoresService()
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

    <section className="Service">
        
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

            <li>Nyheder</li>

          </ul>
        </div>
      </div>

      <div className="wrapper">


      {
        service && service.map((s, i) =>
        <div className="serviceList" key={"servicelist" + i}>
          <button onClick={() => setServiceDataId(s._id)}>
            {s.title}
          </button>
        </div>
      )}

      <ServiceId data={ServiceDataId} />

      </div>
        
    </section>

  );

};

export default Service;