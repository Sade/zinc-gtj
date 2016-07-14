'use strict';

import React from 'react';

import WaypointList from './WaypointList';
import Button from './Button';

const App = React.createClass({
    getInitialState: function () {
        return {
            gpxFile: '../gpx/track.gpx1'
        };
    },

    render: function () {
        return (
            <div className="container">
                <Button url="https://sade.github.io/zinc-gtj/" title="My Github demo !" />
                <WaypointList source={this.state.gpxFile} />
            </div>
        );
    }
});

export default App;