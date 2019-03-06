import React from 'react';

import PropTypes from 'prop-types';

import './StarRatingWrapper.css'
import StarRating from '../../../../common-module/components/StarRating/StarRating';

const StarRatingWrapper = props => {
    return (
        <div className='StarRatingWrapper'>
            <div className="StarRating-component-wrapper">
                <StarRating value={1}
                            editing={false}
                            starSize={'3em'}
                            id={props.questionId}
                            question_text={props.questionText}
                            questionTextSize={"1.2em"}/>
            </div>
            <div className='children-wrapper'>
                {props.children}
            </div>
        </div>
    );
};

StarRatingWrapper.propTypes = {
    questionText: PropTypes.string.isRequired,
    questionId: PropTypes.number.isRequired
};

export default StarRatingWrapper;