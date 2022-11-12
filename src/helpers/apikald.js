import axios from "axios";

const axiosBase = axios.create({baseURL: "http://localhost:5333/"})

// ---------- Kontakt info  -------------------------------------------
// ------------------------------------------------------------

export const contactInformation = () => {

    // GET * http://localhost:5333/contactinformation

    let response = axiosBase.get("contactinformation");
    
    return response;

}

export const postContact = (besked) => {

    // POST * http://localhost:5333/contact

    let response = axiosBase.post("contact", besked);
    
    return response;

}

// ---------- SLIDER -------------------------------------------
// ------------------------------------------------------------

export const forsideSlider = () => {

    // GET * http://localhost:5333/slider

    let response = axiosBase.get("slider");

    return response;

}

// ---------- OM OS -------------------------------------------
// ------------------------------------------------------------

// GET - Henter about (Med alt)

export const getOmos = () => {

    // GET * http://localhost:5333/about

    let response = axiosBase.get("about");
    
    return response;

}

// ---------- ABOUT -------------------------------------------
// ------------------------------------------------------------


// GET - Henter about (Med alt)

export const getAbout = () => {

    // GET * http://localhost:5099/about

    let response = axiosBase.get("about");
    
    return response;

}

// PUT - ret Om os

export const editAbout = (updatedAbout) => {

    // PUT * http://localhost:5099/about/admin

    let response = axiosBase.put("about/admin", updatedAbout);

    return response;

}


// ---------- SERVICES -------------------------------------------
// ------------------------------------------------------------

export const getService = () => {

    // GET * http://localhost:5333/service

    let response = axiosBase.get("service");
    
    return response;

}


// ---------- TESTIMONIAL -------------------------------------------
// ------------------------------------------------------------

export const getTestimonial = () => {

    // GET * http://localhost:5333/testimonial

    let response = axiosBase.get("testimonial");
    
    return response;

}

// ---------- TEAM -------------------------------------------
// ------------------------------------------------------------

export const getTeam = () => {

    // GET * http://localhost:5333/team

    let response = axiosBase.get("team");
    
    return response;

}

// ---------- NEWS -------------------------------------------
// ------------------------------------------------------------

export const getNews = () => {

    // GET * http://localhost:5333/news

    let response = axiosBase.get("news");
    
    return response;

}

export const getNewsId = (ID) => {

    // GET * http://localhost:5333/news

    let response = axiosBase.get("news/" + ID);
    
    return response;

}

export const editNews = (updatedNews, newsID) => {

    // PUT * http://localhost:5333/news/admin/6367d2052632dd14e3c98e16

    let response = axiosBase.put("about/admin/" + newsID , updatedNews);

    return response;

}

export const deleteNews = (idNews) => {

    // DEL * http://localhost:5333/news/admin/6367d2052632dd14e3c98e16

    let response = axiosBase.delete("news/admin/" + idNews);

    return response;

}


// ---------- FAQ -------------------------------------------
// ------------------------------------------------------------

export const getFaq = () => {

    // GET * http://localhost:5333/faq

    let response = axiosBase.get("faq");
    
    return response;

}

// ---------- SERVICE -------------------------------------------
// ------------------------------------------------------------

export const getVoresService = () => {

    // GET * http://localhost:5333/service

    let response = axiosBase.get("service");
    
    return response;

}


export const getVoresServiceID = (ID) => {

    // GET * http://localhost:5333/service/xxxxxxxxxx

    let response = axiosBase.get("service/" + ID);
    
    return response;

}


// ---------- BOOKING -------------------------------------------
// ------------------------------------------------------------
// POST - Book service

export const postBook = (book) => {

    // POST * http://localhost:5333/booking

    let response = axiosBase.post("booking", book);

    return response;

}



// GET - søg i tours (Med alt)

export const searchQ = (searchKey) => {

    // GET * http://localhost:5333/search/tes

    let response = axiosBase.get("search/" + searchKey );

    return response;

}