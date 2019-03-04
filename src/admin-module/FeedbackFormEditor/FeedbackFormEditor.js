import React, {Component} from 'react';

import axios from "axios";

import './FeedbackFormEditor.css';
import * as constants from "../../common/constants";
import Spinner from "../../FeedbackForm/FeedbackForm";
import * as QuestionTypes from "../../common/QuestionTypes";
import * as AnswerTypes from "../../common/answerTypes";
import RatingInput from "./Form/RatingInput/RatingInput";
import TextArea from "./Form/TextArea/TextArea";
import QuestionTemplate from "./Form/QuestionTemplate/QuestionTemplate";

class FeedbackFormEditor extends Component {

    state = {
        questions: [],
        additionalQuestions: [],
        loading: true,
    };

    componentDidMount() {
        axios.get(constants.GET_QUESTIONS_URL)
            .then((response) => {
                const arr = response.data.slice();
                this.setState({loading: false, questions: arr})
            })
            .catch((error) => {
                console.log('error', error);
                this.setState({loading: false})
            });
    }

    renderSavedQuestions = () => {
        // todo: добавить предварительную сортировку по полю order
        return this.state.questions.map((question) => {
            switch (question.questionType) {
                case QuestionTypes.ADDITIONAL_RATING_QUESTION: {
                    return <RatingInput
                        key={question.id}
                        question={question} />
                }
                case QuestionTypes.DEFAULT_RATING_QUESTION : {
                    return <RatingInput key={question.id} question={question}>
                        <span className='default-marker'>По умолчанию</span>
                    </RatingInput>
                }
                case QuestionTypes.DEFAULT_COMMENT : {
                    return <TextArea key={question.id}>
                        <span className='default-marker'>По умолчанию</span>
                    </TextArea>
                }
                case QuestionTypes.ADDITIONAL_TEXT_QUESTION : {
                    return <TextArea key={question.id} title={question.questionTitle}/>
                }
                default:
                    return null;
            }
        });
    };

    addQuestion = (type) => {
        const addedQuestions = this.state.additionalQuestions.map((oldQuestion) => {
            return {...oldQuestion}
        });
        let answerType = '';
        switch (type) {
            case AnswerTypes.TEXT : {
                answerType = AnswerTypes.TEXT;
                break;
            }
            case AnswerTypes.STAR : {
                answerType = AnswerTypes.STAR;
                break;
            }
            default: return;
        }
        addedQuestions.push({
            id: addedQuestions.length,
            title: '',
            isSaved: false,
            type: answerType
        });
        this.setState({additionalQuestions: addedQuestions});
    };

    saveOrEditAdditionalQuestion = (newQuestion) => {
        const array = this.state.additionalQuestions.map((oldQuestion) => {
            if (oldQuestion.id === newQuestion.id) return newQuestion;
            return {...oldQuestion}
        });
        this.setState({additionalQuestions: array})
    };

    deleteAdditionalQuestion = (id) => {
        const array = this.state.additionalQuestions
            .filter((q) => q.id !== id)
            .map((oldQuestion) => { return {...oldQuestion} });
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

    render() {
        let additionalComponent = null;
        if (this.state.loading || this.state.sending) additionalComponent = <Spinner/>;
        return (
            <div className='FeedbackFormEditor'>
                {additionalComponent}
                <div className='FeedbackFormEditor__form'>
                    <div className="Form__questions">
                        {this.renderSavedQuestions()}
                    </div>
                    {this.renderAdditionalQuestions()}
                    <div className="FeedbackFormEditor__edit-buttons">
                        <button
                            className="edit-button"
                            onClick={() => this.addQuestion(AnswerTypes.TEXT)}>Добавить текст</button>
                        <button
                            className='edit-button'
                            onClick={() => this.addQuestion(AnswerTypes.STAR)}>Добавить шкалу</button>
                    </div>
                </div>
                <div className='FeedbackFormEditor-bottom-buttons'>
                    <button>Сохранить</button>
                    <button>Отмена</button>
                </div>
            </div>
        );
    }
}

export default FeedbackFormEditor;