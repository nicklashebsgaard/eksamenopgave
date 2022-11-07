// SCSS
import "./forside.scss";

// React useState, useEffect
import { useState, useEffect } from "react";

// API

// COMPONENTS
import ErrorMessage from "../components/errormessage/ErrorMessage";
import Loader from "../components/loader/Loader";

const Forside = () => {

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)

  

  return (

    <header className="Forside">
      
      {error && <ErrorMessage />}
      {loading && <Loader />}

      
    </header>

  );

};

export default Forside;