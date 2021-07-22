import React from 'react';
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup(props) {

    const avatarReference = React.useRef();

    function handleSubmit(evt) {
        evt.preventDefault();
        props.onUpdateAvatar(avatarReference.current.value);
    }

    React.useEffect(() => {
        avatarReference.current.value = "";
      }, [props.isOpen]);

    return (
        <PopupWithForm name={"avatar"} title={"Обновить аватар"} submitButtonText={"Сохранить"} isOpen={props.isOpen} onClose={props.onClose} onSubmit={handleSubmit}>
            <input className="pop-up__input" id="url-avatar" type="url" name="avatar" placeholder="Ссылка на картинку" ref={avatarReference} required />
            <span className="pop-up__error" id="url-avatar-error"></span>
        </PopupWithForm>
    )
}

export default EditAvatarPopup;