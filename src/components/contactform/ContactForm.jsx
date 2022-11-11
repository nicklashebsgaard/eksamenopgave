// SCSS
import "./contactform.scss";

// React useState, useEffect
import { useState, useEffect } from "react";

// API
import { postContact } from "./../../helpers/apikald";

// COMPONENTS
import ErrorMessage from "./../errormessage/ErrorMessage";
import Loader from "./../loader/Loader";

const ContactForm = () => {

  const [sendMessage, setSendMessage] = useState();
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    
    e.preventDefault(); // VIGTIG: Forhindrer reload/nulstille af siden

    setLoading(true); 

    let fData = new FormData(e.target); // Input formularens indhold - e.target - i from-data-objekt

    fData.append("sendMessage", sendMessage); 

    postContact(fData)
      .then((response) => {
        console.log(response.data);
        e.target.reset();
      })
      .catch((err) => {
        setError(true);
        console.log(err); // nulstill en evt. tidligere fejl
      })
      .finally(() => {
        setLoading(false);
        window.scroll(0, 0); // scroll til top af siden
      });
  };

  return (

    <div className="ContactForm">
      {error && <ErrorMessage />}
      {loading && <Loader />}

      <div className="textContainer">
        <h2>Kontakt os</h2>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Tenetur
          praesentium minus quos tempore, provident et asperiores sequi repellat
          esse natus.
        </p>
      </div>

      <div className="formContainer">
        <form onSubmit={handleSubmit}>
          <div className="inputsContainer">
            <div>
              <input type="text" name="name" placeholder="Navn" required />
            </div>

            <div>
              <input
                type="email"
                name="email"
                placeholder="Email Adresse"
                required
              />
            </div>

            <div>
              <input
                type="number"
                name="phone"
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
