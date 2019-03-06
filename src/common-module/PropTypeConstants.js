import PropTypes from 'prop-types';
import * as AnswerType from "./AnswerType";
import * as QuestionType from "./QuestionType";
export const Question = PropTypes.shape({
    answer_type: PropTypes.oneOf(AnswerType.values()).isRequired,
    id: PropTypes.number.isRequired,
    order_num: PropTypes.number.isRequired,
    question_text: PropTypes.string.isRequired,
    question_type: PropTypes.oneOf(QuestionType.values())
});
