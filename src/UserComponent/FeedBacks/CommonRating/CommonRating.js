import React, {Component} from 'react';

import axios from 'axios';
import StarRatingComponent from 'react-star-rating-component';

import './CommonRating.css';
import * as constants from "../../../common/constants";

class CommonRating extends Component {
    state = {
        averageRating: 0,
        loading: false
    };

    componentDidMount() {
        this.setState({showSpinner: true});
        axios.get(constants.GET_USER_AVERAGE_RATING_URL, {
            params: {
                userToken: '1234'
            }
        })
            .then((response) => {
                this.setState({averageRating: response.data, showSpinner: false});
            })
            .catch(error => console.log('Feedbacks error', error));
    }

    render() {
        return (
            <div className='CommonRating'>
                <h2>Средний рейтинг</h2>
                <div className='CommonRating-star-component'>
                    <StarRatingComponent
                        name={`average-rating-component`}
                        starCount={5}
                        editing={false}
                        value={this.state.averageRating}/>
                </div>
            </div>
        );
    }
}

export default CommonRating;