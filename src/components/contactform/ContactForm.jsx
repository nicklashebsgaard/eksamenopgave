// SCSS
import "./contactform.scss";

// React
import React from "react";

// API


// COMPONENTS

const ContactForm = () => {

    /* const [message, setMessage] = useState();
    const [error, setError] = useState(false)
    const [loading, setLoading] = useState(false)

    const handleSubmit = (e) => {

        e.preventDefault() // VIGTIG: Forhindrer reload/nulstille af siden
    
        // Sende formularen
    
        // Opkald til API'et når component er loadet
        setLoading(true) // vis en loader mens api'et kaldes (og endnu ikke har svaret)
    
        const postMessage = new FormData(e.target); // Input formularens indhold - e.target - i from-data-objekt
    
        sendMessage(postMessage)
        .then((response) => {
            console.log(response.data);  // put data fra api'et i state
            setMessage("Beskeden er nu sendt af sted")
            setError()
        })
        .catch((err) => {
            setError(true)
            setMessage()
            console.log(err); // nulstill en evt. tidligere fejl
        })
        .finally(() => {
            setLoading(false)
        })
        
      } */

  return (

    <div className="ContactForm">

        <div className="formContainer">

            <form /* onSubmit={handleSubmit} */>
                <div>
                <label htmlFor="inpNavn">Navn</label>
                <input type="text" name="navn" id="inpNavn" placeholder="Navn" />
                </div>
                
                <div>
                <label htmlFor="inpFirma">Firma/Organisation</label>
                <input type="text" name="firma" id="inpFirma" placeholder="Firma/Organisation" />
                </div>

                <div>
                <label htmlFor="inpEmail">Email Adresse</label>
                <input type="email" name="email" id="inpEmail" placeholder="Email Adresse" />
                </div>

                <div>
                <label htmlFor="inpTelefon">Telefon</label>
                <input type="number" name="phone" id="inpTelefon" placeholder="Telefon" />

                </div>
                <label htmlFor="inpMessage">Skriv din besked til os her</label>
                <textarea type="message" name="message" placeholder="Besked" />
                
                <div className="buttonContainer">
                <button className="send" type="submit">Send</button> 
                </div>
            </form>
        
        </div>

    </div>

  );

};

export default ContactForm;