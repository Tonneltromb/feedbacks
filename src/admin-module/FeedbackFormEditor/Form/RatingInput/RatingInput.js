import React from 'react';

import StarRatingComponent from 'react-star-rating-component';

import './RatingInput.css';

const RatingInput = (props) => {
    const questionText = props.questionText
        ? <h3>{props.questionText}</h3>
        : null;
    return (
        <div className="RatingInput">
            <div className='question-text'>
                {questionText}
            </div>
            <div className='RatingInput__star-rating-component'>
                <StarRatingComponent
                    name={`star-component`}
                    starCount={5}
                    value={1}
                    editing={false}
                />
                <div className='children-component'>
                    {props.children}
                </div>
            </div>
        </div>
    );
};

export default RatingInput;