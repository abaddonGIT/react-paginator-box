/**
 * Created by abaddon on 19.01.2015.
 */
var React = require('react');
var ReactPaginatorBox = require('../src/index.jsx');

var options = {
    //items: 200,
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

var paginate1 = React.render(React.createElement(ReactPaginatorBox, {options: options}), document.querySelector('#paginatorBox'));
var paginate2 = React.render(React.createElement(ReactPaginatorBox, {options: options2}), document.querySelector('#paginatorBox2'));

paginate1.on("onChange", function () {
    console.log("first");
});

paginate2.on("onChange", function () {
    console.log("second");
});