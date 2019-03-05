import React from 'react';

import './TextArea.css';

const TextArea = (props) => {
    const title = props.title
        ? <h3>{props.title}:</h3>
        : null;
    return (
        <div className='TextArea'>
            <div className='TextArea__question'>
                {title}
            </div>
            <div className='TextArea__content'>
            <textarea
                placeholder="Оставьте свой комментарий" disabled={true}>
            </textarea>
                {props.children}
            </div>
        </div>
    );
};

export default TextArea;