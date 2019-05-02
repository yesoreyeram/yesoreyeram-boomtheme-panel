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
                DEFAULT_THEME_BG_IMAGE: "https://images.unsplash.com/photo-1534796636912-3b95b3ab5986",
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL21vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7WUFLTSxNQUFNLEdBQUc7Z0JBQ1gsc0JBQXNCLEVBQUUsOERBQThEO2dCQUN0RixrQkFBa0IsRUFBRSxXQUFXO2dCQUMvQixnQkFBZ0IsRUFBRSxZQUFZO2dCQUM5QixRQUFRLEVBQUU7b0JBQ04sSUFBSSxFQUFFLENBQUMsSUFBSTtvQkFDWCxLQUFLLEVBQUUsQ0FBQyxJQUFJO2lCQUNmO2dCQUNELFlBQVksRUFBRTtvQkFDVixRQUFRLEVBQUUsU0FBUztvQkFDbkIsSUFBSSxFQUFFLE1BQU07b0JBQ1osS0FBSyxFQUFFLE9BQU87b0JBQ2QsR0FBRyxFQUFFLEtBQUs7aUJBQ2I7YUFDSixDQUFDO1lBRUY7Z0JBR0ksd0JBQVksSUFBSSxFQUFFLEtBQUs7b0JBQ25CLFFBQVEsSUFBSSxDQUFDLFdBQVcsRUFBRSxFQUFFO3dCQUN4QixLQUFLLE1BQU0sQ0FBQyxZQUFZLENBQUMsS0FBSzs0QkFDMUIsSUFBSSxDQUFDLElBQUksR0FBRyxNQUFNLENBQUMsWUFBWSxDQUFDLEtBQUssQ0FBQzs0QkFDdEMsSUFBSSxDQUFDLEtBQUssR0FBRztnQ0FDVCxJQUFJLEVBQUUsS0FBSyxJQUFJLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUU7NkJBQzlDLENBQUM7NEJBQ0YsTUFBTTt3QkFDVixLQUFLLE1BQU0sQ0FBQyxZQUFZLENBQUMsR0FBRzs0QkFDeEIsSUFBSSxDQUFDLElBQUksR0FBRyxNQUFNLENBQUMsWUFBWSxDQUFDLEdBQUcsQ0FBQzs0QkFDcEMsSUFBSSxDQUFDLEtBQUssR0FBRztnQ0FDVCxHQUFHLEVBQUUsS0FBSyxJQUFJLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxH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QyxPQUFPLENBQUMsc0JBQ2pELENBQUM7cUJBQ0w7aUJBQ0o7Z0JBQ0QsSUFBTSxLQUFLLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxPQUFPLENBQUMsQ0FBQztnQkFDOUMsS0FBSyxDQUFDLElBQUksR0FBRyxVQUFVLENBQUM7Z0JBQ3hCLEtBQUssQ0FBQyxXQUFXLENBQUMsUUFBUSxDQUFDLGNBQWMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO2dCQUNuRCxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUM7Z0JBQ3ZDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUdoRCxDQUFDLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvLy88cmVmZXJlbmNlIHBhdGg9XCIuLi9ub2RlX21vZHVsZXMvZ3JhZmFuYS1zZGstbW9ja3MvYXBwL2hlYWRlcnMvY29tbW9uLmQudHNcIiAvPlxyXG5cclxuaW1wb3J0IF8gZnJvbSBcImxvZGFzaFwiO1xyXG5pbXBvcnQgeyBQYW5lbEN0cmwgfSBmcm9tIFwiYXBwL3BsdWdpbnMvc2RrXCI7XHJcblxyXG5jb25zdCBDT05GSUcgPSB7XHJcbiAgICBERUZBVUxUX1RIRU1FX0JHX0lNQUdFOiBgaHR0cHM6Ly9pbWFnZXMudW5zcGxhc2guY29tL3Bob3RvLTE1MzQ3OTY2MzY5MTItM2I5NWIzYWI1OTg2YCxcclxuICAgIERFRkFVTFRfVEhFTUVfTkFNRTogXCJOZXcgVGhlbWVcIixcclxuICAgIEZJUlNUX1RIRU1FX05BTUU6IFwiQm9vbSBUaGVtZVwiLFxyXG4gICAgVEhFTUVfSUQ6IHtcclxuICAgICAgICBEQVJLOiAtMjAwMCxcclxuICAgICAgICBMSUdIVDogLTMwMDBcclxuICAgIH0sXHJcbiAgICBUSEVNRV9TVFlMRVM6IHtcclxuICAgICAgICBCR19JTUFHRTogXCJiZ2ltYWdlXCIsXHJcbiAgICAgICAgTk9ORTogXCJub25lXCIsXHJcbiAgICAgICAgU1RZTEU6IFwic3R5bGVcIixcclxuICAgICAgICBVUkw6IFwidXJsXCIsXHJcbiAgICB9XHJcbn07XHJcblxyXG5jbGFzcyBCb29tVGhlbWVTdHlsZSB7XHJcbiAgICBwdWJsaWMgdHlwZTogc3RyaW5nO1xyXG4gICAgcHVibGljIHByb3BzOiBhbnk7XHJcbiAgICBjb25zdHJ1Y3Rvcih0eXBlLCBwcm9wcykge1xyXG4gICAgICAgIHN3aXRjaCAodHlwZS50b0xvd2VyQ2FzZSgpKSB7XHJcbiAgICAgICAgICAgIGNhc2UgQ09ORklHLlRIRU1FX1NUWUxFUy5TVFlMRTpcclxuICAgICAgICAgICAgICAgIHRoaXMudHlwZSA9IENPTkZJRy5USEVNRV9TVFlMRVMuU1RZTEU7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnByb3BzID0ge1xyXG4gICAgICAgICAgICAgICAgICAgIHRleHQ6IHByb3BzICYmIHByb3BzLnRleHQgPyBwcm9wcy50ZXh0IDogXCJcIlxyXG4gICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIENPTkZJRy5USEVNRV9TVFlMRVMuVVJMOlxyXG4gICAgICAgICAgICAgICAgdGhpcy50eXBlID0gQ09ORklHLlRIRU1FX1NUWUxFUy5VUkw7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnByb3BzID0ge1xyXG4gICAgICAgICAgICAgICAgICAgIHVybDogcHJvcHMgJiYgcHJvcHMudXJsID8gcHJvcHMudXJsIDogXCJcIlxyXG4gICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIENPTkZJRy5USEVNRV9TVFlMRVMuQkdfSU1BR0U6XHJcbiAgICAgICAgICAgICAgICB0aGlzLnR5cGUgPSBDT05GSUcuVEhFTUVfU1RZTEVTLkJHX0lNQUdFO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5wcm9wcyA9IHtcclxuICAgICAgICAgICAgICAgICAgICB1cmw6IHByb3BzICYmIHByb3BzLnVybCA/IHByb3BzLnVybCA6IFwiXCJcclxuICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgICAgIHRoaXMudHlwZSA9IENPTkZJRy5USEVNRV9TVFlMRVMuTk9ORTtcclxuICAgICAgICAgICAgICAgIHRoaXMucHJvcHMgPSB7fTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG5cclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuXHJcbmNsYXNzIEJvb21UaGVtZSB7XHJcbiAgICBwdWJsaWMgbmFtZTogc3RyaW5nO1xyXG4gICAgcHVibGljIHN0eWxlczogQm9vbVRoZW1lU3R5bGVbXTtcclxuICAgIGNvbnN0cnVjdG9yKG9wdGlvbnMpIHtcclxuICAgICAgICB0aGlzLm5hbWUgPSBvcHRpb25zLm5hbWUgfHwgQ09ORklHLkRFRkFVTFRfVEhFTUVfTkFNRTtcclxuICAgICAgICB0aGlzLnN0eWxlcyA9IG9wdGlvbnMuc3R5bGVzIHx8IFtcclxuICAgICAgICAgICAgbmV3IEJvb21UaGVtZVN0eWxlKENPTkZJRy5USEVNRV9TVFlMRVMuQkdfSU1BR0UsIHsgdXJsOiBcIlwiIH0pLFxyXG4gICAgICAgICAgICBuZXcgQm9vbVRoZW1lU3R5bGUoQ09ORklHLlRIRU1FX1NUWUxFUy5VUkwsIHsgdXJsOiBcIlwiIH0pLFxyXG4gICAgICAgICAgICBuZXcgQm9vbVRoZW1lU3R5bGUoQ09ORklHLlRIRU1FX1NUWUxFUy5TVFlMRSwgeyB0ZXh0OiBgYCB9KSxcclxuICAgICAgICBdO1xyXG4gICAgfVxyXG4gICAgcHVibGljIGFkZFN0eWxlKHR5cGU6IHN0cmluZyk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuc3R5bGVzLnB1c2gobmV3IEJvb21UaGVtZVN0eWxlKHR5cGUsIHt9KSk7XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgZGVsZXRlU3R5bGUoaW5kZXg6IG51bWJlcik6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuc3R5bGVzLnNwbGljZShpbmRleCwgMSk7XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgZ2V0VGhlbWVDb250ZW50KCk6IHN0cmluZyB7XHJcbiAgICAgICAgbGV0IG91dHB1dCA9ICcnO1xyXG4gICAgICAgIGlmICh0aGlzLnN0eWxlcyAmJiB0aGlzLnN0eWxlcy5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgIF8uZWFjaCh0aGlzLnN0eWxlcywgc3R5bGUgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKHN0eWxlLnR5cGUgPT09IFwidXJsXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoc3R5bGUucHJvcHMgJiYgc3R5bGUucHJvcHMudXJsICE9PSBcIlwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG91dHB1dCArPSBgQGltcG9ydCB1cmwoJyR7c3R5bGUucHJvcHMudXJsfScpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBgO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHN0eWxlLnR5cGUgPT09IFwic3R5bGVcIikge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChzdHlsZS5wcm9wcyAmJiBzdHlsZS5wcm9wcy50ZXh0ICE9PSBcIlwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG91dHB1dCArPSBgJHtzdHlsZS5wcm9wcy50ZXh0IHx8ICcnfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBgO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoc3R5bGUudHlwZSA9PT0gXCJiZ2ltYWdlXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoc3R5bGUucHJvcHMgJiYgc3R5bGUucHJvcHMudXJsICE9PSBcIlwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG91dHB1dCArPSBgXHJcbi5tYWluLXZpZXcsIC5zaWRlbWVudS1vcGVuIC5zaWRlbWVudSwgLm5hdmJhciwgLmRhc2hib2FyZC1jb250YWluZXIge1xyXG4gICAgYmFja2dyb3VuZDogdXJsKFwiJHtzdHlsZS5wcm9wcy51cmx9XCIpXHJcbiAgICBuby1yZXBlYXQgY2VudGVyIGNlbnRlciBmaXhlZDtcclxuICAgIC13ZWJraXQtYmFja2dyb3VuZC1zaXplOiBjb3ZlcjtcclxuICAgIC1tb3otYmFja2dyb3VuZC1zaXplOiBjb3ZlcjtcclxuICAgIC1vLWJhY2tncm91bmQtc2l6ZTogY292ZXI7XHJcbiAgICBiYWNrZ3JvdW5kLXNpemU6IGNvdmVyO1xyXG59XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGA7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIG91dHB1dDtcclxuICAgIH1cclxufVxyXG5cclxuY2xhc3MgQm9vbVRoZW1lQ3RsIGV4dGVuZHMgUGFuZWxDdHJsIHtcclxuICAgIHB1YmxpYyBzdGF0aWMgdGVtcGxhdGVVcmwgPSBcInBhcnRpYWxzL21vZHVsZS5odG1sXCI7XHJcbiAgICBwdWJsaWMgc2NvcGU6IGFueTtcclxuICAgIHB1YmxpYyBjdHJsOiBhbnk7XHJcbiAgICBwdWJsaWMgZWxlbTogYW55O1xyXG4gICAgcHVibGljIGF0dHJzOiBhbnk7XHJcbiAgICBwdWJsaWMgYWN0aXZlRWRpdG9yVGFiSW5kZXg6IG51bWJlcjtcclxuICAgIHB1YmxpYyBydW50aW1lVGhlbWVTZXQ6IEJvb2xlYW47XHJcbiAgICBwdWJsaWMgcnVudGltZVRoZW1lSW5kZXg6IG51bWJlcjtcclxuICAgIGNvbnN0cnVjdG9yKCRzY29wZSwgJGluamVjdG9yKSB7XHJcbiAgICAgICAgc3VwZXIoJHNjb3BlLCAkaW5qZWN0b3IpO1xyXG4gICAgICAgIF8uZGVmYXVsdHModGhpcy5wYW5lbCwge30pO1xyXG4gICAgICAgIHRoaXMucGFuZWwudHJhbnNwYXJlbnQgPSB0cnVlO1xyXG4gICAgICAgIHRoaXMucGFuZWwudGhlbWVzID0gdGhpcy5wYW5lbC50aGVtZXMgfHwgW1xyXG4gICAgICAgICAgICBuZXcgQm9vbVRoZW1lKHtcclxuICAgICAgICAgICAgICAgIG5hbWU6IENPTkZJRy5GSVJTVF9USEVNRV9OQU1FLFxyXG4gICAgICAgICAgICAgICAgc3R5bGVzOiBbXHJcbiAgICAgICAgICAgICAgICAgICAgbmV3IEJvb21UaGVtZVN0eWxlKENPTkZJRy5USEVNRV9TVFlMRVMuQkdfSU1BR0UsIHsgdXJsOiBDT05GSUcuREVGQVVMVF9USEVNRV9CR19JTUFHRSB9KVxyXG4gICAgICAgICAgICAgICAgXVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgIF07XHJcbiAgICAgICAgdGhpcy5wYW5lbC5hY3RpdmVUaGVtZUlkID0gdGhpcy5wYW5lbC5hY3RpdmVUaGVtZUlkIHx8IDA7XHJcbiAgICAgICAgdGhpcy5hY3RpdmVFZGl0b3JUYWJJbmRleCA9IHRoaXMucGFuZWwuYWN0aXZlVGhlbWVJZCA+PSAwID8gdGhpcy5wYW5lbC5hY3RpdmVUaGVtZUlkIDogLTE7XHJcbiAgICAgICAgdGhpcy5ydW50aW1lVGhlbWVTZXQgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLnJ1bnRpbWVUaGVtZUluZGV4ID0gdGhpcy5wYW5lbC5hY3RpdmVUaGVtZUlkID49IDAgPyB0aGlzLnBhbmVsLmFjdGl2ZVRoZW1lSWQgOiAwO1xyXG4gICAgICAgIHRoaXMudXBkYXRlUHJvdG90eXBlcygpO1xyXG4gICAgICAgIHRoaXMuZXZlbnRzLm9uKFwiaW5pdC1lZGl0LW1vZGVcIiwgdGhpcy5vbkluaXRFZGl0TW9kZS5iaW5kKHRoaXMpKTtcclxuICAgIH1cclxuICAgIHByaXZhdGUgdXBkYXRlUHJvdG90eXBlcygpOiB2b2lkIHtcclxuICAgICAgICBpZiAodGhpcy5wYW5lbC50aGVtZXMgJiYgdGhpcy5wYW5lbC50aGVtZXMubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICB0aGlzLnBhbmVsLnRoZW1lcy5tYXAodGhlbWUgPT4ge1xyXG4gICAgICAgICAgICAgICAgT2JqZWN0LnNldFByb3RvdHlwZU9mKHRoZW1lLCBCb29tVGhlbWUucHJvdG90eXBlKTtcclxuICAgICAgICAgICAgICAgIGlmICh0aGVtZS5zdHlsZXMgJiYgdGhlbWUuc3R5bGVzLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGVtZS5zdHlsZXMubWFwKHN0eWxlID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgT2JqZWN0LnNldFByb3RvdHlwZU9mKHN0eWxlLCBCb29tVGhlbWVTdHlsZS5wcm90b3R5cGUpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoZW1lO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBwcml2YXRlIG9uSW5pdEVkaXRNb2RlKCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuYWRkRWRpdG9yVGFiKFwiVGhlbWVcIiwgXCJwdWJsaWMvcGx1Z2lucy95ZXNvcmV5ZXJhbS1ib29tdGhlbWUtcGFuZWwvcGFydGlhbHMvb3B0aW9ucy5odG1sXCIsIDIpO1xyXG4gICAgfVxyXG4gICAgcHVibGljIGFkZFRoZW1lKCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMucGFuZWwudGhlbWVzID0gdGhpcy5wYW5lbC50aGVtZXMgfHwgW107XHJcbiAgICAgICAgdGhpcy5wYW5lbC50aGVtZXMucHVzaChuZXcgQm9vbVRoZW1lKHtcclxuICAgICAgICAgICAgbmFtZTogYFRoZW1lICR7dGhpcy5wYW5lbC50aGVtZXMubGVuZ3RoICsgMX1gXHJcbiAgICAgICAgfSkpO1xyXG4gICAgICAgIHRoaXMuYWN0aXZlRWRpdG9yVGFiSW5kZXggPSB0aGlzLnBhbmVsLnRoZW1lcy5sZW5ndGggLSAxO1xyXG4gICAgICAgIHRoaXMucnVudGltZVRoZW1lSW5kZXggPSB0aGlzLnBhbmVsLnRoZW1lcy5sZW5ndGggLSAxO1xyXG4gICAgICAgIHRoaXMucmVuZGVyKCk7XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgZGVsZXRlVGhlbWUoaW5kZXg6IG51bWJlcik6IHZvaWQge1xyXG4gICAgICAgIHRoaXMucGFuZWwudGhlbWVzLnNwbGljZShpbmRleCwgMSk7XHJcbiAgICAgICAgaWYgKHRoaXMucGFuZWwuYWN0aXZlVGhlbWVJZCA9PT0gaW5kZXgpIHtcclxuICAgICAgICAgICAgdGhpcy5wYW5lbC5hY3RpdmVUaGVtZUlkID0gMDtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHRoaXMucnVudGltZVRoZW1lSW5kZXggPT09IGluZGV4KSB7XHJcbiAgICAgICAgICAgIHRoaXMucnVudGltZVRoZW1lSW5kZXggPSAwO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAodGhpcy5hY3RpdmVFZGl0b3JUYWJJbmRleCA9PT0gaW5kZXgpIHtcclxuICAgICAgICAgICAgdGhpcy5hY3RpdmVFZGl0b3JUYWJJbmRleCA9IHRoaXMuY3RybC5wYW5lbC50aGVtZXMubGVuZ3RoIC0gMTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgc2V0VGhlbWVBc0RlZmF1bHQoaW5kZXg6IG51bWJlcikge1xyXG4gICAgICAgIHRoaXMuY3RybC5wYW5lbC5hY3RpdmVUaGVtZUlkID0gaW5kZXg7XHJcbiAgICAgICAgdGhpcy5ydW50aW1lVGhlbWVJbmRleCA9IGluZGV4O1xyXG4gICAgICAgIHRoaXMucmVuZGVyKCk7XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgc2V0cnVudGltZVRoZW1lSW5kZXgoaW5kZXg6IG51bWJlcikge1xyXG4gICAgICAgIHRoaXMucnVudGltZVRoZW1lU2V0ID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLnJ1bnRpbWVUaGVtZUluZGV4ID0gaW5kZXg7XHJcbiAgICAgICAgdGhpcy5yZW5kZXIoKTtcclxuICAgIH1cclxuICAgIHB1YmxpYyBsaW1pdFRleHQodGV4dDogc3RyaW5nLCBtYXhsZW5ndGg6IE51bWJlcik6IHN0cmluZyB7XHJcbiAgICAgICAgaWYgKHRleHQuc3BsaXQoXCJcIikubGVuZ3RoID4gbWF4bGVuZ3RoKSB7XHJcbiAgICAgICAgICAgIHRleHQgPSB0ZXh0LnN1YnN0cmluZygwLCBOdW1iZXIobWF4bGVuZ3RoKSAtIDMpICsgXCIuLi5cIjtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHRleHQ7XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgbGluayhzY29wZTogYW55LCBlbGVtOiBhbnksIGF0dHJzOiBhbnksIGN0cmw6IGFueSk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuc2NvcGUgPSBzY29wZTtcclxuICAgICAgICB0aGlzLmVsZW0gPSBlbGVtO1xyXG4gICAgICAgIHRoaXMuYXR0cnMgPSBhdHRycztcclxuICAgICAgICB0aGlzLmN0cmwgPSBjdHJsO1xyXG4gICAgICAgIHRoaXMucmVuZGVyKCk7XHJcbiAgICB9XHJcbn1cclxuXHJcbmxldCBnZXRUaGVtZUNTU0ZpbGUgPSBmdW5jdGlvbiAobW9kZTogc3RyaW5nKTogc3RyaW5nIHtcclxuICAgIGxldCBmaWxlbmFtZSA9ICcnO1xyXG4gICAgaWYgKFtcImRhcmtcIiwgXCJsaWdodFwiXS5pbmRleE9mKG1vZGUudG9Mb3dlckNhc2UoKSkgPiAtMSAmJiB3aW5kb3cucGVyZm9ybWFuY2UpIHtcclxuICAgICAgICBsZXQgYXBwZmlsZXMgPSB3aW5kb3cucGVyZm9ybWFuY2UuZ2V0RW50cmllcygpLm1hcChlID0+IGUubmFtZSkuZmlsdGVyKGUgPT4gZS5lbmRzV2l0aChcIi5qc1wiKSkuZmlsdGVyKGUgPT4gZS5pbmRleE9mKFwiL3B1YmxpYy9idWlsZC9hcHAuXCIpID4gLTEpO1xyXG4gICAgICAgIGlmIChhcHBmaWxlcyAmJiBhcHBmaWxlcy5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgIGZpbGVuYW1lID0gYXBwZmlsZXNbMF0ucmVwbGFjZShgL3B1YmxpYy9idWlsZC9hcHAuYCwgYC9wdWJsaWMvYnVpbGQvZ3JhZmFuYS4ke21vZGUudG9Mb3dlckNhc2UoKX0uYCkuc2xpY2UoMCwgLTMpICsgXCIuY3NzXCI7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIGZpbGVuYW1lO1xyXG59O1xyXG5cclxuQm9vbVRoZW1lQ3RsLnByb3RvdHlwZS5yZW5kZXIgPSBmdW5jdGlvbiAoKSB7XHJcblxyXG4gICAgLy8gI3JlZ2lvbiBQYW5lbCBVSSBPcHRpb25zXHJcbiAgICBpZiAodGhpcy5jdHJsLnBhbmVsLnRpdGxlID09PSBcIlBhbmVsIFRpdGxlXCIpIHtcclxuICAgICAgICB0aGlzLmN0cmwucGFuZWwudGl0bGUgPSBcIlwiO1xyXG4gICAgfVxyXG4gICAgaWYgKHRoaXMuY3RybC5wYW5lbC5ncmlkUG9zICYmIHRoaXMuY3RybC5wYW5lbC5ncmlkUG9zLnggPT09IDAgJiYgdGhpcy5jdHJsLnBhbmVsLmdyaWRQb3MueSA9PT0gMCkge1xyXG4gICAgICAgIHRoaXMuY3RybC5wYW5lbC5ncmlkUG9zLncgPSAyNDtcclxuICAgICAgICB0aGlzLmN0cmwucGFuZWwuZ3JpZFBvcy5oID0gMztcclxuICAgIH1cclxuICAgIC8vICNlbmRyZWdpb25cclxuXHJcbiAgICAvLyAjcmVnaW9uIFRoZW1lcyBSZW5kZXJpbmdcclxuICAgIGxldCBvdXRwdXQgPSAnJztcclxuICAgIF8uZWFjaCh0aGlzLnBhbmVsLnRoZW1lcywgKHRoZW1lLCBpbmRleCkgPT4ge1xyXG4gICAgICAgIGlmICh0aGlzLnJ1bnRpbWVUaGVtZVNldCA9PT0gZmFsc2UpIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMucGFuZWwuYWN0aXZlVGhlbWVJZCA9PT0gaW5kZXggJiYgdGhpcy5wYW5lbC5hY3RpdmVUaGVtZUlkID49IDApIHtcclxuICAgICAgICAgICAgICAgIG91dHB1dCArPSB0aGVtZS5nZXRUaGVtZUNvbnRlbnQoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLnJ1bnRpbWVUaGVtZUluZGV4ID09PSBpbmRleCAmJiB0aGlzLnJ1bnRpbWVUaGVtZUluZGV4ID49IDApIHtcclxuICAgICAgICAgICAgICAgIG91dHB1dCArPSB0aGVtZS5nZXRUaGVtZUNvbnRlbnQoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG4gICAgaWYgKHRoaXMucnVudGltZVRoZW1lU2V0ID09PSB0cnVlKSB7XHJcbiAgICAgICAgaWYgKHRoaXMucnVudGltZVRoZW1lSW5kZXggPT09IENPTkZJRy5USEVNRV9JRC5EQVJLKSB7XHJcbiAgICAgICAgICAgIG91dHB1dCArPSBgQGltcG9ydCB1cmwoJyR7Z2V0VGhlbWVDU1NGaWxlKFwiZGFya1wiKX0nKTtcclxuICAgICAgICAgICAgYDtcclxuICAgICAgICB9IGVsc2UgaWYgKHRoaXMucnVudGltZVRoZW1lSW5kZXggPT09IENPTkZJRy5USEVNRV9JRC5MSUdIVCkge1xyXG4gICAgICAgICAgICBvdXRwdXQgKz0gYEBpbXBvcnQgdXJsKCcke2dldFRoZW1lQ1NTRmlsZShcImxpZ2h0XCIpfScpO1xyXG4gICAgICAgICAgICBgO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIGNvbnN0IHN0eWxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3R5bGUnKTtcclxuICAgIHN0eWxlLnR5cGUgPSAndGV4dC9jc3MnO1xyXG4gICAgc3R5bGUuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUob3V0cHV0KSk7XHJcbiAgICB0aGlzLmVsZW0uZmluZChcIiNib29tLXRoZW1lXCIpLmh0bWwoXCJcIik7XHJcbiAgICB0aGlzLmVsZW0uZmluZChcIiNib29tLXRoZW1lXCIpLmFwcGVuZChzdHlsZSk7XHJcbiAgICAvLyAjZW5kcmVnaW9uXHJcblxyXG59O1xyXG5cclxuZXhwb3J0IHsgQm9vbVRoZW1lQ3RsIGFzIFBhbmVsQ3RybCB9O1xyXG4iXX0=