// SCSS
import "./sidstenyt.scss";

// API
import { getNews } from "../../helpers/apikald";

// React useState, useEffect
import { useState, useEffect } from "react";

// Link til de andre sider
import { Link } from "react-router-dom";

// COMPONENTS
import ErrorMessage from "./../errormessage/ErrorMessage";
import Loader from "./../loader/Loader";

const SidsteNyt = () => {

  const [nyheder, setNyheder] = useState();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  // Opkald til API'et når component er loadet
  useEffect(() => {
    setLoading(true); // vis en loader mens api'et kaldes (og endnu ikke har svaret)

    getNews()
      .then((response) => {
        setNyheder(response.data); // put data fra api'et i state
        setError(false);
      })
      .catch((err) => {
        setError(true); // nulstill en evt. tidligere fejl
        setNyheder();
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const klipTekst = (txt, minAntalKarakterer) => {
    txt = txt.replace(/<\/?[^>]+(>|$)/g, ""); // fjern alle html-tags med regex (regular expressions)
    txt = txt.substring(0, txt.indexOf(" ", minAntalKarakterer)); // udtræk den bid af teksten fra plads 0 til "maxAntalKarakterer" men ved et mellemrum
    return txt; // returner resultatet
  };

  return (

    <section className="SidsteNyt">

      {error && <ErrorMessage />}
      {loading && <Loader />}

      <div className="titleContainer">
        <h2>
          Sidste <span>nyt</span>
        </h2>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit sed do eiusm
          tempor
        </p>
      </div>

      <div className="contentContainer">
        {nyheder &&
          nyheder.slice(0, 3).map((n) => (
            <div className="newsCard" key={n._id}>

              <div className="dateContainer">
                {new Date (n.received).toLocaleDateString("da", {day: "numeric", month: "long"})}
              </div>

              <div className="imageContainer">
                <img
                  src={"http://localhost:5333/images/news/" + n.image}
                  alt="News"
                  loading="lazy"
                />
              </div>

              <div className="textContainer">
                <h3>{n.title}</h3>
                <p>{klipTekst(n.content, 100)}...</p>
              </div>

            </div>

          ))}

      </div>
            
            <div className="buttonContainer">
              <Link to="nyheder">
                <button className="buttonStyle">FLERE NYHEDER ...</button>
              </Link>
            </div>

    </section>

  );

};

export default SidsteNyt;
