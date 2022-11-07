// SCSS 
import "./amountperpage.scss";

const AmountPerPage = (props) => {

    let options = props.options;                 // Det dropdown skal udfyldes med af valgmuligheder
    let setItemsPerPage = props.setItemsPerPage; // Besked til parent om hvor mange items der skal vises pr. "side"
    let itemsPerPage = props.itemsPerPage;       // medsked til parent om hvor mange tiems der skal vises pr. "side"
    let setCurrentPage = props.setCurrentPage;   // mulighed for at skifte til "side 0" når brugeren ændre i vising/antal pr. side
  return (

    <div className="AmountPerPage">
        {/* putter + på e.target.value, så den omsætter det fra string */}
        {/* <select onChange={ (e) => setItemsPerPage (  ( + e.target.value)) }>  */}
        <select defaultValue={itemsPerPage} onChange={ (e) => 
            {setItemsPerPage (  parseInt(e.target.value)); 
            setCurrentPage(0); // når bruger ændrer antal items der skal vises pr. "side sendes han til side 0 (for at undgå at currenPage er en side som ikke længere findes)"
            } }> 

            {
                options.map(o => 

                    <option key={o} value={o}>{o}</option>

                )
            }

        </select>

    </div>

  );

};

export default AmountPerPage;