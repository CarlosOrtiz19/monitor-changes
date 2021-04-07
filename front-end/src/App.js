import logo from './logo.svg';
import './App.css';
import UrlInput from './components/UrlInput'
import ShowWebPage from './components/ShowWebPage'
import NavBarDrawer from './components/NavBarDrawer'

function App() {
  return (
    <div className="App">
    <NavBarDrawer/>
    <ShowWebPage/>
    </div>
  );
}

export default App;
