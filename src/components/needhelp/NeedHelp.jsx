// SCSS 
import "./needhelp.scss";

// Link til de andre sider
import { Link } from "react-router-dom";

// COMPONENTS
import Button from "../button/Button";

const NeedHelp = () => {

  return (

    <section className="NeedHelp">
        
        <div className="contentContainer">

        <h2>Skal du bruge <span>hjælp</span> fra <span>Strøm</span></h2>

        <p>lorem ipsum dolor sit amet consectetur</p>

        <Link to="kontakt">
          <Button>Kontakt os</Button>
        </Link>

        </div>
     

    </section>

  );

};

export default NeedHelp;