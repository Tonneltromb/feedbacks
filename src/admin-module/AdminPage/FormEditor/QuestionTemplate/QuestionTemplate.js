import React, {Component} from 'react';

import PropTypes from 'prop-types';

import './QuestionTemplate.css';
import * as AnswerType from "../../../../common-module/constants/AnswerType";
import TextAreaWrapper from '../TextAreaWrapper/TextAreaWrapper';
import StarRatingWrapper from '../StarRatingWrapper/StarRatingWrapper';

class QuestionTemplate extends Component {
    state = {
        questionText: ''
    };

    componentDidMount() {
        if (this.props.question.question_text !== '') {
            this.setState({questionText: this.props.question.question_text})
        }
    }

    saveOrEditQuestion = () => {
        const question = {...this.props.question};
        if (question.isEditedNow) {
            question.isEditedNow = false;
            question.question_text = this.state.questionText;
            this.props.onSaveQuestionHandler(question);
        } else {
            question.isEditedNow = true;
            this.props.onEditQuestionHandler(question);
        }

    };
    deleteQuestion = () => {
        this.props.onDeleteQuestionHandler(this.props.question.id);
    };
    getManageButtons = () => {
        const className = this.props.question.isEditedNow ? 'save-manage-button' : 'edit-manage-button';
        const title = this.props.question.isEditedNow ? 'Подтвердить изменения' : 'Редактировать';
        const innerText = this.props.question.isEditedNow ? 'СОХРАНИТЬ' : 'РЕДАКТИРОВАТЬ';
        return (
            <React.Fragment>
                <button
                    className={`manage-button ${className}`}
                    onClick={this.saveOrEditQuestion}
                    title={title}>{innerText}</button>
                <button
                    className='manage-button manage-button-delete'
                    onClick={this.deleteQuestion}
                    title="Удалить">УДАЛИТЬ
                </button>
            </React.Fragment>
        );
    };

    renderQuestion = (type) => {
        switch (type) {
            case AnswerType.TEXT : {
                return (
                    <TextAreaWrapper questionText={this.state.questionText}>
                        {this.getManageButtons()}
                    </TextAreaWrapper>
                );
            }
            case AnswerType.STAR : {
                return (
                    <StarRatingWrapper questionId={this.props.question.id} questionText={this.state.questionText}>
                        {this.getManageButtons()}
                    </StarRatingWrapper>
                );
            }
            default:
                return null;
        }
    };

    onQuestionTextInputChangeHandler = (event) => {
        this.setState({questionText: event.target.value});
    };

    renderQuestionText = () => {
        return this.props.question.isEditedNow
            ? (
                <div className='question-text'>
                <textarea
                    placeholder='Заголовок вопроса*'
                    value={this.state.questionText}
                    onChange={this.onQuestionTextInputChangeHandler}/>
                </div>
            )
            : null;
    };

    render() {
        return (
            <div className="QuestionTemplate question-element">
                {this.renderQuestionText()}
                {this.renderQuestion(this.props.question.answer_type)}
            </div>
        );
    }
}

QuestionTemplate.propTypes = {
    question: PropTypes.object.isRequired,
    onSaveQuestionHandler: PropTypes.func.isRequired,
    onEditQuestionHandler: PropTypes.func.isRequired,
    onDeleteQuestionHandler: PropTypes.func.isRequired,
};

export default QuestionTemplate;