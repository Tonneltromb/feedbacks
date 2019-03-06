import React, {Component} from 'react';

import axios from 'axios';

import './CustomerFeedback.css';
import * as constants from '../../common-module/constants';
import * as QuestionType from '../../common-module/QuestionType';
import Spinner from "../../common-module/components/Spinner/Spinner";
import Rating from "./Questions/Rating/Rating";
import TextArea from "./Questions/TextArea/TextArea";

class CustomerFeedback extends Component {
    state = {
        questions: [],
        showSpinner: true,
        sending: false,
        sendSuccessful: false
    };

    componentDidMount() {
        axios.get(constants.GET_QUESTIONS_URL)
            .then((response) => {
                const arr = response.data.slice();
                this.setState({showSpinner: false, questions: arr})
            })
            .catch((error) => {
                console.log('error', error);
                this.setState({showSpinner: false})
            });
    }

    renderQuestion = (question) => {
        switch (question.question_type) {
            case QuestionType.DEFAULT_STAR_RATING: {
                return <Rating questionId={question.id} title={question.question_text}/>;
            }
            case QuestionType.DEFAULT_COMMENT: {
                return <TextArea questionId={question.id}/>;
            }
            case QuestionType.ADDITIONAL_STAR_RATING : {
                return <Rating
                    questionId={question.id}
                    title={question.question_text}/>;
            }
            case QuestionType.ADDITIONAL_TEXT_QUESTION : {
                return <TextArea
                    questionId={question.id}
                    title={question.question_text} />;
            }
            default:
                return null;
        }
    };

    renderQuestions = () => {
        const defaultQuestions = (
            <div className='CustomerFeedback__question'>
                {
                    this.state.questions
                        .filter((question) => QuestionType.isDefault(question.question_type))
                        .map((question) => this.renderQuestion(question))
                }
            </div>
        );
        const addedQuestions = this.state.questions
            .filter((question) => !QuestionType.isDefault(question.question_type))
            .map((question) => (
                <div className='CustomerFeedback__question'>
                    {this.renderQuestion(question)}
                </div>
            ));
        return [defaultQuestions, ...addedQuestions];
    };

    sendFeedback = () => {
        this.setState({showSpinner: true});
        const sendObject = {storeUuid: '20170630-16F5-401C-805E-F71D266B7160'};
        let inputElements = document.getElementsByClassName('feedback-form-input');
        if (inputElements && inputElements.length) {
            const elementsArray = [...inputElements];
            sendObject['answers'] = elementsArray.map((elem) => {
                return {
                    questionId: elem.getAttribute('data-field-id'),
                    value: elem.getAttribute('data-field-value')
                }
            });
            axios.post(constants.SEND_FEEDBACK_URL, sendObject)
                .then((response) => {
                    this.setState({showSpinner: false, sendSuccessful: true});
                })
                .catch((error) => {
                    console.log('error', error);
                    this.setState({showSpinner: false})
                });
        }
    };

    render() {
        let additionalComponent = null;
        if (this.state.showSpinner) additionalComponent = <Spinner/>;
        return (
            <div className="CustomerFeedback">
                {additionalComponent}
                <h1>Оставьте свой отзыв</h1>
                <div className='CustomerFeedback__questions'>
                    {this.renderQuestions()}
                </div>
                <div className='CustomerFeedback__send-button'>
                    <button className="blue-button" onClick={this.sendFeedback}>Отправить</button>
                </div>
            </div>
        );
    }
}

export default CustomerFeedback;