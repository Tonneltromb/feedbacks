import React, {Component} from 'react';
import PropTypes from 'prop-types';

import StarRatingComponent from 'react-star-rating-component';

import './StarComponent.css';

class StarComponent extends Component {

    state = {
        value: 0,
        selected: 0
    };

    getTitleElement = () => {
        return this.props.title
            ? (
                <div className="StarComponent-title">
                    {this.props.title}:
                </div>
            )
            : null;
    };

    render() {
        return (
            <div className="StarComponent">
                {this.getTitleElement()}
                <div className="StarComponent-rating-component-wrapper">
                    <StarRatingComponent
                        name={this.props.fieldName}
                        starCount={5}
                        value={this.state.value}
                        onStarClick={(nextValue, prevValue, name) => {
                            this.setState({value: nextValue, selected: nextValue})
                        }}
                        onStarHover={(nextValue, prevValue, name) => {
                            this.setState({value: nextValue})
                        }}
                        onStarHoverOut={(nextValue, prevValue, name) => {
                            const selected = this.state.selected;
                            this.setState({value: selected})
                        }}
                    />
                </div>
            </div>
        );

    }
}

StarComponent.propTypes = {
    fieldName: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired
};

export default StarComponent;