'use strict';

import React from 'react';

const Button = React.createClass({
    handleClick() {
        console.log('visit: %s',this.props.url);
    },

    render: function () {
        return (
            React.createElement('button', {
                onClick: this.handleClick,
                className: 'btn-primary'
            }, this.props.title)
        );
    }
});

export default Button;