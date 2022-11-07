// SCSS
import "./tours.scss";

// REACT useState, useEffect
import React, {useState, useEffect} from 'react';

// COMPONENTS
import ErrorMessage from '../components/errormessage/ErrorMessage';
import Loader from '../components/loader/Loader';
import Pagination from "../components/pagination/Pagination";
import AmountPerPage from "../components/pagination/amountperpage/AmountPerPage";
import Slider from "../components/slider/Slider";

// API 
import { getAllTours } from '../helpers/apikald';

// Parser
import Parser from "html-react-parser";

const Tours = () => {

    const [tours, setTours] = useState()
    const [error, setError] = useState(false)
    const [loading, setLoading] = useState(false)

    const [currentPage, setCurrentPage] = useState(0) // vis side 1 = index 0
    const [itemsPerPage, setItemsPerPage] = useState(4) // Antal items pr side

   /*  let nubmerOfPages = Math.ceil(tours?.length / itemsPerPage)

    console.log("antal:", nubmerOfPages); */
    
  useEffect(() => {
    
    setLoading(true) 

    getAllTours()
      .then((response) => {
        setTours(response.data) 
        setError(false)
      })
      .catch((err) => {
        setError(true) 
        setTours()
      })
      .finally(() => {
        setLoading(false)
      })

  }, [] );

  return (

    <div className='Tours'>
        
        <h1>Alle tours - med pagination</h1>

        {loading && <Loader />}
        {error && <ErrorMessage />}

        {
            tours && 

            <div>

                <Slider 
                sliderImages={tours[0].gallery} 
                imagePath="http://localhost:5099/images/tours/"
                />

                {/* Pagination */}
                <AmountPerPage 
                options= { [2, 4, 5, 10] } 
                itemsPerPage={itemsPerPage}     // Send itemsPerPage med så den kan være defaultValue i select!
                setItemsPerPage={setItemsPerPage} 
                setCurrentPage={setCurrentPage} // så setCurrentPage nulsilles hvis der vælges nu itemsPerPage 
                />

                <Pagination 
                itemsPerPage={itemsPerPage}     // Fra state - hvor mange tours pr. side (fx 3)
                itemsLength={tours.length}      // Hvor mange tours er der i alt (fx 12)
                currentPage={currentPage}       // Fra state - den "side" vi er på lige nu
                setCurrentPage={setCurrentPage} // Fra state - mulighed for at ændre på den "side" vi er på lige nu = "skifte side"
                />

                <div className="cardContainer">
                    {tours.slice(currentPage * itemsPerPage, (currentPage * itemsPerPage) + itemsPerPage).map( (t) => 

                        <div className="card" key={t._id}>

                            <h2>{t.title}</h2>
                            <div className="toursContent">{Parser(t.content)}</div>
                        </div>

                    ) }
                </div>  

            </div>
        }

    </div>

  );

};

export default Tours;