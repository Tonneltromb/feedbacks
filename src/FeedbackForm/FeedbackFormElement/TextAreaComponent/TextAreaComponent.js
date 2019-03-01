import React, {Component} from 'react';
import PropTypes from 'prop-types';

import './TextAreaComponent.css';

class TextAreaComponent extends Component {
    state = {
        value: ''
    };

    onTextAreaChangeHandler = (event) => {
        this.setState({value: event.target.value});
    };

    getTitleElement = () => {
        return this.props.title && this.props.showTitle
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
                data-field-value={this.state.value}
            >
                {this.getTitleElement()}
                <textarea
                    placeholder="Оставьте свой комментарий"
                    onChange={this.onTextAreaChangeHandler}
                >
            </textarea>
            </div>

        );

    }
};

TextAreaComponent.propTypes = {
    questionId: PropTypes.number.isRequired,
    showTitle: PropTypes.bool.isRequired
};

export default TextAreaComponent;