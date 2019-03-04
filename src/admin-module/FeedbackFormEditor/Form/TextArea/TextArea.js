import React from 'react';

import './TextArea.css';

const TextArea = (props) => {
    const title = props.title
        ? <div className="TextArea-title">{props.title}:</div>
        : null;
    return (
        <div className='TextArea input-element'>
            {title}
            <textarea
                placeholder="Оставьте свой комментарий" disabled={true}>
            </textarea>
            {props.children}
        </div>
    );
};

export default TextArea;