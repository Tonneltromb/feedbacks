import React, {Component} from 'react';

import axios from "axios";

import './FeedbackFormEditor.css';
import * as constants from "../../common/constants";
import Spinner from "../../common/components/Spinner/Spinner";
import * as QuestionType from "../../common/QuestionType";
import * as AnswerType from "../../common/AnswerType";
import RatingInput from "./Form/RatingInput/RatingInput";
import TextArea from "./Form/TextArea/TextArea";
import QuestionTemplate from "./Form/QuestionTemplate/QuestionTemplate";

class FeedbackFormEditor extends Component {

    state = {
        questions: [],
        additionalQuestions: [],
        deletedQuestions: [],
        showSpinner: false,
        orderNum: 0
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

    renderSavedQuestions = () => {
        // todo: добавить предварительную сортировку по полю order
        return this.state.questions
            .sort((first, second) => first.order_num - second.order_num)
            .map((question) => {
        let renderComponent = null;
            switch (question.question_type) {
                case QuestionType.ADDITIONAL_STAR_RATING: {
                    renderComponent = (
                        <RatingInput question={question}>
                            <div>
                                <button onClick={(event) => this.toggleDeletingSavedQuestion(event, question)}>Delete</button>
                            </div>
                        </RatingInput>
                    );
                    break;
                }
                case QuestionType.DEFAULT_STAR_RATING : {
                    renderComponent = <RatingInput question={question}><span className='default-marker'>По умолчанию</span></RatingInput>;
                    break;
                }
                case QuestionType.DEFAULT_COMMENT : {
                    renderComponent = <TextArea><span className='default-marker'>По умолчанию</span></TextArea>;
                    break;
                }
                case QuestionType.ADDITIONAL_TEXT_QUESTION : {
                    renderComponent = (
                        <TextArea title={question.question_text}>
                            <div>
                                <button onClick={(event) => this.toggleDeletingSavedQuestion(event, question)}>Delete</button>
                            </div>
                        </TextArea>
                    );
                    break;
                }
                default: break;
            }
            return (<div key={question.id} className='input-element'>{renderComponent}</div>);
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
        const addedQuestions = this.state.additionalQuestions.map((oldQuestion) => {
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
            isSaved: false,
            answer_type: answerType,
            question_type: questionType,
            order_num: orderNum
        });
        this.setState({additionalQuestions: addedQuestions, orderNum: orderNum + 1});
    };

    saveOrEditAdditionalQuestion = (newQuestion) => {
        const array = this.state.additionalQuestions.map((oldQuestion) => {
            if (oldQuestion.id === newQuestion.id) return newQuestion;
            return {...oldQuestion}
        });
        this.setState({additionalQuestions: array})
    };

    deleteAdditionalQuestion = (id) => {
        console.log('oldArr', this.state.additionalQuestions);
        const array = this.state.additionalQuestions
            .filter((q) => q.id !== id)
            .map((oldQuestion, index) => {
                return {...oldQuestion, id: index}
            });
        console.log('newArr', array);
        this.setState({additionalQuestions: array})
    };

    renderAdditionalQuestions = () => {
        return this.state.additionalQuestions.map((question, index) => {
            return (
                <QuestionTemplate
                    key={index}
                    question={question}
                    isSaved={question.isSaved}
                    onSaveOrEditHandler={this.saveOrEditAdditionalQuestion}
                    onDeleteHandler={this.deleteAdditionalQuestion}/>
            );
        })
    };

    saveFormTemplate = () => {
        this.setState({showSpinner: true});
        const sendQuestions = this.state.additionalQuestions.map((question) => {return {...question}});
        const deletedQuestions = this.state.deletedQuestions.map((question) => {return {...question}});
        let sendObject = {
            deletedQuestions: deletedQuestions,
            newQuestions: sendQuestions
        };
        axios.post(constants.ADD_NEW_QUESTIONS_URL, sendObject)
            .then((response) => {
                this.setState({showSpinner: false});
            })
            .catch((error) => {
                console.log('error', error);
                this.setState({showSpinner: false})
            });
    };

    clearState = () => {
      this.setState({
          additionalQuestions: [],
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
                    <div className="Form__questions">
                        {this.renderSavedQuestions()}
                        {this.renderAdditionalQuestions()}
                    </div>
                    <div className="FeedbackFormEditor__edit-buttons">
                        <button
                            className="edit-button"
                            onClick={() => this.addQuestion(AnswerType.TEXT)}>Добавить текст
                        </button>
                        <button
                            className='edit-button'
                            onClick={() => this.addQuestion(AnswerType.STAR)}>Добавить шкалу
                        </button>
                    </div>
                </div>
                <div className='FeedbackFormEditor__bottom-buttons'>
                    <button onClick={this.saveFormTemplate}>Сохранить</button>
                    <button onClick={this.clearState}>Отмена</button>
                </div>
            </div>
        );
    }
}

export default FeedbackFormEditor;