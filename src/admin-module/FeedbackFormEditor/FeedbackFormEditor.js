import React, {Component} from 'react';

import axios from "axios";

import './FeedbackFormEditor.css';
import * as constants from "../../common/constants";
import Spinner from "../../FeedbackForm/FeedbackForm";
import Form from "./Form/Form";
import * as QuestionTypes from "../../common/QuestionTypes";
import * as AnswerTypes from "../../common/answerTypes";
import RatingInput from "./Form/RatingInput/RatingInput";
import TextArea from "./Form/TextArea/TextArea";
import QuestionTemplate from "./Form/QuestionTemplate/QuestionTemplate";

class FeedbackFormEditor extends Component {

    state = {
        questions: [],
        addedQuestions: [],
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
                case QuestionTypes.ADDITIONAL_RATING: {
                    return <RatingInput
                        key={question.id}
                        question={question} />
                }
                case QuestionTypes.DEFAULT_RATING : {
                    return <RatingInput key={question.id} question={question}>
                        <span className='default-marker'>По умолчанию</span>
                    </RatingInput>
                }
                case QuestionTypes.DEFAULT_COMMENT : {
                    return <TextArea key={question.id}>
                        <span className='default-marker'>По умолчанию</span>
                    </TextArea>
                }
                case QuestionTypes.TEXT_QUESTION : {
                    return <TextArea key={question.id} title={question.questionTitle}/>
                }
                default:
                    return null;
            }
        });
    };

    addQuestion = (type) => {
        const addedQuestions = this.state.addedQuestions.slice();
        switch (type) {
            case AnswerTypes.TEXT : {
                addedQuestions.push({
                    id: addedQuestions.length,
                    title: '',
                    isSaved: false,
                    type: AnswerTypes.TEXT
                });
                this.setState({addedQuestions: addedQuestions});
                break;
            }
            case AnswerTypes.STAR : {
                addedQuestions.push({
                    id: addedQuestions.length,
                    title: '',
                    isSaved: false,
                    type: AnswerTypes.STAR
                });
                this.setState({addedQuestions: addedQuestions});
                break;
            }
            default: break;
        }
    };

    saveLocally = (question) => {
        console.log(question);
        const _q = {...question};
        const index = this.state.addedQuestions.findIndex((q) => q.id === _q.id);
        const array = this.state.addedQuestions.slice();
        array[index] = _q;
        console.log(array);
        this.setState({addedQuestions: array})
    };

    renderAddedQuestions = () => {
        return this.state.addedQuestions.map((question, index, array) => {
            return (
                <QuestionTemplate
                    key={index}
                    question={question}
                    isSaved={question.isSaved}
                    saveLocally={this.saveLocally} />
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
                    {this.renderAddedQuestions()}
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