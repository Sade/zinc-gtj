'use strict';

import React from 'react';
import xml2js from 'xml2js';

import WaypointItem from './WaypointItem';

const WaypointList = React.createClass({
    getInitialState: function () {
        return {
            data: [],
            status: 'Chargement...'
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
                    data: result.gpx.trk[0].trkseg[0].trkpt,
                    status: null
                });
            });

        }).catch(function (err) {
            this.setState({
                status: err
            });
            return null;
        });
    },

    componentWillUnmount: function () {
        this.serverRequest.abort();
    },

    render: function () {
        const waypointsNodes = this.state.data.map(function (item, i) {
            return (<WaypointItem key={i} data={item}/>);
        });

        return (
            <div className="waypoint">
                <h2>Waypoint</h2>
                <ul className="waypoint-list">
                    {this.state.status}
                    {waypointsNodes}
                </ul>
            </div>
        );
    }
});

export default WaypointList;