import React, {Component} from 'react';

import PropTypes from 'prop-types';

import TextArea from '../../../common-module/components/TextArea/TextArea';

class TextAreaWrapper extends Component {
    state = {
        value: ''
    };
    onTextAreaChangeHandler = (event) => {
        this.setState({value: event.target.value});
    };
    render() {
        return (
            <div
                className='feedback-form-input'
                data-field-id={this.props.questionId}
                data-field-value={this.state.value}>
                <TextArea question_text={this.props.questionText}
                          onTextAreaChangeHandler={this.onTextAreaChangeHandler}
                          textareaPlaceholder={this.props.textareaPlaceholder}
                          questionTextSize={'1.5em'} />
            </div>
        );
    }
}

TextAreaWrapper.propTypes = {
    questionText: PropTypes.string,
    questionId: PropTypes.number.isRequired,
    textareaPlaceholder: PropTypes.string
};

export default TextAreaWrapper;