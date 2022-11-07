// SCSS
import "./buttontotop.scss";

// React useState, useEffect
import React, { useEffect, useState } from "react";

const ButtonToTop = () => {

  // State til evenHanler som fortæller hvornår button skal vises
  const [fromTop, setFromTop] = useState()

  useEffect(() => {
    // scroll til top af siden og venstre og smooth så der køre lækkert til toppen 
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });

  }, []);

  useEffect(() => {

    const eventHandler = () => {
      setFromTop(window.scrollY)
    }

    window.addEventListener("scroll", eventHandler) // Tilføjer eventlistener som er = eventHandler
    
    return () => {
      window.removeEventListener("scroll", eventHandler) // fjerner vi evenHandler
    }

  }, [])

  return (fromTop > 40 && 

  <div className="ButtonToTop" >

      <button
        className="knaptilTop"
        onClick={() => {
          window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
        }}
      >
        <span className="material-symbols-outlined arrow_upward">
          arrow_upward
        </span>
      </button>

    </div>

  );

};

export default ButtonToTop;
