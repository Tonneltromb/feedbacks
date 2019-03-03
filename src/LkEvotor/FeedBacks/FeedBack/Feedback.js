import React from 'react';

import './Feedback.css';
import * as QuestionTypes from '../../../common/QuestionTypes';
import StarAnswer from "./StarAnswer/StarAnswer";
import TextAnswer from "./TextAnswer/TextAnswer";

const Feedback = (props) => {

    const answers = props.feedback.answers.map((answer) => {
        switch (answer.question_type) {
            case QuestionTypes.MAIN_RAITING : {
                return (
                    <div key={answer.id} className="Feedback-main-rating">
                        <StarAnswer value={+answer.content}/>
                        <div className="Feedback-create-time">
                            {props.feedback['create_at']}
                        </div>
                    </div>
                );
            }
            case QuestionTypes.MAIN_COMMENT : {
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

export default Feedback;