import React, {Component} from 'react';
import PropTypes from 'prop-types';

import './FeedbackFormElement.css';
import * as AnswerType from '../../common/answerTypes'
import StarComponent from "./StarComponent/StarComponent";
import TextAreaComponent from "./TextAreaComponent/TextAreaComponent";

class FeedbackFormElement extends Component {
    render() {
        let renderedComponent = null;
        switch (this.props.questionObject.answerType) {
            case AnswerType.STAR: {
                renderedComponent =
                    <StarComponent
                        questionId={this.props.questionObject.id}
                        title={this.props.questionObject.questionTitle} />;
                break;
            }
            case AnswerType.TEXT: {
                renderedComponent =
                    <TextAreaComponent
                        showTitle={!this.props.questionObject.questionType === 'main_comment'}
                        questionId={this.props.questionObject.id}
                        title={this.props.questionObject.questionTitle} />;
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
