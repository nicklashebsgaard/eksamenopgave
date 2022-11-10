// SCSS
import "./pagination.scss";


const Pagination = (props) => {

    // Pros fra parent som skal "pagineres"

    let currentPage = props.currentPage;        // Besked fra parent om hvilken side der er den aktuelle lige nu
    let setCurrentPage = props.setCurrentPage;  // Mulighed for at ændre i ("skifte side") currentPage-state i parent
    let itemsPerPage = props.itemsPerPage;      // Hvor mange items pr. side (fx 3)
    let itemsLength = props.itemsLength         // Hvor mange items der er i alt (fx 32)

    // Beregn hvor mange "sider" det giver (ud fra antal items divideret med items pr side)
    let nubmerOfPages = Math.ceil(itemsLength/ itemsPerPage) 

  return (

    <div className="Pagination">

    {/* PAGINATION */}
    <div className="buttonsContainer">
        <button disabled={currentPage <= 0} onClick={() => setCurrentPage( currentPage - 1)}>
            prev
        </button>

            {
                [ ...Array(nubmerOfPages)].map( (x, i) =>
                    <button id="numberOfPages" className={ i === currentPage ? "paginationActive" : null} key={i} onClick={ () => setCurrentPage (i)}>{i + 1}</button>
                )
            }
        
        <button disabled={currentPage >= nubmerOfPages -1} onClick={() => setCurrentPage( currentPage + 1)}>
            next
        </button>
        </div>
    {/* PAGINATION  SLUT */}

    </div>

  );

};

export default Pagination;