# react-paginator-box #
[![npm version][npm-image]][npm-url]
[![License][license-image]][license-url]
[![Downloads][downloads-image]][downloads-url]
[![GitHub issues][git-issues]][git-issues-url]
[![GitHub stars][git-stars-image]][git-stars-url]

Page pagination component on **Reactjs** ([Demo](http://abaddongit.github.io/react-paginator-box/))
 
### Browsers support ###
 
 - **Chrome**
 - **Opera**
 - **Firefox**
 - **Safary >= 5.1.3**
 - **IE >= 9**
 
### Installation ###
     npm install react-paginator-box
 
### How to use him? ###
     import React from 'react';
     import PaginationBox from './index.jsx';

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
                     //With props
                     <PaginationBox selectHandler={this._selectPage.bind(this)} items="200" display="5" startPage={this._startPage.bind(this)} />
                     //With options
                     <PaginationBox options={options} />
                 </div>
             );
         }
     }

     React.render(<App />, document.querySelector('#paginatorBox'));

### Component parameters ###
 
  - **items** - The total number of elements (default - 100),
  - **reload** -  reload page when user click on page link  (default - false),
  - **hrefPrefix** - string used to build the href attribute, added before the page number (default - "?page="),
  - **hrefParams** - used to build the href attribute, added after the page number. (default - " "),
  - **display** - how many page numbers should be visible while navigation (default - 5),
  - **limit** - how many elements should be on one page (default - 10),
  - **startPage** - the start page number (default - 1), may be function,
  - **end** -  how many page numbers should be visible at the beginning/ending of the pagination.  (default - 2),
  - **angularLink** - show "prev","next" links (default - true),
  - **edgeLinks** - show "first", "last" links (default - true),
  - **nextText** - title at "next" link (default - "Next"),
  - **prevText** - title at "prev" link (default - "Prev"),
  - **firstText** - title at "first" link (default - "Start"),
  - **lastText** - title at "last" link (default - "End")


## License

MIT, see [LICENSE][license-url] for details.

[npm-image]: https://img.shields.io/npm/v/react-paginator-box.svg?style=flat-square
[npm-url]: https://www.npmjs.com/package/react-paginator-box
[downloads-image]: http://img.shields.io/npm/dm/react-paginator-box.svg?style=flat-square
[downloads-url]: https://npmjs.org/package/react-paginator-box
[license-image]: http://img.shields.io/npm/l/react-paginator-box.svg?style=flat-square
[license-url]: LICENSE
[git-issues]: https://img.shields.io/github/issues/abaddonGIT/react-paginator-box.svg
[git-issues-url]: https://github.com/abaddonGIT/react-paginator-box/issues
[git-stars-image]: https://img.shields.io/github/stars/abaddonGIT/react-paginator-box.svg
[git-stars-url]: https://github.com/abaddonGIT/react-paginator-box/stargazers