import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

import { Button, Navbar } from "react-bootstrap";
import React, { useEffect, useState } from "react";
import {
  Redirect,
  Route,
  BrowserRouter as Router,
  Switch,
} from "react-router-dom";

import AuthService from "./services/auth.service";
import HomePage from "./views/HomePage";
import Login from "./components/LoginForm";

const App = () => {
  const [currentUser, setCurrentUser] = useState(undefined);

  useEffect(() => {
    const user = AuthService.getCurrentUser();
    if (user) {
      setCurrentUser(user);
    }
  }, []);

  const logOut = () => {
    AuthService.logout();
  };

  return (
    <Router>
      <div>
        <Navbar bg="dark" variant="dark">
          <Navbar.Brand href="#home">
            Hi {currentUser ? currentUser.name : ""}
          </Navbar.Brand>
          <Navbar.Toggle />
          <Navbar.Collapse className="justify-content-end">
            <Button variant="outline-info" onClick={logOut}>
              Logout
            </Button>
          </Navbar.Collapse>
        </Navbar>
        <div className="container mt-3">
          <Switch>
            <Route exact path="/login" component={Login} />
            <PrivateRoute path={["/", "/home"]}>
              <HomePage />
            </PrivateRoute>
          </Switch>
        </div>
      </div>
    </Router>
  );
};

const PrivateRoute = ({ children, ...rest }) => {
  const user = AuthService.getCurrentUser();

  return (
    <Route
      {...rest}
      render={({ location }) => {
        if (user) {
          return children;
        }
        return (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: location },
            }}
          />
        );
      }}
    />
  );
};

export default App;
