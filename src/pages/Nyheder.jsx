// SCSS
import "./nyheder.scss";

// React useState, useEffect
import { useState, useEffect } from "react";

// API 
import { getNews } from "../helpers/apikald";

// COMPONENTS
import ErrorMessage from "../components/errormessage/ErrorMessage";
import Loader from "../components/loader/Loader";
import Pagination from "../components/pagination/Pagination";
import AmountPerPage from "../components/pagination/amountperpage/AmountPerPage";

const Nyheder = () => {

  const [nyheder, setNyheder] = useState();
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)

  const [currentPage, setCurrentPage] = useState(0) // vis side 1 = index 0
  const [itemsPerPage, setItemsPerPage] = useState(4) // Antal items pr side

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

    <section className='Nyheder'>

      {error && <ErrorMessage />}
      {loading && <Loader />}
      
      <div className="flexContainer">

        <div className="titleText">
          <h1>Nyheder</h1>
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

    {/* <div className="contentContainer">
        {nyheder &&
          nyheder.map((n) => (
            <div className="newsCard" key={n._id}>

              <div className="dateContainer">
                <div className="dateText">
                  {new Date (n.received).toLocaleDateString("da", {day: "numeric", month: "long"})}
                </div>
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

          )).reverse()}

      </div> */}

          {
            nyheder && 

            <div className="contentContainer">


                <div className="cardContainer">
                    {nyheder.slice(currentPage * itemsPerPage, (currentPage * itemsPerPage) + itemsPerPage).map( (n) => 

                  <div className="newsCard" key={n._id}>

                    <div className="dateContainer">
                      <div className="dateText">
                        {new Date (n.received).toLocaleDateString("da", {day: "numeric", month: "long"})}
                      </div>
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

                    )}

          {/* Pagination */}
          <AmountPerPage 
          options= { [2, 4, 5, 10] } 
          itemsPerPage={itemsPerPage}     // Send itemsPerPage med så den kan være defaultValue i select!
          setItemsPerPage={setItemsPerPage} 
          setCurrentPage={setCurrentPage} // så setCurrentPage nulsilles hvis der vælges nu itemsPerPage 
          />

          <Pagination 
          itemsPerPage={itemsPerPage}     // Fra state - hvor mange tours pr. side (fx 3)
          itemsLength={nyheder.length}      // Hvor mange tours er der i alt (fx 12)
          currentPage={currentPage}       // Fra state - den "side" vi er på lige nu
          setCurrentPage={setCurrentPage} // Fra state - mulighed for at ændre på den "side" vi er på lige nu = "skifte side"
          />

                </div>  

            </div>
        }

    </div>
    
    
    </section>

  );

};

export default Nyheder;