'use strict';

import React from 'react';
import SlideItem from './SlideItem';

const SlideList = React.createClass({
    getDefaultProps: function () {
        return {
            data: []
        };
    },
    render: function () {
        const SlideNodes = this.props.data.map(function (item, i) {
            <SlideItem key={i} data={item}/>
        });

        return (
            <div className="slider">
                <h2>Slider</h2>
                <ul className="slide-list">
                    {SlideNodes}
                </ul>
            </div>
        );
    }
});

export default SlideList;