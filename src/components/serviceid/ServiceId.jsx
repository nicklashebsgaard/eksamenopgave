// SCSS
import "./serviceid.scss";

// API
import { getVoresService, getVoresServiceID } from "../../helpers/apikald";

// Parser
import Parser from "html-react-parser";

// React useState, useEffect
import { useState, useEffect } from "react";

// COMPONENTS
import Loader from "../loader/Loader";
import ErrorMessage from "../errormessage/ErrorMessage";

const ServiceId = ({ data }) => {
  const [serviceData, setServiceData] = useState();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  // Opkald til API'et når component er loadet
  useEffect(() => {
    setLoading(true); // vis en loader mens api'et kaldes (og endnu ikke har svaret)
    if (data === undefined) {
      getVoresService()
        .then((response) => {
          setServiceData(response.data[0]); // put data fra api'et i state
          setError(false);
        })
        .catch((err) => {
          setError(true); // nulstill en evt. tidligere fejl
          setServiceData();
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      getVoresServiceID(data)
        .then((response) => {
          setServiceData(response.data); // put data fra api'et i state
          setError(false);
        })
        .catch((err) => {
          setError(true); // nulstill en evt. tidligere fejl
          setServiceData();
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [data]);

  return (

    <div className="ServiceId">

      {error && <ErrorMessage />}
      {loading && <Loader />}

      {serviceData && (
        <div className="serviceCard">
          <div className="imageContainer">
            <img
              src={"http://localhost:5333/images/service/" + serviceData.image}
              alt=""
            />
          </div>

          <div className="textContainer">
            <div className="titleText">{serviceData.title}</div>
            <div className="tesserText">{serviceData.teaser}</div>
            <div className="contentText">{Parser(serviceData.content)}</div>
          </div>
        </div>

      )}

    </div>

  );
  
};

export default ServiceId;
