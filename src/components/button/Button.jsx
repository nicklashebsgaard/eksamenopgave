// SCSS 
import "./button.scss";

const Button = ({children}) => {

  return (

    <button className='Button buttonStyle'>
        {children}
    </button>

  );

};

export default Button;