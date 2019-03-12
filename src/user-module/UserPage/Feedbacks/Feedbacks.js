import React, {Component} from 'react';

import axios from 'axios';

import './Feedbacks.css';
import * as constants from '../../../common-module/constants/URLConstants';
import FeedbackList from "../../../common-module/components/FeedbacksList/FeedbacksList";
import Spinner from "../../../common-module/components/Spinner/Spinner";
//todo: количество отзывов присылать отдельно(по-любому, будет пагинация)
class Feedbacks extends Component {
    state = {
        feedbacks: [],
        showSpinner: false
    };

    componentDidMount() {
        this.setState({showSpinner: true});
        axios.get(constants.GET_USER_FEEDBACKS_URL, {
            params: {
                userToken: '1234'
            }
        })
            .then((response) => {
                const array = response.data.array.slice();
                this.setState({feedbacks: array, showSpinner: false});
            })
            .catch(error => console.log('Feedbacks error', error));
    }

    render() {
        const additionalComponent = this.state.showSpinner ? <Spinner/> : null;
        return (
            <React.Fragment>
                {additionalComponent}
                <div className='Feedbacks'>
                    <h2>Полученные отзывы: {this.state.feedbacks.length}</h2>
                    <FeedbackList feedbacks={this.state.feedbacks} listStyle={{padding: '0 20px'}}/>
                </div>
            </React.Fragment>
        );
    }
}

export default Feedbacks;