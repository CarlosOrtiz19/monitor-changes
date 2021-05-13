import {BrowserRouter as Router} from "react-router-dom";
import './App.css';
import NavBarDrawer from './components/NavBarDrawer';
import RouterApp from './components/Router';
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState, useEffect } from "react";

function App() {
    const [color, changeColor] = useState("#282c34");
    return (
        <div className="App" >
            <Router>
                <NavBarDrawer/>
                <RouterApp/>
            </Router>
        </div>
    );
}

export default App;
