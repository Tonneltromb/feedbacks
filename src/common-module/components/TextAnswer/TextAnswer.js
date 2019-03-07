import React from 'react';
import PropTypes from 'prop-types';

import './TextAnswer.css';

const TextAnswer = props => {
    // todo: написать регулярку на отсутсвие в тексте только пробелов или переносов строк
    const questionText = props.questionText
        ? (
            <div className='TextAnswer__question-text'
                 style={{fontSize: props.questionFontSize || '1em'}}>
                {props.questionText}
            </div>
        )
        : null;
    const content = props.content.trim().length > 0
        ? (
            <div className='TextAnswer__content'
                 style={{fontSize: props.contentFontSize || '1em'}}>
                {props.content}
            </div>
        )
        : (<span style={{color: 'red'}}>'Ответ отсутствует'</span>);
    return (
        <div className="TextAnswer">
            {questionText}
            {content}
        </div>
    );
};

TextAnswer.propTypes = {
    questionText: PropTypes.string,
    content: PropTypes.string,
    questionFontSize: PropTypes.string,
    contentFontSize: PropTypes.string
};

export default TextAnswer;