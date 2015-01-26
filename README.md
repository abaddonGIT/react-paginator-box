# react-paginator-box #

Компонент для постраничной навигации на **Reactjs**

### Поддержка ###

- **Chrome**
- **Opera**
- **Firefox**
- **Safary >= 5.1.3**
- **IE >= 9**

### Подключение ###
    <script src="http://fb.me/react-0.12.2.min.js"></script>
    <script src="dist/js/paginatorBox/paginatorBox.min.js"></script>

### Как использовать? ###

    var options = {
        items: 200,
        startPage: 2,
        limit: 20
    };
    React.render(React.createElement(PaginatorBox, {options: options}), document.querySelector('#paginatorBox'));


### Параметры ###

 - **items** - общее кол-во элементов (default - 100),
 - **reload** -  отменять событие по умолчанию при клике (default - false),
 - **hrefPrefix** - пишется перед номером страницы в аттрибуте href для ссылок (default - "?page="),
 - **hrefParams** - строка параметров для ссылок (default - " "),
 - **display** - кол-во видимых элементов навигации (default - 5),
 - **limit** - по сколько элементов предпологается выводиться на одной странице (default - 10),
 - **startPage** - номер стартовой страницы (default - 1),
 - **end** -  кол-во номеров страниц видимых с начала и с конца линейки навигации (default - 2),
 - **angularLink** - отображение ссылок "вперед", "назад" (default - true),
 - **edgeLinks** - отображение ссылок "Начало", "Конец" (default - true),
 - **nextText** - текст для ссылки "вперед" (default - "Вперед"),
 - **prevText** - текст для ссылки "назад" (default - "Назад"),
 - **firstText** - текст для ссылки "начало" (default - "Начало"),
 - **lastText** - текст для ссылки "конец" (default - "Конец")
 
 
# react-paginator-box #
 
Page pagination component on **Reactjs**
 
### Browsers support ###
 
 - **Chrome**
 - **Opera**
 - **Firefox**
 - **Safary >= 5.1.3**
 - **IE >= 9**
 
### Installation ###
     <script src="http://fb.me/react-0.12.2.min.js"></script>
     <script src="dist/js/paginatorBox/paginatorBox.min.js"></script>
 
### How to use him? ###
 
     var options = {
         items: 200,
         startPage: 2,
         limit: 20
     };
     React.render(React.createElement(PaginatorBox, {options: options}), document.querySelector('#paginatorBox'));
 
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
  - **nextText** - title at "next" link (default - "Вперед"),
  - **prevText** - title at "prev" link (default - "Назад"),
  - **firstText** - title at "first" link (default - "Начало"),
  - **lastText** - title at "last" link (default - "Конец")