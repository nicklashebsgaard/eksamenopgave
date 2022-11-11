// SCSS
import "./contactform.scss";

// React
import React from "react";

// API

// COMPONENTS

const ContactForm = () => {

    // const [message, setMessage] = useState();
    // const [error, setError] = useState(false)
    // const [loading, setLoading] = useState(false)

    // const handleSubmit = (e) => {

    //     e.preventDefault() // VIGTIG: Forhindrer reload/nulstille af siden
    
    //     // Sende formularen
    
    //     // Opkald til API'et når component er loadet
    //     setLoading(true) // vis en loader mens api'et kaldes (og endnu ikke har svaret)
    
    //     const postMessage = new FormData(e.target); // Input formularens indhold - e.target - i from-data-objekt
    
    //     sendMessage(postMessage)
    //     .then((response) => {
    //         console.log(response.data);  // put data fra api'et i state
    //         setMessage("Beskeden er nu sendt af sted")
    //         setError()
    //     })
    //     .catch((err) => {
    //         setError(true)
    //         setMessage()
    //         console.log(err); // nulstill en evt. tidligere fejl
    //     })
    //     .finally(() => {
    //         setLoading(false)
    //     })
        
    //   }

  return (

    <div className="ContactForm">

      <div className="textContainer">

        <h2>Kontakt os</h2>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Tenetur
          praesentium minus quos tempore, provident et asperiores sequi repellat
          esse natus.
        </p>

      </div>

      <div className="formContainer">
{/* onSubmit={handleSubmit} */}
        <form >

          <div className="inputsContainer">
            <div>
              <input
                type="text"
                name="name"
                id="inpNavn"
                placeholder="Navn"
                required
              />
            </div>

            <div>
              <input
                type="email"
                name="email"
                id="inpEmail"
                placeholder="Email Adresse"
                required
              />
            </div>

            <div>
              <input
                type="number"
                name="phone"
                id="inpTelefon"
                placeholder="Telefon"
                required
              />
            </div>
          </div>

          <div className="textareaContainer">
            <textarea
              type="message"
              name="message"
              placeholder="Besked"
              required
            />
          </div>

          <div className="buttonContainer">
            <button className="buttonStyle" type="submit">
              Send besked
            </button>
          </div>

        </form>

      </div>

    </div>

  );

};

export default ContactForm;
