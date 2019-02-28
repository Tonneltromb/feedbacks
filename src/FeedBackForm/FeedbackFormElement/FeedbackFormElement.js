import React, {Component} from 'react';
import PropTypes from 'prop-types';

import './FeedbackFormElement.css';
import StarRatingComponent from 'react-star-rating-component';
import * as AnswerType from '../../common/answerTypes'

class FeedbackFormElement extends Component {
    state = {
        value: 0,
        selected: 0
    };

    render() {
        let renderedComponent = null;
        switch (this.props.questionObject.answerType) {
            case AnswerType.STAR: {
                renderedComponent = <StarRatingComponent name={this.props.questionObject.questionName}/>;
                break;
            }
            default:
                renderedComponent = null;
                break;
        }

        return (
            <div className='FeedbackFormElement'>
                <StarRatingComponent
                    name="rate1"
                    starCount={5}
                    value={this.state.value}
                    onStarClick={(nextValue, prevValue, name) => {
                        this.setState({value: nextValue, selected: nextValue})
                    }}
                    onStarHover={(nextValue, prevValue, name) => {
                        this.setState({value: nextValue})
                    }}
                    onStarHoverOut={(nextValue, prevValue, name) => {
                        const selected = this.state.selected;
                        this.setState({value: selected})
                    }}
                />
            </div>
        );
    }
}

FeedbackFormElement.propTypes = {
    questionObject: PropTypes.object.isRequired
};

export default FeedbackFormElement;
