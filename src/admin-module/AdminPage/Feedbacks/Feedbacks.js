import React, {Component} from 'react';

import axios from 'axios';

import './Feedbacks.css';
import * as URL from '../../../common-module/constants/URLConstants';
import Spinner from "../../../common-module/components/Spinner/Spinner";
import FeedbacksList from '../../../common-module/components/FeedbacksList/FeedbacksList';

class Feedbacks extends Component {
    state = {
        feedbacks: [],
        showSpinner: true
    };
    componentDidMount() {
        axios.get(URL.GET_FEEDBACKS_URL)
            .then((response) => {
                let feedbacks = response.data.array.slice();
                this.setState({feedbacks: feedbacks, showSpinner: false})
            })
            .catch((error) => {
                console.log(error);
                this.setState({showSpinner: false})
            });
    }

    render() {
        const additionalComponent = this.state.showSpinner ? <Spinner/> : null;
        return (
            <div className="List-wrapper">
                {additionalComponent}
                <FeedbacksList feedbacks={this.state.feedbacks} listStyle={{padding: '0 20px'}}/>
            </div>
        );
    }
}

export default Feedbacks;