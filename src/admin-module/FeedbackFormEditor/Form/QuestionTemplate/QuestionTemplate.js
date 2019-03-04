import React, {Component} from 'react';

import * as AnswerTypes from "../../../../common/answerTypes";

import TextArea from "../TextArea/TextArea";
import RatingInput from "../RatingInput/RatingInput";

class QuestionTemplate extends Component {

    state = {
        isEdited: true,
        title: ''
    };

    renderQuestion = (type) => {
        switch (type) {
            case AnswerTypes.TEXT : {
                return <TextArea/>
            }
            case AnswerTypes.STAR : {
                return <RatingInput/>
            }
            default:
                return null;
        }
    };

    onTitleInputChangeHandler = (event) => {
        this.setState({title: event.target.value});
    };

    saveChanges = () => {
      const savedQuestion = {...this.props.question};
      savedQuestion.isSaved = true;
        savedQuestion.title = this.state.title;
        this.props.saveLocally(savedQuestion);
    };

    renderTitle = () => {
        return this.state.isEdited || this.props.isSaved
            ? (<input
                type="text"
                placeholder='Заголовок вопроса*'
                onChange={this.onTitleInputChangeHandler} />)
            : <span>{this.props.question.title}</span>;
    };

    render() {
        const title = this.renderTitle();
        const question = this.renderQuestion(this.props.question.type);
        return (
            <div>
                {title}
                {question}
                <div>
                    <button onClick={this.saveChanges}>Save</button>
                </div>
            </div>
        );
    }
}

export default QuestionTemplate;