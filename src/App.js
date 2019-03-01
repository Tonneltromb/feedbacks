import React, {Component} from 'react';
import {Switch, Route} from "react-router-dom";

import './App.css';
import LkEvotor from "./LkEvotor/LkEvotor";
import FeedbackPage from "./FeedbackForm/FeedbackForm";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Switch>
          <Route path="/lkEvotor" component={LkEvotor}/>
          <Route path="/feedback" component={FeedbackPage}/>
        </Switch>
      </div>
    );
  }
}

export default App;
