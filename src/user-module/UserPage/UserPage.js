import React, {Component} from 'react';

import Feedbacks from "./Feedbacks/Feedbacks";
import CommonRating from "./Feedbacks/CommonRating/CommonRating";
import './UserPage.css'

class UserPage extends Component {
    render() {
        return (
            <div className="UserComponent">
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

export default UserPage;