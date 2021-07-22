import React from "react";
import popupSuccessLogo from "./../images/popup__successReg.svg";
import popupFailLogo from "./../images/popup__failReg.svg";

function InfoTooltip(props) {
  return (
    <section className={`pop-up pop-up_${props.name} ${props.isOpen && "pop-up_opened"}`}>
      <div className="pop-up__content">
        <button className="pop-up__exit-button" type="button" onClick={props.onClose}></button>
        <div className="pop-up__tooltip">
          <img className="pop-up__tooltip-pic" src={props.success ? popupSuccessLogo : popupFailLogo}  alt="Статус завершения регистрации"/>
          <p className="pop-up__tooltip-title">{props.success ? "Вы успешно зарегистрировались!" : "Что-то пошло не так! Попробуйте ещё раз."}</p>
        </div>
      </div>
    </section>
  );
}

export default InfoTooltip; 
