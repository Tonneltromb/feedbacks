import React, {Component} from 'react';

import * as AnswerTypes from "../../../../common/answerTypes";

import './QuestionTemplate.css';
import TextArea from "../TextArea/TextArea";
import RatingInput from "../RatingInput/RatingInput";

class QuestionTemplate extends Component {
    state = {
        title: ''
    };

    componentDidMount() {
        if (this.props.question.title !== '') {
            this.setState({title: this.props.question.title})
        }
    }

    saveQuestion = () => {
        const savedQuestion = {...this.props.question};
        savedQuestion.isSaved = true;
        savedQuestion.title = this.state.title;
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
                <button onClick={this.editQuestion} title="Редактировать">&#128393;</button>
                <button onClick={this.deleteQuestion} title="Удалить">&#10007;</button>
            </div>
        );
    };

    renderQuestion = (type) => {
        switch (type) {
            case AnswerTypes.TEXT : {
                return <TextArea>{this.getManageButtons()}</TextArea>
            }
            case AnswerTypes.STAR : {
                return <RatingInput>{this.getManageButtons()}</RatingInput>
            }
            default:
                return null;
        }
    };

    onTitleInputChangeHandler = (event) => {
        this.setState({title: event.target.value});
    };

    renderTitle = () => {
        return !this.props.isSaved
            ? (<textarea
                placeholder='Заголовок вопроса*'
                value={this.state.title}
                onChange={this.onTitleInputChangeHandler} />)
            : <h3>{this.props.question.title}</h3>;
    };

    render() {
        const title = this.renderTitle();
        const question = this.renderQuestion(this.props.question.type);
        return (
            <div className="QuestionTemplate">
                <div className='QuestionTemplate__input input-element'>{this.renderTitle()}</div>
                {question}
            </div>
        );
    }
}

export default QuestionTemplate;