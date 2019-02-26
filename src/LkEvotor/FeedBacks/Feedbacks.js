import React, {Component} from 'react';

import './Feedbacks.css';
import FeedbackList from "./FeedBackList/FeedbackList";

class Feedbacks extends Component {
    state = {
      feedbacks: ['1', '2']
    };
    render() {
        return (
            <div className='Feedbacks'>
                <h2>Полученные отзывы: {this.state.feedbacks.length}</h2>
                <FeedbackList />
            </div>
        );
    }
}

export default Feedbacks;