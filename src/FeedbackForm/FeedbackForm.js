import React, {Component} from 'react';

import axios from 'axios';

import './FeedbackForm.css';
import * as constants from '../common/constants';
import Spinner from "../common/components/Spinner/Spinner";
import FeedbackFormElement from "./FeedbackFormElement/FeedbackFormElement";

class FeedbackForm extends Component {
    state = {
        questions: [],
        loading: true,
        sending: false,
        sendSuccessful: false
    };

    componentDidMount() {
        axios.get(constants.GET_QUESTIONS_URL)
            .then((response) => {
                console.log('response', response.data);
                const arr = response.data.slice();
                this.setState({loading: false, questions: arr})
            })
            .catch((error) => {
                console.log('error', error);
                this.setState({loading: false})
            });
    }

    sendFeedback = () => {
        this.setState({sending: true});
        const sendObject = {storeUuid: '20170630-16F5-401C-805E-F71D266B7160'};
        let inputElements = document.getElementsByClassName('feedback-form-input');
        if (inputElements && inputElements.length) {
            const elementsArray = [...inputElements];
            const answers = elementsArray.map((elem) => {
                return {
                    questionId: elem.getAttribute('data-field-id'),
                    value: elem.getAttribute('data-field-value')
                }
            });
            sendObject['answers'] = answers;
            axios.post(constants.SEND_FEEDBACK_URL, sendObject)
                .then((response) => {
                    this.setState({sending: false, sendSuccessful: true});
                    console.log('response', response);
                })
                .catch((error) => {
                    console.log('error', error);
                    this.setState({sending: false})
                });
        }
    };

    render() {
        let additionalComponent = null;
        if (this.state.loading || this.state.sending) additionalComponent = <Spinner/>;
        return (
            <div className="FeedbackForm">
                {additionalComponent}
                <h1>Оставьте свой отзыв</h1>
                <div className='FeedbackForm-questions'>
                    {this.state.questions.map((question) => {
                        return <FeedbackFormElement
                            key={question.id}
                            questionObject={question}/>
                    })}
                </div>
                <button
                    className="FeedbackForm-send-button"
                    onClick={this.sendFeedback}
                >
                    Отправить
                </button>
            </div>
        );
    }
}

export default FeedbackForm;