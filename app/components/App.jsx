'use strict';

import React from 'react';

import WaypointList from './WaypointList';
import SlideList from './SlideList';
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
                <h1>Les zinc sur la GTJ</h1>
                <Button url="https://sade.github.io/zinc-gtj/" title="My Github demo !"/>
                <SlideList />
                <WaypointList source={this.state.gpxFile}/>
            </div>
        );
    }
});

export default App;