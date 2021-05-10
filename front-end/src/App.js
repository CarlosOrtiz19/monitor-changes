import {BrowserRouter as Router} from "react-router-dom";
import './App.css';
import NavBarDrawer from './components/NavBarDrawer';
import RouterApp from './components/Router';

function App() {
    return (
        <div className="App">
            <Router>
                <NavBarDrawer/>
                <RouterApp/>
            </Router>
        </div>
    );
}

export default App;
