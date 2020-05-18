// 'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var React = require('react');
var React__default = _interopDefault(React);

function createCommonjsModule(fn, module) {
    return module = { exports: {} }, fn(module, module.exports), module.exports;
}

var smoothscroll = createCommonjsModule(function (module, exports) {
    /* smoothscroll v0.4.4 - 2019 - Dustan Kasten, Jeremias Menichelli - MIT License */
    (function () {

        // polyfill
        function polyfill() {
            // aliases
            var w = window;
            var d = document;

            // return if scroll behavior is supported and polyfill is not forced
            if (
                'scrollBehavior' in d.documentElement.style &&
                w.__forceSmoothScrollPolyfill__ !== true
            ) {
                return;
            }

            // globals
            var Element = w.HTMLElement || w.Element;
            var SCROLL_TIME = 468;

            // object gathering original scroll methods
            var original = {
                scroll: w.scroll || w.scrollTo,
                scrollBy: w.scrollBy,
                elementScroll: Element.prototype.scroll || scrollElement,
                scrollIntoView: Element.prototype.scrollIntoView
            };

            // define timing method
            var now =
                w.performance && w.performance.now
                    ? w.performance.now.bind(w.performance)
                    : Date.now;

            /**
             * indicates if a the current browser is made by Microsoft
             * @method isMicrosoftBrowser
             * @param {String} userAgent
             * @returns {Boolean}
             */
            function isMicrosoftBrowser(userAgent) {
                var userAgentPatterns = ['MSIE ', 'Trident/', 'Edge/'];

                return new RegExp(userAgentPatterns.join('|')).test(userAgent);
            }

            /*
             * IE has rounding bug rounding down clientHeight and clientWidth and
             * rounding up scrollHeight and scrollWidth causing false positives
             * on hasScrollableSpace
             */
            var ROUNDING_TOLERANCE = isMicrosoftBrowser(w.navigator.userAgent) ? 1 : 0;

            /**
             * changes scroll position inside an element
             * @method scrollElement
             * @param {Number} x
             * @param {Number} y
             * @returns {undefined}
             */
            function scrollElement(x, y) {
                this.scrollLeft = x;
                this.scrollTop = y;
            }

            /**
             * returns result of applying ease math function to a number
             * @method ease
             * @param {Number} k
             * @returns {Number}
             */
            function ease(k) {
                return 0.5 * (1 - Math.cos(Math.PI * k));
            }

            /**
             * indicates if a smooth behavior should be applied
             * @method shouldBailOut
             * @param {Number|Object} firstArg
             * @returns {Boolean}
             */
            function shouldBailOut(firstArg) {
                if (
                    firstArg === null ||
                    typeof firstArg !== 'object' ||
                    firstArg.behavior === undefined ||
                    firstArg.behavior === 'auto' ||
                    firstArg.behavior === 'instant'
                ) {
                    // first argument is not an object/null
                    // or behavior is auto, instant or undefined
                    return true;
                }

                if (typeof firstArg === 'object' && firstArg.behavior === 'smooth') {
                    // first argument is an object and behavior is smooth
                    return false;
                }

                // throw error when behavior is not supported
                throw new TypeError(
                    'behavior member of ScrollOptions ' +
                    firstArg.behavior +
                    ' is not a valid value for enumeration ScrollBehavior.'
                );
            }

            /**
             * indicates if an element has scrollable space in the provided axis
             * @method hasScrollableSpace
             * @param {Node} el
             * @param {String} axis
             * @returns {Boolean}
             */
            function hasScrollableSpace(el, axis) {
                if (axis === 'Y') {
                    return el.clientHeight + ROUNDING_TOLERANCE < el.scrollHeight;
                }

                if (axis === 'X') {
                    return el.clientWidth + ROUNDING_TOLERANCE < el.scrollWidth;
                }
            }

            /**
             * indicates if an element has a scrollable overflow property in the axis
             * @method canOverflow
             * @param {Node} el
             * @param {String} axis
             * @returns {Boolean}
             */
            function canOverflow(el, axis) {
                var overflowValue = w.getComputedStyle(el, null)['overflow' + axis];

                return overflowValue === 'auto' || overflowValue === 'scroll';
            }

            /**
             * indicates if an element can be scrolled in either axis
             * @method isScrollable
             * @param {Node} el
             * @param {String} axis
             * @returns {Boolean}
             */
            function isScrollable(el) {
                var isScrollableY = hasScrollableSpace(el, 'Y') && canOverflow(el, 'Y');
                var isScrollableX = hasScrollableSpace(el, 'X') && canOverflow(el, 'X');

                return isScrollableY || isScrollableX;
            }

            /**
             * finds scrollable parent of an element
             * @method findScrollableParent
             * @param {Node} el
             * @returns {Node} el
             */
            function findScrollableParent(el) {
                while (el !== d.body && isScrollable(el) === false) {
                    el = el.parentNode || el.host;
                }

                return el;
            }

            /**
             * self invoked function that, given a context, steps through scrolling
             * @method step
             * @param {Object} context
             * @returns {undefined}
             */
            function step(context) {
                var time = now();
                var value;
                var currentX;
                var currentY;
                var elapsed = (time - context.startTime) / SCROLL_TIME;

                // avoid elapsed times higher than one
                elapsed = elapsed > 1 ? 1 : elapsed;

                // apply easing to elapsed time
                value = ease(elapsed);

                currentX = context.startX + (context.x - context.startX) * value;
                currentY = context.startY + (context.y - context.startY) * value;

                context.method.call(context.scrollable, currentX, currentY);

                // scroll more if we have not reached our destination
                if (currentX !== context.x || currentY !== context.y) {
                    w.requestAnimationFrame(step.bind(w, context));
                }
            }

            /**
             * scrolls window or element with a smooth behavior
             * @method smoothScroll
             * @param {Object|Node} el
             * @param {Number} x
             * @param {Number} y
             * @returns {undefined}
             */
            function smoothScroll(el, x, y) {
                var scrollable;
                var startX;
                var startY;
                var method;
                var startTime = now();

                // define scroll context
                if (el === d.body) {
                    scrollable = w;
                    startX = w.scrollX || w.pageXOffset;
                    startY = w.scrollY || w.pageYOffset;
                    method = original.scroll;
                } else {
                    scrollable = el;
                    startX = el.scrollLeft;
                    startY = el.scrollTop;
                    method = scrollElement;
                }

                // scroll looping over a frame
                step({
                    scrollable: scrollable,
                    method: method,
                    startTime: startTime,
                    startX: startX,
                    startY: startY,
                    x: x,
                    y: y
                });
            }

            // ORIGINAL METHODS OVERRIDES
            // w.scroll and w.scrollTo
            w.scroll = w.scrollTo = function() {
                // avoid action when no arguments are passed
                if (arguments[0] === undefined) {
                    return;
                }

                // avoid smooth behavior if not required
                if (shouldBailOut(arguments[0]) === true) {
                    original.scroll.call(
                        w,
                        arguments[0].left !== undefined
                            ? arguments[0].left
                            : typeof arguments[0] !== 'object'
                            ? arguments[0]
                            : w.scrollX || w.pageXOffset,
                        // use top prop, second argument if present or fallback to scrollY
                        arguments[0].top !== undefined
                            ? arguments[0].top
                            : arguments[1] !== undefined
                            ? arguments[1]
                            : w.scrollY || w.pageYOffset
                    );

                    return;
                }

                // LET THE SMOOTHNESS BEGIN!
                smoothScroll.call(
                    w,
                    d.body,
                    arguments[0].left !== undefined
                        ? ~~arguments[0].left
                        : w.scrollX || w.pageXOffset,
                    arguments[0].top !== undefined
                        ? ~~arguments[0].top
                        : w.scrollY || w.pageYOffset
                );
            };

            // w.scrollBy
            w.scrollBy = function() {
                // avoid action when no arguments are passed
                if (arguments[0] === undefined) {
                    return;
                }

                // avoid smooth behavior if not required
                if (shouldBailOut(arguments[0])) {
                    original.scrollBy.call(
                        w,
                        arguments[0].left !== undefined
                            ? arguments[0].left
                            : typeof arguments[0] !== 'object' ? arguments[0] : 0,
                        arguments[0].top !== undefined
                            ? arguments[0].top
                            : arguments[1] !== undefined ? arguments[1] : 0
                    );

                    return;
                }

                // LET THE SMOOTHNESS BEGIN!
                smoothScroll.call(
                    w,
                    d.body,
                    ~~arguments[0].left + (w.scrollX || w.pageXOffset),
                    ~~arguments[0].top + (w.scrollY || w.pageYOffset)
                );
            };

            // Element.prototype.scroll and Element.prototype.scrollTo
            Element.prototype.scroll = Element.prototype.scrollTo = function() {
                // avoid action when no arguments are passed
                if (arguments[0] === undefined) {
                    return;
                }

                // avoid smooth behavior if not required
                if (shouldBailOut(arguments[0]) === true) {
                    // if one number is passed, throw error to match Firefox implementation
                    if (typeof arguments[0] === 'number' && arguments[1] === undefined) {
                        throw new SyntaxError('Value could not be converted');
                    }

                    original.elementScroll.call(
                        this,
                        // use left prop, first number argument or fallback to scrollLeft
                        arguments[0].left !== undefined
                            ? ~~arguments[0].left
                            : typeof arguments[0] !== 'object' ? ~~arguments[0] : this.scrollLeft,
                        // use top prop, second argument or fallback to scrollTop
                        arguments[0].top !== undefined
                            ? ~~arguments[0].top
                            : arguments[1] !== undefined ? ~~arguments[1] : this.scrollTop
                    );

                    return;
                }

                var left = arguments[0].left;
                var top = arguments[0].top;

                // LET THE SMOOTHNESS BEGIN!
                smoothScroll.call(
                    this,
                    this,
                    typeof left === 'undefined' ? this.scrollLeft : ~~left,
                    typeof top === 'undefined' ? this.scrollTop : ~~top
                );
            };

            // Element.prototype.scrollBy
            Element.prototype.scrollBy = function() {
                // avoid action when no arguments are passed
                if (arguments[0] === undefined) {
                    return;
                }

                // avoid smooth behavior if not required
                if (shouldBailOut(arguments[0]) === true) {
                    original.elementScroll.call(
                        this,
                        arguments[0].left !== undefined
                            ? ~~arguments[0].left + this.scrollLeft
                            : ~~arguments[0] + this.scrollLeft,
                        arguments[0].top !== undefined
                            ? ~~arguments[0].top + this.scrollTop
                            : ~~arguments[1] + this.scrollTop
                    );

                    return;
                }

                this.scroll({
                    left: ~~arguments[0].left + this.scrollLeft,
                    top: ~~arguments[0].top + this.scrollTop,
                    behavior: arguments[0].behavior
                });
            };

            // Element.prototype.scrollIntoView
            Element.prototype.scrollIntoView = function() {
                // avoid smooth behavior if not required
                if (shouldBailOut(arguments[0]) === true) {
                    original.scrollIntoView.call(
                        this,
                        arguments[0] === undefined ? true : arguments[0]
                    );

                    return;
                }

                // LET THE SMOOTHNESS BEGIN!
                var scrollableParent = findScrollableParent(this);
                var parentRects = scrollableParent.getBoundingClientRect();
                var clientRects = this.getBoundingClientRect();

                if (scrollableParent !== d.body) {
                    // reveal element inside parent
                    smoothScroll.call(
                        this,
                        scrollableParent,
                        scrollableParent.scrollLeft + clientRects.left - parentRects.left,
                        scrollableParent.scrollTop + clientRects.top - parentRects.top
                    );

                    // reveal parent in viewport unless is fixed
                    if (w.getComputedStyle(scrollableParent).position !== 'fixed') {
                        w.scrollBy({
                            left: parentRects.left,
                            top: parentRects.top,
                            behavior: 'smooth'
                        });
                    }
                } else {
                    // reveal element in viewport
                    w.scrollBy({
                        left: clientRects.left,
                        top: clientRects.top,
                        behavior: 'smooth'
                    });
                }
            };
        }

        {
            // commonjs
            module.exports = { polyfill: polyfill };
        }

    }());
});
var smoothscroll_1 = smoothscroll.polyfill;

