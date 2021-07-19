import React from "react";
import { Switch, Route, Redirect } from "react-router";
// import Header from './Header';
// import Footer from './Footer';
import HomePage from "./HomePage";
import ManageCards from "./ManageCards";
import ManageUsers from "./ManageUsers";
import LoginPage from "./LoginPage";
import ForgotPassword from "./ForgotPassword";
import { AuthProvider } from "../contexts/AuthContext";
import PrivateRoute from "./PrivateRoute";
import Signup from "./Signup";

const Main = () => {
  return (
    <div>
      {/* <Header/> */}
      <AuthProvider>
        <Switch>
          {/* <PrivateRoute exact path="/home" component={HomePage} />
          <PrivateRoute exact path="/managecards" component={ManageCards} />
          <PrivateRoute exact path="/manageusers" component={ManageUsers} /> */}
          <Route
            exact
            path="https://modest-allen-78ed87.netlify.app/home"
            component={HomePage}
          />
          <Route
            exact
            path="https://modest-allen-78ed87.netlify.app/managecards"
            component={ManageCards}
          />
          <Route
            exact
            path="https://modest-allen-78ed87.netlify.app/manageusers"
            component={ManageUsers}
          />
          {/* <PrivateRoute exact path="/manageusers/:userId" component={ManageUsers}/> */}
          <Route
            path="https://modest-allen-78ed87.netlify.app/login"
            component={LoginPage}
          />
          <Route
            path="https://modest-allen-78ed87.netlify.app/signup"
            component={Signup}
          />
          <Route
            exact
            path="https://modest-allen-78ed87.netlify.app/forgot-password"
            component={ForgotPassword}
          />
          <Redirect to="https://modest-allen-78ed87.netlify.app/login" />
        </Switch>
      </AuthProvider>
      {/* <Footer/> */}
    </div>
  );
};

export default Main;
