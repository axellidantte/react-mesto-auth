import React from 'react';
import Card from './Card';
import CurrentUserContext from '../contexts/CurrentUserContext';

function Main(props) {

    const currentUser = React.useContext(CurrentUserContext);

    return (
        <main className="main">
            <section className="profile">
                <button className="profile__avatar-edit-button" onClick={props.onEditAvatar} >
                    <img className="profile__avatar" src={currentUser.avatar} alt="Фото профиля" />
                </button>
                <div className="profile__info">
                    <div className="profile__info-left-column">
                        <div className="profile__info-name">
                            <h1 className="profile__title">{currentUser.name}</h1>
                            <button type="button" className="profile__edit-button" onClick={props.onEditProfile}></button>
                        </div>
                        <p className="profile__subtitle">{currentUser.about}</p>
                    </div>
                    <button type="button" className="profile__add-button" onClick={props.onAddPlace}></button>
                </div>
            </section>
            <section className="elements">
                <div className="elements__cards">
                    {props.cards.map((card) => (
                        <Card
                            card={card}
                            key={card._id}
                            onCardClick={props.onCardClick}
                            onCardDelete={props.handleCardDelete}
                            onCardLike={props.handleCardLike}
                        />
                    ))}
                </div>
            </section>
        </main>
    );
}

export default Main;