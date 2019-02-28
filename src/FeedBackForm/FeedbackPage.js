import React, {Component} from 'react';

import axios from 'axios';

import * as constants from '../common/constants';
import Spinner from "../common/components/Spinner/Spinner";
import FeedbackFormElement from "./FeedbackFormElement/FeedbackFormElement";

class FeedbackForm extends Component {
    state = {
      questions: [],
      loading: true
    };

    componentDidMount() {
        axios.get(constants.GET_QUESTIONS_URL)
            .then((response) => {
                console.log('response',response);
                const arr = response.data.slice();
                this.setState({loading: false, questions: arr})
            })
            .catch((error) => {
                console.log('error',error);
                this.setState({loading: false})
            });
    }

    render() {
        let additionalComponent = null;
        if (this.state.loading) additionalComponent = <Spinner />;
        return (
            <div>
                {additionalComponent}
                {this.state.questions.map((question) => {
                    return <FeedbackFormElement
                        key={question.id}
                        questionObject={question}/>
                })}
            </div>
        );
    }
}

export default FeedbackForm;