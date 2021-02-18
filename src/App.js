import React, {useEffect} from 'react';
import {BrowserRouter as Router, Switch, Route, withRouter} from "react-router-dom";
import {Redirect} from "react-router";

import './App.css';
import LoginPage from "./components/Pages/LoginPage.jsx";
import Navigation from "./components/Others/Navigation.jsx";
import RecordsToSignPage from "./components/Pages/RecordsToSignPage.jsx";
import SignedRecordsPage from "./components/Pages/SignedRecordsPage.jsx";
import AddRecordPage from "./components/Pages/AddRecordPage.jsx";
import FinderPage from "./components/Pages/FinderPage.jsx";
import SettingsPage from "./components/Pages/SettingsPage.jsx";
import LogoutPage from "./components/Pages/LogoutPage";
import {isAdmin, getUser, removeUser} from "./helpers/functions";
import Container from "react-bootstrap/Container";
import IdleTimer from "./helpers/IdleTimer";
import SavedRecordsPage from "./components/Pages/SavedRecordsPage";

function App() {

  const user = getUser();
  const admin = isAdmin();

  useEffect(() => {
    const timer = new IdleTimer({
      timeout: 60*10, // expire after 10 minutes
      onTimeout: () => {
        if (user !== null){
          removeUser()
          window.location.reload(false);
        }
      }
    });

    return () => {
      timer.cleanUp();
    };
  }, []);

  const Private = ({ component: Component, ...rest }) => {
    // Show the component only when the user is logged in
    // Otherwise, redirect the user to login page
    return (
      <>
        {user !== null ? <Route {...rest} render={props => <Component {...props} />} />
          : <Redirect to="/" />
        }
      </>
    )
  }

  const NavWithRouter = withRouter(Navigation); // get page with location

  return (
    <Router>
        <NavWithRouter/>
        <Container>
          <Switch>
            <Route path='/' exact component={LoginPage} />
            <Route path='/logout' exact component={LogoutPage} />
            <Private path="/records-to-sign" component={RecordsToSignPage}/>
            <Private path="/signed-records" component={SignedRecordsPage} />
            {admin &&
              <>
                <Private path="/add-record" component={AddRecordPage}/>
                <Private path="/saved-record" component={SavedRecordsPage}/>
                <Private path="/settings" component={SettingsPage}/>
              </>
            }
          </Switch>
        </Container>
        <div className="large-container">
          {admin && <Private path="/finder" component={FinderPage}/>}
        </div>
    </Router>
  );
}

export default App;