var classnames = createCommonjsModule(function (module) {
    /*!
      Copyright (c) 2017 Jed Watson.
      Licensed under the MIT License (MIT), see
      http://jedwatson.github.io/classnames
    */
    /* global define */

    (function () {

        var hasOwn = {}.hasOwnProperty;

        function classNames () {
            var classes = [];

            for (var i = 0; i < arguments.length; i++) {
                var arg = arguments[i];
                if (!arg) continue;

                var argType = typeof arg;

                if (argType === 'string' || argType === 'number') {
                    classes.push(arg);
                } else if (Array.isArray(arg) && arg.length) {
                    var inner = classNames.apply(null, arg);
                    if (inner) {
                        classes.push(inner);
                    }
                } else if (argType === 'object') {
                    for (var key in arg) {
                        if (hasOwn.call(arg, key) && arg[key]) {
                            classes.push(key);
                        }
                    }
                }
            }

            return classes.join(' ');
        }

        if (module.exports) {
            classNames.default = classNames;
            module.exports = classNames;
        } else {
            window.classNames = classNames;
        }
    }());
});

function styleInject(css, ref) {
    if ( ref === void 0 ) ref = {};
    var insertAt = ref.insertAt;

    if (!css || typeof document === 'undefined') { return; }

    var head = document.head || document.getElementsByTagName('head')[0];
    var style = document.createElement('style');
    style.type = 'text/css';

    if (insertAt === 'top') {
        if (head.firstChild) {
            head.insertBefore(style, head.firstChild);
        } else {
            head.appendChild(style);
        }
    } else {
        head.appendChild(style);
    }

    if (style.styleSheet) {
        style.styleSheet.cssText = css;
    } else {
        style.appendChild(document.createTextNode(css));
    }
}

