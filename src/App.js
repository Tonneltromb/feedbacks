import React, {Component} from 'react';
import {Switch, Route} from "react-router-dom";

import './App.css';
import UserPage from "./user-module/UserPage/UserPage";
import FeedbackPage from "./customer-feedback-module/CustomerFeedback/CustomerFeedback";
import AdminPage from "./admin-module/AdminPage/AdminPage";

class App extends Component {
    render() {
        return (
            <div className="App">
                <Switch>
                    <Route path="/user" component={UserPage}/>
                    <Route path="/feedback" component={FeedbackPage}/>
                    <Route path="/admin" component={AdminPage}/>
                </Switch>
            </div>
        );
    }
}

export default App;
