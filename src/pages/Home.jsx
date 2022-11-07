// SCSS
import "./home.scss";

// React useState, useEffect
import { useState, useEffect } from "react";

// API
import {getAllTours} from "./../helpers/apikald";

// COMPONENTS
import ErrorMessage from "./../components/errormessage/ErrorMessage";
import Loader from "../components/loader/Loader";
import Modal from "../components/modal/Modal";

const Home = () => {

  const [tours, setTours] = useState()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)

  // state til styring af vis/skjul modal - send ID med på det content som skal vises i modal
  // ... hvis state er top vises modal IKKE
  const [showModalContent, setShowModalContent] = useState()

  // Opkald til API'et når component er loadet
  useEffect(() => {

    setLoading(true) // vis en loader mens api'et kaldes (og endnu ikke har svaret)

    getAllTours()
      .then((response) => {
        setTours(response.data) // put data fra api'et i state
        setError(false) 
      })
      .catch((err) => {
        setError(true) // nulstill en evt. tidligere fejl
        setTours()
      })
      .finally(() => {
        setLoading(false)
      })

  }, [])

  return (

    <header className="Home">
      
      {error && <ErrorMessage />}
      {loading && <Loader />}
      {showModalContent && <Modal showModalContent={showModalContent} closeModal={setShowModalContent} />}

      {tours && tours
        /* .filter ( t => {
          return t.rating == 3 || t.rating == 5
        }) */
      .map(t =>

        <div className="card" key={t._id}>

          <h2>{t.title}</h2>
          <div>Antal stjerner: {t.rating}</div>

          <button className="openModal">
            <span onClick={() => setShowModalContent(t._id)}>Læs mere ...</span>
          </button>

         </div>

         )}
    {/* .reverse() */}
    </header>

  );

};

export default Home;