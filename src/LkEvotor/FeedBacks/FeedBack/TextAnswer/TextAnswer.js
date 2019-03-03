import React from 'react';
import PropTypes from 'prop-types';

import './TextAnswer.css';

const TextAnswer = props => {
    // todo: написать регулярку на отсутсвие в тексте только пробелов или переносов строк
    const content = props.content.trim().length > 0 ? props.content : 'Комментарий отсутсвует' ;
    return (
        <div className="TextAnswer">
            {content}
        </div>
    );
};

TextAnswer.propTypes = {

};

export default TextAnswer;