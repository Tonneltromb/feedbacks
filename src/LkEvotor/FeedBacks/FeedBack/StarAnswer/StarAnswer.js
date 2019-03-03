import React from 'react';
import PropTypes from 'prop-types';

import './StarAnswer.css';

import StarRatingComponent from 'react-star-rating-component';

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

};

export default StarAnswer;