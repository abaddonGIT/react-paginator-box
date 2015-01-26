/**
 * Created by abaddon on 19.01.2015.
 */
var React = require('react');
var ReactPaginatorBox = require('../dist/js/paginatorBox/reactPaginatorBox.min.js');

var options = {
    items: 200,
    startPage: 2,
    limit: 10,
    reload: false
};

var options2 = {
    items: 100,
    startPage: 1,
    limit: 20,
    reload: false
};

React.render(<ReactPaginatorBox options={options} />, document.querySelector('#paginatorBox'));
React.render(<ReactPaginatorBox options={options2} />, document.querySelector('#paginatorBox2'));