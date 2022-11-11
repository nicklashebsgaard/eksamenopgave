// SCSS
import "./voreskunder.scss";

// API
import { getTestimonial } from "../../helpers/apikald";

// React useState, useEffect
import { useState, useEffect } from "react";

// Carousel - NPM https://www.npmjs.com/package/nuka-carousel
import Carousel from 'nuka-carousel';

// COMPONENTS
import ErrorMessage from "./../errormessage/ErrorMessage";
import Loader from "./../loader/Loader";

const VoresKunder = () => {

  const [testimonial, setTestimonial] = useState();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  // Opkald til API'et når component er loadet
  useEffect(() => {
    setLoading(true); // vis en loader mens api'et kaldes (og endnu ikke har svaret)

    getTestimonial()
      .then((response) => {
        setTestimonial(response.data); // put data fra api'et i state
        setError(false);
      })
      .catch((err) => {
        setError(true); // nulstill en evt. tidligere fejl
        setTestimonial();
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  function randomMixer(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      let k = arr[i];
      arr[i] = arr[j];
      arr[j] = k;
    }
    return arr;
  }

  return (
    
    <section className="VoresKunder">

      {error && <ErrorMessage />}
      {loading && <Loader />}

      <div className="textContainer">
        <h2>
          Vores <span>kunder siger</span>
        </h2>

        <p>
          lorem ipsum dotor sit amet consectetur adipsicing etit sed do eiusm
          tempor
        </p>

        <div className="CircleLineContainer">
          <div id="line1"></div>
          <div id="circle"></div>
          <div id="line2"></div>
        </div>
        
      </div>
      <Carousel  wrapAround="true" slidesToShow={3} >
     
      {testimonial &&
        randomMixer(testimonial).slice(0, 4).map((t, i) => (
            <div className="flexContainer" key={"kunde" + i}>
              <div className="testimonialCard" >
                <div className="cardContent">
                  <img
                    src={"http://localhost:5333/images/testimonial/" + t.image}
                    alt="kunde"
                    loading="lazy"
                  />
                  <h2>{t.name}</h2>
                  <h3>{t.title}</h3>
                  <p>{t.review}</p>
                </div>
              </div>
          </div>
          ))}
   
      </Carousel>
    </section>
  );
};

export default VoresKunder;
