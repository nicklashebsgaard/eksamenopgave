// SCSS
import "./adminabout.scss";

// COMPONENTS
import ErrorMessage from "./../../../components/errormessage/ErrorMessage";
import Loader from "../../../components/loader/Loader";
import MessageBox from "../../../components/messagebox/MessageBox";

// React useState - useEffect
import { useState, useEffect } from "react";

// Hook til at lave thumb
import useThumb from "../../../hooks/useThumb";

// API apikald
import { editAbout, getAbout } from "../../../helpers/apikald";

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

const AdminAbout = () => {

  // STATE til data, fejl, loading og message
  const [about, setAbout] = useState();
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const [message, setMessage] = useState() // besked når About er rettet

  // STATE til tekst fra quil-rte
  const [content, setContent] = useState();

  // Thumb til at vise image i input type file
  const [thumbImage, makeThumb] = useThumb();

  useEffect(() => {

    setLoading(true)

    getAbout()
    .then((responsedata) => {
      setAbout(responsedata.data)
      setError(false)
    })
    .catch((err) => {
      setError(err)
      setAbout()
    })
    .finally(() => {
      setLoading(false)
    })

  }, [message])

  // Gem rettelser 

  const handleSubmit = (e) => {

    e.preventDefault() // VIGTIG: Forhindrer reload/nulstille af siden

    // Sende formularen

    // Opkald til API'et når component er loadet
    setLoading(true) // vis en loader mens api'et kaldes (og endnu ikke har svaret)

    let fData = new FormData(e.target) // Input formularens indhold - e.target - i from-data-objekt

    // Tilføj html-tesk fra Quill til formdata (hentes fra state til hhv. content)
    fData.append('content', content); // html-tekst til content i about - fra Quill

    editAbout(fData)
    .then((response) => {
        console.log(response.data);  // put data fra api'et i state
        setMessage('"Om os" er rettet!')

        // Tøm input-file og thumb
        document.forms[0].image.value = "" // tøb input-feltet "name=image"
        makeThumb("")
    })
    .catch((err) => {
        console.log(err); // nulstill en evt. tidligere fejl
    })
    .finally(() => {
        setLoading(false)
        window.scroll(0, 0) // scroll til top af siden
    })
  }

// Tøm input-file og thumb (hvis admin fortryder valg af image)
  const resetFileupload = (e) => {

    document.forms[0].image.value = "" // tøb input-feltet "name=image"
    makeThumb("")
 
  }
  
  return (

    <div className="AdminAbout">
    
    <h1>Ret "Om os"</h1>

    {error && <ErrorMessage />}
    {loading && <Loader />}
    {message && <MessageBox messagetitle={message} emptyMessage={setMessage}/>}
      
    {about &&

      <form onSubmit={handleSubmit}>

         {/* Titel */}

      <div>
        <label htmlFor="inpTitel">Titel</label>
        <input type="text" name="titel" id="inpTitel" defaultValue={about.title} placeholder="Indtast titel"/>
      </div>

       {/* Content */}

      <div>
        <label htmlFor="txtContent">Beskriveslse</label>
        <ReactQuill
                theme="snow"
                modules={modules}
                placeholder="Beskriv turen"
                defaultValue={about.content}
                onReady={ !content ? setContent ( about.content) : null}
                onChange={setContent}
              />
      </div>

      {/* image */}

      <div>
        <label>Vælg evt. et andet billede (overskriver det eksisterende)</label>

       <p>Nuværende foto:</p> 

        <img src={"http://localhost:5333/images/about/" + about.image} alt="nuværende billede" width="300" />

        <input 
        type="file" 
        name="image"
        id="inpImg"
        onChange={ (e) => makeThumb(e.target.files[0])}
        />

        <p>Du har valgt dette nu foto:</p>  

        {
          
          thumbImage && 

          <>

          <img src={thumbImage} width="200" alt="Nye valgt foto" />

            <button className="reset" type="button" onClick={(e) => resetFileupload(e)}>
              <span className="material-symbols-outlined cancel">
                cancel
              </span>
            </button>

          </>

        }


      </div>

      {/* SUBMIT BUTTON */}

      <button className="ret" type="submit">
          Gem rettelser
          <span className="material-symbols-outlined">edit</span>
      </button>

      </form>
      
    }
        
    </div>

  );

};

export default AdminAbout;