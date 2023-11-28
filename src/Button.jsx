/* eslint-disable react/prop-types */



export const Button = ({onClick, isOpen}) => { 

    return (
        <button className="btn-toggle" onClick={onClick}>
          {isOpen ? "–" : "+"}
        </button>
    )
}