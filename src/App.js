import React, {Component} from 'react';
import {Switch, Route} from "react-router-dom";

import './App.css';
import LkEvotor from "./LkEvotor/LkEvotor";
import FeedbackPage from "./FeedbackForm/FeedbackForm";
import AdminComponent from "./admin-module/AdminComponent/AdminComponent";

/* todo: переименовать LkEvotor в UserComponent */
class App extends Component {
    render() {
        return (
            <div className="App">
                <Switch>
                    <Route path="/user" component={LkEvotor}/>
                    <Route path="/feedback" component={FeedbackPage}/>
                    <Route path="/admin" component={AdminComponent}/>
                </Switch>
            </div>
        );
    }
}

export default App;
