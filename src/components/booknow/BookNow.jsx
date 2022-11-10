// SCSS
import "./booknow.scss";

// API 
import { postBook } from "./../../helpers/apikald";

// React useState, useEffect
import { useState, useEffect } from "react";

// COMPONENTS
import ErrorMessage from "./../errormessage/ErrorMessage";
import Loader from "./../loader/Loader";

const BookNow = () => {

    const [bookingService, setBookingService] = useState()
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)

      const handleSubmit = (e) => {

        e.preventDefault() // VIGTIG: Forhindrer reload/nulstille af siden
    
        // // Sende formularen
    
        // // Opkald til API'et når component er loadet
        setLoading(true) // vis en loader mens api'et kaldes (og endnu ikke har svaret)
    
        let fData = new FormData(e.target) // Input formularens indhold - e.target - i from-data-objekt
        
        // // Tilføj html-tesk til formdata (hentes fra state til hhv. bookingService)
        fData.append('bookingService', bookingService); // html-tekst til content i booknow 
    
        postBook(fData)
        .then((response) => {
          console.log(response.data);
            e.target.reset()
        })
        .catch((err) => {
          setError(true)
            console.log(err); // nulstill en evt. tidligere fejl
        })
        .finally(() => {
            setLoading(false)
            window.scroll(0, 0) // scroll til top af siden
        })
        
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

export default BookNow;