import React, {Component} from 'react';

import {Route, Link} from "react-router-dom";

import './AdminComponent.css';
import FeedbackFormEditor from "../FeedbackFormEditor/FeedbackFormEditor";

class AdminComponent extends Component {
    render() {
        return (
            <div className='AdminComponent'>
                <div className='AdminComponent-navigation'>
                    <h3>Панель администратора</h3>
                    <ul>
                        <li>
                            <Link to={`${this.props.match.url}/editFeedbackForm`}>
                                Редактирование опроса
                            </Link>
                        </li>
                    </ul>
                </div>
                <div className='AdminComponent-content'>
                    <Route path={`${this.props.match.url}/editFeedbackForm`} component={FeedbackFormEditor}/>
                </div>
            </div>
        );
    }
}

export default AdminComponent;