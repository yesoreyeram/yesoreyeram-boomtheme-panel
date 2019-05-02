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
    var lodash_1, sdk_1, CONFIG, BoomThemeStyle, BoomTheme, BoomThemeCtl, getThemeCSSFile;
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
            CONFIG = {
                DEFAULT_THEME_BG_IMAGE: "https://images.unsplash.com/photo-1554316224-0ed275ff54ea?w=751&q=80",
                DEFAULT_THEME_NAME: "New Theme",
                FIRST_THEME_NAME: "Boom Theme",
                THEME_ID: {
                    DARK: -2000,
                    LIGHT: -3000
                },
                THEME_STYLES: {
                    BG_IMAGE: "bgimage",
                    NONE: "none",
                    STYLE: "style",
                    URL: "url",
                }
            };
            BoomThemeStyle = (function () {
                function BoomThemeStyle(type, props) {
                    switch (type.toLowerCase()) {
                        case CONFIG.THEME_STYLES.STYLE:
                            this.type = CONFIG.THEME_STYLES.STYLE;
                            this.props = {
                                text: props && props.text ? props.text : ""
                            };
                            break;
                        case CONFIG.THEME_STYLES.URL:
                            this.type = CONFIG.THEME_STYLES.URL;
                            this.props = {
                                url: props && props.url ? props.url : ""
                            };
                            break;
                        case CONFIG.THEME_STYLES.BG_IMAGE:
                            this.type = CONFIG.THEME_STYLES.BG_IMAGE;
                            this.props = {
                                url: props && props.url ? props.url : ""
                            };
                            break;
                        default:
                            this.type = CONFIG.THEME_STYLES.NONE;
                            this.props = {};
                            break;
                    }
                }
                return BoomThemeStyle;
            }());
            BoomTheme = (function () {
                function BoomTheme(options) {
                    this.name = options.name || CONFIG.DEFAULT_THEME_NAME;
                    this.styles = options.styles || [
                        new BoomThemeStyle(CONFIG.THEME_STYLES.BG_IMAGE, { url: "" }),
                        new BoomThemeStyle(CONFIG.THEME_STYLES.URL, { url: "" }),
                        new BoomThemeStyle(CONFIG.THEME_STYLES.STYLE, { text: "" }),
                    ];
                }
                BoomTheme.prototype.addStyle = function (type) {
                    this.styles.push(new BoomThemeStyle(type, {}));
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
                                if (style.props && style.props.text !== "") {
                                    output += (style.props.text || '') + "\n                        ";
                                }
                            }
                            else if (style.type === "bgimage") {
                                if (style.props && style.props.url !== "") {
                                    output += "\n.main-view, .sidemenu-open .sidemenu, .navbar, .dashboard-container {\n    background: url(\"" + style.props.url + "\")\n    no-repeat center center fixed;\n    -webkit-background-size: cover;\n    -moz-background-size: cover;\n    -o-background-size: cover;\n    background-size: cover;\n}\n                        ";
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
                    _this.panel.themes = _this.panel.themes || [
                        new BoomTheme({
                            name: CONFIG.FIRST_THEME_NAME,
                            styles: [
                                new BoomThemeStyle(CONFIG.THEME_STYLES.BG_IMAGE, { url: CONFIG.DEFAULT_THEME_BG_IMAGE })
                            ]
                        })
                    ];
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
                    this.panel.themes.splice(index, 1);
                    if (this.panel.activeThemeId === index) {
                        this.panel.activeThemeId = 0;
                    }
                    if (this.runtimeThemeIndex === index) {
                        this.runtimeThemeIndex = 0;
                    }
                    if (this.activeEditorTabIndex === index) {
                        this.activeEditorTabIndex = this.ctrl.panel.themes.length - 1;
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
                    var appfiles = window.performance.getEntries().map(function (e) { return e.name; }).filter(function (e) { return e.endsWith(".js"); }).filter(function (e) { return e.indexOf("/public/build/app.") > -1; });
                    if (appfiles && appfiles.length > 0) {
                        filename = appfiles[0].replace("/public/build/app.", "/public/build/grafana." + mode.toLowerCase() + ".").slice(0, -3) + ".css";
                    }
                }
                return filename;
            };
            BoomThemeCtl.prototype.render = function () {
                var _this = this;
                if (this.ctrl.panel.title === "Panel Title") {
                    this.ctrl.panel.title = "";
                }
                if (this.ctrl.panel.gridPos && this.ctrl.panel.gridPos.x === 0 && this.ctrl.panel.gridPos.y === 0) {
                    this.ctrl.panel.gridPos.w = 24;
                    this.ctrl.panel.gridPos.h = 3;
                }
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
                    if (this.runtimeThemeIndex === CONFIG.THEME_ID.DARK) {
                        output += "@import url('" + getThemeCSSFile("dark") + "');\n            ";
                    }
                    else if (this.runtimeThemeIndex === CONFIG.THEME_ID.LIGHT) {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL21vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7WUFLTSxNQUFNLEdBQUc7Z0JBQ1gsc0JBQXNCLEVBQUUsc0VBQXNFO2dCQUM5RixrQkFBa0IsRUFBRSxXQUFXO2dCQUMvQixnQkFBZ0IsRUFBRSxZQUFZO2dCQUM5QixRQUFRLEVBQUU7b0JBQ04sSUFBSSxFQUFFLENBQUMsSUFBSTtvQkFDWCxLQUFLLEVBQUUsQ0FBQyxJQUFJO2lCQUNmO2dCQUNELFlBQVksRUFBRTtvQkFDVixRQUFRLEVBQUUsU0FBUztvQkFDbkIsSUFBSSxFQUFFLE1BQU07b0JBQ1osS0FBSyxFQUFFLE9BQU87b0JBQ2QsR0FBRyxFQUFFLEtBQUs7aUJBQ2I7YUFDSixDQUFDO1lBRUY7Z0JBR0ksd0JBQVksSUFBSSxFQUFFLEtBQUs7b0JBQ25CLFFBQVEsSUFBSSxDQUFDLFdBQVcsRUFBRSxFQUFFO3dCQUN4QixLQUFLLE1BQU0sQ0FBQyxZQUFZLENBQUMsS0FBSzs0QkFDMUIsSUFBSSxDQUFDLElBQUksR0FBRyxNQUFNLENBQUMsWUFBWSxDQUFDLEtBQUssQ0FBQzs0QkFDdEMsSUFBSSxDQUFDLEtBQUssR0FBRztnQ0FDVCxJQUFJLEVBQUUsS0FBSyxJQUFJLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUU7NkJBQzlDLENBQUM7NEJBQ0YsTUFBTTt3QkFDVixLQUFLLE1BQU0sQ0FBQyxZQUFZLENBQUMsR0FBRzs0QkFDeEIsSUFBSSxDQUFDLElBQUksR0FBRyxNQUFNLENBQUMsWUFBWSxDQUFDLEdBQUcsQ0FBQzs0QkFDcEMsSUFBSSxDQUFDLEtBQUssR0FBRztnQ0FDVCxHQUFHLEVBQUUsS0FBSyxJQUFJLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxH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QyxPQUFPLENBQUMsc0JBQ2pELENBQUM7cUJBQ0w7aUJBQ0o7Z0JBQ0QsSUFBTSxLQUFLLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxPQUFPLENBQUMsQ0FBQztnQkFDOUMsS0FBSyxDQUFDLElBQUksR0FBRyxVQUFVLENBQUM7Z0JBQ3hCLEtBQUssQ0FBQyxXQUFXLENBQUMsUUFBUSxDQUFDLGNBQWMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO2dCQUNuRCxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUM7Z0JBQ3ZDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUdoRCxDQUFDLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvLy88cmVmZXJlbmNlIHBhdGg9XCIuLi9ub2RlX21vZHVsZXMvZ3JhZmFuYS1zZGstbW9ja3MvYXBwL2hlYWRlcnMvY29tbW9uLmQudHNcIiAvPlxyXG5cclxuaW1wb3J0IF8gZnJvbSBcImxvZGFzaFwiO1xyXG5pbXBvcnQgeyBQYW5lbEN0cmwgfSBmcm9tIFwiYXBwL3BsdWdpbnMvc2RrXCI7XHJcblxyXG5jb25zdCBDT05GSUcgPSB7XHJcbiAgICBERUZBVUxUX1RIRU1FX0JHX0lNQUdFOiBgaHR0cHM6Ly9pbWFnZXMudW5zcGxhc2guY29tL3Bob3RvLTE1NTQzMTYyMjQtMGVkMjc1ZmY1NGVhP3c9NzUxJnE9ODBgLFxyXG4gICAgREVGQVVMVF9USEVNRV9OQU1FOiBcIk5ldyBUaGVtZVwiLFxyXG4gICAgRklSU1RfVEhFTUVfTkFNRTogXCJCb29tIFRoZW1lXCIsXHJcbiAgICBUSEVNRV9JRDoge1xyXG4gICAgICAgIERBUks6IC0yMDAwLFxyXG4gICAgICAgIExJR0hUOiAtMzAwMFxyXG4gICAgfSxcclxuICAgIFRIRU1FX1NUWUxFUzoge1xyXG4gICAgICAgIEJHX0lNQUdFOiBcImJnaW1hZ2VcIixcclxuICAgICAgICBOT05FOiBcIm5vbmVcIixcclxuICAgICAgICBTVFlMRTogXCJzdHlsZVwiLFxyXG4gICAgICAgIFVSTDogXCJ1cmxcIixcclxuICAgIH1cclxufTtcclxuXHJcbmNsYXNzIEJvb21UaGVtZVN0eWxlIHtcclxuICAgIHB1YmxpYyB0eXBlOiBzdHJpbmc7XHJcbiAgICBwdWJsaWMgcHJvcHM6IGFueTtcclxuICAgIGNvbnN0cnVjdG9yKHR5cGUsIHByb3BzKSB7XHJcbiAgICAgICAgc3dpdGNoICh0eXBlLnRvTG93ZXJDYXNlKCkpIHtcclxuICAgICAgICAgICAgY2FzZSBDT05GSUcuVEhFTUVfU1RZTEVTLlNUWUxFOlxyXG4gICAgICAgICAgICAgICAgdGhpcy50eXBlID0gQ09ORklHLlRIRU1FX1NUWUxFUy5TVFlMRTtcclxuICAgICAgICAgICAgICAgIHRoaXMucHJvcHMgPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGV4dDogcHJvcHMgJiYgcHJvcHMudGV4dCA/IHByb3BzLnRleHQgOiBcIlwiXHJcbiAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgQ09ORklHLlRIRU1FX1NUWUxFUy5VUkw6XHJcbiAgICAgICAgICAgICAgICB0aGlzLnR5cGUgPSBDT05GSUcuVEhFTUVfU1RZTEVTLlVSTDtcclxuICAgICAgICAgICAgICAgIHRoaXMucHJvcHMgPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdXJsOiBwcm9wcyAmJiBwcm9wcy51cmwgPyBwcm9wcy51cmwgOiBcIlwiXHJcbiAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgQ09ORklHLlRIRU1FX1NUWUxFUy5CR19JTUFHRTpcclxuICAgICAgICAgICAgICAgIHRoaXMudHlwZSA9IENPTkZJRy5USEVNRV9TVFlMRVMuQkdfSU1BR0U7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnByb3BzID0ge1xyXG4gICAgICAgICAgICAgICAgICAgIHVybDogcHJvcHMgJiYgcHJvcHMudXJsID8gcHJvcHMudXJsIDogXCJcIlxyXG4gICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgICAgdGhpcy50eXBlID0gQ09ORklHLlRIRU1FX1NUWUxFUy5OT05FO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5wcm9wcyA9IHt9O1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcblxyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG5cclxuY2xhc3MgQm9vbVRoZW1lIHtcclxuICAgIHB1YmxpYyBuYW1lOiBzdHJpbmc7XHJcbiAgICBwdWJsaWMgc3R5bGVzOiBCb29tVGhlbWVTdHlsZVtdO1xyXG4gICAgY29uc3RydWN0b3Iob3B0aW9ucykge1xyXG4gICAgICAgIHRoaXMubmFtZSA9IG9wdGlvbnMubmFtZSB8fCBDT05GSUcuREVGQVVMVF9USEVNRV9OQU1FO1xyXG4gICAgICAgIHRoaXMuc3R5bGVzID0gb3B0aW9ucy5zdHlsZXMgfHwgW1xyXG4gICAgICAgICAgICBuZXcgQm9vbVRoZW1lU3R5bGUoQ09ORklHLlRIRU1FX1NUWUxFUy5CR19JTUFHRSwgeyB1cmw6IFwiXCIgfSksXHJcbiAgICAgICAgICAgIG5ldyBCb29tVGhlbWVTdHlsZShDT05GSUcuVEhFTUVfU1RZTEVTLlVSTCwgeyB1cmw6IFwiXCIgfSksXHJcbiAgICAgICAgICAgIG5ldyBCb29tVGhlbWVTdHlsZShDT05GSUcuVEhFTUVfU1RZTEVTLlNUWUxFLCB7IHRleHQ6IGBgIH0pLFxyXG4gICAgICAgIF07XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgYWRkU3R5bGUodHlwZTogc3RyaW5nKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5zdHlsZXMucHVzaChuZXcgQm9vbVRoZW1lU3R5bGUodHlwZSwge30pKTtcclxuICAgIH1cclxuICAgIHB1YmxpYyBkZWxldGVTdHlsZShpbmRleDogbnVtYmVyKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5zdHlsZXMuc3BsaWNlKGluZGV4LCAxKTtcclxuICAgIH1cclxuICAgIHB1YmxpYyBnZXRUaGVtZUNvbnRlbnQoKTogc3RyaW5nIHtcclxuICAgICAgICBsZXQgb3V0cHV0ID0gJyc7XHJcbiAgICAgICAgaWYgKHRoaXMuc3R5bGVzICYmIHRoaXMuc3R5bGVzLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgXy5lYWNoKHRoaXMuc3R5bGVzLCBzdHlsZSA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZiAoc3R5bGUudHlwZSA9PT0gXCJ1cmxcIikge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChzdHlsZS5wcm9wcyAmJiBzdHlsZS5wcm9wcy51cmwgIT09IFwiXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgb3V0cHV0ICs9IGBAaW1wb3J0IHVybCgnJHtzdHlsZS5wcm9wcy51cmx9Jyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGA7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoc3R5bGUudHlwZSA9PT0gXCJzdHlsZVwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHN0eWxlLnByb3BzICYmIHN0eWxlLnByb3BzLnRleHQgIT09IFwiXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgb3V0cHV0ICs9IGAke3N0eWxlLnByb3BzLnRleHQgfHwgJyd9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGA7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChzdHlsZS50eXBlID09PSBcImJnaW1hZ2VcIikge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChzdHlsZS5wcm9wcyAmJiBzdHlsZS5wcm9wcy51cmwgIT09IFwiXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgb3V0cHV0ICs9IGBcclxuLm1haW4tdmlldywgLnNpZGVtZW51LW9wZW4gLnNpZGVtZW51LCAubmF2YmFyLCAuZGFzaGJvYXJkLWNvbnRhaW5lciB7XHJcbiAgICBiYWNrZ3JvdW5kOiB1cmwoXCIke3N0eWxlLnByb3BzLnVybH1cIilcclxuICAgIG5vLXJlcGVhdCBjZW50ZXIgY2VudGVyIGZpeGVkO1xyXG4gICAgLXdlYmtpdC1iYWNrZ3JvdW5kLXNpemU6IGNvdmVyO1xyXG4gICAgLW1vei1iYWNrZ3JvdW5kLXNpemU6IGNvdmVyO1xyXG4gICAgLW8tYmFja2dyb3VuZC1zaXplOiBjb3ZlcjtcclxuICAgIGJhY2tncm91bmQtc2l6ZTogY292ZXI7XHJcbn1cclxuICAgICAgICAgICAgICAgICAgICAgICAgYDtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gb3V0cHV0O1xyXG4gICAgfVxyXG59XHJcblxyXG5jbGFzcyBCb29tVGhlbWVDdGwgZXh0ZW5kcyBQYW5lbEN0cmwge1xyXG4gICAgcHVibGljIHN0YXRpYyB0ZW1wbGF0ZVVybCA9IFwicGFydGlhbHMvbW9kdWxlLmh0bWxcIjtcclxuICAgIHB1YmxpYyBzY29wZTogYW55O1xyXG4gICAgcHVibGljIGN0cmw6IGFueTtcclxuICAgIHB1YmxpYyBlbGVtOiBhbnk7XHJcbiAgICBwdWJsaWMgYXR0cnM6IGFueTtcclxuICAgIHB1YmxpYyBhY3RpdmVFZGl0b3JUYWJJbmRleDogbnVtYmVyO1xyXG4gICAgcHVibGljIHJ1bnRpbWVUaGVtZVNldDogQm9vbGVhbjtcclxuICAgIHB1YmxpYyBydW50aW1lVGhlbWVJbmRleDogbnVtYmVyO1xyXG4gICAgY29uc3RydWN0b3IoJHNjb3BlLCAkaW5qZWN0b3IpIHtcclxuICAgICAgICBzdXBlcigkc2NvcGUsICRpbmplY3Rvcik7XHJcbiAgICAgICAgXy5kZWZhdWx0cyh0aGlzLnBhbmVsLCB7fSk7XHJcbiAgICAgICAgdGhpcy5wYW5lbC50cmFuc3BhcmVudCA9IHRydWU7XHJcbiAgICAgICAgdGhpcy5wYW5lbC50aGVtZXMgPSB0aGlzLnBhbmVsLnRoZW1lcyB8fCBbXHJcbiAgICAgICAgICAgIG5ldyBCb29tVGhlbWUoe1xyXG4gICAgICAgICAgICAgICAgbmFtZTogQ09ORklHLkZJUlNUX1RIRU1FX05BTUUsXHJcbiAgICAgICAgICAgICAgICBzdHlsZXM6IFtcclxuICAgICAgICAgICAgICAgICAgICBuZXcgQm9vbVRoZW1lU3R5bGUoQ09ORklHLlRIRU1FX1NUWUxFUy5CR19JTUFHRSwgeyB1cmw6IENPTkZJRy5ERUZBVUxUX1RIRU1FX0JHX0lNQUdFIH0pXHJcbiAgICAgICAgICAgICAgICBdXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgXTtcclxuICAgICAgICB0aGlzLnBhbmVsLmFjdGl2ZVRoZW1lSWQgPSB0aGlzLnBhbmVsLmFjdGl2ZVRoZW1lSWQgfHwgMDtcclxuICAgICAgICB0aGlzLmFjdGl2ZUVkaXRvclRhYkluZGV4ID0gdGhpcy5wYW5lbC5hY3RpdmVUaGVtZUlkID49IDAgPyB0aGlzLnBhbmVsLmFjdGl2ZVRoZW1lSWQgOiAtMTtcclxuICAgICAgICB0aGlzLnJ1bnRpbWVUaGVtZVNldCA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMucnVudGltZVRoZW1lSW5kZXggPSB0aGlzLnBhbmVsLmFjdGl2ZVRoZW1lSWQgPj0gMCA/IHRoaXMucGFuZWwuYWN0aXZlVGhlbWVJZCA6IDA7XHJcbiAgICAgICAgdGhpcy51cGRhdGVQcm90b3R5cGVzKCk7XHJcbiAgICAgICAgdGhpcy5ldmVudHMub24oXCJpbml0LWVkaXQtbW9kZVwiLCB0aGlzLm9uSW5pdEVkaXRNb2RlLmJpbmQodGhpcykpO1xyXG4gICAgfVxyXG4gICAgcHJpdmF0ZSB1cGRhdGVQcm90b3R5cGVzKCk6IHZvaWQge1xyXG4gICAgICAgIGlmICh0aGlzLnBhbmVsLnRoZW1lcyAmJiB0aGlzLnBhbmVsLnRoZW1lcy5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgIHRoaXMucGFuZWwudGhlbWVzLm1hcCh0aGVtZSA9PiB7XHJcbiAgICAgICAgICAgICAgICBPYmplY3Quc2V0UHJvdG90eXBlT2YodGhlbWUsIEJvb21UaGVtZS5wcm90b3R5cGUpO1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoZW1lLnN0eWxlcyAmJiB0aGVtZS5zdHlsZXMubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoZW1lLnN0eWxlcy5tYXAoc3R5bGUgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBPYmplY3Quc2V0UHJvdG90eXBlT2Yoc3R5bGUsIEJvb21UaGVtZVN0eWxlLnByb3RvdHlwZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhlbWU7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHByaXZhdGUgb25Jbml0RWRpdE1vZGUoKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5hZGRFZGl0b3JUYWIoXCJUaGVtZVwiLCBcInB1YmxpYy9wbHVnaW5zL3llc29yZXllcmFtLWJvb210aGVtZS1wYW5lbC9wYXJ0aWFscy9vcHRpb25zLmh0bWxcIiwgMik7XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgYWRkVGhlbWUoKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5wYW5lbC50aGVtZXMgPSB0aGlzLnBhbmVsLnRoZW1lcyB8fCBbXTtcclxuICAgICAgICB0aGlzLnBhbmVsLnRoZW1lcy5wdXNoKG5ldyBCb29tVGhlbWUoe1xyXG4gICAgICAgICAgICBuYW1lOiBgVGhlbWUgJHt0aGlzLnBhbmVsLnRoZW1lcy5sZW5ndGggKyAxfWBcclxuICAgICAgICB9KSk7XHJcbiAgICAgICAgdGhpcy5hY3RpdmVFZGl0b3JUYWJJbmRleCA9IHRoaXMucGFuZWwudGhlbWVzLmxlbmd0aCAtIDE7XHJcbiAgICAgICAgdGhpcy5ydW50aW1lVGhlbWVJbmRleCA9IHRoaXMucGFuZWwudGhlbWVzLmxlbmd0aCAtIDE7XHJcbiAgICAgICAgdGhpcy5yZW5kZXIoKTtcclxuICAgIH1cclxuICAgIHB1YmxpYyBkZWxldGVUaGVtZShpbmRleDogbnVtYmVyKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5wYW5lbC50aGVtZXMuc3BsaWNlKGluZGV4LCAxKTtcclxuICAgICAgICBpZiAodGhpcy5wYW5lbC5hY3RpdmVUaGVtZUlkID09PSBpbmRleCkge1xyXG4gICAgICAgICAgICB0aGlzLnBhbmVsLmFjdGl2ZVRoZW1lSWQgPSAwO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAodGhpcy5ydW50aW1lVGhlbWVJbmRleCA9PT0gaW5kZXgpIHtcclxuICAgICAgICAgICAgdGhpcy5ydW50aW1lVGhlbWVJbmRleCA9IDA7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh0aGlzLmFjdGl2ZUVkaXRvclRhYkluZGV4ID09PSBpbmRleCkge1xyXG4gICAgICAgICAgICB0aGlzLmFjdGl2ZUVkaXRvclRhYkluZGV4ID0gdGhpcy5jdHJsLnBhbmVsLnRoZW1lcy5sZW5ndGggLSAxO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHB1YmxpYyBzZXRUaGVtZUFzRGVmYXVsdChpbmRleDogbnVtYmVyKSB7XHJcbiAgICAgICAgdGhpcy5jdHJsLnBhbmVsLmFjdGl2ZVRoZW1lSWQgPSBpbmRleDtcclxuICAgICAgICB0aGlzLnJ1bnRpbWVUaGVtZUluZGV4ID0gaW5kZXg7XHJcbiAgICAgICAgdGhpcy5yZW5kZXIoKTtcclxuICAgIH1cclxuICAgIHB1YmxpYyBzZXRydW50aW1lVGhlbWVJbmRleChpbmRleDogbnVtYmVyKSB7XHJcbiAgICAgICAgdGhpcy5ydW50aW1lVGhlbWVTZXQgPSB0cnVlO1xyXG4gICAgICAgIHRoaXMucnVudGltZVRoZW1lSW5kZXggPSBpbmRleDtcclxuICAgICAgICB0aGlzLnJlbmRlcigpO1xyXG4gICAgfVxyXG4gICAgcHVibGljIGxpbWl0VGV4dCh0ZXh0OiBzdHJpbmcsIG1heGxlbmd0aDogTnVtYmVyKTogc3RyaW5nIHtcclxuICAgICAgICBpZiAodGV4dC5zcGxpdChcIlwiKS5sZW5ndGggPiBtYXhsZW5ndGgpIHtcclxuICAgICAgICAgICAgdGV4dCA9IHRleHQuc3Vic3RyaW5nKDAsIE51bWJlcihtYXhsZW5ndGgpIC0gMykgKyBcIi4uLlwiO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdGV4dDtcclxuICAgIH1cclxuICAgIHB1YmxpYyBsaW5rKHNjb3BlOiBhbnksIGVsZW06IGFueSwgYXR0cnM6IGFueSwgY3RybDogYW55KTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5zY29wZSA9IHNjb3BlO1xyXG4gICAgICAgIHRoaXMuZWxlbSA9IGVsZW07XHJcbiAgICAgICAgdGhpcy5hdHRycyA9IGF0dHJzO1xyXG4gICAgICAgIHRoaXMuY3RybCA9IGN0cmw7XHJcbiAgICAgICAgdGhpcy5yZW5kZXIoKTtcclxuICAgIH1cclxufVxyXG5cclxubGV0IGdldFRoZW1lQ1NTRmlsZSA9IGZ1bmN0aW9uIChtb2RlOiBzdHJpbmcpOiBzdHJpbmcge1xyXG4gICAgbGV0IGZpbGVuYW1lID0gJyc7XHJcbiAgICBpZiAoW1wiZGFya1wiLCBcImxpZ2h0XCJdLmluZGV4T2YobW9kZS50b0xvd2VyQ2FzZSgpKSA+IC0xICYmIHdpbmRvdy5wZXJmb3JtYW5jZSkge1xyXG4gICAgICAgIGxldCBhcHBmaWxlcyA9IHdpbmRvdy5wZXJmb3JtYW5jZS5nZXRFbnRyaWVzKCkubWFwKGUgPT4gZS5uYW1lKS5maWx0ZXIoZSA9PiBlLmVuZHNXaXRoKFwiLmpzXCIpKS5maWx0ZXIoZSA9PiBlLmluZGV4T2YoXCIvcHVibGljL2J1aWxkL2FwcC5cIikgPiAtMSk7XHJcbiAgICAgICAgaWYgKGFwcGZpbGVzICYmIGFwcGZpbGVzLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgZmlsZW5hbWUgPSBhcHBmaWxlc1swXS5yZXBsYWNlKGAvcHVibGljL2J1aWxkL2FwcC5gLCBgL3B1YmxpYy9idWlsZC9ncmFmYW5hLiR7bW9kZS50b0xvd2VyQ2FzZSgpfS5gKS5zbGljZSgwLCAtMykgKyBcIi5jc3NcIjtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gZmlsZW5hbWU7XHJcbn07XHJcblxyXG5Cb29tVGhlbWVDdGwucHJvdG90eXBlLnJlbmRlciA9IGZ1bmN0aW9uICgpIHtcclxuXHJcbiAgICAvLyAjcmVnaW9uIFBhbmVsIFVJIE9wdGlvbnNcclxuICAgIGlmICh0aGlzLmN0cmwucGFuZWwudGl0bGUgPT09IFwiUGFuZWwgVGl0bGVcIikge1xyXG4gICAgICAgIHRoaXMuY3RybC5wYW5lbC50aXRsZSA9IFwiXCI7XHJcbiAgICB9XHJcbiAgICBpZiAodGhpcy5jdHJsLnBhbmVsLmdyaWRQb3MgJiYgdGhpcy5jdHJsLnBhbmVsLmdyaWRQb3MueCA9PT0gMCAmJiB0aGlzLmN0cmwucGFuZWwuZ3JpZFBvcy55ID09PSAwKSB7XHJcbiAgICAgICAgdGhpcy5jdHJsLnBhbmVsLmdyaWRQb3MudyA9IDI0O1xyXG4gICAgICAgIHRoaXMuY3RybC5wYW5lbC5ncmlkUG9zLmggPSAzO1xyXG4gICAgfVxyXG4gICAgLy8gI2VuZHJlZ2lvblxyXG5cclxuICAgIC8vICNyZWdpb24gVGhlbWVzIFJlbmRlcmluZ1xyXG4gICAgbGV0IG91dHB1dCA9ICcnO1xyXG4gICAgXy5lYWNoKHRoaXMucGFuZWwudGhlbWVzLCAodGhlbWUsIGluZGV4KSA9PiB7XHJcbiAgICAgICAgaWYgKHRoaXMucnVudGltZVRoZW1lU2V0ID09PSBmYWxzZSkge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5wYW5lbC5hY3RpdmVUaGVtZUlkID09PSBpbmRleCAmJiB0aGlzLnBhbmVsLmFjdGl2ZVRoZW1lSWQgPj0gMCkge1xyXG4gICAgICAgICAgICAgICAgb3V0cHV0ICs9IHRoZW1lLmdldFRoZW1lQ29udGVudCgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMucnVudGltZVRoZW1lSW5kZXggPT09IGluZGV4ICYmIHRoaXMucnVudGltZVRoZW1lSW5kZXggPj0gMCkge1xyXG4gICAgICAgICAgICAgICAgb3V0cHV0ICs9IHRoZW1lLmdldFRoZW1lQ29udGVudCgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcbiAgICBpZiAodGhpcy5ydW50aW1lVGhlbWVTZXQgPT09IHRydWUpIHtcclxuICAgICAgICBpZiAodGhpcy5ydW50aW1lVGhlbWVJbmRleCA9PT0gQ09ORklHLlRIRU1FX0lELkRBUkspIHtcclxuICAgICAgICAgICAgb3V0cHV0ICs9IGBAaW1wb3J0IHVybCgnJHtnZXRUaGVtZUNTU0ZpbGUoXCJkYXJrXCIpfScpO1xyXG4gICAgICAgICAgICBgO1xyXG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy5ydW50aW1lVGhlbWVJbmRleCA9PT0gQ09ORklHLlRIRU1FX0lELkxJR0hUKSB7XHJcbiAgICAgICAgICAgIG91dHB1dCArPSBgQGltcG9ydCB1cmwoJyR7Z2V0VGhlbWVDU1NGaWxlKFwibGlnaHRcIil9Jyk7XHJcbiAgICAgICAgICAgIGA7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgY29uc3Qgc3R5bGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzdHlsZScpO1xyXG4gICAgc3R5bGUudHlwZSA9ICd0ZXh0L2Nzcyc7XHJcbiAgICBzdHlsZS5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShvdXRwdXQpKTtcclxuICAgIHRoaXMuZWxlbS5maW5kKFwiI2Jvb20tdGhlbWVcIikuaHRtbChcIlwiKTtcclxuICAgIHRoaXMuZWxlbS5maW5kKFwiI2Jvb20tdGhlbWVcIikuYXBwZW5kKHN0eWxlKTtcclxuICAgIC8vICNlbmRyZWdpb25cclxuXHJcbn07XHJcblxyXG5leHBvcnQgeyBCb29tVGhlbWVDdGwgYXMgUGFuZWxDdHJsIH07XHJcbiJdfQ==