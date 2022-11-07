// SCSS
import "./admintoursedit.scss";

// COMPONENTS
import ErrorMessage from "./../../../components/errormessage/ErrorMessage";
import Loader from "../../../components/loader/Loader";
import MessageBox from "../../../components/messagebox/MessageBox";

// useParams - react-router-dom
import { useParams } from "react-router-dom";

// React useState - useEffect
import { useState, useEffect } from "react";

// API apikald
import { getToursByID, editTour } from "../../../helpers/apikald";

// Quill
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

// QUILL Toolbar - Mindre Tools er bedre end mange, så der ikke mange muligheder for at lave fejl.
const modules = {
  toolbar: [
    ["bold", "italic", "underline", "strike"],
    [{ color: ["#000", "#e6000", "#ff9900"] }],
    [{ list: "ordered" }, { list: "bullet" }],
  ],
};

const AdminToursEdit = () => {

  // vil loop over alle af textareas på siden og gør dem resize på load og når man skriver i feltet
  document.querySelectorAll("textarea").forEach((element) => {
    function autoResize(el) {
      el.style.height = el.scrollHeight + "px";
    }
    autoResize(element);
    element.addEventListener("input", () => autoResize(element));
  });

  const { ID } = useParams();

  // STATE til data, fejl og loading
  const [tour, setTour] = useState();
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState() // besked når tour er rettet

  // STATE til tekst fra quil-rte
  const [content, setContent] = useState();
  const [roomtype, setRoomtype] = useState();

  // Kald API - send ID med
  useEffect(() => {
    setLoading(true); // vis en loader mens api'et kaldes (og endnu ikke har svaret)

    getToursByID(ID)
      .then((responsedata) => {
        setTour(responsedata.data); // put data fra api'et i state

        // TEMP snup content og roomtype og put i state til hhv. content og roomtype
        /* setContent(responsedata.data.content)
        setRoomtype(responsedata.data.roomtype) */
        
        setError(false);
      })
      .catch((err) => {
        setError(true);
        setTour(); // nulstill en evt. tidligere fejl
      })
      .finally(() => {
        setLoading(false);
      });
  }, [ID]);

  const handleSubmit = (e) => {

    e.preventDefault() // VIGTIG: Forhindrer reload/nulstille af siden

    // Sende formularen

    // Opkald til API'et når component er loadet
    setLoading(true) // vis en loader mens api'et kaldes (og endnu ikke har svaret)

    let fData = new FormData(e.target) // Input formularens indhold - e.target - i from-data-objekt

    // Tilføj html-tesk fra Quill til formdata (hentes fra state til hhv. content og roomtype)
    fData.append('content', content); // html-tekst til content i tour - fra Quill
    fData.append('roomtype', roomtype); // html-tekst til roomtype i tour - fra Quill

    editTour(fData, ID)
    .then((response) => {
        console.log(response.data);  // put data fra api'et i state
        setMessage("Der er rette!")
    })
    .catch((err) => {
        console.log(err); // nulstill en evt. tidligere fejl
    })
    .finally(() => {
        setLoading(false)
        window.scroll(0, 0) // scroll til top af siden
    })
    
  }

  return (

    <div className="AdminToursEdit">

      <h1>Du er ved at ret en tour</h1>

      {error && <ErrorMessage />}
      {loading && <Loader />}
      {message && <MessageBox messagetitle={message} emptyMessage={setMessage}/>}

      {tour && (
        <div className="formContainer">
          <form onSubmit={handleSubmit}>
            {/* Titel */}

            <div>
              <label htmlFor="inpTitle">Turens titel</label>
              <input
                type="text"
                name="title"
                id="inpTitle"
                defaultValue={tour.title}
                required
              />
            </div>

            {/* Teaser */}

            <div>
              <label htmlFor="txtTeaser">Teasertekst</label>
              <textarea
                name="teaser"
                id="txtTeaser"
                defaultValue={tour.teaser}
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
              <ReactQuill
                theme="snow"
                modules={modules}
                placeholder="Beskriv turen"
                defaultValue={tour.content}
                onReady={ !content ? setContent ( tour.content) : null}
                onChange={setContent}
              />
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
              <ReactQuill
                theme="snow"
                modules={modules}
                defaultValue={tour.roomtype}
                onReady={ !roomtype ? setRoomtype ( tour.roomtype) : null}
                placeholder="Beskriv værelserne"
                onChange={setRoomtype}
              />
            </div>

            {/* Afrejsedata */}

            <div>
              <label htmlFor="inpDate">Afrejse dato</label>
              <input
                type="date"
                name="traveldate"
                min={new Date().toISOString().slice(0, 10)}
                defaultValue={new Date(tour.traveldate).toLocaleDateString(
                  "fr-CA"
                )}
                id="inpDate"
                required
              />
            </div>

            {/* Varighed */}

            <div>
              <label htmlFor="inpDuration">Varighed i dage</label>
              <input
                type="number"
                defaultValue={tour.duration}
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
                defaultValue={tour.priceminimum}
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
                defaultValue={tour.pricemaximum}
                min="0"
                name="pricemaximum"
                id="inpPricemax"
                required
              />
            </div>

            {/* image */}

            <div>
              <p className="billedeTxt">Nuværende billede:</p>

              <img
                src={"http://localhost:5099/images/tours/" + tour.coverimage}
                alt="nuværende billede"
              />

              <label htmlFor="inpImg">
                Vælg evt. et andet coverbillede (overskriver det nuværende)
              </label>

              <input
                type="file"
                accept="image/*"
                name="image"
                id="inpImg"
              />
            </div>

            {/* Gallery-images */}

            <div>
              <p className="billedeTxt">Nuværende galleribilleder</p>

              <label htmlFor="inpGallery">
                Vælg evt. nogle nye galleribilleder (overskriver de
                eksisterende)
              </label>
                    
              <div className="imageContainer">
                {tour.gallery.map((g, i) => (
                  <img 
                    key={"gallery" + i}
                    src={"http://localhost:5099/images/tours/" + g}
                    alt="nuværende billede"
                  />
                ))}
              </div>

              <input
                type="file"
                accept="image/*"
                multiple
                name="galleryimages"
                id="inpGallery"
              />
            </div>

            {/* SUBMIT BUTTON */}

            <button className="ret" type="submit">
              Ret tour
              <span className="material-symbols-outlined">edit</span>
            </button>

          </form>

        </div>

      )}

    </div>

  );
  
};

export default AdminToursEdit;
