/**
 * Created by abaddon on 19.01.2015.
 */
var React = require('react');
var PaginatorBox = require('../dist/js/paginatorBox/paginatorBox.min.js');

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

var one = React.render(<PaginatorBox options={options} />, document.querySelector('#paginatorBox'));
var two = React.render(<PaginatorBox options={options2} />, document.querySelector('#paginatorBox2'));


console.log(one);
console.log(two);