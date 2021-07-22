import React from "react";
import CurrentUserContext from "../contexts/CurrentUserContext";

function Card(props) {

    const currentUser = React.useContext(CurrentUserContext);
    const isOwn = props.card.owner._id === currentUser._id;
    const cardDeleteButtonClassName = `elements__delete-button ${isOwn ? "elements__delete-button_active" : ""}`;
    const isLiked = props.card.likes.some(i => i._id === currentUser._id);
    const cardLikeButtonClassName = `elements__like-button ${isLiked ? "elements__like-button_active" : ""}`;

    function handleClick() {
        props.onCardClick(props.card);
    }

    function handleLikeClick() {
        props.onCardLike(props.card);
    }

    function handleDeleteClick(card) {
        props.onCardDelete(props.card);
    }


    return (
        <div className="elements__card">
            <img className="elements__card-image" src={props.card.link} alt={props.card.name} onClick={handleClick} />
            <button type="button" className={cardDeleteButtonClassName} onClick={handleDeleteClick}></button>
            <h2 className="elements__title">{props.card.name}</h2>
            <div className="elements__group">
                <button type="button" className={cardLikeButtonClassName} onClick={handleLikeClick}></button>
                <span className="elements__counter">{props.card.likes.length}</span>
            </div>
        </div>
    );
}

export default Card;