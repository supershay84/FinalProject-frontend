import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles';
import createMuiTheme from '@material-ui/core/styles/createMuiTheme';
import NavBar from './Components/NavBar';
import home from './Pages/home';
import login from './Pages/login';
import signup from './Pages/signup';
import themeFile from './utilities/themes';
import jwt from 'jwt-decode';
import AuthRoute from './utilities/AuthRoute';

const theme = createMuiTheme(themeFile);
let authenticated;

const token = localStorage.FBIdToken;
if(token){
  const decodedToken = jwt(token);
  console.log(decodedToken);
  // BECAUSE FIREBASE TOKENS EXPIRE AFTER AND HOUR :|
  if (decodedToken.exp * 1000 < Date.now()){
    window.location.href = '/login'
    authenticated = false;
  } else {
    authenticated = true;
  }
}

function App() {
  return (
    <MuiThemeProvider theme ={theme}>
      <div className="App">
      <Router>
       <NavBar/>
       <div className="container">
        <Switch>
          <Route exact path="/" component={home}/>
          <AuthRoute exact path="/login" 
                     component={login} 
                     authenticated={authenticated}/>
          <AuthRoute exact path="/signup" 
                     component={signup} 
                     authenticated={authenticated}/>
        </Switch>
       </div>
      </Router>
    </div>
    </MuiThemeProvider>
  );
}

export default App;
