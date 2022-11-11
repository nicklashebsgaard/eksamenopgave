// SCSS
import "./searchinput.scss";

// useNavigate 
import { useNavigate } from 'react-router-dom';

const SearchInput = () => {

    const navigate = useNavigate()

    const handleSearch = (e) => {
        
        e.preventDefault()
        console.log(e.target.inpSearch.value);
        navigate("/search/" + e.target.inpSearch.value) // send søgeordet som param til søgeresultat-siden
    }

  return (

    <form className='SearchInput' onSubmit={handleSearch}>
        <div className="SeachContainer">
            <input className="inpSearch" type="text" name='inpSearch' placeholder='Søg' required />
    
            <button className="searchButton" type='submit'>
                <span className="material-symbols-outlined search">
                    search
                </span>
            </button>
        </div>
    
    </form>

  );

};

export default SearchInput;