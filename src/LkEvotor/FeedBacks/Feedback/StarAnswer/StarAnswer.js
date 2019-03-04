import React from 'react';
import PropTypes from 'prop-types';

import StarRatingComponent from 'react-star-rating-component';

import './StarAnswer.css';


const StarAnswer = props => {
    return (
        <div className='StarAnswer'>
            <StarRatingComponent
                name={`star-component`}
                starCount={5}
                editing={false}
                value={props.value} />
        </div>
    );
};

StarAnswer.propTypes = {
    value: PropTypes.number.isRequired
};

export default StarAnswer;