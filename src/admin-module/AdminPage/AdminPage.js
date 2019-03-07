import React, {Component} from 'react';

import {Route} from "react-router-dom";

import './AdminPage.css';
import FormEditor from "./FormEditor/FormEditor";
import Feedbacks from "./Feedbacks/Feedbacks";

class AdminPage extends Component {
    render() {
        return (
            <div className='AdminComponent'>
                <div className='AdminComponent-navigation'>
                    <h3>Панель администратора</h3>
                    <div
                        className='nav-button'
                        onClick={() => this.props.history.push(`${this.props.match.url}/showFeedbacks`)}>
                        Отзывы
                    </div>
                    <div
                        className='nav-button'
                        onClick={() => this.props.history.push(`${this.props.match.url}/editFeedbackForm`)}>
                        Редактирование опроса
                    </div>
                </div>
                <div className='AdminComponent-content'>
                    <Route path={`${this.props.match.url}/editFeedbackForm`} component={FormEditor}/>
                    <Route path={`${this.props.match.url}/showFeedbacks`} component={Feedbacks}/>
                </div>
            </div>
        );
    }
}

export default AdminPage;