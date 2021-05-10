import React from "react";
import {
    Route, Switch
} from "react-router-dom";
import MonitorByEmail from "./MonitorByEmail";
import NavBarDrawer from './NavBarDrawer';
import ShowWebPage from "./ShowWebPage";
import Home from "./Home";


export default function RouterApp() {
    return (
        <>
            <NavBarDrawer/>
            <Switch>
                <Route exact from="/home" render={props => <Home {...props} />}/>
                <Route exact from="/create" render={props => <ShowWebPage {...props} />}/>
                <Route exact from="/my-monitors" render={props => <MonitorByEmail {...props} />}/>
            </Switch>
        </>

    );
}
