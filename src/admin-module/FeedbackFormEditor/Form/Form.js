import React, {Component} from 'react';

import './Form.css'
import * as QuestionType from '../../../common/QuestionType';
import RatingInput from "./RatingInput/RatingInput";
import TextArea from "./TextArea/TextArea";

class Form extends Component {

    state = {
      addedInputs: []
    };

    renderedInputs = () => {
        return this.props.questions.map((question) => {
            switch (question.question_type) {
                case QuestionType.ADDITIONAL_STAR_RATING:
                case QuestionType.DEFAULT_STAR_RATING : {
                    return <RatingInput key={question.id} question={question}/>
                }
                case QuestionType.DEFAULT_COMMENT : {
                    return <TextArea key={question.id}/>
                }
                case QuestionType.ADDITIONAL_TEXT_QUESTION : {
                    return <TextArea key={question.id} title={question.question_text}/>
                }
                default:
                    return null;
            }
        });
    };

    renderAddedInputs = () => {
        return this.state.addedInputs.map((input) => {

        });
    };

    addTextInput = () => {

    };

    addRatingInput = () => {

    };

    render() {
        return (
            <div className='Form'>
                <div className="Form__inputs">
                    {this.renderedInputs()}
                </div>
                <div>
                    {this.renderAddedInputs}
                </div>
                <div className="Form__edit-buttons">
                    <button
                        className="Form__edit-button"
                        onClick={this.addTextInput}
                    >Добавить текст
                    </button>
                    <button
                        className='Form__edit-button'
                        onClick={this.addRatingInput}
                    >Добавить шкалу</button>
                </div>
            </div>
        );
    }
}

export default Form;