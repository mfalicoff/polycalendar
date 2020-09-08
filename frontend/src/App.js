import React, {useState} from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Admin from './adminPanel/admin'
import Home from './home'

function App() {

  return (
    <div>
      <Router>
        <Switch>
          <Route path='/home' exact component={() => <Home/>}></Route>
          <Route path='/admin' exact component={() => <Admin/>}></Route>
        </Switch>
      </Router>
      
    </div>
  );
}

export default App;
