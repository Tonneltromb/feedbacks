import React, {Component} from 'react';
import PropTypes from 'prop-types';

import StarRatingComponent from 'react-star-rating-component';

import './Rating.css';

class Rating extends Component {

    state = {
        value: 0,
        selected: 0
    };

    getTitleElement = () => {
        return this.props.title
            ? (
                <div className="Rating__question-text">
                    {this.props.title}:
                </div>
            )
            : null;
    };

    render() {
        return (
            <div
                className="Rating feedback-form-input"
                data-field-id={this.props.questionId}
                data-field-value={this.state.value}
            >
                {this.getTitleElement()}
                <div className="Rating__star-component">
                    <StarRatingComponent
                        name={`star-component-${this.props.questionId}`}
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
            </div>
        );

    }
}

Rating.propTypes = {
    questionId: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired
};

export default Rating;