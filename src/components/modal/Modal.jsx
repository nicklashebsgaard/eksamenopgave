// SCSS
import "./modal.scss";

// React
import React, { useEffect, useState } from "react";

// API
import { getToursByID } from "./../../helpers/apikald";
import Loader from "../loader/Loader";
import ErrorMessage from "../errormessage/ErrorMessage";

// html-react-parser
import Parser from "html-react-parser";

const Modal = (props) => {

  let closeModal = props.closeModal;
  let contentId = props.showModalContent;

  const [tour, setTour] = useState();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {

    setLoading(true);

    getToursByID(contentId)
      .then((respone) => {
        setTour(respone.data);
        setError(false);
      })
      .catch((err) => {
        setError(true);
        setTour();
      })
      .finally(() => {
        setLoading(false);
      });

  }, []);

  // lyt efter klik på ESC - og hvis ... så kald message-state i parent og tøm dem
  document.addEventListener("keydown", (e) => {

    if (e.key === "Escape") {

      props.closeModal();
    }

  });

  return (
    
    <>

      <div className="Modal">

        <div className="modalContent">

          <span onClick={() => props.closeModal()} className="close">
            <span className="material-symbols-outlined close-modal">close</span>
          </span>

          {loading && <Loader />}
          {error && <ErrorMessage />}

          {tour && (
            <div className="contentContainer">
              <h2>{tour.title}</h2>
              <i>{tour.teaser}</i>
              <div className="tourContent">{Parser(tour.content)}</div>

              {[...Array(tour.rating)].map((s, k) => (
                <span key={k}>&#9733;</span>
              ))}

              <div className="imageContainer">

                {tour.gallery.map((g, i) => (

                  <div className="imageContent" key={"g" + i}>
                    <img
                      src={"http://localhost:5099/images/tours/" + g}
                      alt="foto"
                      width="200"
                    />

                  </div>

                ))}

              </div>

            </div>

          )}

        </div>

      </div>

    </>

  );

};

export default Modal;
