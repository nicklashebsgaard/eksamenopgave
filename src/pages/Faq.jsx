// SCSS
import "./faq.scss";

// React useState, useEffect
import React, { useState, useEffect } from "react";

// COMPONENTS
import Accordion from "../components/accordion/Accordion";

const Faq = () => {

  return (

    <section className='Faq'>
        
        <h1>Faq</h1>
    
      <Accordion />
    
    </section>

  );

};

export default Faq;