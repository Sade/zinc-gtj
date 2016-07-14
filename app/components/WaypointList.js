'use strict';

import React from 'react';
import xml2js from 'xml2js';

import WaypointItem from './WaypointItem';

const WaypointList = React.createClass({
    getInitialState: function () {
        return {
            data: []
        };
    },

    componentDidMount: function () {
        const _this = this;

        this.serverRequest = fetch(this.props.source, {
            method: 'get',
            headers: {
                'Accept': 'application/gpx+xml',
                'Content-Type': 'application/gpx+xml'
            }

        }).then(function (response) {
            return response.text();

        }).then(function (returnedValue) {
            const parser = new xml2js.Parser();
            parser.parseString(returnedValue, function (err, result) {
                _this.setState({
                    data: result.gpx.trk[0].trkseg[0].trkpt
                });
            });

        }).catch(function (err) {
            //console.error('err', err);
            return null;
        });
    },

    componentWillUnmount: function () {
        this.serverRequest.abort();
    },

    render: function () {
        const waypointsNodes = this.state.data.map(function (data, i) {
            return (<WaypointItem key={i} data={data} />);
        });

        return (
            <ul className="waypoint-list">
                {waypointsNodes}
            </ul>
        );
    }
});

export default WaypointList;