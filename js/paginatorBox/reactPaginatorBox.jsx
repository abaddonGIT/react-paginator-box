/**
 * Created by abaddon on 08.01.2015.
 */
/*global require, module*/
var React = require('react');

var ReactPaginatorBox = null;
(function (R, M) {
    "use strict";
    var LinkItem = R.createClass({
        hasClass: function (el, className) {
            if (el.classList) {
                return el.classList.contains(className);
            } else {
                var reg = new RegExp("(^|\\s)" + className + "(\\s|$)", "g");
                if (reg.test(el.className)) {
                    return true;
                } else {
                    return false;
                }
            }
        },
        changePageHandler: function (e) {
            var parent = e.target.parentNode, type = e.target.getAttribute("data-angular");
            if (!this.props.reload) {
                e.preventDefault();
                e.stopPropagation();
                if (type === "true") {
                    if (!this.hasClass(parent, "disabled")) {
                        this.props.changePage(parseInt(e.target.getAttribute("data-page")));
                    }
                } else {
                    if (!this.hasClass(parent, "active")) {
                        this.props.changePage(parseInt(e.target.getAttribute("data-page")));
                    }
                }
            } else {
                this.props.changePage(parseInt(e.target.getAttribute("data-page")));
            }
        },
        render: function () {
            var param = this.props.param;
            return (
                <li className={param.class}>
                    <a href={param.href} data-angular={param.angular} data-page={param.page} onClick={this.changePageHandler}>
                    {param.text}
                    </a>
                </li>
                );
        }
    });
    var NotLink = R.createClass({
        render: function () {
            var param = this.props.param;
            return (
                <li>
                    <span>
                    {param.text}
                    </span>
                </li>
                );
        }
    });
    var PaginationList = R.createClass({
        render: function () {
            var pages = this.props.list.map(function (item) {
                if (item.link) {
                    return (
                        <LinkItem param={item} reload={this.props.reload} changePage={this.props.changePage} />
                        );
                } else {
                    return (
                        <NotLink param={item} />
                        );
                }
            }.bind(this));
            return (
                <ul>
                    {pages}
                </ul>
                );
        }
    });
    ReactPaginatorBox = R.createClass({
        propTypes: {
            items: R.PropTypes.number,
            limit: R.PropTypes.number,
            display: R.PropTypes.number,
            startPage: R.PropTypes.number,
            nextText: R.PropTypes.string,
            prevText: R.PropTypes.string
        },
        getInitialState: function () {
            return {
                list: []
            };
        },
        getInterval: function () {
            return {
                start: M.ceil(this.props.currentPage > this.props.halfDisplay ? M.max(M.min(this.props.currentPage - this.props.halfDisplay, this.props.pageCount - this.props.display), 0) : 0),
                end: M.ceil(this.props.currentPage > this.props.halfDisplay ? M.min(this.props.currentPage + this.props.halfDisplay, this.props.pageCount) : M.min(this.props.display, this.props.pageCount))
            };
        },
        ext: function (one, two) {
            for (var i in two) {
                if (two.hasOwnProperty(i)) {
                    one[i] = two[i];
                }
            }
            return one;
        },
        componentWillMount: function () {
            var defSetting = {
                items: 100,
                reload: true,
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
                lastText: "Last"
            };

            Object.defineProperties(defSetting, {
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
                        this.pageCount = M.ceil(this.items / value);
                    }
                }
            });
            this.props = this.ext(defSetting, this.props.options);

            !this.props.limit ? this.props.limit = 10 : "";
            (!this.props.display || this.props.display < 3) ? this.props.display = 5 : "";

            if (this.props.pageCount > 0) {
                this.props.currentPage = this.props.startPage - 1;
                this.setState({list: this.buildList()});
            }
        },
        buildList: function () {
            var list = [], interval = this.getInterval();
            return this.firstLinks(list, interval).intervalLink(list, interval).lasterLinks(list, interval);
        },
        addItem: function (page) {
            page = page < 0 ? 0 : (page < this.props.pageCount ? page : this.props.pageCount - 1);
            return {
                class: (page === this.props.currentPage) ? "active" : "",
                link: true,
                page: page,
                text: page + 1,
                href: this.props.hrefPrefix + (page + 1) + this.props.hrefParams
            };
        },
        addAngItem: function (type, disabled, page, increment) {
            var text;
            page = page || 0;
            switch (type) {
                case 'prev':
                    text = this.props.prevText;
                    break;
                case 'first':
                    text = this.props.firstText;
                    break;
                case 'last':
                    text = this.props.lastText;
                    break;
                case 'next':
                    text = this.props.nextText;
                    break;
            }
            return {
                class: disabled ? "disabled" : "",
                link: true,
                page: page,
                href: this.props.hrefPrefix + (increment ? (page + 1) : page) + this.props.hrefParams,
                angular: true,
                text: text
            };
        },
        firstLinks: function (list, interval) {
            if (this.props.angularLink) {
                this.generatedPrevLink(list);
            }
            if (interval.start > 0) {
                var end = M.min(this.props.end, interval.start);

                for (var i = 0; i < end; i++) {
                    list.push(this.addItem(i));
                }
                if (interval.start - this.props.end === 1) {
                    list.push(this.addItem(this.props.end));
                }
                if (interval.start > this.props.end && (interval.start - this.props.end !== 1)) {
                    list.push({class: "not-use", link: false, text: "..."});
                }
            }
            return {
                intervalLink: this.intervalLink
            };
        },
        generatedPrevLink: function (list) {
            if (this.props.currentPage === 0) {
                if (this.props.edgeLinks) {
                    list.push(this.addAngItem('first', true));
                }
                list.push(this.addAngItem('prev', true));
            } else {
                if (this.props.edgeLinks) {
                    list.push(this.addAngItem('first', false, 0, true));
                }
                list.push(this.addAngItem('prev', false, (this.props.currentPage - 1 < 0 ? 0 : this.props.currentPage - 1), true));
            }
        },
        generatedNextLink: function (list) {
            if (this.props.currentPage + 1 === this.props.pageCount) {
                list.push(this.addAngItem('next', true));
                if (this.props.edgeLinks) {
                    list.push(this.addAngItem('last', true));
                }
            } else {
                list.push(this.addAngItem('next', false, (this.props.currentPage + 1 < this.props.pageCount ? this.props.currentPage + 1 : this.props.pageCount - 1), true));
                if (this.props.edgeLinks) {
                    list.push(this.addAngItem('last', false, this.props.pageCount - 1, true));
                }
            }
        },
        intervalLink: function (list, interval) {
            for (var i = interval.start; i < interval.end; i++) {
                list.push(this.addItem(i));
            }
            return {
                lasterLinks: this.lasterLinks
            };
        },
        lasterLinks: function (list, interval) {
            if (interval.end < this.props.pageCount) {
                var begin = M.max(this.props.pageCount - this.props.end, interval.end);
                if (this.props.pageCount - this.props.end > interval.end && (this.props.pageCount - this.props.end - interval.end !== 1)) {
                    list.push({class: "not-use", link: false, text: "..."});
                }
                if (this.props.pageCount - this.props.end - interval.end === 1) {
                    list.push(this.addItem(interval.end));
                }
                for (var i = begin; i < this.props.pageCount; i++) {
                    list.push(this.addItem(i));
                }
            }
            if (this.props.angularLink) {
                this.generatedNextLink(list);
            }
            return list;
        },
        changePageHandler: function (page) {
            setTimeout(function () {
                if (page >= 0 && page <= this.props.pageCount - 1) {
                    this.props.currentPage = page;
                    this.setState({list: this.buildList()});
                }
            }.bind(this), 0);
        },
        render: function () {
            return (
                <div className="pagination-box">
                    <PaginationList reload={this.props.reload} list={this.state.list} changePage={this.changePageHandler} />
                </div>
                );
        }
    });
}(React, Math));

module.exports = ReactPaginatorBox;