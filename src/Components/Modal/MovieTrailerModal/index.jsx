import React from "react";
import "./index.scss";

const index = ({ isOpen, onClose, title, children }) => {

    if (!isOpen) return null;


    return (

        <div className="modal-overlay">
            <div className="movie-modal">
                <div className="modal-header">
                    <h2>
                        {title}
                    </h2>
                    <button onClick={onClose}>
                        <i className="fa-solid fa-xmark"></i>
                    </button>
                </div>

                <div className="trailer-container">
                    {children}
                </div>
            </div>
        </div>
    )
}


export default index;