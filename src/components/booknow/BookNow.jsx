// SCSS
import "./booknow.scss";

// API 
import { getBook } from "./../../helpers/apikald";

// React useState, useEffect
import { useState, useEffect } from "react";

// COMPONENTS
import ErrorMessage from "./../errormessage/ErrorMessage";
import Loader from "./../loader/Loader";

const BookNow = () => {

    const [bookingService, setBookingService] = useState()
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)

    // Opkald til API'et når component er loadet
    useEffect(() => {

        setLoading(true) // vis en loader mens api'et kaldes (og endnu ikke har svaret)
    
        getBook()
          .then((response) => {
            setBookingService(response.data) // put data fra api'et i state
            setError(false) 
          })
          .catch((err) => {
            setError(true) // nulstill en evt. tidligere fejl
            setBookingService()
          })
          .finally(() => {
            setLoading(false)
          })
    
      }, [])

      const handleSubmit = (e) => {

        e.preventDefault() // VIGTIG: Forhindrer reload/nulstille af siden
    
        // // Sende formularen
    
        // // Opkald til API'et når component er loadet
        setLoading(true) // vis en loader mens api'et kaldes (og endnu ikke har svaret)
    
        let fData = new FormData(e.target) // Input formularens indhold - e.target - i from-data-objekt
    
        // // Tilføj html-tesk fra Quill til formdata (hentes fra state til hhv. content og roomtype)
        // fData.append('content', content); // html-tekst til content i tour - fra Quill
        // fData.append('roomtype', roomtype); // html-tekst til roomtype i tour - fra Quill
    
        // editTour(fData, ID)
        // .then((response) => {
        //     console.log(response.data);  // put data fra api'et i state
        //     setMessage("Der er rette!")
        // })
        // .catch((err) => {
        //     console.log(err); // nulstill en evt. tidligere fejl
        // })
        // .finally(() => {
        //     setLoading(false)
        //     window.scroll(0, 0) // scroll til top af siden
        // })
        
      }

  return (

    <section className="BookNow">
        {error && <ErrorMessage />}
        {loading && <Loader />}

        <div className="wrapper">

        <div className="titleText">
            <h2><span>Book</span> service nu</h2>
        </div>

        <form onSubmit={handleSubmit}>
        
            <div className="inputContainer">
            <input type="text" name="name" placeholder="Dit navn" required/>            
            </div>

            <div className="inputContainer">
                <input type="email" name="email" placeholder="Din Email" required/>
            </div>

            <div className="inputContainer">
                <input type="nummer" name="phone" placeholder="Telefon nr." required/>
            </div>

            <button className="buttonStyle" type="submit">SEND</button>

        </form>



        </div>

        





    </section>

  );

};

export default BookNow