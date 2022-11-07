// SCSS
import "./nomatch.scss";

// Assets
import Image from "./../../assets/image/404notfound.png";

const NoMatch = () => {

  return (
    
    <div className="NoMatch">
      <h1>Not Found...</h1>
      <img src={Image} alt="notfound" />
    </div>

  );

};

export default NoMatch;