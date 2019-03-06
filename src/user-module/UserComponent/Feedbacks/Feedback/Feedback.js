import React from 'react';

import PropTypes from 'prop-types';
import moment from 'moment';
import 'moment/locale/ru';

import './Feedback.css';
import * as QuestionType from '../../../../common-module/constants/QuestionType';
import StarAnswer from './StarAnswer/StarAnswer';
import TextAnswer from './TextAnswer/TextAnswer';

const Feedback = (props) => {
    const answers = props.feedback.answers.map((answer) => {
        switch (answer['question_type']) {
            case QuestionType.DEFAULT_STAR_RATING : {
                const formattedDate = moment(props.feedback['create_at']).format('DD MMMM YYYY');
                return (
                    <div key={answer.id} className='Feedback__default-rating'>
                        <StarAnswer value={+answer.content}/>
                        <div className='Feedback__create-time'>
                            {formattedDate}
                        </div>
                    </div>
                );
            }
            case QuestionType.DEFAULT_COMMENT : {
                return (
                    <div key={answer.id} className="Feedback__default-comment">
                        <TextAnswer key={answer.id} content={answer.content}/>
                    </div>
                );
            }
            case QuestionType.ADDITIONAL_STAR_RATING : {
                return (
                    <div key={answer.id} className='Feedback__additional-rating'>
                        <div className="Feedback__question">{answer.question_text}</div>
                        <StarAnswer value={+answer.content}/>
                    </div>
                );
            }
            case QuestionType.ADDITIONAL_TEXT_QUESTION : {
                return (
                    <div key={answer.id} className='Feedback__additional-text-question'>
                        <div className="Feedback__question">{answer.question_text}</div>
                        <TextAnswer content={answer.content}/>
                    </div>
                );
            }
            default:
                return null;
        }
    });

    return (
        <div className='Feedback'>
            {answers}
        </div>
    );
};

Feedback.propTypes = {
    feedback: PropTypes.object.isRequired
};

export default Feedback;