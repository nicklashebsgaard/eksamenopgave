// SCSS
import "./nyheder.scss";

// React useState, useEffect
import { useState, useEffect } from "react";

// LINK
import { Link } from "react-router-dom";

// API
import { getNews } from "../helpers/apikald";

// ICON
import {MdDateRange} from "react-icons/md"

// COMPONENTS
import ErrorMessage from "../components/errormessage/ErrorMessage";
import Loader from "../components/loader/Loader";
import Pagination from "../components/pagination/Pagination";
import AmountPerPage from "../components/pagination/amountperpage/AmountPerPage";
import ButtonToTop from "../components/buttontotop/ButtonToTop";

const Nyheder = () => {

  const [nyheder, setNyheder] = useState();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const [currentPage, setCurrentPage] = useState(0); // vis side 1 = index 0
  const [itemsPerPage, setItemsPerPage] = useState(4); // Antal items pr side

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

  return (

    <section className="Nyheder">

      {error && <ErrorMessage />}
      {loading && <Loader />}

      <div className="flexContainer">
        <div className="titleText">
          <h1>Nyheder</h1>
        </div>

        <div className="breadcrumbContainer">
          <ul className="breadcrumb">
            
          <Link to="/">
              <li>Forsiden</li>
            </Link>
            <span className="material-symbols-outlined expand_more">
              expand_more
            </span>
            <Link to="/nyheder">
              <li className="color">Nyheder</li>
            </Link>

          </ul>
        </div>
      </div>

      <div className="wrapper">

        {nyheder && (

          

          <div className="cardContainer">

            {nyheder.map((n) => (

                <div className="newsCard" key={n._id}>
                  <div className="dateContainer">
                    <div className="dateText">
                      {new Date(n.received).toLocaleDateString("da", {
                        day: "numeric",
                        month: "short",
                      })}
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
                    <p>{n.content.slice(0, 100)}...</p>
                  </div>
                </div>

              )).reverse().slice(currentPage * itemsPerPage,currentPage * itemsPerPage + itemsPerPage)}


          </div>

        )}

            <div className="paginationContainer">
                      {nyheder && 
                            <>
              {/* Pagination */}
              <AmountPerPage
                options={[2, 4, 6, 10]}
                itemsPerPage={itemsPerPage} // Send itemsPerPage med så den kan være defaultValue i select!
                setItemsPerPage={setItemsPerPage}
                setCurrentPage={setCurrentPage} // så setCurrentPage nulsilles hvis der vælges nu itemsPerPage
              />

              <Pagination
                itemsPerPage={itemsPerPage} // Fra state - hvor mange nyheder pr. side (fx 3)
                itemsLength={nyheder.length} // Hvor mange nyheder er der i alt (fx 12)
                currentPage={currentPage} // Fra state - den "side" vi er på lige nu
                setCurrentPage={setCurrentPage} // Fra state - mulighed for at ændre på den "side" vi er på lige nu = "skifte side"
              />
                </>
                      }

            </div>
          
            <div className="arkivContainer">

              <h3>Arkiv</h3>

              {nyheder && nyheder.map((n,i) => 

                <div className="cardArkiv" key={"arkiv" + i}>

                  <div className="imageContainerArkiv">
                    <img
                      src={"http://localhost:5333/images/news/" + n.image}
                      alt="News"
                      loading="lazy"
                    />
                  </div>

                  <div className="titleDateContainer">

                    <div className="titleContainerArkiv">
                      <h3>{n.title}</h3>
                    </div>

                    <div className="dateIconContainerArkiv">
                      <div className="iconContainer">
                      <MdDateRange />
                      </div>
                      {new Date(n.received).toLocaleDateString("da", {
                        day: "numeric",
                        month: "short",
                        year: "numeric"
                      })}
                    </div>

                  </div>

                </div>
                
              ).reverse().slice(4,8)}
            </div>

      </div>
          <ButtonToTop />
    </section>

  );

};

export default Nyheder;
