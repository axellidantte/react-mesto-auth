import React from "react";

function ImagePopup(props) {
    return (
        <div className={`pop-up pop-up-img ${props.card && "pop-up_opened"}`}>
            <div className="pop-up-img__content">
                <img className="pop-up-img__big-img" alt={props.card.name} src={props.card.link} />
                <p className="pop-up-img__title">{props.card.name}</p>
                <button className="pop-up__exit-button" onClick={props.onClose}></button>
            </div>
        </div>
    );
}

export default ImagePopup;