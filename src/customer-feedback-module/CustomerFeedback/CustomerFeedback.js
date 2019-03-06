import React, {Component} from 'react';

import axios from 'axios';

import './CustomerFeedback.css';
import * as constants from '../../common-module/constants/constants';
import * as QuestionType from '../../common-module/constants/QuestionType';
import Spinner from "../../common-module/components/Spinner/Spinner";
import StarRatingWrapper from './StarRatingWrapper/StarRatingWrapper';
import TextAreaWrapper from './TextAreaWrapper/TextAreaWrapper';

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
                return <StarRatingWrapper key={question.id} question={question} />;
            }
            case QuestionType.DEFAULT_COMMENT: {
                return <TextAreaWrapper
                    key={question.id}
                    questionId={question.id}
                    textareaPlaceholder={`Оставьте свой комментарий`} />;
            }
            case QuestionType.ADDITIONAL_STAR_RATING : {
                return <StarRatingWrapper key={question.id} question={question} />;
            }
            case QuestionType.ADDITIONAL_TEXT_QUESTION : {
                return <TextAreaWrapper
                    key={question.id}
                    questionId={question.id}
                    questionText={question.question_text}
                    textareaPlaceholder={`Оставьте свой комментарий`} />;
            }
            default:
                return null;
        }
    };

    renderQuestions = () => {
        const defaultQuestions = (
            <div key={0} className='CustomerFeedback__question'>
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
                <div key={question.id} className='CustomerFeedback__question'>
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