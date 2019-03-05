import React, {Component} from 'react';
import {Switch, Route} from "react-router-dom";

import './App.css';
import UserComponent from "./UserComponent/UserComponent";
import FeedbackPage from "./FeedbackForm/FeedbackForm";
import AdminComponent from "./admin-module/AdminComponent/AdminComponent";

class App extends Component {
    render() {
        return (
            <div className="App">
                <Switch>
                    <Route path="/user" component={UserComponent}/>
                    <Route path="/feedback" component={FeedbackPage}/>
                    <Route path="/admin" component={AdminComponent}/>
                </Switch>
            </div>
        );
    }
}

export default App;
