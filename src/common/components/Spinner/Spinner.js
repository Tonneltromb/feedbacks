import React from 'react';
import './Spinner.css'

const Spinner = (props) => {
    let colorClass = props.colorClass ? props.colorClass : 'low';
    return (
        <div className='spinner-wrapper'>
            <div className={`loader ${colorClass}`}>Loading...</div>
        </div>
    );
};

export default Spinner;
