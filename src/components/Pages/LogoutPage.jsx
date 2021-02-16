import React from "react";
import {Redirect} from "react-router";
import {removeUser} from "../../helpers/functions";

const LogoutPage = () => {

  removeUser();

  return (
    <Redirect to="/"/>
  )
};

export default LogoutPage;
