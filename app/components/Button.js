'use strict';

import React from 'react';

const Button = React.createClass({
    handleClick() {
        console.log('clicked');
        this.props.onClick(this.props.address);
    },

    render: function () {
        return (
            React.createElement('button', {
                onClick: this.handleClick,
                className: 'btn-primary'
            }, 'Click me!')
        );
    }
});

export default Button;