var css = ".style-module_container__1FUJO {\n  width: 100%;\n  border: none;\n}\n\n.style-module_form__3Dfsx {\n  width: inherit;\n  max-width: inherit;\n  display: flex;\n  flex-wrap: nowrap;\n  overflow: hidden;\n  position: relative;\n}\n\n.style-module_form__page__1DOEF {\n  box-sizing: border-box;\n  width: inherit;\n  max-width: inherit;\n  flex: 0 0 auto;\n  height: min-content;\n}\n\n.style-module_navcontainer__2F-y3 {\n  box-sizing: border-box;\n  width: inherit;\n  max-width: inherit;\n}";
var style = { "container": "style-module_container__1FUJO", "form": "style-module_form__3Dfsx", "form__page": "style-module_form__page__1DOEF", "navcontainer": "style-module_navcontainer__2F-y3" };
styleInject(css);

var css$1 = "/*\r\nThis is the default styling, Edit this css or use \"style\" attribute to use your own styling.\r\n*/\r\n\r\n\r\n/* \r\n<div.form-carousel__container>\r\n    <div.form-carousel>\r\n        <div.form-carousel__page>\r\n            Content\r\n        </div.form-carousel__page>\r\n        ...\r\n        <div.form-carousel__page>\r\n            Content\r\n        </div.form-carousel__page>\r\n    </div.form-carousel>\r\n    <div.navcontainer>\r\n        <button (.buttonFormStyle) (.hide)>Wstecz</button.mojestyle>\r\n        <button>Dalej<button/>\r\n    </div.navcontainer>\r\n</div.form-carousel__container>\r\n */\r\n */\r\n\r\n\r\n .default-style-module_container__9mVG- {\r\n  border: none;\r\n}\r\n\r\n.default-style-module_form__3v95C {\r\n  transition: height 0.6s;\r\n}\r\n\r\n.default-style-module_form__page__15AqX {\r\n  padding: 0;\r\n}\r\n\r\n.default-style-module_navcontainer__1c3i1 {\r\n}\r\n\r\n.default-style-module_navcontainer__1c3i1 button {\r\n}";
var defaultStyle = { "container": "default-style-module_container__9mVG-", "form": "default-style-module_form__3v95C", "form__page": "default-style-module_form__page__15AqX", "navcontainer": "default-style-module_navcontainer__1c3i1" };
styleInject(css$1);

