import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles';
import { createMuiTheme } from '@material-ui/core/styles';
import NavBar from './Components/NavBar';
import home from './Pages/home';
import login from './Pages/login';
import signup from './Pages/signup';
import themeFile from './utilities/themes';
import jwt from 'jwt-decode';
import AuthRoute from './utilities/AuthRoute';
import { Provider } from 'react-redux';
import store from './redux/store';
import { SET_AUTHENTICATED } from './redux/types';
import { logoutUser, getUserData } from './redux/actions/userActions';
import axios from 'axios';

const theme = createMuiTheme(themeFile);

const token = localStorage.FBIdToken;
if(token){
  const decodedToken = jwt(token);
  console.log(decodedToken);
  // BECAUSE FIREBASE TOKENS EXPIRE AFTER AND HOUR :|
  if (decodedToken.exp * 1000 < Date.now()){
    store.dispatch(logoutUser())
    window.location.href = '/login'
  } else {
    store.dispatch({ type: SET_AUTHENTICATED });
    axios.defaults.headers.common['Authorization'] = token;
    store.dispatch(getUserData());
  }
}

function App() {
  return (
    <MuiThemeProvider theme ={theme}>
    <Provider store={store}>
      <div className="App">
      <Router>
       <NavBar/>
       <div className="container">
        <Switch>
          <Route exact path="/" 
                 component={home}
                 />
          <AuthRoute exact path="/login" 
                     component={login} 
                    />
          <AuthRoute exact path="/signup" 
                     component={signup} 
                    />
        </Switch>
       </div>
      </Router>
    </div>
    </Provider>
    </MuiThemeProvider>
  );
}

export default App;
