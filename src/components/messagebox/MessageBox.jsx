// SCSS
import "./messagebox.scss";

const MessageBox = (props) => {

  // lyt efter klik på escape - og hvis .. så klad message-state i parent og tøm
  document.addEventListener("keydown", (e) => {

    if (e.key === "Escape") {
      props.emptyMessage()
    }

  })

  return (

    <div className="MessageBox">

      <h1>{props.messagetitle}</h1>

      {/* props.emptyMessage() er mulighed for at tømme message i parent = sluk message */}
      <button onClick={ () => props.emptyMessage() }>
        <span className="material-symbols-outlined">
          close
        </span>
      </button>
    </div>

  );

};

export default MessageBox;