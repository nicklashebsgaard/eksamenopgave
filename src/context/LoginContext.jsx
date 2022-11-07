import { useState, createContext } from "react";

export const LoginContext = createContext();

const LoginContextProvider = ( props ) => {
    
    // USER state - der rummer data hvis en der en der logger ind
    // --------------------------------------------------------
    const [ user, setUser ] = useState("nicklas")
    // const [ user, setUser ] = useState()

    // Login-funktion (der matcher til brugernavn og password)
    // --------------------------------------------------------
    let signIn = ( brugernavn, adgangskode ) => {
        if ( brugernavn === "admin" && adgangskode === "123456" ) {
            setUser( brugernavn ); // = logget ind
        } else {
            setUser( null );       // = "logget ud"
        }
    }

    // Her logges ud
    // --------------------------------------------------------
    let signOut = () => {
        setUser(null);
    }

    // Return - det der udbydes 
    return (
        <LoginContext.Provider value={ { user, signIn, signOut } }>
            { props.children }
        </LoginContext.Provider>
    )
}

export default LoginContextProvider;