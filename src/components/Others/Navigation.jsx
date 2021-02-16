import React from 'react';
import {Navbar, Nav, NavLink} from 'react-bootstrap';
import {getLanguage, getUser, isAdmin} from "../../helpers/functions";
import {wording} from "../../helpers/wording";

const Navigation = ({location}) => {

  const user = getUser();
  const admin = isAdmin();

  const language = getLanguage()
  let x = language === 'sk' ? wording.sk : wording.en
  x = x.navigation
  console.log(x)

  const LoginNav = () => {
    return (
      <>
        <NavLink href="/records-to-sign">{x.recordsToSign}</NavLink>
        <NavLink href="/signed-records">{x.signedRecords}</NavLink>
        {admin &&
          <>
          <NavLink href="/add-record">{x.addRecord}</NavLink>
          <NavLink href="/saved-record">{x.savedRecords}</NavLink>
          <NavLink href='/finder'>{x.finder}</NavLink>
          <NavLink href='/settings'>{x.settings}</NavLink>
          </>
        }
        <NavLink href='/logout'>{x.logout}</NavLink>
      </>
    )
  };

  const LogoutNav = () => {
    return (
      <NavLink href='/'>{x.login}</NavLink>
    )
  };

  return (
    <Navbar expand="md" bg="dark" variant="dark" className="sticky-nav">
      <Navbar.Brand href="#home">
        <img
          alt="logo"
          src="/gefco_logo.png"
          width="50"
          height="50"
          className="d-inline-block align-top"
        />
      </Navbar.Brand>
      <Navbar.Toggle/>
      <Navbar.Collapse id="responsive-navbar-nav">
      <Nav className="ml-auto" variant="pills" activeKey={location.pathname}>
        {user !== null ? <LoginNav/> : <LogoutNav/>}
      </Nav>
      </Navbar.Collapse>
    </Navbar>
  )
};

export default Navigation;
