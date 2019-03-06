import React, {Component} from 'react';

import PropTypes from 'prop-types';
import axios from "axios";

import './FeedbackFormEditor.css';
import * as constants from "../../common-module/constants";
import Spinner from "../../common-module/components/Spinner/Spinner";
import * as QuestionType from "../../common-module/QuestionType";
import * as AnswerType from "../../common-module/AnswerType";
import * as PropTypeConstants from "../../common-module/PropTypeConstants";
import RatingInput from "./Form/RatingInput/RatingInput";
import TextArea from "./Form/TextArea/TextArea";
import QuestionTemplate from "./Form/QuestionTemplate/QuestionTemplate";

class FeedbackFormEditor extends Component {

    state = {
        questions: [],
        addedQuestions: [],
        deletedQuestions: [],
        showSpinner: false,
        orderNum: 0
    };

    componentDidMount() {
        this.loadQuestions();
    }

    loadQuestions = () => {
        axios.get(constants.GET_QUESTIONS_URL)
            .then((response) => {
                const arr = response.data.slice();
                this.setState({showSpinner: false, questions: arr})
            })
            .catch((error) => {
                console.log('error', error);
                this.setState({showSpinner: false})
            });
    };

    renderSavedQuestions = () => {
        return this.state.questions
            .sort((first, second) => first.order_num - second.order_num)
            .map((question) => {
        let renderComponent = null;
            switch (question.question_type) {
                case QuestionType.DEFAULT_STAR_RATING : {
                    renderComponent = (
                        <RatingInput questionText={question.question_text}>
                            <span className='default-question-marker'>По умолчанию</span>
                        </RatingInput>
                    );
                    break;
                }
                case QuestionType.DEFAULT_COMMENT : {
                    renderComponent = (
                        <TextArea>
                            <span className='default-question-marker'>По умолчанию</span>
                        </TextArea>
                    );
                    break;
                }
                case QuestionType.ADDITIONAL_STAR_RATING: {
                    renderComponent = (
                        <RatingInput questionText={question.question_text}>
                                <button
                                    className='delete-manage-button'
                                    onClick={(event) => this.toggleDeletingSavedQuestion(event, question)}>УДАЛИТЬ</button>
                        </RatingInput>
                    );
                    break;
                }
                case QuestionType.ADDITIONAL_TEXT_QUESTION : {
                    renderComponent = (
                        <TextArea questionText={question.question_text}>
                                <button
                                    className='delete-manage-button'
                                    onClick={(event) => this.toggleDeletingSavedQuestion(event, question)}>УДАЛИТЬ</button>
                        </TextArea>
                    );
                    break;
                }
                default: break;
            }
            return (<div key={question.id} className='question-element'>{renderComponent}</div>);
        });
    };

    toggleDeletingSavedQuestion = (event, question) => {
        let target = event.target;
        const updatedArray = this.state.deletedQuestions.map((q) => {return {...q}});
        const deletedQuestion = {...question};
        if (updatedArray.some((q) => q.id === deletedQuestion.id)) {
            let filteredArray = updatedArray.filter((q) => q.id !== deletedQuestion.id);
            this.setState({deletedQuestions: filteredArray});
            target.innerText = 'Delete'
        } else {
            updatedArray.push(deletedQuestion);
            this.setState({deletedQuestions: updatedArray});
            target.innerText = 'Cancel'
        }
    };

    addQuestion = (type) => {
        const orderNum = this.state.orderNum;
        const addedQuestions = this.state.addedQuestions.map((oldQuestion) => {
            return {...oldQuestion}
        });
        let answerType = '';
        let questionType = '';
        switch (type) {
            case AnswerType.TEXT : {
                answerType = AnswerType.TEXT;
                questionType = QuestionType.ADDITIONAL_TEXT_QUESTION;
                break;
            }
            case AnswerType.STAR : {
                answerType = AnswerType.STAR;
                questionType = QuestionType.ADDITIONAL_STAR_RATING;
                break;
            }
            default:
                return;
        }
        addedQuestions.push({
            id: addedQuestions.length,
            question_text: '',
            isEditedNow: true,
            answer_type: answerType,
            question_type: questionType,
            order_num: orderNum
        });
        this.setState({addedQuestions: addedQuestions, orderNum: orderNum + 1});
    };

    saveOrEditAddedQuestion = (newQuestion) => {
        const array = this.state.addedQuestions.map((oldQuestion) => {
            if (oldQuestion.id === newQuestion.id) return newQuestion;
            return {...oldQuestion}
        });
        this.setState({addedQuestions: array})
    };

    deleteAdditionalQuestion = (id) => {
        const array = this.state.addedQuestions
            .filter((q) => q.id !== id)
            .map((oldQuestion, index) => {
                return {...oldQuestion, id: index}
            });
        this.setState({addedQuestions: array})
    };

    renderAddedQuestions = () => {
        return this.state.addedQuestions.map((question, index) => {
            return (
                <QuestionTemplate
                    key={index}
                    question={question}
                    onSaveQuestionHandler={this.saveOrEditAddedQuestion}
                    onEditQuestionHandler={this.saveOrEditAddedQuestion}
                    onDeleteQuestionHandler={this.deleteAdditionalQuestion}/>
            );
        })
    };

    saveForm = () => {
        this.setState({showSpinner: true});
        const sendQuestions = this.state.addedQuestions.map((question) => {return {...question}});
        const deletedQuestions = this.state.deletedQuestions.map((question) => {return {...question}});
        let sendObject = {
            deletedQuestions: deletedQuestions,
            newQuestions: sendQuestions
        };
        axios.post(constants.ADD_NEW_QUESTIONS_URL, sendObject)
            .then((response) => {
                this.setState({
                    addedQuestions: [],
                    deletedQuestions: [],
                    orderNum: 0});
                this.loadQuestions();
            })
            .catch((error) => {
                console.log('error', error);
                this.setState({showSpinner: false})
            });
    };

    clearState = () => {
      this.setState({
          addedQuestions: [],
          deletedQuestions: [],
          orderNum: 0
      })
    };

    render() {
        let additionalComponent = null;
        if (this.state.showSpinner) additionalComponent = <Spinner/>;
        return (
            <div className='FeedbackFormEditor'>
                {additionalComponent}
                <div className='FeedbackFormEditor__form'>
                    <div className="FeedbackFormEditor__form__questions">
                        {this.renderSavedQuestions()}
                        {this.renderAddedQuestions()}
                    </div>
                    <div className="FeedbackFormEditor__form__edit-buttons">
                        <button
                            className="blue-button"
                            onClick={() => this.addQuestion(AnswerType.TEXT)}>Добавить текст
                        </button>
                        <button
                            className='blue-button'
                            onClick={() => this.addQuestion(AnswerType.STAR)}>Добавить шкалу
                        </button>
                    </div>
                </div>
                <div className='FeedbackFormEditor__bottom-buttons'>
                    <button onClick={this.saveForm}>Сохранить</button>
                    <button onClick={this.clearState}>Отмена</button>
                </div>
            </div>
        );
    }
}

FeedbackFormEditor.propTypes = {
    questions: PropTypes.arrayOf(PropTypeConstants.Question)
};

export default FeedbackFormEditor;