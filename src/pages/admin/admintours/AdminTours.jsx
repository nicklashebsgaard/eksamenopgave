// SCSS
import "./admintours.scss"; 

// API apikald
import { deleteNews, getNews} from "./../../../helpers/apikald";

// LINK - react-router-dom
import { Link } from "react-router-dom";

// React useState - useEffect
import {useState, useEffect} from "react";

// Parser
import Parser from "html-react-parser";

// COMPONENTS
import Loader from "../../../components/loader/Loader";
import ErrorMessage from "../../../components/errormessage/ErrorMessage";

const AdminNews = () => {

  // STATE til data, fejl og loading
  const [news, setNews] = useState() // data fra api
  const [error, setError] = useState(false)
  const [loading, setLoading] = useState(false)

  // besked efter slet
  const [message, setMessage] = useState()

  // Opkald til API'et når component er loadet
  useEffect(() => {
    
    setLoading(true) // vis en loader mens api'et kaldes (og endnu ikke har svaret)

    getNews()
      .then((responsedata) => {
        setNews(responsedata.data) // put data fra api'et i state
      })
      .catch((err) => {
        setError(true) // nulstill en evt. tidligere fejl
      })
      .finally(() => {
        setLoading(false)
      })

    
  }, [message] ); // kører ved load og ved ændringer i state message
  
  // håndter sletning af "klikket" tour
  const handleDelete = (id) => {
    
    if(window.confirm("Er du sikker på at du vil slette denne?")) {

      setLoading(true)
          deleteNews(id)
            .then((responsedata) => {
              console.log(responsedata.data)
              setMessage(id)
            })
            .catch((err) => {
              setError(true)
              console.log(err);
            } ) 
            .finally(() => {
              setLoading(false)
            })
    }
  }

  return (

    //  1. Oversigt over alle tours
    //  Link til opret ny tour
    //  map'ed alle tours ud med mulighed for 
    //  ret (Skal sende ID'en med)  
    //  slet (Forgår på siden her) 

    <div className="adminNews">
        
        {/* { message && <h2>{message}</h2>}  */} 

        <h1>Admin News</h1>
        
        {loading && <Loader />}

        {error && <ErrorMessage />}

        {
          news && news.map( t => 
            
          <div className="card" key={t._id}>

          <h2>{t.title}</h2>
          <p>{new Date (t.traveldate).toLocaleDateString("da-Dk", { day: "numeric", month: "long", year: "numeric" })}</p>
          <p>{t.teaser}</p>
          <div>{Parser(t.content)}</div> 
          
          <div className="buttonContainer">

            <div className="deleteContainer">
              <button id="delete" onClick={ () => handleDelete(t._id) }>
                <span className="material-symbols-outlined">
                  delete
                </span>
              </button>
            </div>
            
            <div className="editContainer">
              <Link to={"/admin/admintoursret/" + t._id}>
                <button id="edit">
                  <span className="material-symbols-outlined">
                    edit
                  </span>
                </button>
              </Link>
            </div>
          </div>

          </div>
          
          )
        }
        
    </div>

  );

};

export default AdminNews;