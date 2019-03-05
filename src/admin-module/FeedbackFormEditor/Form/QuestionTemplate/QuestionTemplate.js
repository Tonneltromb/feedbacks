import React, {Component} from 'react';

import * as AnswerType from "../../../../common/AnswerType";

import './QuestionTemplate.css';
import TextArea from "../TextArea/TextArea";
import RatingInput from "../RatingInput/RatingInput";

class QuestionTemplate extends Component {
    state = {
        questionText: ''
    };

    componentDidMount() {
        if (this.props.question.question_text !== '') {
            this.setState({questionText: this.props.question.question_text})
        }
    }

    saveQuestion = () => {
        const savedQuestion = {...this.props.question};
        savedQuestion.isSaved = true;
        savedQuestion.question_text = this.state.questionText;
        this.props.onSaveOrEditHandler(savedQuestion);
    };

    editQuestion = () => {
        const savedQuestion = {...this.props.question};
        savedQuestion.isSaved = false;
        this.props.onSaveOrEditHandler(savedQuestion);
    };

    deleteQuestion = () => {
        this.props.onDeleteHandler(this.props.question.id);
    };

    getManageButtons = () => {
        return (
            <div>
                <button onClick={this.saveQuestion} title="Подтвердить изменения">&#10003;</button>
                <button onClick={this.editQuestion} title="Редактировать">&#9998;</button>
                <button onClick={this.deleteQuestion} title="Удалить">&#10007;</button>
            </div>
        );
    };

    renderQuestion = (type) => {
        switch (type) {
            case AnswerType.TEXT : {
                return <TextArea>{this.getManageButtons()}</TextArea>
            }
            case AnswerType.STAR : {
                return <RatingInput>{this.getManageButtons()}</RatingInput>
            }
            default:
                return null;
        }
    };

    onQuestionTextInputChangeHandler = (event) => {
        this.setState({questionText: event.target.value});
    };

    renderQuestionText = () => {
        return !this.props.isSaved
            ? (<textarea
                placeholder='Заголовок вопроса*'
                value={this.state.questionText}
                onChange={this.onQuestionTextInputChangeHandler} />)
            : <h3>{this.props.question.question_text}</h3>;
    };

    render() {
        const question = this.renderQuestion(this.props.question.answer_type );
        return (
            <div className="QuestionTemplate input-element">
                <div className='QuestionTemplate__input'>{this.renderQuestionText()}</div>
                {question}
            </div>
        );
    }
}

export default QuestionTemplate;