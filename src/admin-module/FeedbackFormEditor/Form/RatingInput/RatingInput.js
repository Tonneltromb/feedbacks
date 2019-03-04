import React from 'react';

import StarRatingComponent from 'react-star-rating-component';

import './RatingInput.css';

const RatingInput = (props) => {
    const title = props.question && props.question.questionTitle
        ? <h3>{props.question.questionTitle}</h3>
        : null;
    return (
        <div className="RatingInput input-element">
            {title}
            <div className='RatingInput__star-rating-component'>
                <StarRatingComponent
                    name={`star-component`}
                    starCount={5}
                    value={1}
                    editing={false}
                />
                {props.children}
            </div>
        </div>
    );
};

export default RatingInput;