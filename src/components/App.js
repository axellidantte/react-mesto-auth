import React from "react";
import * as auth from "../utils/auth";
import { Route, Switch, Redirect, useHistory } from "react-router-dom";
import "../index.css";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import api from "../utils/api.js";
import CurrentUserContext from "../contexts/CurrentUserContext";
import ImagePopup from "./ImagePopup";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import Login from "./Login";
import Register from "./Register";
import ProtectedRoute from "./ProtectedRoute";
import InfoTooltip from "./InfoTooltip.js";


function App() {

    const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
    const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
    const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
    const [selectedCard, setSelectedCard] = React.useState(null);
    const [currentUser, setCurrentUser] = React.useState({});
    const [cards, setCards] = React.useState([]);
    const [loggedIn, setLoggedIn] = React.useState(false);
    const [email, setEmail] = React.useState("");
    const [isInfoTooltipOpen, setIsInfoTooltipOpen] = React.useState(false);
    const history = useHistory();
    const [isSuccess, setSuccess] = React.useState(false);

    React.useEffect(() => {
        checkToken();
        Promise.all([api.getUserInfo(), api.getInitialCards()])
            .then(([userData, initialCards]) => {
                setCurrentUser(userData);
                setCards(initialCards);
            })
            .catch((err) => console.log(err));
    }, []);

    function checkToken() {
        const localToken = localStorage.getItem("jwt");
        if (localToken) {
            auth
                .checkToken(localToken)
                .then((data) => {
                    if (data) {
                        setLoggedIn(true);
                        setEmail(data.data.email);
                        history.push("/");
                    } else {
                        setSuccess(false);
                        setIsInfoTooltipOpen(true);
                    }
                })
                .catch((err) => {
                    console.error(err);
                    setSuccess(false);
                    setIsInfoTooltipOpen(true);
                })
        }
    }

    function handleEditProfileClick() {
        setIsEditProfilePopupOpen(true);
    }

    function handleAddPlaceClick() {
        setIsAddPlacePopupOpen(true);
    }

    function handleEditAvatarClick() {
        setIsEditAvatarPopupOpen(true);
    }

    function handleCardClick(card) {
        setSelectedCard(card);
    }

    function handleCardLike(card) {
        const isLiked = card.likes.some(i => i._id === currentUser._id);
        api
            .changeLikeCardStatus(card._id, !isLiked)
            .then((newCard) => {
                setCards((state) => state.map(c => (c._id === card._id ? newCard : c)));
            })
            .catch((err) => console.log(err));
    }

    function handleCardDelete(card) {
        api
          .deleteCard(card._id)
          .then((res) => {
            setCards(() => cards.filter((c) => c._id !== card._id));
          })
          .catch((err) => console.log(err));
      }

    function handleUpdateUser(data) {
        api
            .editUserInfo(data)
            .then((data) => {
                setCurrentUser(data);
                closeAllPopups();
            })
            .catch((err) => console.log(err));
    }

    function handleUpdateAvatar(link) {
        api
            .newAvatar(link)
            .then((data) => {
                setCurrentUser(data);
                closeAllPopups();
            })
            .catch((err) => console.log(err));
    }

    function handleAddPlaceSubmit(name, link) {
        api
            .addCard(name, link)
            .then((newCard) => {
                setCards([newCard, ...cards]);
                closeAllPopups();
            })
            .catch((err) => console.log(err));
    }

    function handleRegister(email, password) {
        auth
            .register(email, password)

            .then(() => {
                history.push("/sign-in");
                setSuccess(true);
                setIsInfoTooltipOpen(true);
            })
            .catch((err) => {
                console.error(err);
                setSuccess(false);
                setIsInfoTooltipOpen(true);
            });
    }

    function handleLogin(email, password) {
        auth
            .authorize(email, password)
            .then((data) => {
                localStorage.setItem("jwt", data.token);
                setEmail(email);
                setLoggedIn(true);
                history.push("/");
            })
            .catch((err) => {
                console.error(err);
                setSuccess(false);
                setIsInfoTooltipOpen(true);
            });
    }

    function handleLogout() {
        localStorage.removeItem("jwt");
        setEmail("");
        setLoggedIn(false);
        history.push("/sign-in");
    }

    function closeAllPopups() {
        setIsEditProfilePopupOpen(false);
        setIsAddPlacePopupOpen(false);
        setIsEditAvatarPopupOpen(false);
        setSelectedCard(null);
        setIsInfoTooltipOpen(false);
    }

    return (
        <CurrentUserContext.Provider value={currentUser}>

            <div className="page">
                <Header
                    loggedIn={loggedIn}
                    email={email}
                    onSignout={handleLogout}
                />

                <Switch>
                    <ProtectedRoute
                        exact path="/"
                        component={Main}
                        onEditAvatar={handleEditAvatarClick}
                        onEditProfile={handleEditProfileClick}
                        onAddPlace={handleAddPlaceClick}
                        onCardClick={handleCardClick}
                        onCardLike={handleCardLike}
                        onCardDelete={handleCardDelete}
                        cards={cards}
                        loggedIn={loggedIn}
                    />

                    <Route path="/sign-in">
                        <Login onLogin={handleLogin} />
                    </Route>

                    <Route path="/sign-up">
                        <Register onRegister={handleRegister} />
                    </Route>

                    <Route>
                        {loggedIn ? <Redirect to="/" /> : <Redirect to="/sign-in" />}
                    </Route>
                </Switch>

                <Footer />
            </div>

            <EditProfilePopup
                isOpen={isEditProfilePopupOpen}
                onClose={closeAllPopups}
                onUpdateUser={handleUpdateUser}
            />

            <EditAvatarPopup
                isOpen={isEditAvatarPopupOpen}
                onClose={closeAllPopups}
                onUpdateAvatar={handleUpdateAvatar}
            />

            <AddPlacePopup
                isOpen={isAddPlacePopupOpen}
                onClose={closeAllPopups}
                onAddPlace={handleAddPlaceSubmit}
            />

            <ImagePopup
                card={selectedCard !== null && selectedCard}
                onClose={closeAllPopups}
            />

            <InfoTooltip
                isOpen={isInfoTooltipOpen}
                onClose={closeAllPopups}
                success={isSuccess}
            />

        </CurrentUserContext.Provider>
    );
}

export default App;