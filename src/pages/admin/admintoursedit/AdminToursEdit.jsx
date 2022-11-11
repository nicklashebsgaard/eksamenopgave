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
import { editNews, getNewsId } from "./../../../helpers/apikald";

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
  const [news, setNews] = useState();
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState() // besked når tour er rettet

  // STATE til tekst fra quil-rte
  const [content, setContent] = useState();

  // Kald API - send ID med
  useEffect(() => {
    setLoading(true); // vis en loader mens api'et kaldes (og endnu ikke har svaret)

    getNewsId(ID)
      .then((responsedata) => {
        setNews(responsedata.data); // put data fra api'et i state

        // TEMP snup content og roomtype og put i state til hhv. content og roomtype
        /* setContent(responsedata.data.content)
        setRoomtype(responsedata.data.roomtype) */
        
        setError(false);
      })
      .catch((err) => {
        setError(true);
        setNews(); // nulstill en evt. tidligere fejl
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

    editNews(fData, ID)
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

      {news && (
        <div className="formContainer">
          <form onSubmit={handleSubmit}>
            {/* Titel */}

            <div>
              <label htmlFor="inpTitle">Turens titel</label>
              <input
                type="text"
                name="title"
                id="inpTitle"
                defaultValue={news.title}
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
                defaultValue={news.content}
                onReady={ !content ? setContent ( news.content) : null}
                onChange={setContent}
              />
            </div>

            {/* image */}

            <div>
              <p className="billedeTxt">Nuværende billede:</p>

              <img
                src={"http://localhost:5333/images/news/" + news.image}
                alt="nuværende billede"
              />

              <label htmlFor="inpImg">
                Vælg evt. et andet billede (overskriver det nuværende)
              </label>

              <input
                type="file"
                accept="image/*"
                name="image"
                id="inpImg"
              />
            </div>

            {/* SUBMIT BUTTON */}

            <button className="ret" type="submit">
              Ret News
              <span className="material-symbols-outlined">edit</span>
            </button>

          </form>

        </div>

      )}

    </div>

  );
  
};

export default AdminToursEdit;
