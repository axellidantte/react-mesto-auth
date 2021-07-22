import React from "react";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup(props) {
    const [name, setName] = React.useState("");
    const [link, setLink] = React.useState("");

    function handleSubmit(e) {
        e.preventDefault();
        props.onAddPlace(name, link);
    }

    function handleSetName(e) {
        setName(e.target.value);
    }

    function handleSetLink(e) {
        setLink(e.target.value);
    }

    React.useEffect(() => {
        setName("");
        setLink("");
    }, [props.isOpen]);

    return (
        <PopupWithForm name={"add"} title={"Новое место"} submitButtonText={"Создать"}
            isOpen={props.isOpen} 
            onClose={props.onClose}  
            onSubmit={handleSubmit}>
            <input className="pop-up__input" id="popup-add-title" type="text" name="place" placeholder="Название" minLength="2" maxLength="30" required onChange={handleSetName} value={name || ""} />
            <span className="pop-up__error" id="popup-add-title-error"></span>
            <input className="pop-up__input" id="popup-add-link" type="url" name="url" placeholder="Ссылка на картинку" required onChange={handleSetLink} value={link || ""} />
            <span className="pop-up__error" id="popup-add-link-error"></span>
        </PopupWithForm>
    );
}

export default AddPlacePopup;