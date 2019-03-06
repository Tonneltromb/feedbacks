import React, {Component} from 'react';

import Feedbacks from "./Feedbacks/Feedbacks";
import CommonRating from "./Feedbacks/CommonRating/CommonRating";
import './UserComponent.css'

class UserComponent extends Component {
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

export default UserComponent;