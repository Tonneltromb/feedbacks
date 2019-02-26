import React, {Component} from 'react';

import Feedbacks from "./FeedBacks/Feedbacks";
import CommonRating from "./FeedBacks/CommonRating/CommonRating";
import './LkEvotor.css'

class LkEvotor extends Component {
    render() {
        return (
            <div className="LkEvotor">
                <div className='Feedbacks-wrapper'>
                    <Feedbacks/>
                </div>
                <div className='CommonRating-wrapper'>
                    <CommonRating/>
                </div>
            </div>
        );
    }
}

export default LkEvotor;