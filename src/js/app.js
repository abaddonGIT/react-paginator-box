/**
 * Created by abaddon on 19.01.2015.
 */
import React from 'react';
import PaginationBox from './index.js';

var options = {
    items: 150,
    hrefPrefix: "?q=&page=",
    startPage: function () {
        var loc = window.location.href, search = loc ? loc.split('=') : 0;
        return search[2] ? search[2] : 1;
    },
    limit: 10,
    reload: false,
    selectHandler: function (p) {
        var start = "", loc = window.location.href.split("?");
        start = loc[0];
        var href = start + p.hrefPrefix + p.realPage;
        history.pushState(null, null, href);
    }
};


class App extends React.Component {
    constructor() {
        super();
        this.state = {
            items: 0
        }
    }

    _selectPage(pag) {
        var start = "", loc = window.location.href.split("?");
        start = loc[0];
        var href = start + pag.hrefPrefix + pag.realPage;
        history.pushState(null, null, href);
    }

    componentDidMount() {
        this.setState({items: 300});
    }


    _startPage() {
        console.log('das');
        var loc = window.location.href, search = loc ? loc.split('=') : 0;
        return search[2] ? search[2] : 1;
    }


    render() {
        return (
            <div className="appWrap">
                <PaginationBox options={options} />
                <PaginationBox items={this.state.items} />
                <PaginationBox selectHandler={this._selectPage.bind(this)} hrefPrefix="?q=&page=" items={this.state.items} display="5" startPage={this._startPage.bind(this)} />
            </div>
        );
    }
}

React.render(<App />, document.querySelector('#paginatorBox'));
