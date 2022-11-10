import "./accordion.scss";

// useState, useEffect
import { useState, useEffect } from "react";

const Accordion = ({ faq }) => {
  // State til om den skal expand eller modsat
  const [isActive, setIsActive] = useState(false);

  return (
    <div className="Accordion">
      <div className="accordionContainer">
        <div className="accordionTitle" onClick={() => setIsActive(!isActive)}>
          <div>{faq.question}</div>
          <span className="material-symbols-outlined">
            {isActive ? "expand_less" : "expand_more"}
          </span>
        </div>

        {isActive && (
          <div className="accordionContent">
            <p>{faq.answer}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Accordion;
