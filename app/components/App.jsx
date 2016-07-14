'use strict';

import React from 'react';

import WaypointList from './WaypointList';
import Button from './Button';

const App = React.createClass({
    getInitialState: function () {
        return {
            gpxFile: '../gpx/track.gpx'
        };
    },

    render: function () {
        return (
            <div className="container">
                <WaypointList source={this.state.gpxFile} />
                <Button /><Button /><Button />
            </div>
        );
    }
});

export default App;