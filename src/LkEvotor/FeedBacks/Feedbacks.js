import React, {Component} from 'react';

import axios from 'axios';

import './Feedbacks.css';
import FeedbackList from "./FeedBackList/FeedbackList";

class Feedbacks extends Component {
    state = {
      feedbacks: ['1', '2']
    };

    getUsers = () => {
        axios.get('http://localhost:4000/users')
            .then(resp => {
                console.log(resp);
            })
            .catch(err => {
                console.error(err);
                this.setState({loading: false});
            });
    };

    render() {
        return (
            <div className='Feedbacks'>
                <h2>Полученные отзывы: {this.state.feedbacks.length}</h2>
                <button onClick={this.getUsers}>Get users</button>
                {/*<FeedbackList feedbacks={this.state.feedbacks}/>*/}
            </div>
        );
    }
}

export default Feedbacks;