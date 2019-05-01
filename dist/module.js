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
                    _this.panel.transparent = true;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL21vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7WUFLQTtnQkFHSSx3QkFBWSxJQUFJLEVBQUUsS0FBSztvQkFDbkIsUUFBUSxJQUFJLENBQUMsV0FBVyxFQUFFLEVBQUU7d0JBQ3hCLEtBQUssT0FBTzs0QkFDUixJQUFJLENBQUMsSUFBSSxHQUFHLE9BQU8sQ0FBQzs0QkFDcEIsSUFBSSxDQUFDLEtBQUssR0FBRztnQ0FDVCxJQUFJLEVBQUUsS0FBSyxJQUFJLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUU7NkJBQzlDLENBQUM7NEJBQ0YsTUFBTTt3QkFDVixLQUFLLEtBQUs7NEJBQ04sSUFBSSxDQUFDLElBQUksR0FBRyxLQUFLLENBQUM7NEJBQ2xCLElBQUksQ0FBQyxLQUFLLEdBQUc7Z0NBQ1QsR0FBRyxFQUFFLEtBQUssSUFBSSxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFOzZCQUMzQyxDQUFDOzRCQUNGLE1BQU07d0JBQ1Y7NEJBQ0ksSUFBSSxDQUFDLElBQUksR0FBRyxNQUFNLENBQUM7NEJBQ25CLElBQUksQ0FBQyxLQUFLLEdBQUcsRUFBRSxDQUFDOzRCQUNoQixNQUFNO3FCQUViO2dCQUNMLENBQUM7Z0JBQ0wscUJBQUM7WUFBRCxDQUFDLEFBeEJELElBd0JDO1lBRUQ7Z0JBR0ksbUJBQVksT0FBTztvQkFDZixJQUFJLENBQUMsSUFBSSxHQUFHLE9BQU8sQ0FBQyxJQUFJLElBQUksV0FBVyxDQUFDO29CQUN4QyxJQUFJLENBQUMsTUFBTSxHQUFHO3dCQUNWLElBQUksY0FBYyxDQUFDLEtBQUssRUFBRSxFQUFFLEdBQUcsRUFBRSxFQUFFLEVBQUUsQ0FBQzt3QkFDdEMs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QUNILElBQUksS0FBSSxDQUFDLGlCQUFpQixLQUFLLEtBQUssSUFBSSxLQUFJLENBQUMsaUJBQWlCLElBQUksQ0FBQyxFQUFFOzRCQUNqRSxNQUFNLElBQUksS0FBSyxDQUFDLGVBQWUsRUFBRSxDQUFDO3lCQUNyQztxQkFDSjtnQkFDTCxDQUFDLENBQUMsQ0FBQztnQkFDSCxJQUFJLElBQUksQ0FBQyxlQUFlLEtBQUssSUFBSSxFQUFFO29CQUMvQixJQUFJLElBQUksQ0FBQyxpQkFBaUIsS0FBSyxDQUFDLElBQUksRUFBRTt3QkFDbEMsTUFBTSxJQUFJLGtCQUFnQixlQUFlLENBQUMsTUFBTSxDQUFDLHNCQUNoRCxDQUFDO3FCQUNMO3lCQUFNLElBQUksSUFBSSxDQUFDLGlCQUFpQixLQUFLLENBQUMsSUFBSSxFQUFFO3dCQUN6QyxNQUFNLElBQUksa0JBQWdCLGVBQWUsQ0FBQyxPQUFPLENBQUMsc0JBQ2pELENBQUM7cUJBQ0w7aUJBQ0o7Z0JBRUQsSUFBTSxLQUFLLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxPQUFPLENBQUMsQ0FBQztnQkFDOUMsS0FBSyxDQUFDLElBQUksR0FBRyxVQUFVLENBQUM7Z0JBQ3hCLEtBQUssQ0FBQyxXQUFXLENBQUMsUUFBUSxDQUFDLGNBQWMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO2dCQUNuRCxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUM7Z0JBQ3ZDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUNoRCxDQUFDLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvLy88cmVmZXJlbmNlIHBhdGg9XCIuLi9ub2RlX21vZHVsZXMvZ3JhZmFuYS1zZGstbW9ja3MvYXBwL2hlYWRlcnMvY29tbW9uLmQudHNcIiAvPlxyXG5cclxuaW1wb3J0IF8gZnJvbSBcImxvZGFzaFwiO1xyXG5pbXBvcnQgeyBQYW5lbEN0cmwgfSBmcm9tIFwiYXBwL3BsdWdpbnMvc2RrXCI7XHJcblxyXG5jbGFzcyBCb29tVGhlbWVTdHlsZSB7XHJcbiAgICBwdWJsaWMgdHlwZTogc3RyaW5nO1xyXG4gICAgcHVibGljIHByb3BzOiBhbnk7XHJcbiAgICBjb25zdHJ1Y3Rvcih0eXBlLCBwcm9wcykge1xyXG4gICAgICAgIHN3aXRjaCAodHlwZS50b0xvd2VyQ2FzZSgpKSB7XHJcbiAgICAgICAgICAgIGNhc2UgXCJzdHlsZVwiOlxyXG4gICAgICAgICAgICAgICAgdGhpcy50eXBlID0gXCJzdHlsZVwiO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5wcm9wcyA9IHtcclxuICAgICAgICAgICAgICAgICAgICB0ZXh0OiBwcm9wcyAmJiBwcm9wcy50ZXh0ID8gcHJvcHMudGV4dCA6IFwiXCJcclxuICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBcInVybFwiOlxyXG4gICAgICAgICAgICAgICAgdGhpcy50eXBlID0gXCJ1cmxcIjtcclxuICAgICAgICAgICAgICAgIHRoaXMucHJvcHMgPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdXJsOiBwcm9wcyAmJiBwcm9wcy51cmwgPyBwcm9wcy51cmwgOiBcIlwiXHJcbiAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICB0aGlzLnR5cGUgPSBcIm5vbmVcIjtcclxuICAgICAgICAgICAgICAgIHRoaXMucHJvcHMgPSB7fTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG5cclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuXHJcbmNsYXNzIEJvb21UaGVtZSB7XHJcbiAgICBwdWJsaWMgbmFtZTogc3RyaW5nO1xyXG4gICAgcHVibGljIHN0eWxlczogQm9vbVRoZW1lU3R5bGVbXTtcclxuICAgIGNvbnN0cnVjdG9yKG9wdGlvbnMpIHtcclxuICAgICAgICB0aGlzLm5hbWUgPSBvcHRpb25zLm5hbWUgfHwgXCJOZXcgVGhlbWVcIjtcclxuICAgICAgICB0aGlzLnN0eWxlcyA9IFtcclxuICAgICAgICAgICAgbmV3IEJvb21UaGVtZVN0eWxlKFwidXJsXCIsIHsgdXJsOiBcIlwiIH0pLFxyXG4gICAgICAgICAgICBuZXcgQm9vbVRoZW1lU3R5bGUoXCJzdHlsZVwiLCB7IHRleHQ6IGBgIH0pXHJcbiAgICAgICAgXTtcclxuICAgIH1cclxuICAgIHB1YmxpYyBhZGRTdHlsZSh0eXBlOiBzdHJpbmcpOiB2b2lkIHtcclxuICAgICAgICBpZiAodHlwZS50b0xvd2VyQ2FzZSgpID09PSBcInN0eWxlXCIpIHtcclxuICAgICAgICAgICAgdGhpcy5zdHlsZXMucHVzaChuZXcgQm9vbVRoZW1lU3R5bGUoXCJzdHlsZVwiLCB7fSkpO1xyXG4gICAgICAgIH0gZWxzZSBpZiAodHlwZS50b0xvd2VyQ2FzZSgpID09PSBcInVybFwiKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc3R5bGVzLnB1c2gobmV3IEJvb21UaGVtZVN0eWxlKFwidXJsXCIsIHt9KSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgIH1cclxuICAgIHB1YmxpYyBkZWxldGVTdHlsZShpbmRleDogbnVtYmVyKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5zdHlsZXMuc3BsaWNlKGluZGV4LCAxKTtcclxuICAgIH1cclxuICAgIHB1YmxpYyBnZXRUaGVtZUNvbnRlbnQoKTogc3RyaW5nIHtcclxuICAgICAgICBsZXQgb3V0cHV0ID0gJyc7XHJcbiAgICAgICAgaWYgKHRoaXMuc3R5bGVzICYmIHRoaXMuc3R5bGVzLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgXy5lYWNoKHRoaXMuc3R5bGVzLCBzdHlsZSA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZiAoc3R5bGUudHlwZSA9PT0gXCJ1cmxcIikge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChzdHlsZS5wcm9wcyAmJiBzdHlsZS5wcm9wcy51cmwgIT09IFwiXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgb3V0cHV0ICs9IGBAaW1wb3J0IHVybCgnJHtzdHlsZS5wcm9wcy51cmx9Jyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGA7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoc3R5bGUudHlwZSA9PT0gXCJzdHlsZVwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHN0eWxlLnByb3BzICYmIHN0eWxlLnByb3BzLnRlc3QgIT09IFwiXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgb3V0cHV0ICs9IGAke3N0eWxlLnByb3BzLnRleHQgfHwgJyd9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGA7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIG91dHB1dDtcclxuICAgIH1cclxufVxyXG5cclxuY2xhc3MgQm9vbVRoZW1lQ3RsIGV4dGVuZHMgUGFuZWxDdHJsIHtcclxuICAgIHB1YmxpYyBzdGF0aWMgdGVtcGxhdGVVcmwgPSBcInBhcnRpYWxzL21vZHVsZS5odG1sXCI7XHJcbiAgICBwdWJsaWMgc2NvcGU6IGFueTtcclxuICAgIHB1YmxpYyBjdHJsOiBhbnk7XHJcbiAgICBwdWJsaWMgZWxlbTogYW55O1xyXG4gICAgcHVibGljIGF0dHJzOiBhbnk7XHJcbiAgICBwdWJsaWMgYWN0aXZlRWRpdG9yVGFiSW5kZXg6IG51bWJlcjtcclxuICAgIHB1YmxpYyBydW50aW1lVGhlbWVTZXQ6IEJvb2xlYW47XHJcbiAgICBwdWJsaWMgcnVudGltZVRoZW1lSW5kZXg6IG51bWJlcjtcclxuICAgIGNvbnN0cnVjdG9yKCRzY29wZSwgJGluamVjdG9yKSB7XHJcbiAgICAgICAgc3VwZXIoJHNjb3BlLCAkaW5qZWN0b3IpO1xyXG4gICAgICAgIF8uZGVmYXVsdHModGhpcy5wYW5lbCwge30pO1xyXG4gICAgICAgIHRoaXMucGFuZWwudHJhbnNwYXJlbnQgPSB0cnVlO1xyXG4gICAgICAgIHRoaXMucGFuZWwudGhlbWVzID0gdGhpcy5wYW5lbC50aGVtZXMgfHwgW25ldyBCb29tVGhlbWUoeyBuYW1lOiBcIkRlZmF1bHRcIiB9KV07XHJcbiAgICAgICAgdGhpcy5wYW5lbC5hY3RpdmVUaGVtZUlkID0gdGhpcy5wYW5lbC5hY3RpdmVUaGVtZUlkIHx8IDA7XHJcbiAgICAgICAgdGhpcy5hY3RpdmVFZGl0b3JUYWJJbmRleCA9IHRoaXMucGFuZWwuYWN0aXZlVGhlbWVJZCA+PSAwID8gdGhpcy5wYW5lbC5hY3RpdmVUaGVtZUlkIDogLTE7XHJcbiAgICAgICAgdGhpcy5ydW50aW1lVGhlbWVTZXQgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLnJ1bnRpbWVUaGVtZUluZGV4ID0gdGhpcy5wYW5lbC5hY3RpdmVUaGVtZUlkID49IDAgPyB0aGlzLnBhbmVsLmFjdGl2ZVRoZW1lSWQgOiAwO1xyXG4gICAgICAgIHRoaXMudXBkYXRlUHJvdG90eXBlcygpO1xyXG4gICAgICAgIHRoaXMuZXZlbnRzLm9uKFwiaW5pdC1lZGl0LW1vZGVcIiwgdGhpcy5vbkluaXRFZGl0TW9kZS5iaW5kKHRoaXMpKTtcclxuICAgIH1cclxuICAgIHByaXZhdGUgdXBkYXRlUHJvdG90eXBlcygpOiB2b2lkIHtcclxuICAgICAgICBpZiAodGhpcy5wYW5lbC50aGVtZXMgJiYgdGhpcy5wYW5lbC50aGVtZXMubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICB0aGlzLnBhbmVsLnRoZW1lcy5tYXAodGhlbWUgPT4ge1xyXG4gICAgICAgICAgICAgICAgT2JqZWN0LnNldFByb3RvdHlwZU9mKHRoZW1lLCBCb29tVGhlbWUucHJvdG90eXBlKTtcclxuICAgICAgICAgICAgICAgIGlmICh0aGVtZS5zdHlsZXMgJiYgdGhlbWUuc3R5bGVzLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGVtZS5zdHlsZXMubWFwKHN0eWxlID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgT2JqZWN0LnNldFByb3RvdHlwZU9mKHN0eWxlLCBCb29tVGhlbWVTdHlsZS5wcm90b3R5cGUpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoZW1lO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBwcml2YXRlIG9uSW5pdEVkaXRNb2RlKCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuYWRkRWRpdG9yVGFiKFwiVGhlbWVcIiwgXCJwdWJsaWMvcGx1Z2lucy95ZXNvcmV5ZXJhbS1ib29tdGhlbWUtcGFuZWwvcGFydGlhbHMvb3B0aW9ucy5odG1sXCIsIDIpO1xyXG4gICAgfVxyXG4gICAgcHVibGljIGFkZFRoZW1lKCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMucGFuZWwudGhlbWVzID0gdGhpcy5wYW5lbC50aGVtZXMgfHwgW107XHJcbiAgICAgICAgdGhpcy5wYW5lbC50aGVtZXMucHVzaChuZXcgQm9vbVRoZW1lKHtcclxuICAgICAgICAgICAgbmFtZTogYFRoZW1lICR7dGhpcy5wYW5lbC50aGVtZXMubGVuZ3RoICsgMX1gXHJcbiAgICAgICAgfSkpO1xyXG4gICAgICAgIHRoaXMuYWN0aXZlRWRpdG9yVGFiSW5kZXggPSB0aGlzLnBhbmVsLnRoZW1lcy5sZW5ndGggLSAxO1xyXG4gICAgICAgIHRoaXMucnVudGltZVRoZW1lSW5kZXggPSB0aGlzLnBhbmVsLnRoZW1lcy5sZW5ndGggLSAxO1xyXG4gICAgICAgIHRoaXMucmVuZGVyKCk7XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgZGVsZXRlVGhlbWUoaW5kZXg6IG51bWJlcik6IHZvaWQge1xyXG4gICAgICAgIGlmIChpbmRleCAhPT0gMCkge1xyXG4gICAgICAgICAgICB0aGlzLnBhbmVsLnRoZW1lcy5zcGxpY2UoaW5kZXgsIDEpO1xyXG4gICAgICAgICAgICBpZiAodGhpcy5wYW5lbC5hY3RpdmVUaGVtZUlkID09PSBpbmRleCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5wYW5lbC5hY3RpdmVUaGVtZUlkID0gMDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAodGhpcy5hY3RpdmVFZGl0b3JUYWJJbmRleCA9PT0gaW5kZXgpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuYWN0aXZlRWRpdG9yVGFiSW5kZXggPSAtMTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAodGhpcy5ydW50aW1lVGhlbWVJbmRleCA9PT0gaW5kZXgpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMucnVudGltZVRoZW1lSW5kZXggPSAwO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgcHVibGljIHNldFRoZW1lQXNEZWZhdWx0KGluZGV4OiBudW1iZXIpIHtcclxuICAgICAgICB0aGlzLmN0cmwucGFuZWwuYWN0aXZlVGhlbWVJZCA9IGluZGV4O1xyXG4gICAgICAgIHRoaXMucnVudGltZVRoZW1lSW5kZXggPSBpbmRleDtcclxuICAgICAgICB0aGlzLnJlbmRlcigpO1xyXG4gICAgfVxyXG4gICAgcHVibGljIHNldHJ1bnRpbWVUaGVtZUluZGV4KGluZGV4OiBudW1iZXIpIHtcclxuICAgICAgICB0aGlzLnJ1bnRpbWVUaGVtZVNldCA9IHRydWU7XHJcbiAgICAgICAgdGhpcy5ydW50aW1lVGhlbWVJbmRleCA9IGluZGV4O1xyXG4gICAgICAgIHRoaXMucmVuZGVyKCk7XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgbGltaXRUZXh0KHRleHQ6IHN0cmluZywgbWF4bGVuZ3RoOiBOdW1iZXIpOiBzdHJpbmcge1xyXG4gICAgICAgIGlmICh0ZXh0LnNwbGl0KFwiXCIpLmxlbmd0aCA+IG1heGxlbmd0aCkge1xyXG4gICAgICAgICAgICB0ZXh0ID0gdGV4dC5zdWJzdHJpbmcoMCwgTnVtYmVyKG1heGxlbmd0aCkgLSAzKSArIFwiLi4uXCI7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0ZXh0O1xyXG4gICAgfVxyXG4gICAgcHVibGljIGxpbmsoc2NvcGU6IGFueSwgZWxlbTogYW55LCBhdHRyczogYW55LCBjdHJsOiBhbnkpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLnNjb3BlID0gc2NvcGU7XHJcbiAgICAgICAgdGhpcy5lbGVtID0gZWxlbTtcclxuICAgICAgICB0aGlzLmF0dHJzID0gYXR0cnM7XHJcbiAgICAgICAgdGhpcy5jdHJsID0gY3RybDtcclxuICAgICAgICB0aGlzLnJlbmRlcigpO1xyXG4gICAgfVxyXG59XHJcblxyXG5sZXQgZ2V0VGhlbWVDU1NGaWxlID0gZnVuY3Rpb24gKG1vZGU6IHN0cmluZyk6IHN0cmluZyB7XHJcbiAgICBsZXQgZmlsZW5hbWUgPSAnJztcclxuICAgIGlmIChbXCJkYXJrXCIsIFwibGlnaHRcIl0uaW5kZXhPZihtb2RlLnRvTG93ZXJDYXNlKCkpID4gLTEgJiYgd2luZG93LnBlcmZvcm1hbmNlKSB7XHJcbiAgICAgICAgbGV0IGFwcGZpbGVzID0gd2luZG93LnBlcmZvcm1hbmNlLmdldEVudHJpZXMoKS5tYXAoZSA9PiBlLm5hbWUpLmZpbHRlcihlID0+IGUuaW5kZXhPZihcIi5jc3NcIikgPiAtMSkuZmlsdGVyKGUgPT4gZS5pbmRleE9mKFwiL2dyYWZhbmEuYXBwXCIpID4gLTEpO1xyXG4gICAgICAgIGlmIChhcHBmaWxlcyAmJiBhcHBmaWxlcy5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgIGZpbGVuYW1lID0gYXBwZmlsZXNbMF0ucmVwbGFjZShgYnVpbGQvZ3JhZmFuYS5hcHBgLCBgYnVpbGQvZ3JhZmFuYS4ke21vZGUudG9Mb3dlckNhc2UoKX1gKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gZmlsZW5hbWU7XHJcbn07XHJcblxyXG5Cb29tVGhlbWVDdGwucHJvdG90eXBlLnJlbmRlciA9IGZ1bmN0aW9uICgpIHtcclxuICAgIGxldCBvdXRwdXQgPSAnJztcclxuICAgIF8uZWFjaCh0aGlzLnBhbmVsLnRoZW1lcywgKHRoZW1lLCBpbmRleCkgPT4ge1xyXG4gICAgICAgIGlmICh0aGlzLnJ1bnRpbWVUaGVtZVNldCA9PT0gZmFsc2UpIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMucGFuZWwuYWN0aXZlVGhlbWVJZCA9PT0gaW5kZXggJiYgdGhpcy5wYW5lbC5hY3RpdmVUaGVtZUlkID49IDApIHtcclxuICAgICAgICAgICAgICAgIG91dHB1dCArPSB0aGVtZS5nZXRUaGVtZUNvbnRlbnQoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLnJ1bnRpbWVUaGVtZUluZGV4ID09PSBpbmRleCAmJiB0aGlzLnJ1bnRpbWVUaGVtZUluZGV4ID49IDApIHtcclxuICAgICAgICAgICAgICAgIG91dHB1dCArPSB0aGVtZS5nZXRUaGVtZUNvbnRlbnQoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG4gICAgaWYgKHRoaXMucnVudGltZVRoZW1lU2V0ID09PSB0cnVlKSB7XHJcbiAgICAgICAgaWYgKHRoaXMucnVudGltZVRoZW1lSW5kZXggPT09IC0yMDAwKSB7XHJcbiAgICAgICAgICAgIG91dHB1dCArPSBgQGltcG9ydCB1cmwoJyR7Z2V0VGhlbWVDU1NGaWxlKFwiZGFya1wiKX0nKTtcclxuICAgICAgICAgICAgYDtcclxuICAgICAgICB9IGVsc2UgaWYgKHRoaXMucnVudGltZVRoZW1lSW5kZXggPT09IC0zMDAwKSB7XHJcbiAgICAgICAgICAgIG91dHB1dCArPSBgQGltcG9ydCB1cmwoJyR7Z2V0VGhlbWVDU1NGaWxlKFwibGlnaHRcIil9Jyk7XHJcbiAgICAgICAgICAgIGA7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IHN0eWxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3R5bGUnKTtcclxuICAgIHN0eWxlLnR5cGUgPSAndGV4dC9jc3MnO1xyXG4gICAgc3R5bGUuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUob3V0cHV0KSk7XHJcbiAgICB0aGlzLmVsZW0uZmluZChcIiNib29tLXRoZW1lXCIpLmh0bWwoXCJcIik7XHJcbiAgICB0aGlzLmVsZW0uZmluZChcIiNib29tLXRoZW1lXCIpLmFwcGVuZChzdHlsZSk7XHJcbn07XHJcblxyXG5leHBvcnQgeyBCb29tVGhlbWVDdGwgYXMgUGFuZWxDdHJsIH07XHJcbiJdfQ==