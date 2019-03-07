import React from 'react';

import PropTypes from 'prop-types';
import StarRatingComponent from 'react-star-rating-component';

import './StarRating.css';

const StarRating = props => {
    const getQuestionText = () => {
        return props.question_text
            ? <div className="question-text"
                   style={{fontSize: props.questionTextSize}}>{props.question_text}</div>
            : null;
    };
    return (
        <div className='StarRating'>
            {getQuestionText()}
            <div className='StarRating__input' style={{fontSize: props.starSize}}>
                <StarRatingComponent
                    name={`star-component-${props.id}`}
                    starCount={5}
                    value={props.value}
                    editing={props.editing}
                    onStarClick={props.onStarClickHandler}
                    onStarHover={props.onStarHoverHandler}
                    onStarHoverOut={props.onStarHoverOutHandler}
                />
            </div>
        </div>
    );
};

StarRating.propTypes = {
    value: PropTypes.number.isRequired,
    editing: PropTypes.bool.isRequired,
    starSize: PropTypes.string.isRequired,
    questionTextSize: PropTypes.string,
    id: PropTypes.number.isRequired,
    question_text: PropTypes.string,
    onStarClickHandler: PropTypes.func,
    onStarHoverHandler: PropTypes.func,
    onStarHoverOutHandler: PropTypes.func
};

export default StarRating;