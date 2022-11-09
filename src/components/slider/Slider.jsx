// SCSS
import "./slider.scss";

// React useState, useEffect
import React, { useState, useEffect } from "react";

// html-react-parser
import Parser from "html-react-parser";

// Link til de andre sider
import { Link } from "react-router-dom";

// icons 
import {SlArrowLeftCircle} from "react-icons/sl";
import {SlArrowRightCircle} from "react-icons/sl";

// inspiration til slideren
// https://www.w3schools.com/howto/howto_js_slideshow.asp

const Slider = (props) => {

  // State til at styre hvilket image der vises i slideren
  const [slideIndex, setSlideIndex] = useState(0); // Start med at vise image 1 = index 0

  let sliderImages = props.sliderImages; // Array med images-navne sendt med props fra parent
  let imagePath = props.imagePath; // Sti til hvor images ligger

  // Navn til timeout - så den kan bremses
  let t;

  useEffect(() => {
    let i;
    let slides = document.getElementsByClassName("mySlides");
    //let dots = document.getElementsByClassName("dot");

    // >> NEXT så man ikke kan "bladre for langt frem" - start forfra med 0 efter sidste slide
    if (slideIndex > slides.length - 1) {
      setSlideIndex(0);
      return; // start forfra med useEffect med den nye værdi/state ... 0
    }

    // << PREV så man ikke kan vladre for langt tilbage - gå til sidste slide hvis der mindre end 0
    if (slideIndex < 0) {
      setSlideIndex(slides.length - 1); // hvis der er 5 img er sidste img index 4 - derfor -1
      return; // start forfra med useEffect med den nye værdi/state ... se herover
    }

    // Skjul alle slides/images
    for (i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";
    }

    /* for (i = 0; i < dots.length; i++) {
            dots[i].className = dots[i].className.replace(" active", "");
        } */

    // Vis det udvalte slide/image
    slides[slideIndex].style.display = "block";
    //dots[slideIndex-1].className += " active";

    t = setTimeout(() => setSlideIndex(slideIndex + 1), 4000); // nedtæller til ændring af slideIndex (næste image/slide)

    // finally - clean-up-function
    return () => {
      clearTimeout(t); // slet overflødige/esktra
    };

  }, [slideIndex]); // når ændring i slideIndex skal ny slide/image vises - og øvrige skjules

  return (
    
    <div className="Slider">
      {/* <!-- Slideshow container --> */}
      <div className="slideshow-container">
        {/* <!-- Full-width images with number and caption text --> */}

        {sliderImages &&
          sliderImages.map((s, i) => (

            <div className="mySlides fade" key={"slider" + i}>
             
              <img src={imagePath + s.image} style={{ width: "100%" }} alt="slider fotos" loading="lazy" />

              <div className="containerContent">
                <div className="text">
                  <div className="animation">

                  {Parser(s.caption)}
                  </div>
                <Link to="kontakt">
                  <button className="SliderButton">Kontakt os</button>
                </Link>

                </div>
                
              </div>

              
            </div>
          ))}

        {/* <!-- Next and previous buttons --> */}
        <span className="prev" onClick={() => setSlideIndex(slideIndex - 1)}>
          <SlArrowLeftCircle />
        </span>

        <span className="next" onClick={() => setSlideIndex(slideIndex + 1)}>
          <SlArrowRightCircle />
        </span>

      </div>

    </div>

  );

};

export default Slider;
