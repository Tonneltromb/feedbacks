import React from 'react';
import PropTypes from 'prop-types';

import './FeedbackFormElement.css';
import StarRatingComponent from 'react-star-rating-component';
import * as AnswerType from '../../common/answerTypes'

const FeedbackFormElement = props => {
    let renderedComponent = null;

    switch (props.questionObject.answerType) {
        case AnswerType.STAR: {
            renderedComponent = <StarRatingComponent name={props.questionObject.questionName}/>
        }
    }

    return (
        <div>
            <StarRatingComponent
                name="rate1"
                starCount={10}
                value={1}
            />
        </div>
    );
};

FeedbackFormElement.propTypes = {
    questionObject: PropTypes.object.isRequired
};

export default FeedbackFormElement;
