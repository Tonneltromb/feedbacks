import React, {Component} from 'react';
import {Switch, Route} from "react-router-dom";

import './App.css';
import LkEvotor from "./LkEvotor/LkEvotor";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Switch>
          <Route path="/lkEvotor" component={LkEvotor}/>
        </Switch>
      </div>
    );
  }
}

export default App;
