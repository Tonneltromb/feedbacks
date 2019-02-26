import React from 'react';

import PropTypes from 'prop-types';

import './FeedbackList.css';
import FeedBack from "../FeedBack/FeedBack";

const FeedbackList = (props) => {
    let feedbacks = <div>Отзывы не найдены</div>;
    if (props.feedbacks && props.feedbacks.length > 0) {
        feedbacks = props.feedbacks.map(feedback => <FeedBack />);
    }
    return (
        <div className='FeedbackList'>
            {feedbacks}
        </div>
    );
};

FeedbackList.propTypes = {
    feedbacks: PropTypes.array.isRequired
};

export default FeedbackList;