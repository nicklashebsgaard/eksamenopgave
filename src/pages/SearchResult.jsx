// REACT useState, useEffect
import React, {useState, useEffect} from 'react'

//COMPONENTS
import ErrorMessage from '../components/errormessage/ErrorMessage';
import Loader from '../components/loader/Loader';

// API 
import {searchTours} from "./../helpers/apikald";

// useParams for søge på input
import { useParams } from 'react-router-dom';

const SearchResult = () => {

    // tjek i App hvad param hedder - fx search/:q
    let {q} = useParams()

    // STATE
    const [tours, setTours] = useState()
    const [error, setError] = useState(false)
    const [loading, setLoading] = useState(false)

    useEffect(() => {
      
        setLoading(true)

        searchTours(q)
        .then((responsedata) => {
            setTours(responsedata.data)
            setError(false)
        })
        .catch(() => {
            setError(true)
            setTours()
        })
        .finally(() =>{
            setLoading(false)
        })

    }, [q])
    

  return (

    <div className='SearchResult'>
        SearchResult

        {loading && <Loader />}
        {error && <ErrorMessage />}

        {
            tours && tours.map(t => 
                <div key={t._id}>
                <h2 >{t.title}</h2>

                <div>{t.teaser}</div>

                </div>
            )
        }

    </div>

  );

};

export default SearchResult;