import React from 'react';

import PropTypes from 'prop-types';

import './FeedbacksList.css';
import Feedback from "./Feedback/Feedback";

const FeedbacksList = (props) => {
    let feedbacks = <div>Отзывы не найдены</div>;
    if (props.feedbacks && props.feedbacks.length > 0) {
        feedbacks = props.feedbacks
            .map(feedback => <Feedback key={feedback.id} feedback={feedback}/>);
    }
    return (
        <div className='FeedbacksList' style={props.listStyle}>
            {feedbacks}
        </div>
    );
};

FeedbacksList.propTypes = {
    feedbacks: PropTypes.array.isRequired,
    listStyle: PropTypes.object
};

export default FeedbacksList;