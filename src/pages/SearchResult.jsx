// SCSS
import "./searchresult.scss";

// REACT useState, useEffect
import React, {useState, useEffect} from 'react'

// LINK
import { Link } from "react-router-dom";

//COMPONENTS
import ErrorMessage from '../components/errormessage/ErrorMessage';
import Loader from '../components/loader/Loader';

// API 
import { searchQ } from '../helpers/apikald';

// useParams for søge på input
import { useParams } from 'react-router-dom';

const SearchResult = () => {

    // tjek i App hvad param hedder - fx search/:q
    let {q} = useParams()

    // STATE
    const [soeg, setSoeg] = useState()
    const [error, setError] = useState(false)
    const [loading, setLoading] = useState(false)

    useEffect(() => {
      
        setLoading(true)

        searchQ(q)
        .then((responsedata) => {
            /* concat tager begge arrays og sætter dem til et arry */
            let result = responsedata.data.searchresult.news.concat(responsedata.data.searchresult.services)
            setSoeg(result)
            setError(false)
        })
        .catch(() => {
            setError(true)
            setSoeg()
        })
        .finally(() =>{
            setLoading(false)
        })

    }, [q])
    

  return (

    <section className='SearchResult'>
      {error && <ErrorMessage />}
      {loading && <Loader />}
      
      <div className="flexContainer">

        <div className="titleText">
          <h1>Dit søgeresultat</h1>
        </div>

        <div className="breadcrumbContainer">
          <ul className="breadcrumb">
            <Link to="/">
              <li>Forsiden</li>
            </Link>
            <span className="material-symbols-outlined expand_more">
              expand_more
            </span>
            <Link to="search">
              <li className="color">Dit søgeresultat</li>
            </Link>
          </ul>
        </div>

      </div>

        {
            soeg && soeg.map(s => 
                <div key={s._id}>
                <h2 >{s.title}</h2>

                <div>{s.teaser}</div>

                </div>
            )
        }

    </section>

  );

};

export default SearchResult;