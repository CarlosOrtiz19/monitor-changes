import logo from './logo.svg';
import './App.css';
import UrlInput from './components/UrlInput'
import ShowWebPage from './components/ShowWebPage'
import NavBarDrawer from './components/NavBarDrawer'
import TimeSelector from './components/TimeSelector'

function App() {
  return (
    <div className="App">

    <NavBarDrawer/>
    <ShowWebPage/>
    <TimeSelector/>
    </div>
  );
}

export default App;
