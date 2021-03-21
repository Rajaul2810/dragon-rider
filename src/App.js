
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Home from './Components/Home/Home';
import Destination from './Components/Destination/Destination';
import Login from './Components/Login/Login';
import Contact from './Components/Contact/Contact';
import Header from './Components/Header/Header';
import About from './Components/About/About';
import PrivateRoute from './Components/PrivateRoute/PrivateRoute';
import { createContext, useState } from 'react';

export const userContext = createContext();

function App() {
  const [loggedInUser,setLoggedInUser] = useState({});
  return (
  <userContext.Provider value={[loggedInUser,setLoggedInUser]}>
    <Router>
      <Header/>
      <Switch>
      <Route exact path="/">
          <Home/>
        </Route>
        <Route path="/home">
          <Home/>
        </Route>
        <PrivateRoute path="/destination/:CarName">
           <Destination/>
        </PrivateRoute>
        <Route path="/login">
           <Login/>
        </Route>
        <Route path="/about">
           <About/>
        </Route>
        <Route path="/contact">
           <Contact/>
        </Route>
      </Switch>
     </Router>
    </userContext.Provider>
  );
}

export default App;
