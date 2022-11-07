import axios from "axios";

const axiosBase = axios.create({baseURL: "http://localhost:5333/"})

// ---------- TOURS -------------------------------------------
// ------------------------------------------------------------


// GET - Henter alle tours TEASER (Med alt)

export const getAllToursTeaser = () => {

    // GET * http://localhost:5099/tours/teaser

    let response = axiosBase.get("tours/teaser");
    
    return response;

}

// GET - Henter alle tours (Med alt)

export const getAllTours = () => {

    // GET * http://localhost:5099/tours

    let response = axiosBase.get("tours");

    return response;

}

// GET - søg i tours (Med alt)

export const searchTours = (searchKey) => {

    // GET * http://localhost:5099/tours/soeg/xxxxx

    let response = axiosBase.get("tours/soeg/" + searchKey );

    return response;

}

// GET - Henter tours id ud fra id

export const getToursByID = (ID) => {

    // GET * http://localhost:5099/tours/625c7ae7ebadcefe8ed39ad3

    let response = axiosBase.get("tours/" + ID);

    return response;

}

// DELETE - Slet en udvalgt tour

export const deleteTour = (tourID) => {

    // DELETE * http://localhost:5099/tours/admin/xxxxxxxxxxxxxxxxxxxxx

    let response = axiosBase.delete("tours/admin/" + tourID);

    return response;

}

// POST - Opret tour

export const createTour = (newTour) => {

    // POST * http://localhost:5099/tours/admin

    let response = axiosBase.post("tours/admin", newTour);

    return response;

}

// PUT - ret tour

export const editTour = (updatedTour, tourID) => {

    // PUT * http://localhost:5099/tours/admin/6255cfb40b7abe9bb00a7014

    let response = axiosBase.put("tours/admin/" + tourID, updatedTour);

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

// PUT - ret about

export const editAbout = (updatedAbout) => {

    // PUT * http://localhost:5099/about/admin

    let response = axiosBase.put("about/admin", updatedAbout);

    return response;

}

// ---------- CONTACT -----------------------------------------
// ------------------------------------------------------------

export const sendMessage = (newMessage) => {

    // POST * http://localhost:5099/contact

    let response = axiosBase.post("contact", newMessage)
   
    return response;
}