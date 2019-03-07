import React from 'react';

import PropTypes from 'prop-types';
import moment from 'moment';
import 'moment/locale/ru';

import './Feedback.css';
import * as QuestionType from '../../../../common-module/constants/QuestionType';
import StarRating from '../../StarRating/StarRating';
import TextAnswer from '../../TextAnswer/TextAnswer';

const Feedback = (props) => {
    const renderAnswer = (a) => {
        switch (a.question_type) {
            case QuestionType.DEFAULT_STAR_RATING : {
                const formattedDate = moment(props.feedback['create_at']).format('DD MMMM YYYY');
                return (
                    <div key={a.id} className='Feedback__default-rating'>
                        <StarRating value={+a.content}
                                    editing={false}
                                    starSize={'2.5em'}
                                    id={a.id} />
                        <div className='Feedback__create-time'>
                            {formattedDate}
                        </div>
                    </div>
                );
            }
            case QuestionType.DEFAULT_COMMENT : {
                return <TextAnswer key={a.id}
                                   content={a.content}
                                   contentFontSize={'1.2em'} />
            }
            case QuestionType.ADDITIONAL_STAR_RATING : {
                return <StarRating key={a.id}
                                   value={+a.content}
                                   editing={false}
                                   starSize={'1.3em'}
                                   id={a.id}
                                   question_text={a.question_text}
                                   questionTextSize={'1.3em'}/>
            }
            case QuestionType.ADDITIONAL_TEXT_QUESTION : {
                return <TextAnswer key={a.id}
                                   content={a.content}
                                   contentFontSize={'1.2em'}
                                   questionFontSize={'1.3em'}
                                   questionText={a.question_text}/>
            }
            default:
                return null;
        }
    };

    const renderAnswers = () => {
        const defaultAnswers = (
            <div key={`default`} className='Feedback__answer'>
                {props.feedback.answers
                    .filter((answer) => QuestionType.isDefault(answer.question_type))
                    .map((answer) => renderAnswer(answer))}
            </div>
        );
        const additionalAnswers = props.feedback.answers
            .filter((answer) => !QuestionType.isDefault(answer.question_type))
            .map((answer) => (<div key={answer.id} className='Feedback__answer'>{renderAnswer(answer)}</div>));
        return [defaultAnswers, ...additionalAnswers];
    };


    return (
        <div className='Feedback'>
            {renderAnswers()}
        </div>
    );
};

Feedback.propTypes = {
    feedback: PropTypes.object.isRequired
};

export default Feedback;