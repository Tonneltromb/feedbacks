import React, {Component} from 'react';

import * as PropTypeConstants from '../../../common-module/constants/PropTypeConstants';
import StarRating from '../../../common-module/components/StarRating/StarRating';

class StarRatingWrapper extends Component {
    state = {
        value: 0,
        selected: 0
    };
    onStarClickHandler = (nextValue) => {
        this.setState({value: nextValue, selected: nextValue})
    };
    onStarHoverHandler = (nextValue) => {
        this.setState({value: nextValue})
    };
    onStarHoverOutHandler = () => {
        const selected = this.state.selected;
        this.setState({value: selected})
    };
    render() {
        return (
            <div className="feedback-form-input"
                 data-field-id={this.props.question.id}
                 data-field-value={this.state.value}
            >
                <StarRating value={this.state.value}
                            editing={true}
                            starSize={'3em'}
                            questionTextSize={'1.5em'}
                            id={this.props.question.id}
                            onStarClickHandler={this.onStarClickHandler}
                            onStarHoverHandler={this.onStarHoverHandler}
                            onStarHoverOutHandler={this.onStarHoverOutHandler}
                            question_text={this.props.question.question_text}/>
            </div>
        );
    }
}

StarRatingWrapper.propTypes = {
    question: PropTypeConstants.Question.isRequired
};

export default StarRatingWrapper;