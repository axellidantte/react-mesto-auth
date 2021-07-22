import React from 'react';
import PopupWithForm from "./PopupWithForm";
import CurrentUserContext from "../contexts/CurrentUserContext";

function EditProfilePopup(props) {

    const [name, setName] = React.useState('');
    const [description, setDescription] = React.useState('');
    const currentUser = React.useContext(CurrentUserContext);

    React.useEffect(() => {
        setName(currentUser.name);
        setDescription(currentUser.about);
    }, [currentUser, props.isOpen]);

    function handleSubmit(evt) {
        evt.preventDefault();
        props.onUpdateUser({
            name,
            about: description,
        });
    }

    function changeName(evt) {
        setName(evt.target.value);
    }

    function changeDescription(evt) {
        setDescription(evt.target.value);
    }

    return (
        <PopupWithForm isOpen={props.isOpen} onClose={props.onClose} name={"edit"} title={"Редактировать профиль"} submitButtonText={"Сохранить"} onSubmit={handleSubmit}>
            <input className="pop-up__input" type="text" id="input-profile-title" name="name" minLength="2" maxLength="40" placeholder="Имя" required value={name || ""} onChange={changeName} />
            <span className="pop-up__error" id="input-profile-title-error"></span>
            <input className="pop-up__input" type="text" id="input-profile-subtitle" name="about" minLength="2" maxLength="200" placeholder="О Себе" required value={description || ""} onChange={changeDescription} />
            <span className="pop-up__error" id="input-profile-subtitle-error"></span>
        </PopupWithForm>
    )
}

export default EditProfilePopup;