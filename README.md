# react-paginator-box #
 
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
     var React = require('react');
     var ReactPaginatorBox = require('react-paginator-box');
     var options = {
         items: 200,
         startPage: 2,
         limit: 20
     };
     var inst = React.render(React.createElement(ReactPaginatorBox, {options: options}), document.querySelector('#paginatorBox'));
     var inst2 = React.render(React.createElement(ReactPaginatorBox, {items: 150, limit: 40}), document.querySelector('#paginatorBox2'));

     inst.on("onChange", function () {
        console.log(this);
     });

### Component parameters ###
 
  - **items** - The total number of elements (default - 100),
  - **reload** -  reload page when user click on page link  (default - false),
  - **hrefPrefix** - string used to build the href attribute, added before the page number (default - "?page="),
  - **hrefParams** - used to build the href attribute, added after the page number. (default - " "),
  - **display** - how many page numbers should be visible while navigation (default - 5),
  - **limit** - how many elements should be on one page (default - 10),
  - **startPage** - the start page number (default - 1),
  - **end** -  how many page numbers should be visible at the beginning/ending of the pagination.  (default - 2),
  - **angularLink** - show "prev","next" links (default - true),
  - **edgeLinks** - show "first", "last" links (default - true),
  - **nextText** - title at "next" link (default - "Next"),
  - **prevText** - title at "prev" link (default - "Prev"),
  - **firstText** - title at "first" link (default - "Start"),
  - **lastText** - title at "last" link (default - "End")

### VersionChanges ###
  - **1.0.3** - Adding two function **on** and **emit** for create events for component. Adding **onChange** trigger.
  - **1.0.8** - Now you can set individual props. Webpack support.