// SCSS
import "./admintourscreate.scss";

// COMPONENTS 
import Loader from "../../../components/loader/Loader";
import ErrorMessage from "./../../../components/errormessage/ErrorMessage";

// API apikald
import { createTour } from "./../../../helpers/apikald";

// Quill
import ReactQuill from "react-quill";
import 'react-quill/dist/quill.snow.css';

// React useState 
import { useState } from "react";


// QUILL
const modules = {
  toolbar: [
    ['bold', 'italic', 'underline', 'strike'],
    [ {'color': ['#000', '#e6000', '#ff9900']}],
    [{ 'list': 'ordered'}, { 'list': 'bullet' }],
  ]
}

const AdminToursCreate = () => {

  // STATE til message, fejl og loading
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);  
  const [message, setMessage] = useState()

  // STATE til tekst fra quil-rte
  const [content, setContent] = useState()
  const [roomtype, setRoomtype] = useState()

    // vil loop over alle af textareas på siden og gør dem resize på load og change 

  document.querySelectorAll("textarea").forEach((element) => {
    function autoResize(el) {
      el.style.height = el.scrollHeight + "px";
    }
    autoResize(element);
    element.addEventListener("input", () => autoResize(element));
  }); 

  const handleSubmit = (e) => {

    e.preventDefault(); // VIGTIG: Forhindrer reload/nulstille af siden

    // Sende formularen

    // Opkald til API'et når component er loadet
    setLoading(true) // vis en loader mens api'et kaldes (og endnu ikke har svaret)

    let fData = new FormData(e.target) // Input formularens indhold - e.target - i from-data-objekt

    // Tilføj html-tesk fra Quill til formdata (hentes fra state til hhv. content og roomtype)
    fData.append('content', content); // html-tekst til content i tour
    fData.append('roomtype', roomtype); // html-tekst til roomtype i tour

    createTour(fData)
    .then((response) => {
        console.log(response.data);  // put data fra api'et i state
        e.target.reset(); // Tømmer formularfelter
        setMessage("Ny tur er oprettet! den fik id nummer:" + response.data.oprettet._id)
    })
    .catch((err) => {
        console.log(err); // nulstill en evt. tidligere fejl
        setError(true)
    })
    .finally(() => {
        setLoading(false)
    })
    
  };

  return (

    <div className="Admintourscreate">

        <h1>Opret ny Tour</h1>

        {loading && <Loader />}
        {error && <ErrorMessage />}
        {
            message && <h2>{message}</h2>
        }

      <form onSubmit={handleSubmit}>
        
        {/* Titel */}

        <div>
          <label htmlFor="inpTitle">Turens titel</label>
          <input
            type="text"
            name="title"
            id="inpTitle"
            placeholder="Skriv titel her"
            required
          />
        </div>

        {/* Teaser */}

        <div>
          <label htmlFor="txtTeaser">Teasertekst</label>
          <textarea
            name="teaser"
            id="txtTeaser"
            placeholder="Skriv teasertekst her"
            required
          />
        </div>

        {/* Content */}

        <div>
          <label htmlFor="txtContent">Beskrivelse af turen</label>
          {/* <textarea
            name="content"
            id="txtContent"
            placeholder="Beskriv turen"
            required
          /> */}
          <ReactQuill theme="snow" modules={modules} placeholder="Beskriv turen" onChange={setContent}/>
        </div>

        {/* Roomtype */}

        <div>
          <label htmlFor="txtRoom">Værelser</label>
          {/* <textarea
            name="roomtype"
            id="txtRoom"
            placeholder="Beskriv værelserne"
            required
          /> */}
          <ReactQuill theme="snow" modules={modules} placeholder="Beskriv værelserne" onChange={setRoomtype}/>
        </div>

        {/* Afrejsedata */}

        <div>
          <label htmlFor="inpDate">Afrejse dato</label>
          <input
            type="date"
            name="traveldate"
            min={new Date().toISOString().slice(0, 10)}
            id="inpDate"
            required
          />
        </div>

        {/* Varighed */}

        <div>
          <label htmlFor="inpDuration">Varighed i dage</label>
          <input
            type="number"
            min="1"
            max="150"
            name="duration"
            id="inpDuration"
            required
          />
        </div>

        {/* Pris minimum */}

        <div>
          <label htmlFor="inpPriceminimum">Minimumspris</label>
          <input
            type="number"
            min="0"
            name="priceminimum"
            id="inpPriceminimum"
            required
          />
        </div>

        {/* Pris maximum */}

        <div>
          <label htmlFor="inpPricemax">Maximumpris</label>
          <input
            type="number"
            min="0"
            name="pricemaximum"
            id="inpPricemax"
            required
          />
        </div>

        {/* image */}

        <div>
          <label htmlFor="inpImg">Vælg et coverbillede</label>
          <input
            type="file"
            accept="image/*"
            name="image"
            id="inpImg"
            required
          />
        </div>

        {/* Gallery-images */}

        <div>
          <label htmlFor="inpGallery">Vælg evt. galleribilleder</label>
          <input
            type="file"
            accept="image/*"
            multiple
            name="galleryimages"
            id="inpGallery"
          />
        </div>

        {/* SUBMIT BUTTON */}

        <button className="opret" type="submit">
            Opret tour
            <span className="material-symbols-outlined">
                add
            </span>
        </button>

      </form>

    </div>

  );

};

export default AdminToursCreate;
