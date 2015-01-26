/**
 * Created by abaddon on 25.01.2015.
 */
var TestUtils;
describe("Paginator Box", function () {
    var Box;
    beforeEach(function () {
        TestUtils = React.addons.TestUtils;
        Box = TestUtils.renderIntoDocument(React.createElement(PaginatorBox));
    });

    it("Component init", function () {
        var wrap = TestUtils.findRenderedDOMComponentWithTag(Box, "ul");
        expect(wrap.tagName).toBe("UL");
    });

    it("Check default settings", function () {
        expect(Box.props.limit).toBe(10);
        expect(Box.props.display).toBe(5);
        expect(Box.props.startPage).toBe(1);
        expect(Box.props.currentPage).toBe(0);
    });
//karma start karma.config.js
    it("Check interval value", function () {
        var startInterval = Box.getInterval();
        expect(startInterval.start).toBe(0);
        expect(startInterval.end).toBe(5);
        Box.props.display = 3;
        startInterval = Box.getInterval();
        expect(startInterval.end).toBe(3);
        Box.props.currentPage = 3;
        startInterval = Box.getInterval();
        expect(startInterval.start).toBe(2);
        expect(startInterval.end).toBe(5);
    });

    it("Component type", function () {
        expect(TestUtils.isCompositeComponent(Box)).toBe(true);
    });
});