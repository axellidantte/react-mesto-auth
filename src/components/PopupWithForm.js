import React from "react";

function PopupWithForm(props) {
    return (
        <div className={`pop-up pop-up_${props.name} ${props.isOpen && "pop-up_opened"}`}>
            <div className={`pop-up__content pop-up__content_${props.name}`}>
                <h2 className="pop-up__title">{props.title}</h2>
                <form className="pop-up__form" name={props.name} onSubmit={props.onSubmit}>
                    {props.children}
                    <button type="submit" className="pop-up__button">{props.submitButtonText}</button>
                </form>
                <button type="button" className="pop-up__exit-button" onClick={props.onClose}></button>
            </div>
        </div>
    );
}

export default PopupWithForm;