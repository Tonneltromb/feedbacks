import React from 'react';

import './TextArea.css';

const TextArea = (props) => {
    const title = props.title
        ? <h3>{props.title}:</h3>
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