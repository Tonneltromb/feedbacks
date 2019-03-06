import React from 'react';

import './TextArea.css';

const TextArea = (props) => {
    const questionText = props.questionText
        ? <h3>{props.questionText}</h3>
        : null;
    return (
        <div className='TextArea'>
            <div className='TextArea__question question-text'>{questionText}</div>
            <div className='TextArea__content'>
                <textarea placeholder="Оставьте свой комментарий" disabled={true}/>
                <div className='children-component'>
                    {props.children}
                </div>
            </div>
        </div>
    );
};

export default TextArea;