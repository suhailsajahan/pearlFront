import React from 'react';
import { Switch, Route, Redirect } from 'react-router';
// import Header from './Header';
// import Footer from './Footer';
import HomePage from './HomePage';
import ManageCards from './ManageCards';
import ManageUsers from './ManageUsers';
import LoginPage from './LoginPage';
import ForgotPassword from './ForgotPassword';
import {AuthProvider} from '../contexts/AuthContext';
import PrivateRoute from './PrivateRoute';
import Signup from "./Signup"



const Main = () => {

        return(
            <div>
                {/* <Header/> */}
                <AuthProvider>
                    <Switch>
                        <PrivateRoute exact path="/home" component={HomePage}/>
                        <PrivateRoute exact path="/managecards" component={ManageCards}/>
                        <PrivateRoute exact path="/manageusers" component={ManageUsers}/>
                        {/* <Route exact path="/home" component={HomePage}/>
                        <Route exact path="/managecards" component={ManageCards}/>
                        <Route exact path="/manageusers" component={ManageUsers}/> */}
                        {/* <PrivateRoute exact path="/manageusers/:userId" component={ManageUsers}/> */}
                        <Route path="/login" component={LoginPage}/>
                        <PrivateRoute path="/signup" component={Signup} />
                        <Route exact path="/forgot-password" component={ForgotPassword}/>
                        <Redirect to="/login"/>
                    </Switch>
                </AuthProvider>
                {/* <Footer/> */}
            </div>
        );
}

export default Main;