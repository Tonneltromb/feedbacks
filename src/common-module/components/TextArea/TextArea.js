import React from 'react';
import PropTypes from 'prop-types';

import './TextArea.css';

const TextArea = (props) => {
    const getQuestionText = () => {
        return props.question_text
            ? <div className="question-text"
                   style={{fontSize: props.questionTextSize}}>{props.question_text}</div>
            : null;
    };
    return (
        <div className="TextArea">
            {getQuestionText()}
            <textarea
                placeholder={props.textareaPlaceholder}
                onChange={props.onTextAreaChangeHandler}
                disabled={props.disableTextarea}/>
        </div>
    );
};

TextArea.propTypes = {
    question_text: PropTypes.string,
    questionTextSize: PropTypes.string,
    disableTextarea: PropTypes.bool,
    textareaPlaceholder: PropTypes.string,
    onTextAreaChangeHandler: PropTypes.func
};

export default TextArea;