/*!
 * Created by Abaddon (abaddongit@gmail.com)
 */
/*global window, document, console*/
"use strict";
import React from 'react/addons';
import classie from 'classie';

export default
class List extends React.Component {
    constructor() {
        super();
    }

    /**
     * Change page handler
     * @param e
     * @private
     */
    _changePageHandler(e) {
        var target = e.target,
            parent = target.parentNode,
            type = target.getAttribute("data-angular");

        if (!this.props.reload) {
            e.preventDefault();
            e.stopPropagation();

            if (type === "true") {
                if (!classie.has(parent, "disabled")) {
                    this.props.changePage(parseInt(target.getAttribute("data-page")));
                }
            } else {
                if (!classie.has(parent, "active")) {
                    this.props.changePage(parseInt(target.getAttribute("data-page")));
                }
            }
        } else {
            this.props.changePage(parseInt(target.getAttribute("data-page")));
        }
    }

    render() {
        var pages = this.props.list.map(function (item, i) {
            if (item.link) {
                return (
                    <li key={i} className={item.class}>
                        <a href={item.href} data-angular={item.angular} data-page={item.page} onClick={this._changePageHandler.bind(this)}>
                            {item.text}
                        </a>
                    </li>
                );
            } else {
                return (
                    <li key={i}>
                        <span>
                            {item.text}
                        </span>
                    </li>
                );
            }
        }.bind(this));
        return (
            <ul>
                {pages}
            </ul>
        );
    }
}

List.propsTypes = {
    reload: React.PropTypes.boolean,
    list: React.PropTypes.array,
    changePage: React.PropTypes.func
};