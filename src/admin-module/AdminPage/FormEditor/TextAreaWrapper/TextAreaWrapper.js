import React from 'react';

import PropTypes from 'prop-types';

import './TextAreaWrapper.css';
import TextArea from '../../../../common-module/components/TextArea/TextArea';

const TextAreaWrapper = props => {
    return (
        <div className='TextAreaWrapper'>
            <div className='TextArea-component-wrapper'>
                <TextArea question_text={props.questionText}
                          textareaPlaceholder={props.textareaPlaceholder}
                          questionTextSize={'1.2em'}
                          disableTextarea={true} />
            </div>
            <div className='children-wrapper'>{props.children}</div>
        </div>
    );
};

TextAreaWrapper.propTypes = {
    questionText: PropTypes.string,
    textareaPlaceholder: PropTypes.string
};

export default TextAreaWrapper;