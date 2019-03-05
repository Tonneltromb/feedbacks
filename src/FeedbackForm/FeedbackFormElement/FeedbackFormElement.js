import React, {Component} from 'react';
import PropTypes from 'prop-types';

import './FeedbackFormElement.css';
import * as AnswerType from '../../common/AnswerType';
import * as QuestionType from '../../common/QuestionType';
import StarComponent from "./StarComponent/StarComponent";
import TextAreaComponent from "./TextAreaComponent/TextAreaComponent";

class FeedbackFormElement extends Component {
    render() {
        let renderedComponent = null;
        switch (this.props.questionObject.answer_type) {
            case AnswerType.STAR: {
                renderedComponent =
                    <StarComponent
                        questionId={this.props.questionObject.id}
                        title={this.props.questionObject.question_text} />;
                break;
            }
            case AnswerType.TEXT: {
                renderedComponent =
                    <TextAreaComponent
                        showTitle={!(this.props.questionObject.question_type === QuestionType.DEFAULT_COMMENT)}
                        questionId={this.props.questionObject.id}
                        title={this.props.questionObject.question_text} />;
                    break;
            }
            default:
                renderedComponent = null;
                break;
        }

        return (
            <div className='FeedbackFormElement'>
                {renderedComponent}
            </div>
        );
    }
}

FeedbackFormElement.propTypes = {
    questionObject: PropTypes.object.isRequired
};

export default FeedbackFormElement;