var classCallCheck = function (instance, Constructor) {
    if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
    }
};

var _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
        var source = arguments[i];

        for (var key in source) {
            if (Object.prototype.hasOwnProperty.call(source, key)) {
                target[key] = source[key];
            }
        }
    }

    return target;
};

var inherits = function (subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
        throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
    }

    subClass.prototype = Object.create(superClass && superClass.prototype, {
        constructor: {
            value: subClass,
            enumerable: false,
            writable: true,
            configurable: true
        }
    });
    if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
};

var possibleConstructorReturn = function (self, call) {
    if (!self) {
        throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }

    return call && (typeof call === "object" || typeof call === "function") ? call : self;
};

smoothscroll.polyfill(); // enables smoothscroll for many browsers


var Form = function (_Component) {
    inherits(Form, _Component);

    function Form(props) {
        classCallCheck(this, Form);

        var _this = possibleConstructorReturn(this, (Form.__proto__ || Object.getPrototypeOf(Form)).call(this, props));

        _this.componentDidMount = function () {
            _this.lastPage = _this.getPageLength() - 1; //-1 for indexing
            _this.currentPage = _this.getCurrentPage("down");
            _this.setState({ height: _this.heights[0] });
            window.addEventListener("resize", _this.resizeHandler);
            document.querySelector(".form-carousel__container").addEventListener('keyup', _this.tabScroll);
        };

        _this.resizeHandler = function () {
            clearTimeout(_this.resizeTimer);
            _this.resizeTimer = setTimeout(function () {
                _this.scrollToPage(_this.currentPage);
            }, 50); // timeout is 50 ms
        };

        _this.getCurrentPage = function (round) {
            var left = _this.formRef.current.scrollLeft;
            var width = _this.formRef.current.clientWidth;
            if (round === "up") return Math.ceil(left / width);
            if (round === "down") return Math.floor(left / width);
            return left / width;
        };

        _this.getPageLength = function () {
            return React__default.Children.count(_this.props.children);
        };

        _this.addPageHeight = function (page, height) {
            _this.heights[page.toString()] = height;
        };

        _this.scrollToPage = function (page) {
            // Can't "scroll" past lastpage or before first page
            if (page <= _this.lastPage && page >= 0) {
                // update currentPage & scroll
                _this.currentPage = page;
                _this.setState({});
                _this.formRef.current.scrollTo({
                    behavior: 'smooth',
                    left: page * _this.formRef.current.offsetWidth
                });
                // update height
                setTimeout(function () {
                    _this.setState({ height: _this.heights[_this.currentPage.toString()] });
                }, _this.props.resizeDelay >= 0 ? _this.props.resizeDelay : 600); // default delay is 0.6s
            }
        };

        _this.tabScroll = function (e) {
            // tab (+shfit) scrolling
            if (e.key === "Tab" && !e.shiftKey) {
                if (_this.currentPage != _this.getCurrentPage()) _this.scrollToPage(_this.getCurrentPage("up"));
            } else if (e.key === "Tab" && e.shiftKey) {
                if (_this.currentPage != _this.getCurrentPage()) _this.scrollToPage(_this.getCurrentPage("down"));
            }
        };

        _this.prevPage = function () {
            return _this.scrollToPage(_this.currentPage - 1);
        };

        _this.nextPage = function () {
            return _this.scrollToPage(_this.currentPage + 1);
        };

        _this.render = function () {

            var NavKeys = _this.navKeys;

            var containerStyle = classnames("form-carousel__container", style.container, _this.props.removeDefaultStyle ? null : defaultStyle.container);

            var formStyle = classnames('form-carousel__form', style.form, _this.props.removeDefaultStyle ? null : defaultStyle.form);

            var formInlineStyle = _extends({
                height: _this.state.height && _this.props.autoHeight > 0 ? _this.state.height : "initial"
            }, _this.props.style ? _this.props.style : {});

            return React__default.createElement(
                'div',
                { className: containerStyle },
                React__default.createElement(
                    'form',
                    {
                        onSubmit: !!_this.props.onSubmit ? _this.props.onSubmit : null,
                        action: !!_this.props.action ? _this.props.action : null,
                        method: !!_this.props.method ? _this.props.action : null,
                        className: formStyle,
                        style: formInlineStyle,
                        ref: _this.formRef
                    },
                    /* Only accept Page class */
                    _this.props.children.map(function (child) {
                        if (child.type.name === Page.name) {
                            return React__default.cloneElement(child, {
                                currentPage: _this.current,
                                uploadHeight: _this.addPageHeight
                            });
                        }
                        throw new Error("Carousel Form only accepts Page components");
                    })
                ),
                React__default.createElement(NavKeys, null)
            );
        };

        _this.navKeys = function () {
            if (!_this.props.navigation) return null;

            var navStyle = classnames('form-carousel__nav-container', style.navcontainer, _this.props.removeDefaultStyle ? null : defaultStyle.navcontainer);

            return React__default.createElement(
                'div',
                { className: navStyle },
                React__default.createElement(
                    'button',
                    { type: 'button',
                        className: _this.currentPage <= 0 ? classnames('hide', _this.state.removeDefaultStyle ? null : defaultStyle.hide) : null, onClick: _this.prevPage, disabled: _this.currentPage <= 0 },
                    'Wstecz'
                ),
                React__default.createElement(
                    'button',
                    {
                        type: 'button',
                        onClick: _this.currentPage >= _this.lastPage ? _this.props.onSubmit : _this.nextPage },
                    _this.currentPage >= _this.lastPage ? "Potwierdzam" : "Dalej"
                )
            );
        };

        _this.resizeTimer = undefined;
        _this.currentPage = 0;
        _this.formRef = React__default.createRef();
        _this.heights = {};
        _this.state = {
            height: 0
        };
        return _this;
    }

    // Keep horizontal scroll on current page when resizing


    // Determines what page is currently being shown


    // TODO: issue with pressing [shift+tab] -> registering as [shift+tab] and then [tab] immediately after


    return Form;
}(React.Component);


