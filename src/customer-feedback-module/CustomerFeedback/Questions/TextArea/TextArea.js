import React, {Component} from 'react';
import PropTypes from 'prop-types';

import './TextArea.css';

class TextArea extends Component {
    state = {
        value: ''
    };

    onTextAreaChangeHandler = (event) => {
        this.setState({value: event.target.value});
    };

    getTitleElement = () => {
        return this.props.title
            ? (
                <div className="TextAreaComponent-title">
                    {this.props.title}:
                </div>
            )
            : null;
    };

    render() {
        return (
            <div
                className='TextAreaComponent feedback-form-input'
                data-field-id={this.props.questionId}
                data-field-value={this.state.value}>{this.getTitleElement()}
                <textarea
                    placeholder="Оставьте свой комментарий"
                    onChange={this.onTextAreaChangeHandler}/>
            </div>
        );
    }
}

TextArea.propTypes = {
    questionId: PropTypes.number.isRequired
};

export default TextArea;