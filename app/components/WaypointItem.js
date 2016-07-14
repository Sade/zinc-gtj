'use strict';

import React from 'react';

const WaypointItem = React.createClass({
    render: function () {
        const data = this.props.data;

        return (
            <li className="waypoint-item">
                <span className="lat">lat:{data.$.lat}</span> ;
                <span className="lon">lon:{data.$.lon}</span> ;
                <span className="ele">ele:{data.ele}</span>
            </li>
        );
    }
});

export default WaypointItem;