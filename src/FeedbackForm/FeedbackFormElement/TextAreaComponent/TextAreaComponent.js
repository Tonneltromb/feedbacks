import React from 'react';
import PropTypes from 'prop-types';

import './TextAreaComponent.css';

const TextAreaComponent = props => {
    let getTitleElement = () => {
        return props.title && props.showTitle
            ? (
                <div className="TextAreaComponent-title">
                    {props.title}:
                </div>
            )
            : null;
    };

    return (
        <div className='TextAreaComponent'>
            {getTitleElement()}
            <textarea name={props.fieldName} placeholder="Оставьте свой комментарий">
            </textarea>
        </div>
    );
};

TextAreaComponent.propTypes = {
    fieldName: PropTypes.string.isRequired,
    showTitle: PropTypes.bool.isRequired
};

export default TextAreaComponent;