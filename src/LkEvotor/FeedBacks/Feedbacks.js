import React, {Component} from 'react';

import axios from 'axios';

import './Feedbacks.css';
import * as constants from '../../common/constants';
import FeedbackList from "./FeedBackList/FeedbackList";
import Spinner from "../../common/components/Spinner/Spinner";

class Feedbacks extends Component {
    state = {
        feedbacks: [],
        loading: false
    };

    componentDidMount() {
        this.setState({loading: true});
        axios.get(constants.GET_USER_FEEDBACKS_URL, {
            params: {
                userToken: '1234'
            }
        })
            .then((response) => {
                const array = response.data.array.slice();
                this.setState({feedbacks: array, loading: false});
            })
            .catch(error => console.log('Feedbacks error', error));
    }

    render() {
        let additionalComponent = null;
        if (this.state.loading) additionalComponent = <Spinner/>;
        return (
            <React.Fragment>
                {additionalComponent}
                <div className='Feedbacks'>
                    <h2>Полученные отзывы: {this.state.feedbacks.length}</h2>
                    <FeedbackList feedbacks={this.state.feedbacks}/>
                </div>
            </React.Fragment>
        );
    }
}

export default Feedbacks;