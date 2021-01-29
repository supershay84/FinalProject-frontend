import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
// COMPONENTS
import NavBar from './Components/NavBar';
// PAGES
import home from './Pages/home';
import login from './Pages/login';
import signup from './Pages/signup';

function App() {
  return (
    <div className="App">
      <Router>
       <NavBar/>
       <div className="container">
        <Switch>
          <Route exact path="/" component={home}/>
          <Route exact path="/login" component={login}/>
          <Route exact path="/signup" component={signup}/>
        </Switch>
       </div>
      </Router>
    </div>
  );
}

export default App;
