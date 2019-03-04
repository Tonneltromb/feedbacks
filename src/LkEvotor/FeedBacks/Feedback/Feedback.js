import React from 'react';

import PropTypes from 'prop-types';
import moment from 'moment';
import 'moment/locale/ru';

import './Feedback.css';
import * as QuestionTypes from '../../../common/QuestionTypes';
import StarAnswer from "./StarAnswer/StarAnswer";
import TextAnswer from "./TextAnswer/TextAnswer";

const Feedback = (props) => {
    const answers = props.feedback.answers.map((answer) => {
        switch (answer['question_type']) {
            case QuestionTypes.DEFAULT_RATING : {
                const formattedDate = moment(props.feedback['create_at']).format('DD MMMM YYYY');
                return (
                    <div key={answer.id} className="Feedback-main-rating">
                        <StarAnswer value={+answer.content}/>
                        <div className="Feedback-create-time">
                            {formattedDate}
                        </div>
                    </div>
                );
            }
            case QuestionTypes.DEFAULT_COMMENT : {
                return <TextAnswer key={answer.id} content={answer.content}/>;
            }
            default:
                return null;
        }
    });

    return (
        <div className="Feedback">
            {answers}
        </div>
    );
};

Feedback.propTypes = {
    feedback: PropTypes.object.isRequired
};

export default Feedback;