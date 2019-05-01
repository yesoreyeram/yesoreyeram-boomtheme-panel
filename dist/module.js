System.register(["lodash", "app/plugins/sdk"], function (exports_1, context_1) {
    "use strict";
    var __extends = (this && this.__extends) || (function () {
        var extendStatics = function (d, b) {
            extendStatics = Object.setPrototypeOf ||
                ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
                function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
            return extendStatics(d, b);
        };
        return function (d, b) {
            extendStatics(d, b);
            function __() { this.constructor = d; }
            d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
        };
    })();
    var lodash_1, sdk_1, BoomThemeStyle, BoomTheme, BoomThemeCtl, getThemeCSSFile;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [
            function (lodash_1_1) {
                lodash_1 = lodash_1_1;
            },
            function (sdk_1_1) {
                sdk_1 = sdk_1_1;
            }
        ],
        execute: function () {
            BoomThemeStyle = (function () {
                function BoomThemeStyle(type, props) {
                    switch (type.toLowerCase()) {
                        case "style":
                            this.type = "style";
                            this.props = {
                                text: props && props.text ? props.text : ""
                            };
                            break;
                        case "url":
                            this.type = "url";
                            this.props = {
                                url: props && props.url ? props.url : ""
                            };
                            break;
                        default:
                            this.type = "none";
                            this.props = {};
                            break;
                    }
                }
                return BoomThemeStyle;
            }());
            BoomTheme = (function () {
                function BoomTheme(options) {
                    this.name = options.name || "New Theme";
                    this.styles = [
                        new BoomThemeStyle("url", { url: "" }),
                        new BoomThemeStyle("style", { text: "" })
                    ];
                }
                BoomTheme.prototype.addStyle = function (type) {
                    if (type.toLowerCase() === "style") {
                        this.styles.push(new BoomThemeStyle("style", {}));
                    }
                    else if (type.toLowerCase() === "url") {
                        this.styles.push(new BoomThemeStyle("url", {}));
                    }
                };
                BoomTheme.prototype.deleteStyle = function (index) {
                    this.styles.splice(index, 1);
                };
                BoomTheme.prototype.getThemeContent = function () {
                    var output = '';
                    if (this.styles && this.styles.length > 0) {
                        lodash_1.default.each(this.styles, function (style) {
                            if (style.type === "url") {
                                if (style.props && style.props.url !== "") {
                                    output += "@import url('" + style.props.url + "');\n                        ";
                                }
                            }
                            else if (style.type === "style") {
                                if (style.props && style.props.test !== "") {
                                    output += (style.props.text || '') + "\n                        ";
                                }
                            }
                        });
                    }
                    return output;
                };
                return BoomTheme;
            }());
            BoomThemeCtl = (function (_super) {
                __extends(BoomThemeCtl, _super);
                function BoomThemeCtl($scope, $injector) {
                    var _this = _super.call(this, $scope, $injector) || this;
                    lodash_1.default.defaults(_this.panel, {});
                    _this.panel.themes = _this.panel.themes || [new BoomTheme({ name: "Default" })];
                    _this.panel.activeThemeId = _this.panel.activeThemeId || 0;
                    _this.activeEditorTabIndex = _this.panel.activeThemeId >= 0 ? _this.panel.activeThemeId : -1;
                    _this.runtimeThemeSet = false;
                    _this.runtimeThemeIndex = _this.panel.activeThemeId >= 0 ? _this.panel.activeThemeId : 0;
                    _this.updatePrototypes();
                    _this.events.on("init-edit-mode", _this.onInitEditMode.bind(_this));
                    return _this;
                }
                BoomThemeCtl.prototype.updatePrototypes = function () {
                    if (this.panel.themes && this.panel.themes.length > 0) {
                        this.panel.themes.map(function (theme) {
                            Object.setPrototypeOf(theme, BoomTheme.prototype);
                            if (theme.styles && theme.styles.length > 0) {
                                theme.styles.map(function (style) {
                                    Object.setPrototypeOf(style, BoomThemeStyle.prototype);
                                });
                            }
                            return theme;
                        });
                    }
                };
                BoomThemeCtl.prototype.onInitEditMode = function () {
                    this.addEditorTab("Theme", "public/plugins/yesoreyeram-boomtheme-panel/partials/options.html", 2);
                };
                BoomThemeCtl.prototype.addTheme = function () {
                    this.panel.themes = this.panel.themes || [];
                    this.panel.themes.push(new BoomTheme({
                        name: "Theme " + (this.panel.themes.length + 1)
                    }));
                    this.activeEditorTabIndex = this.panel.themes.length - 1;
                    this.runtimeThemeIndex = this.panel.themes.length - 1;
                    this.render();
                };
                BoomThemeCtl.prototype.deleteTheme = function (index) {
                    if (index !== 0) {
                        this.panel.themes.splice(index, 1);
                        if (this.panel.activeThemeId === index) {
                            this.panel.activeThemeId = 0;
                        }
                        if (this.activeEditorTabIndex === index) {
                            this.activeEditorTabIndex = -1;
                        }
                        if (this.runtimeThemeIndex === index) {
                            this.runtimeThemeIndex = 0;
                        }
                    }
                };
                BoomThemeCtl.prototype.setThemeAsDefault = function (index) {
                    this.ctrl.panel.activeThemeId = index;
                    this.runtimeThemeIndex = index;
                    this.render();
                };
                BoomThemeCtl.prototype.setruntimeThemeIndex = function (index) {
                    this.runtimeThemeSet = true;
                    this.runtimeThemeIndex = index;
                    this.render();
                };
                BoomThemeCtl.prototype.limitText = function (text, maxlength) {
                    if (text.split("").length > maxlength) {
                        text = text.substring(0, Number(maxlength) - 3) + "...";
                    }
                    return text;
                };
                BoomThemeCtl.prototype.link = function (scope, elem, attrs, ctrl) {
                    this.scope = scope;
                    this.elem = elem;
                    this.attrs = attrs;
                    this.ctrl = ctrl;
                    this.render();
                };
                BoomThemeCtl.templateUrl = "partials/module.html";
                return BoomThemeCtl;
            }(sdk_1.PanelCtrl));
            exports_1("PanelCtrl", BoomThemeCtl);
            getThemeCSSFile = function (mode) {
                var filename = '';
                if (["dark", "light"].indexOf(mode.toLowerCase()) > -1 && window.performance) {
                    var appfiles = window.performance.getEntries().map(function (e) { return e.name; }).filter(function (e) { return e.indexOf(".css") > -1; }).filter(function (e) { return e.indexOf("/grafana.app") > -1; });
                    if (appfiles && appfiles.length > 0) {
                        filename = appfiles[0].replace("build/grafana.app", "build/grafana." + mode.toLowerCase());
                    }
                }
                return filename;
            };
            BoomThemeCtl.prototype.render = function () {
                var _this = this;
                var output = '';
                lodash_1.default.each(this.panel.themes, function (theme, index) {
                    if (_this.runtimeThemeSet === false) {
                        if (_this.panel.activeThemeId === index && _this.panel.activeThemeId >= 0) {
                            output += theme.getThemeContent();
                        }
                    }
                    else {
                        if (_this.runtimeThemeIndex === index && _this.runtimeThemeIndex >= 0) {
                            output += theme.getThemeContent();
                        }
                    }
                });
                if (this.runtimeThemeSet === true) {
                    if (this.runtimeThemeIndex === -2000) {
                        output += "@import url('" + getThemeCSSFile("dark") + "');\n            ";
                    }
                    else if (this.runtimeThemeIndex === -3000) {
                        output += "@import url('" + getThemeCSSFile("light") + "');\n            ";
                    }
                }
                var style = document.createElement('style');
                style.type = 'text/css';
                style.appendChild(document.createTextNode(output));
                this.elem.find("#boom-theme").html("");
                this.elem.find("#boom-theme").append(style);
            };
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL21vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7WUFLQTtnQkFHSSx3QkFBWSxJQUFJLEVBQUUsS0FBSztvQkFDbkIsUUFBUSxJQUFJLENBQUMsV0FBVyxFQUFFLEVBQUU7d0JBQ3hCLEtBQUssT0FBTzs0QkFDUixJQUFJLENBQUMsSUFBSSxHQUFHLE9BQU8sQ0FBQzs0QkFDcEIsSUFBSSxDQUFDLEtBQUssR0FBRztnQ0FDVCxJQUFJLEVBQUUsS0FBSyxJQUFJLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUU7NkJBQzlDLENBQUM7NEJBQ0YsTUFBTTt3QkFDVixLQUFLLEtBQUs7NEJBQ04sSUFBSSxDQUFDLElBQUksR0FBRyxLQUFLLENBQUM7NEJBQ2xCLElBQUksQ0FBQyxLQUFLLEdBQUc7Z0NBQ1QsR0FBRyxFQUFFLEtBQUssSUFBSSxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFOzZCQUMzQyxDQUFDOzRCQUNGLE1BQU07d0JBQ1Y7NEJBQ0ksSUFBSSxDQUFDLElBQUksR0FBRyxNQUFNLENBQUM7NEJBQ25CLElBQUksQ0FBQyxLQUFLLEdBQUcsRUFBRSxDQUFDOzRCQUNoQixNQUFNO3FCQUViO2dCQUNMLENBQUM7Z0JBQ0wscUJBQUM7WUFBRCxDQUFDLEFBeEJELElBd0JDO1lBRUQ7Z0JBR0ksbUJBQVksT0FBTztvQkFDZixJQUFJLENBQUMsSUFBSSxHQUFHLE9BQU8sQ0FBQyxJQUFJLElBQUksV0FBVyxDQUFDO29CQUN4QyxJQUFJLENBQUMsTUFBTSxHQUFHO3dCQUNWLElBQUksY0FBYyxDQUFDLEtBQUssRUFBRSxFQUFFLEdBQUcsRUFBRSxFQUFFLEVBQUUsQ0FBQzt3QkFDdEMs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QUFDLGlCQUFpQixJQUFJLENBQUMsRUFBRTs0QkFDakUsTUFBTSxJQUFJLEtBQUssQ0FBQyxlQUFlLEVBQUUsQ0FBQzt5QkFDckM7cUJBQ0o7Z0JBQ0wsQ0FBQyxDQUFDLENBQUM7Z0JBQ0gsSUFBSSxJQUFJLENBQUMsZUFBZSxLQUFLLElBQUksRUFBRTtvQkFDL0IsSUFBSSxJQUFJLENBQUMsaUJBQWlCLEtBQUssQ0FBQyxJQUFJLEVBQUU7d0JBQ2xDLE1BQU0sSUFBSSxrQkFBZ0IsZUFBZSxDQUFDLE1BQU0sQ0FBQyxzQkFDaEQsQ0FBQztxQkFDTDt5QkFBTSxJQUFJLElBQUksQ0FBQyxpQkFBaUIsS0FBSyxDQUFDLElBQUksRUFBRTt3QkFDekMsTUFBTSxJQUFJLGtCQUFnQixlQUFlLENBQUMsT0FBTyxDQUFDLHNCQUNqRCxDQUFDO3FCQUNMO2lCQUNKO2dCQUVELElBQU0sS0FBSyxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsT0FBTyxDQUFDLENBQUM7Z0JBQzlDLEtBQUssQ0FBQyxJQUFJLEdBQUcsVUFBVSxDQUFDO2dCQUN4QixLQUFLLENBQUMsV0FBVyxDQUFDLFFBQVEsQ0FBQyxjQUFjLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztnQkFDbkQsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDO2dCQUN2QyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDaEQsQ0FBQyxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLy8vPHJlZmVyZW5jZSBwYXRoPVwiLi4vbm9kZV9tb2R1bGVzL2dyYWZhbmEtc2RrLW1vY2tzL2FwcC9oZWFkZXJzL2NvbW1vbi5kLnRzXCIgLz5cclxuXHJcbmltcG9ydCBfIGZyb20gXCJsb2Rhc2hcIjtcclxuaW1wb3J0IHsgUGFuZWxDdHJsIH0gZnJvbSBcImFwcC9wbHVnaW5zL3Nka1wiO1xyXG5cclxuY2xhc3MgQm9vbVRoZW1lU3R5bGUge1xyXG4gICAgcHVibGljIHR5cGU6IHN0cmluZztcclxuICAgIHB1YmxpYyBwcm9wczogYW55O1xyXG4gICAgY29uc3RydWN0b3IodHlwZSwgcHJvcHMpIHtcclxuICAgICAgICBzd2l0Y2ggKHR5cGUudG9Mb3dlckNhc2UoKSkge1xyXG4gICAgICAgICAgICBjYXNlIFwic3R5bGVcIjpcclxuICAgICAgICAgICAgICAgIHRoaXMudHlwZSA9IFwic3R5bGVcIjtcclxuICAgICAgICAgICAgICAgIHRoaXMucHJvcHMgPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGV4dDogcHJvcHMgJiYgcHJvcHMudGV4dCA/IHByb3BzLnRleHQgOiBcIlwiXHJcbiAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgXCJ1cmxcIjpcclxuICAgICAgICAgICAgICAgIHRoaXMudHlwZSA9IFwidXJsXCI7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnByb3BzID0ge1xyXG4gICAgICAgICAgICAgICAgICAgIHVybDogcHJvcHMgJiYgcHJvcHMudXJsID8gcHJvcHMudXJsIDogXCJcIlxyXG4gICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgICAgdGhpcy50eXBlID0gXCJub25lXCI7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnByb3BzID0ge307XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcblxyXG5jbGFzcyBCb29tVGhlbWUge1xyXG4gICAgcHVibGljIG5hbWU6IHN0cmluZztcclxuICAgIHB1YmxpYyBzdHlsZXM6IEJvb21UaGVtZVN0eWxlW107XHJcbiAgICBjb25zdHJ1Y3RvcihvcHRpb25zKSB7XHJcbiAgICAgICAgdGhpcy5uYW1lID0gb3B0aW9ucy5uYW1lIHx8IFwiTmV3IFRoZW1lXCI7XHJcbiAgICAgICAgdGhpcy5zdHlsZXMgPSBbXHJcbiAgICAgICAgICAgIG5ldyBCb29tVGhlbWVTdHlsZShcInVybFwiLCB7IHVybDogXCJcIiB9KSxcclxuICAgICAgICAgICAgbmV3IEJvb21UaGVtZVN0eWxlKFwic3R5bGVcIiwgeyB0ZXh0OiBgYCB9KVxyXG4gICAgICAgIF07XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgYWRkU3R5bGUodHlwZTogc3RyaW5nKTogdm9pZCB7XHJcbiAgICAgICAgaWYgKHR5cGUudG9Mb3dlckNhc2UoKSA9PT0gXCJzdHlsZVwiKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc3R5bGVzLnB1c2gobmV3IEJvb21UaGVtZVN0eWxlKFwic3R5bGVcIiwge30pKTtcclxuICAgICAgICB9IGVsc2UgaWYgKHR5cGUudG9Mb3dlckNhc2UoKSA9PT0gXCJ1cmxcIikge1xyXG4gICAgICAgICAgICB0aGlzLnN0eWxlcy5wdXNoKG5ldyBCb29tVGhlbWVTdHlsZShcInVybFwiLCB7fSkpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICB9XHJcbiAgICBwdWJsaWMgZGVsZXRlU3R5bGUoaW5kZXg6IG51bWJlcik6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuc3R5bGVzLnNwbGljZShpbmRleCwgMSk7XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgZ2V0VGhlbWVDb250ZW50KCk6IHN0cmluZyB7XHJcbiAgICAgICAgbGV0IG91dHB1dCA9ICcnO1xyXG4gICAgICAgIGlmICh0aGlzLnN0eWxlcyAmJiB0aGlzLnN0eWxlcy5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgIF8uZWFjaCh0aGlzLnN0eWxlcywgc3R5bGUgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKHN0eWxlLnR5cGUgPT09IFwidXJsXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoc3R5bGUucHJvcHMgJiYgc3R5bGUucHJvcHMudXJsICE9PSBcIlwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG91dHB1dCArPSBgQGltcG9ydCB1cmwoJyR7c3R5bGUucHJvcHMudXJsfScpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBgO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHN0eWxlLnR5cGUgPT09IFwic3R5bGVcIikge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChzdHlsZS5wcm9wcyAmJiBzdHlsZS5wcm9wcy50ZXN0ICE9PSBcIlwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG91dHB1dCArPSBgJHtzdHlsZS5wcm9wcy50ZXh0IHx8ICcnfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBgO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBvdXRwdXQ7XHJcbiAgICB9XHJcbn1cclxuXHJcbmNsYXNzIEJvb21UaGVtZUN0bCBleHRlbmRzIFBhbmVsQ3RybCB7XHJcbiAgICBwdWJsaWMgc3RhdGljIHRlbXBsYXRlVXJsID0gXCJwYXJ0aWFscy9tb2R1bGUuaHRtbFwiO1xyXG4gICAgcHVibGljIHNjb3BlOiBhbnk7XHJcbiAgICBwdWJsaWMgY3RybDogYW55O1xyXG4gICAgcHVibGljIGVsZW06IGFueTtcclxuICAgIHB1YmxpYyBhdHRyczogYW55O1xyXG4gICAgcHVibGljIGFjdGl2ZUVkaXRvclRhYkluZGV4OiBudW1iZXI7XHJcbiAgICBwdWJsaWMgcnVudGltZVRoZW1lU2V0OiBCb29sZWFuO1xyXG4gICAgcHVibGljIHJ1bnRpbWVUaGVtZUluZGV4OiBudW1iZXI7XHJcbiAgICBjb25zdHJ1Y3Rvcigkc2NvcGUsICRpbmplY3Rvcikge1xyXG4gICAgICAgIHN1cGVyKCRzY29wZSwgJGluamVjdG9yKTtcclxuICAgICAgICBfLmRlZmF1bHRzKHRoaXMucGFuZWwsIHt9KTtcclxuICAgICAgICB0aGlzLnBhbmVsLnRoZW1lcyA9IHRoaXMucGFuZWwudGhlbWVzIHx8IFtuZXcgQm9vbVRoZW1lKHsgbmFtZTogXCJEZWZhdWx0XCIgfSldO1xyXG4gICAgICAgIHRoaXMucGFuZWwuYWN0aXZlVGhlbWVJZCA9IHRoaXMucGFuZWwuYWN0aXZlVGhlbWVJZCB8fCAwO1xyXG4gICAgICAgIHRoaXMuYWN0aXZlRWRpdG9yVGFiSW5kZXggPSB0aGlzLnBhbmVsLmFjdGl2ZVRoZW1lSWQgPj0gMCA/IHRoaXMucGFuZWwuYWN0aXZlVGhlbWVJZCA6IC0xO1xyXG4gICAgICAgIHRoaXMucnVudGltZVRoZW1lU2V0ID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5ydW50aW1lVGhlbWVJbmRleCA9IHRoaXMucGFuZWwuYWN0aXZlVGhlbWVJZCA+PSAwID8gdGhpcy5wYW5lbC5hY3RpdmVUaGVtZUlkIDogMDtcclxuICAgICAgICB0aGlzLnVwZGF0ZVByb3RvdHlwZXMoKTtcclxuICAgICAgICB0aGlzLmV2ZW50cy5vbihcImluaXQtZWRpdC1tb2RlXCIsIHRoaXMub25Jbml0RWRpdE1vZGUuYmluZCh0aGlzKSk7XHJcbiAgICB9XHJcbiAgICBwcml2YXRlIHVwZGF0ZVByb3RvdHlwZXMoKTogdm9pZCB7XHJcbiAgICAgICAgaWYgKHRoaXMucGFuZWwudGhlbWVzICYmIHRoaXMucGFuZWwudGhlbWVzLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgdGhpcy5wYW5lbC50aGVtZXMubWFwKHRoZW1lID0+IHtcclxuICAgICAgICAgICAgICAgIE9iamVjdC5zZXRQcm90b3R5cGVPZih0aGVtZSwgQm9vbVRoZW1lLnByb3RvdHlwZSk7XHJcbiAgICAgICAgICAgICAgICBpZiAodGhlbWUuc3R5bGVzICYmIHRoZW1lLnN0eWxlcy5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhlbWUuc3R5bGVzLm1hcChzdHlsZSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIE9iamVjdC5zZXRQcm90b3R5cGVPZihzdHlsZSwgQm9vbVRoZW1lU3R5bGUucHJvdG90eXBlKTtcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHJldHVybiB0aGVtZTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgcHJpdmF0ZSBvbkluaXRFZGl0TW9kZSgpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLmFkZEVkaXRvclRhYihcIlRoZW1lXCIsIFwicHVibGljL3BsdWdpbnMveWVzb3JleWVyYW0tYm9vbXRoZW1lLXBhbmVsL3BhcnRpYWxzL29wdGlvbnMuaHRtbFwiLCAyKTtcclxuICAgIH1cclxuICAgIHB1YmxpYyBhZGRUaGVtZSgpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLnBhbmVsLnRoZW1lcyA9IHRoaXMucGFuZWwudGhlbWVzIHx8IFtdO1xyXG4gICAgICAgIHRoaXMucGFuZWwudGhlbWVzLnB1c2gobmV3IEJvb21UaGVtZSh7XHJcbiAgICAgICAgICAgIG5hbWU6IGBUaGVtZSAke3RoaXMucGFuZWwudGhlbWVzLmxlbmd0aCArIDF9YFxyXG4gICAgICAgIH0pKTtcclxuICAgICAgICB0aGlzLmFjdGl2ZUVkaXRvclRhYkluZGV4ID0gdGhpcy5wYW5lbC50aGVtZXMubGVuZ3RoIC0gMTtcclxuICAgICAgICB0aGlzLnJ1bnRpbWVUaGVtZUluZGV4ID0gdGhpcy5wYW5lbC50aGVtZXMubGVuZ3RoIC0gMTtcclxuICAgICAgICB0aGlzLnJlbmRlcigpO1xyXG4gICAgfVxyXG4gICAgcHVibGljIGRlbGV0ZVRoZW1lKGluZGV4OiBudW1iZXIpOiB2b2lkIHtcclxuICAgICAgICBpZiAoaW5kZXggIT09IDApIHtcclxuICAgICAgICAgICAgdGhpcy5wYW5lbC50aGVtZXMuc3BsaWNlKGluZGV4LCAxKTtcclxuICAgICAgICAgICAgaWYgKHRoaXMucGFuZWwuYWN0aXZlVGhlbWVJZCA9PT0gaW5kZXgpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMucGFuZWwuYWN0aXZlVGhlbWVJZCA9IDA7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKHRoaXMuYWN0aXZlRWRpdG9yVGFiSW5kZXggPT09IGluZGV4KSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmFjdGl2ZUVkaXRvclRhYkluZGV4ID0gLTE7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKHRoaXMucnVudGltZVRoZW1lSW5kZXggPT09IGluZGV4KSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnJ1bnRpbWVUaGVtZUluZGV4ID0gMDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHB1YmxpYyBzZXRUaGVtZUFzRGVmYXVsdChpbmRleDogbnVtYmVyKSB7XHJcbiAgICAgICAgdGhpcy5jdHJsLnBhbmVsLmFjdGl2ZVRoZW1lSWQgPSBpbmRleDtcclxuICAgICAgICB0aGlzLnJ1bnRpbWVUaGVtZUluZGV4ID0gaW5kZXg7XHJcbiAgICAgICAgdGhpcy5yZW5kZXIoKTtcclxuICAgIH1cclxuICAgIHB1YmxpYyBzZXRydW50aW1lVGhlbWVJbmRleChpbmRleDogbnVtYmVyKSB7XHJcbiAgICAgICAgdGhpcy5ydW50aW1lVGhlbWVTZXQgPSB0cnVlO1xyXG4gICAgICAgIHRoaXMucnVudGltZVRoZW1lSW5kZXggPSBpbmRleDtcclxuICAgICAgICB0aGlzLnJlbmRlcigpO1xyXG4gICAgfVxyXG4gICAgcHVibGljIGxpbWl0VGV4dCh0ZXh0OiBzdHJpbmcsIG1heGxlbmd0aDogTnVtYmVyKTogc3RyaW5nIHtcclxuICAgICAgICBpZiAodGV4dC5zcGxpdChcIlwiKS5sZW5ndGggPiBtYXhsZW5ndGgpIHtcclxuICAgICAgICAgICAgdGV4dCA9IHRleHQuc3Vic3RyaW5nKDAsIE51bWJlcihtYXhsZW5ndGgpIC0gMykgKyBcIi4uLlwiO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdGV4dDtcclxuICAgIH1cclxuICAgIHB1YmxpYyBsaW5rKHNjb3BlOiBhbnksIGVsZW06IGFueSwgYXR0cnM6IGFueSwgY3RybDogYW55KTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5zY29wZSA9IHNjb3BlO1xyXG4gICAgICAgIHRoaXMuZWxlbSA9IGVsZW07XHJcbiAgICAgICAgdGhpcy5hdHRycyA9IGF0dHJzO1xyXG4gICAgICAgIHRoaXMuY3RybCA9IGN0cmw7XHJcbiAgICAgICAgdGhpcy5yZW5kZXIoKTtcclxuICAgIH1cclxufVxyXG5cclxubGV0IGdldFRoZW1lQ1NTRmlsZSA9IGZ1bmN0aW9uIChtb2RlOiBzdHJpbmcpOiBzdHJpbmcge1xyXG4gICAgbGV0IGZpbGVuYW1lID0gJyc7XHJcbiAgICBpZiAoW1wiZGFya1wiLCBcImxpZ2h0XCJdLmluZGV4T2YobW9kZS50b0xvd2VyQ2FzZSgpKSA+IC0xICYmIHdpbmRvdy5wZXJmb3JtYW5jZSkge1xyXG4gICAgICAgIGxldCBhcHBmaWxlcyA9IHdpbmRvdy5wZXJmb3JtYW5jZS5nZXRFbnRyaWVzKCkubWFwKGUgPT4gZS5uYW1lKS5maWx0ZXIoZSA9PiBlLmluZGV4T2YoXCIuY3NzXCIpID4gLTEpLmZpbHRlcihlID0+IGUuaW5kZXhPZihcIi9ncmFmYW5hLmFwcFwiKSA+IC0xKTtcclxuICAgICAgICBpZiAoYXBwZmlsZXMgJiYgYXBwZmlsZXMubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICBmaWxlbmFtZSA9IGFwcGZpbGVzWzBdLnJlcGxhY2UoYGJ1aWxkL2dyYWZhbmEuYXBwYCwgYGJ1aWxkL2dyYWZhbmEuJHttb2RlLnRvTG93ZXJDYXNlKCl9YCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIGZpbGVuYW1lO1xyXG59O1xyXG5cclxuQm9vbVRoZW1lQ3RsLnByb3RvdHlwZS5yZW5kZXIgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICBsZXQgb3V0cHV0ID0gJyc7XHJcbiAgICBfLmVhY2godGhpcy5wYW5lbC50aGVtZXMsICh0aGVtZSwgaW5kZXgpID0+IHtcclxuICAgICAgICBpZiAodGhpcy5ydW50aW1lVGhlbWVTZXQgPT09IGZhbHNlKSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLnBhbmVsLmFjdGl2ZVRoZW1lSWQgPT09IGluZGV4ICYmIHRoaXMucGFuZWwuYWN0aXZlVGhlbWVJZCA+PSAwKSB7XHJcbiAgICAgICAgICAgICAgICBvdXRwdXQgKz0gdGhlbWUuZ2V0VGhlbWVDb250ZW50KCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5ydW50aW1lVGhlbWVJbmRleCA9PT0gaW5kZXggJiYgdGhpcy5ydW50aW1lVGhlbWVJbmRleCA+PSAwKSB7XHJcbiAgICAgICAgICAgICAgICBvdXRwdXQgKz0gdGhlbWUuZ2V0VGhlbWVDb250ZW50KCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9KTtcclxuICAgIGlmICh0aGlzLnJ1bnRpbWVUaGVtZVNldCA9PT0gdHJ1ZSkge1xyXG4gICAgICAgIGlmICh0aGlzLnJ1bnRpbWVUaGVtZUluZGV4ID09PSAtMjAwMCkge1xyXG4gICAgICAgICAgICBvdXRwdXQgKz0gYEBpbXBvcnQgdXJsKCcke2dldFRoZW1lQ1NTRmlsZShcImRhcmtcIil9Jyk7XHJcbiAgICAgICAgICAgIGA7XHJcbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLnJ1bnRpbWVUaGVtZUluZGV4ID09PSAtMzAwMCkge1xyXG4gICAgICAgICAgICBvdXRwdXQgKz0gYEBpbXBvcnQgdXJsKCcke2dldFRoZW1lQ1NTRmlsZShcImxpZ2h0XCIpfScpO1xyXG4gICAgICAgICAgICBgO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBzdHlsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3N0eWxlJyk7XHJcbiAgICBzdHlsZS50eXBlID0gJ3RleHQvY3NzJztcclxuICAgIHN0eWxlLmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKG91dHB1dCkpO1xyXG4gICAgdGhpcy5lbGVtLmZpbmQoXCIjYm9vbS10aGVtZVwiKS5odG1sKFwiXCIpO1xyXG4gICAgdGhpcy5lbGVtLmZpbmQoXCIjYm9vbS10aGVtZVwiKS5hcHBlbmQoc3R5bGUpO1xyXG59O1xyXG5cclxuZXhwb3J0IHsgQm9vbVRoZW1lQ3RsIGFzIFBhbmVsQ3RybCB9O1xyXG4iXX0=