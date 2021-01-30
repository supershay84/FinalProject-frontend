import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles';
import createMuiTheme from '@material-ui/core/styles/createMuiTheme';
// COMPONENTS
import NavBar from './Components/NavBar';
// PAGES
import home from './Pages/home';
import login from './Pages/login';
import signup from './Pages/signup';

const theme = createMuiTheme({
    palette: {
      primary: {
        main: '#212121'
      },
      secondary: {
        main: '#311b92'
      }
    },
    typography: {
      useNextVariants: true
    }
})

function App() {
  return (
    <MuiThemeProvider theme ={theme}>
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
    </MuiThemeProvider>
  );
}

export default App;
