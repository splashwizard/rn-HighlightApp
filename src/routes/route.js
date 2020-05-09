import React, { Component } from 'react';
import { Switch, Route } from 'react-router-native';
import Login from '../pages/Login';
import Home from '../pages/Home';


const Routes = () => (
    <Switch>
        {/* <Route exact path="/" component={Login}></Route>
        <Route exact path="/home" component={Home}></Route> */}
        <Route exact path="/" component={Home}></Route>
    </Switch>
)
export default Routes;
