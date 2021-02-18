import React, {useEffect, useState} from "react";
import {Redirect} from "react-router";
import useSessionStorage from "@rooks/use-sessionstorage";
import LoginForm from "../Forms/LoginForm";
import {getUser} from "../../helpers/functions";

const LoginPage = () => {

  const [language, setLanguage] = useSessionStorage("language", "sk");
  const [notification, setNotification] = useState();

  let cardInput = '';
  const maxCardInputTimeDifference = 40;
  const cardInputLength = 10;
  let t = cardInputTimeout();
  clearTimeout(t);

  function cardInputTimeout() {
    return setTimeout(checkInput, maxCardInputTimeDifference);
  }

  function isLetter(e) {
    let aKeycode = 65;
    let zKeycode = 90;

    return e.keyCode >= aKeycode && e.keyCode <= zKeycode
  }

  function isNumber(e) {
    let zeroKeycode = 48;
    let nineKeycode = 57;

    return e.keyCode >= zeroKeycode && e.keyCode <= nineKeycode
  }

  function isValiable(e) {
    return isLetter(e) || isNumber(e)
  }

  function emptyCardInput() {
    cardInput = '';
  }

  function checkInput() {
    if(cardInput.length === cardInputLength) {
      console.log(`checking card ${cardInput}`);
      findByCard(cardInput);
    } else {
      console.log('emptying input');
    }
    emptyCardInput();
  }

  const event = (e) => {
    let engInput = String.fromCharCode(e.keyCode).toLowerCase()
    if(isValiable(e)) {
      cardInput += engInput;
      clearTimeout(t);
      t = cardInputTimeout();
    }
  }

  useEffect(() => {
    document.addEventListener('keydown', event)
    return () => document.removeEventListener("keydown", event); // cleanup
  })

  const setLoginError = (body) => {
    setNotification({
      variant: 'danger',
      body: body
    })
  }

  const setUser = (data) => {
    const user = {
      id: data.id,
      role: data.role
    }
    sessionStorage.setItem('user', JSON.stringify(user))
    window.location.reload(false);
  }

  const onSubmit = (data) => {
    fetch('/login', {
      method: "POST",
      body: new URLSearchParams(`email=${data.email}&password=${data.password}`)
    })
      .then(response => response.json())
      .then(data => { setUser(data) })
      .catch(() => setLoginError("Wrong login input"))
  }

  const findByCard = (input) => {
    fetch('/kiosk', {
      method: "POST",
      body: new URLSearchParams(`card=${input}`)
    })
      .then(response => response.json())
      .then(data => { setUser(data) })
      .catch(() => setLoginError("Wrong card input"))
  }

  if (getUser() !== null)
    return <Redirect to="/records-to-sign"/>

  return (
    <LoginForm
      onSubmit={onSubmit}
      language={language}
      setLanguage={setLanguage}
      notification={notification}
    />
  )
};

export default LoginPage
