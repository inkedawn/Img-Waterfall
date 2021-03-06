"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Waterfall = function () {
    function Waterfall(container) {
        var ordered = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

        _classCallCheck(this, Waterfall);

        container.style.position = "relative";
        this.cont = container;
        this.colInfo = {
            left: [],
            height: []
        };
        this.urls = [];
        this.boxs = [];
        this.ordered = ordered;
        this.nextInsertOrder = 0;
        this.nextLoadOrder = 0;
    }

    _createClass(Waterfall, [{
        key: "create",
        value: function create() {
            var _this = this;

            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
                for (var _iterator = this.urls[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                    var imgSrc = _step.value;

                    this.addImg(imgSrc);
                }
            } catch (err) {
                _didIteratorError = true;
                _iteratorError = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion && _iterator.return) {
                        _iterator.return();
                    }
                } finally {
                    if (_didIteratorError) {
                        throw _iteratorError;
                    }
                }
            }

            window.onresize = function (e) {
                _this.colInfo = {
                    left: [],
                    height: []
                };
                var _iteratorNormalCompletion2 = true;
                var _didIteratorError2 = false;
                var _iteratorError2 = undefined;

                try {
                    for (var _iterator2 = _this.boxs[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                        var elem = _step2.value;

                        _this.adjustPos(elem);
                    }
                } catch (err) {
                    _didIteratorError2 = true;
                    _iteratorError2 = err;
                } finally {
                    try {
                        if (!_iteratorNormalCompletion2 && _iterator2.return) {
                            _iterator2.return();
                        }
                    } finally {
                        if (_didIteratorError2) {
                            throw _iteratorError2;
                        }
                    }
                }
            };
        }
    }, {
        key: "addUrls",
        value: function addUrls(urls) {
            this.urls = this.urls.concat(urls);
        }
    }, {
        key: "addImg",
        value: function addImg(url) {
            var _this2 = this;

            var aBox = document.createElement("div");
            aBox.style.visibility = "hidden";
            aBox.className = "waterfall-box";
            var pic = document.createElement("div");
            pic.className = "waterfall-pic";
            var img = document.createElement("img");
            img.className = "waterfall-img";
            pic.appendChild(img);
            aBox.appendChild(pic);
            this.cont.appendChild(aBox);
            this.boxs.push(aBox);
            img.setAttribute("src", url);
            img.setAttribute("data-order", this.nextInsertOrder.toString());
            this.nextInsertOrder++;
            img.onload = function (e) {
                var waterfall = _this2;
                var img = e.target;
                function tryLoad() {
                    var order = Number(img.getAttribute("data-order"));
                    console.log("Try loading" + order);
                    if (waterfall.testShouldLoad(img)) {
                        var elem = img.parentNode.parentNode;
                        waterfall.adjustPos(elem, waterfall.colInfo);
                        elem.style.visibility = "visible";
                        console.log("Loading img" + order);
                        waterfall.loadNext();
                    } else {
                        var waitTime = (order - waterfall.nextLoadOrder) * 25;
                        console.log("Wait for retry loading" + order + " after" + waitTime);
                        setTimeout(tryLoad, waitTime);
                    }
                }
                tryLoad();
            };
        }
    }, {
        key: "testShouldLoad",
        value: function testShouldLoad(img) {
            if (!this.ordered) return true;
            var order = Number(img.getAttribute("data-order"));
            return this.nextLoadOrder === order;
        }
    }, {
        key: "loadNext",
        value: function loadNext() {
            this.nextLoadOrder++;
        }
    }, {
        key: "getTopPosIndex",
        value: function getTopPosIndex() {
            if (this.colInfo.height.length < 4) {
                var i = this.colInfo.height.length;
                this.colInfo.left[i] = this.cont.clientWidth * 0.25 * i;
                this.colInfo.height[i] = 0;
                return i;
            }

            // find the min height and related left
            var height = this.colInfo.height[0];
            var index = 0;
            for (var _i = 1; _i < this.colInfo.height.length; _i++) {
                if (this.colInfo.height[_i] < height) {
                    index = _i;
                }
            }
            return index;
        }
    }, {
        key: "adjustPos",
        value: function adjustPos(elem) {
            var i = this.getTopPosIndex(this.colInfo);
            elem.style.position = "absolute";
            elem.style.top = this.colInfo.height[i] + "px";
            elem.style.left = this.colInfo.left[i] + "px";
            this.colInfo.height[i] += elem.offsetHeight;
            return { top: elem.style.top, left: elem.style.left };
        }
    }]);

    return Waterfall;
}();
//# sourceMappingURL=waterfall.js.map