Form.defaultProps = {
    removeDefaultStyle: false,
    resizeDelay: 600,
    autoHeight: false,
    navigation: true

    // Form Page
};var Page = function (_Component2) {
    inherits(Page, _Component2);

    function Page(props) {
        classCallCheck(this, Page);

        var _this2 = possibleConstructorReturn(this, (Page.__proto__ || Object.getPrototypeOf(Page)).call(this, props));

        _this2.componentDidMount = function () {
            _this2.page = _this2.getPage();
            _this2.height = _this2.getHeight();
            _this2.props.uploadHeight(_this2.page, _this2.height);
        };

        _this2.getHeight = function () {
            return _this2.pageRef.current.offsetHeight;
        };

        _this2.getPage = function () {
            var offsetLeft = _this2.pageRef.current.offsetLeft;
            var offsetWidth = _this2.pageRef.current.offsetWidth;
            return Math.floor(offsetLeft / offsetWidth);
        };

        _this2.render = function () {

            var formPageStyle = classnames('form-carousel__page', style.form__page, _this2.props.removeDefaultStyle ? null : defaultStyle.form__page);

            return React__default.createElement(
                'div',
                { className: formPageStyle, ref: _this2.pageRef, style: _this2.props.style ? _this2.props.style : {} },
                _this2.props.children
            );
        };

        _this2.pageRef = React__default.createRef();
        return _this2;
    }

    // returns height of this page (varies depnding on page content)


    // Determines what page this FormPage is (assuming all pages are equal length)


    return Page;
}(React.Component);

exports.default = Form;
exports.Page = Page;
//# sourceMappingURL=index.js.map