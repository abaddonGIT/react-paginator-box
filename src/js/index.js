/*!
 * Created by Abaddon (abaddongit@gmail.com)
 */
/*global window, document, console*/
"use strict";
import React from 'react';
import assign from 'object-assign';
import List from './parts/List.react.jsx';

class PaginationBox extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            list: []
        };
    }

    componentDidMount() {
        this._setConfig();
    }

    /**
     * Set component config
     * @private
     */
    _setConfig() {
        var def = {
            items: 100,
            reload: false,
            hrefPrefix: "?page=",
            hrefParams: "",
            startPage: 1,
            end: 2,
            currentPage: 0,
            angularLink: true,
            edgeLinks: true,
            nextText: "Next",
            prevText: "Prev",
            firstText: "First",
            lastText: "Last",
            handlers: []
        };
        assign(def, this.props.options || this.props);

        Object.defineProperties(this, {
            display: {
                get: function () {
                    return this._display;
                },
                set: function (value) {
                    this._display = value;
                    this.halfDisplay = value / 2;
                }
            },
            limit: {
                get: function () {
                    return this._limit;
                },
                set: function (value) {
                    this._limit = value;
                    this.pageCount = Math.ceil(this.items / value);
                }
            }
        });
        assign(this, def);
        !this.limit ? this.limit = 10 : "";
        (!this.display || this.display < 3) ? this.display = 5 : "";

        if (this.pageCount > 0) {
            this.currentPage = (typeof this.startPage !== "function") ? this.startPage - 1 : this.startPage() - 1;
            this.setState({list: this._buildList()});
        }
    }

    /**
     * Get visible link interval
     * @returns {{start: number, end: number}}
     * @private
     */
    _getInterval() {
        return {
            start: Math.ceil(this.currentPage > this.halfDisplay ? Math.max(Math.min(this.currentPage - this.halfDisplay, this.pageCount - this.display), 0) : 0),
            end: Math.ceil(this.currentPage > this.halfDisplay ? Math.min(this.currentPage + this.halfDisplay, this.pageCount) : Math.min(this.display, this.pageCount))
        };
    }

    /**
     * Add angular link
     * @param type
     * @param disabled
     * @param page
     * @param increment
     * @returns {{class: string, link: boolean, page: (*|number), href: *, angular: boolean, text: *}}
     * @private
     */
    _addAngItem(type, disabled, page, increment) {
        var text;
        page = page || 0;
        switch (type) {
            case 'prev':
                text = this.prevText;
                break;
            case 'first':
                text = this.firstText;
                break;
            case 'last':
                text = this.lastText;
                break;
            case 'next':
                text = this.nextText;
                break;
        }
        return {
            class: disabled ? "disabled" : "",
            link: true,
            page: page,
            href: this.hrefPrefix + (increment ? (page + 1) : page) + this.hrefParams,
            angular: true,
            text: text
        };
    }

    /**
     * Add number link
     * @param page
     * @returns {{class: string, link: boolean, page: number, text: *, href: *}}
     * @private
     */
    _addItem(page) {
        page = page < 0 ? 0 : (page < this.pageCount ? page : this.pageCount - 1);
        return {
            class: (page === this.currentPage) ? "active" : "",
            link: true,
            page: page,
            text: page + 1,
            href: this.hrefPrefix + (page + 1) + this.hrefParams
        };
    }

    /**
     * Build pagination
     * @returns {*}
     * @private
     */
    _buildList() {
        var list = [], interval = this._getInterval();
        return this._firstLinks(list, interval).intervalLink(list, interval).lasterLinks(list, interval);
    }

    /**
     * Generate to start link
     * @param list
     * @param interval
     * @returns {{intervalLink: (function(this:PaginationBox))}}
     * @private
     */
    _firstLinks(list, interval) {
        if (this.angularLink) {
            this._generatedPrevLink(list);
        }

        if (interval.start > 0) {
            var end = Math.min(this.end, interval.start);

            for (let i = 0; i < end; i++) {
                list.push(this._addItem(i));
            }
            if (interval.start - this.end === 1) {
                list.push(this._addItem(this.end));
            }
            if (interval.start > this.end && (interval.start - this.end !== 1)) {
                list.push({class: "not-use", link: false, text: "..."});
            }
        }
        return {
            intervalLink: this._intervalLink.bind(this)
        };
    }

    /**
     * Generate previos link
     * @param list
     * @private
     */
    _generatedPrevLink(list) {
        if (this.currentPage === 0) {
            if (this.edgeLinks) {
                list.push(this._addAngItem('first', true));
            }
            list.push(this._addAngItem('prev', true));
        } else {
            if (this.edgeLinks) {
                list.push(this._addAngItem('first', false, 0, true));
            }
            list.push(this._addAngItem('prev', false, (this.currentPage - 1 < 0 ? 0 : this.currentPage - 1), true));
        }
    }

    /**
     * Ganerate next link
     * @param list
     * @private
     */
    _generatedNextLink(list) {
        if (this.currentPage + 1 === this.pageCount) {
            list.push(this._addAngItem('next', true));
            if (this.edgeLinks) {
                list.push(this._addAngItem('last', true));
            }
        } else {
            list.push(this._addAngItem('next', false, (this.currentPage + 1 < this.pageCount ? this.currentPage + 1 : this.pageCount - 1), true));
            if (this.edgeLinks) {
                list.push(this._addAngItem('last', false, this.pageCount - 1, true));
            }
        }
    }

    /**
     * Generate numbers links
     * @param list
     * @param interval
     * @returns {{lasterLinks: (function(this:PaginationBox))}}
     * @private
     */
    _intervalLink(list, interval) {
        for (let i = interval.start; i < interval.end; i++) {
            list.push(this._addItem(i));
        }
        return {
            lasterLinks: this._lasterLinks.bind(this)
        };
    }

    /**
     * Generate to end link
     * @param list
     * @param interval
     * @returns {*}
     * @private
     */
    _lasterLinks(list, interval) {
        if (interval.end < this.pageCount) {
            var begin = Math.max(this.pageCount - this.end, interval.end);
            if (this.pageCount - this.end > interval.end && (this.pageCount - this.end - interval.end !== 1)) {
                list.push({class: "not-use", link: false, text: "..."});
            }
            if (this.pageCount - this.end - interval.end === 1) {
                list.push(this._addItem(interval.end));
            }
            for (var i = begin; i < this.pageCount; i++) {
                list.push(this._addItem(i));
            }
        }
        if (this.angularLink) {
            this._generatedNextLink(list);
        }
        return list;
    }

    /**
     * Click to link handler
     * @param e
     * @private
     */
    _changePageHandler(page) {
        setTimeout(function () {
            if (page >= 0 && page <= this.pageCount - 1) {
                this.currentPage = page;
                this.setState({list: this._buildList()});
                this.realPage = this.currentPage + 1 < this.pageCount ? this.currentPage + 1 : this.pageCount;
                this.selectHandler(this);
            }
        }.bind(this), 0);
    }


    render() {
        return (
            <div className="pagination-box">
                <List reload={this.reload} list={this.state.list} changePage={this._changePageHandler.bind(this)} />
            </div>
        );
    }
}

PaginationBox.defaultProps = {
    selectHandler: function () {
    }
};

PaginationBox.propsTypes = {
    items: React.PropTypes.number,
    limit: React.PropTypes.number,
    display: React.PropTypes.number,
    nextText: React.PropTypes.string,
    prevText: React.PropTypes.string,
    handlers: React.PropTypes.array,
    selectHandler: React.PropTypes.func,
    startPageHandler: React.PropTypes.func
};

export default PaginationBox;