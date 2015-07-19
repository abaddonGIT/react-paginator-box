/**
 * Created by abaddon on 19.01.2015.
 */
import React from 'react';
import PaginationBox from './index.js';

var options = {
    items: 150,
    startPage: function () {
        var loc = window.location.href, search = loc ? loc.split('=') : 0;
        return search[1] ? search[1] : 1;
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
    }

    _selectPage(pag) {
        var start = "", loc = window.location.href.split("?");
        start = loc[0];
        var href = start + pag.hrefPrefix + pag.realPage;
        history.pushState(null, null, href);
    }


    _startPage() {
        var loc = window.location.href, search = loc ? loc.split('=') : 0;
        return search[1] ? search[1] : 1;
    }

    render() {
        return (
            <div className="appWrap">
                <PaginationBox selectHandler={this._selectPage.bind(this)} items="200" display="5" startPage={this._startPage.bind(this)} />
                <PaginationBox options={options} />
            </div>
        );
    }
}

React.render(<App />, document.querySelector('#paginatorBox'));
