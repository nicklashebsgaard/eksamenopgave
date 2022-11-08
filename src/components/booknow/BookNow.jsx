// SCSS
import Button from "../button/Button";
import "./booknow.scss";

const BookNow = () => {

  return (

    <section className="BookNow">
        <div className="wrapper">

        <div className="titleText">
            <h2><span>Book</span> service nu</h2>
        </div>

        <form>
        
            <div className="inputContainer">
            <input type="text" placeholder="Dit navn" required/>            
            </div>

            <div className="inputContainer">
                <input type="email" placeholder="Din Email" required/>
            </div>

            <div className="inputContainer">
                <input type="nummer" placeholder="Telefon nr." required/>
            </div>

            <button className="buttonStyle" type="submit">SEND</button>

        </form>



        </div>

        





    </section>

  );

};

export default BookNow