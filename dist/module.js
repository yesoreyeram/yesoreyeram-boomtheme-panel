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
                BASE_THEMES: {
                    DARK: {
                        id: "dark",
                        index_id: -2000,
                        name: "Dark Theme"
                    },
                    DEFAULT: {
                        id: "default",
                        index_id: -1000,
                        name: "Default Theme"
                    },
                    LIGHT: {
                        id: "light",
                        index_id: -3000,
                        name: "Light Theme"
                    }
                },
                DEFAULT_THEME_BG_IMAGE: "https://images.unsplash.com/photo-1524334228333-0f6db392f8a1",
                DEFAULT_THEME_NAME: "New Theme",
                DEFAULT_THEME_STYLE: ".panel-container {\n    background-color: rgba(0,0,0,0.3);\n}",
                FIRST_THEME_NAME: "Night Theme",
                THEME_STYLES: {
                    BASE_THEME: "basetheme",
                    BG_IMAGE: "bgimage",
                    NONE: "none",
                    STYLE: "style",
                    URL: "url",
                }
            };
            BoomThemeStyle = (function () {
                function BoomThemeStyle(type, props) {
                    switch (type.toLowerCase()) {
                        case CONFIG.THEME_STYLES.BASE_THEME:
                            this.type = CONFIG.THEME_STYLES.BASE_THEME;
                            this.props = {
                                theme: props && props.theme ? props.theme : ""
                            };
                            break;
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
                        new BoomThemeStyle(CONFIG.THEME_STYLES.BASE_THEME, { theme: CONFIG.BASE_THEMES.DEFAULT.id }),
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
                BoomTheme.prototype.constructTheme = function (styles) {
                    var output = "";
                    lodash_1.default.each(styles, function (style) {
                        if (style.type === CONFIG.THEME_STYLES.URL) {
                            if (style.props && style.props.url !== "") {
                                output += "@import url('" + style.props.url + "');\n                    ";
                            }
                        }
                        else if (style.type === CONFIG.THEME_STYLES.BASE_THEME) {
                            if (style.props && style.props.theme !== "") {
                                if (style.props.theme.toLowerCase() === CONFIG.BASE_THEMES.DARK.id) {
                                    output += "@import url('" + getThemeCSSFile(CONFIG.BASE_THEMES.DARK.id) + "');\n                        ";
                                }
                                else if (style.props.theme.toLowerCase() === CONFIG.BASE_THEMES.LIGHT.id) {
                                    output += "@import url('" + getThemeCSSFile(CONFIG.BASE_THEMES.LIGHT.id) + "');\n                        ";
                                }
                            }
                        }
                        else if (style.type === CONFIG.THEME_STYLES.STYLE) {
                            if (style.props && style.props.text !== "") {
                                output += (style.props.text || '') + "\n                    ";
                            }
                        }
                        else if (style.type === CONFIG.THEME_STYLES.BG_IMAGE) {
                            if (style.props && style.props.url !== "") {
                                output += "\n.main-view, .sidemenu, .sidemenu-open .sidemenu, .navbar, .dashboard-container {\n    background: url(\"" + style.props.url + "\")\n    no-repeat center center fixed;\n    -webkit-background-size: cover;\n    -moz-background-size: cover;\n    -o-background-size: cover;\n    background-size: cover;\n}\n                    ";
                            }
                        }
                    });
                    return output;
                };
                BoomTheme.prototype.getThemeContent = function () {
                    var output = '';
                    if (this.styles && this.styles.length > 0) {
                        output += this.constructTheme(this.styles.filter(function (style) { return style.type === CONFIG.THEME_STYLES.URL; }));
                        output += this.constructTheme(this.styles.filter(function (style) { return style.type === CONFIG.THEME_STYLES.STYLE; }));
                        output += this.constructTheme(this.styles.filter(function (style) { return style.type !== CONFIG.THEME_STYLES.URL && style.type !== CONFIG.THEME_STYLES.STYLE; }));
                    }
                    return output;
                };
                return BoomTheme;
            }());
            BoomThemeCtl = (function (_super) {
                __extends(BoomThemeCtl, _super);
                function BoomThemeCtl($scope, $injector) {
                    var _this = _super.call(this, $scope, $injector) || this;
                    _this.base_theme_options = [CONFIG.BASE_THEMES.DEFAULT, CONFIG.BASE_THEMES.DARK, CONFIG.BASE_THEMES.LIGHT].map(function (theme) {
                        return {
                            text: theme.name,
                            value: theme.id
                        };
                    });
                    lodash_1.default.defaults(_this.panel, {});
                    _this.panel.transparent = true;
                    _this.panel.themes = _this.panel.themes || [
                        new BoomTheme({
                            name: CONFIG.FIRST_THEME_NAME,
                            styles: [
                                new BoomThemeStyle(CONFIG.THEME_STYLES.BASE_THEME, { theme: CONFIG.BASE_THEMES.DEFAULT.id }),
                                new BoomThemeStyle(CONFIG.THEME_STYLES.BG_IMAGE, { url: CONFIG.DEFAULT_THEME_BG_IMAGE }),
                                new BoomThemeStyle(CONFIG.THEME_STYLES.STYLE, { text: CONFIG.DEFAULT_THEME_STYLE })
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
                    if (this.runtimeThemeIndex === CONFIG.BASE_THEMES.DARK.index_id) {
                        output += "@import url('" + getThemeCSSFile(CONFIG.BASE_THEMES.DARK.id) + "');\n            ";
                    }
                    else if (this.runtimeThemeIndex === CONFIG.BASE_THEMES.LIGHT.index_id) {
                        output += "@import url('" + getThemeCSSFile(CONFIG.BASE_THEMES.LIGHT.id) + "');\n            ";
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL21vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7WUFLTSxNQUFNLEdBQUc7Z0JBQ1gsV0FBVyxFQUFFO29CQUNULElBQUksRUFBRTt3QkFDRixFQUFFLEVBQUUsTUFBTTt3QkFDVixRQUFRLEVBQUUsQ0FBQyxJQUFJO3dCQUNmLElBQUksRUFBRSxZQUFZO3FCQUNyQjtvQkFDRCxPQUFPLEVBQUU7d0JBQ0wsRUFBRSxFQUFFLFNBQVM7d0JBQ2IsUUFBUSxFQUFFLENBQUMsSUFBSTt3QkFDZixJQUFJLEVBQUUsZUFBZTtxQkFDeEI7b0JBQ0QsS0FBSyxFQUFFO3dCQUNILEVBQUUsRUFBRSxPQUFPO3dCQUNYLFFBQVEsRUFBRSxDQUFDLElBQUk7d0JBQ2YsSUFBSSxFQUFFLGFBQWE7cUJBQ3RCO2lCQUNKO2dCQUNELHNCQUFzQixFQUFFLDhEQUE4RDtnQkFDdEYsa0JBQWtCLEVBQUUsV0FBVztnQkFDL0IsbUJBQW1CLEVBQUUsK0RBRXZCO2dCQUNFLGdCQUFnQixFQUFFLGFBQWE7Z0JBQy9CLFlBQVksRUFBRTtvQkFDVixVQUFVLEVBQUUsV0FBVztvQkFDdkIsUUFBUSxFQUFFLFNBQVM7b0JBQ25CLElBQUksRUFBRSxNQUFNO29CQUNaLEtBQUssRUFBRSxPQUFPO29CQUNkLEdBQUcsRUFBRSxLQUFLO2lCQUNiO2FBQ0osQ0FBQztZQUVGO2dCQUdJLHdCQUFZLElBQUksRUFBRSxLQUFLO29CQUNuQixRQUFRLElBQUksQ0FBQyxXQUFXLEVBQUUsRUFBRTt3QkFDeEIsS0FBSyxNQUFNLENBQUMsWUFBWSxDQUFDLFVBQVU7NEJBQy9CLElBQUksQ0FBQyxJQUFJLEdBQUcsTUFBTSxDQUFDLFlBQVksQ0FBQyxVQUFVLENBQUM7NEJBQzNDLElBQUksQ0FBQyxLQUFLLEdBQUc7Z0NBQ1QsS0FBSyxFQUFFLEtBQUssSUFBSSxLQUFLLENB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QyxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLy8vPHJlZmVyZW5jZSBwYXRoPVwiLi4vbm9kZV9tb2R1bGVzL2dyYWZhbmEtc2RrLW1vY2tzL2FwcC9oZWFkZXJzL2NvbW1vbi5kLnRzXCIgLz5cclxuXHJcbmltcG9ydCBfIGZyb20gXCJsb2Rhc2hcIjtcclxuaW1wb3J0IHsgUGFuZWxDdHJsIH0gZnJvbSBcImFwcC9wbHVnaW5zL3Nka1wiO1xyXG5cclxuY29uc3QgQ09ORklHID0ge1xyXG4gICAgQkFTRV9USEVNRVM6IHtcclxuICAgICAgICBEQVJLOiB7XHJcbiAgICAgICAgICAgIGlkOiBcImRhcmtcIixcclxuICAgICAgICAgICAgaW5kZXhfaWQ6IC0yMDAwLFxyXG4gICAgICAgICAgICBuYW1lOiBcIkRhcmsgVGhlbWVcIlxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgREVGQVVMVDoge1xyXG4gICAgICAgICAgICBpZDogXCJkZWZhdWx0XCIsXHJcbiAgICAgICAgICAgIGluZGV4X2lkOiAtMTAwMCxcclxuICAgICAgICAgICAgbmFtZTogXCJEZWZhdWx0IFRoZW1lXCJcclxuICAgICAgICB9LFxyXG4gICAgICAgIExJR0hUOiB7XHJcbiAgICAgICAgICAgIGlkOiBcImxpZ2h0XCIsXHJcbiAgICAgICAgICAgIGluZGV4X2lkOiAtMzAwMCxcclxuICAgICAgICAgICAgbmFtZTogXCJMaWdodCBUaGVtZVwiXHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuICAgIERFRkFVTFRfVEhFTUVfQkdfSU1BR0U6IGBodHRwczovL2ltYWdlcy51bnNwbGFzaC5jb20vcGhvdG8tMTUyNDMzNDIyODMzMy0wZjZkYjM5MmY4YTFgLCAvLyBJbWFnZSBDcmVkaXRzIDogaHR0cHM6Ly91bnNwbGFzaC5jb20vcGhvdG9zL2ZYLXFXc1hsNXg4XHJcbiAgICBERUZBVUxUX1RIRU1FX05BTUU6IFwiTmV3IFRoZW1lXCIsXHJcbiAgICBERUZBVUxUX1RIRU1FX1NUWUxFOiBgLnBhbmVsLWNvbnRhaW5lciB7XHJcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2JhKDAsMCwwLDAuMyk7XHJcbn1gLFxyXG4gICAgRklSU1RfVEhFTUVfTkFNRTogXCJOaWdodCBUaGVtZVwiLFxyXG4gICAgVEhFTUVfU1RZTEVTOiB7XHJcbiAgICAgICAgQkFTRV9USEVNRTogXCJiYXNldGhlbWVcIixcclxuICAgICAgICBCR19JTUFHRTogXCJiZ2ltYWdlXCIsXHJcbiAgICAgICAgTk9ORTogXCJub25lXCIsXHJcbiAgICAgICAgU1RZTEU6IFwic3R5bGVcIixcclxuICAgICAgICBVUkw6IFwidXJsXCIsXHJcbiAgICB9XHJcbn07XHJcblxyXG5jbGFzcyBCb29tVGhlbWVTdHlsZSB7XHJcbiAgICBwdWJsaWMgdHlwZTogc3RyaW5nO1xyXG4gICAgcHVibGljIHByb3BzOiBhbnk7XHJcbiAgICBjb25zdHJ1Y3Rvcih0eXBlLCBwcm9wcykge1xyXG4gICAgICAgIHN3aXRjaCAodHlwZS50b0xvd2VyQ2FzZSgpKSB7XHJcbiAgICAgICAgICAgIGNhc2UgQ09ORklHLlRIRU1FX1NUWUxFUy5CQVNFX1RIRU1FOlxyXG4gICAgICAgICAgICAgICAgdGhpcy50eXBlID0gQ09ORklHLlRIRU1FX1NUWUxFUy5CQVNFX1RIRU1FO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5wcm9wcyA9IHtcclxuICAgICAgICAgICAgICAgICAgICB0aGVtZTogcHJvcHMgJiYgcHJvcHMudGhlbWUgPyBwcm9wcy50aGVtZSA6IFwiXCJcclxuICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBDT05GSUcuVEhFTUVfU1RZTEVTLlNUWUxFOlxyXG4gICAgICAgICAgICAgICAgdGhpcy50eXBlID0gQ09ORklHLlRIRU1FX1NUWUxFUy5TVFlMRTtcclxuICAgICAgICAgICAgICAgIHRoaXMucHJvcHMgPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGV4dDogcHJvcHMgJiYgcHJvcHMudGV4dCA/IHByb3BzLnRleHQgOiBcIlwiXHJcbiAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgQ09ORklHLlRIRU1FX1NUWUxFUy5VUkw6XHJcbiAgICAgICAgICAgICAgICB0aGlzLnR5cGUgPSBDT05GSUcuVEhFTUVfU1RZTEVTLlVSTDtcclxuICAgICAgICAgICAgICAgIHRoaXMucHJvcHMgPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdXJsOiBwcm9wcyAmJiBwcm9wcy51cmwgPyBwcm9wcy51cmwgOiBcIlwiXHJcbiAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgQ09ORklHLlRIRU1FX1NUWUxFUy5CR19JTUFHRTpcclxuICAgICAgICAgICAgICAgIHRoaXMudHlwZSA9IENPTkZJRy5USEVNRV9TVFlMRVMuQkdfSU1BR0U7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnByb3BzID0ge1xyXG4gICAgICAgICAgICAgICAgICAgIHVybDogcHJvcHMgJiYgcHJvcHMudXJsID8gcHJvcHMudXJsIDogXCJcIlxyXG4gICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgICAgdGhpcy50eXBlID0gQ09ORklHLlRIRU1FX1NUWUxFUy5OT05FO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5wcm9wcyA9IHt9O1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcblxyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG5cclxuY2xhc3MgQm9vbVRoZW1lIHtcclxuICAgIHB1YmxpYyBuYW1lOiBzdHJpbmc7XHJcbiAgICBwdWJsaWMgc3R5bGVzOiBCb29tVGhlbWVTdHlsZVtdO1xyXG4gICAgY29uc3RydWN0b3Iob3B0aW9ucykge1xyXG4gICAgICAgIHRoaXMubmFtZSA9IG9wdGlvbnMubmFtZSB8fCBDT05GSUcuREVGQVVMVF9USEVNRV9OQU1FO1xyXG4gICAgICAgIHRoaXMuc3R5bGVzID0gb3B0aW9ucy5zdHlsZXMgfHwgW1xyXG4gICAgICAgICAgICBuZXcgQm9vbVRoZW1lU3R5bGUoQ09ORklHLlRIRU1FX1NUWUxFUy5CQVNFX1RIRU1FLCB7IHRoZW1lOiBDT05GSUcuQkFTRV9USEVNRVMuREVGQVVMVC5pZCB9KSxcclxuICAgICAgICAgICAgbmV3IEJvb21UaGVtZVN0eWxlKENPTkZJRy5USEVNRV9TVFlMRVMuQkdfSU1BR0UsIHsgdXJsOiBcIlwiIH0pLFxyXG4gICAgICAgICAgICBuZXcgQm9vbVRoZW1lU3R5bGUoQ09ORklHLlRIRU1FX1NUWUxFUy5VUkwsIHsgdXJsOiBcIlwiIH0pLFxyXG4gICAgICAgICAgICBuZXcgQm9vbVRoZW1lU3R5bGUoQ09ORklHLlRIRU1FX1NUWUxFUy5TVFlMRSwgeyB0ZXh0OiBgYCB9KSxcclxuICAgICAgICBdO1xyXG4gICAgfVxyXG4gICAgcHVibGljIGFkZFN0eWxlKHR5cGU6IHN0cmluZyk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuc3R5bGVzLnB1c2gobmV3IEJvb21UaGVtZVN0eWxlKHR5cGUsIHt9KSk7XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgZGVsZXRlU3R5bGUoaW5kZXg6IG51bWJlcik6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuc3R5bGVzLnNwbGljZShpbmRleCwgMSk7XHJcbiAgICB9XHJcbiAgICBwcml2YXRlIGNvbnN0cnVjdFRoZW1lKHN0eWxlczogYW55W10pOiBzdHJpbmcge1xyXG4gICAgICAgIGxldCBvdXRwdXQgPSBgYDtcclxuICAgICAgICBfLmVhY2goc3R5bGVzLCBzdHlsZSA9PiB7XHJcbiAgICAgICAgICAgIGlmIChzdHlsZS50eXBlID09PSBDT05GSUcuVEhFTUVfU1RZTEVTLlVSTCkge1xyXG4gICAgICAgICAgICAgICAgaWYgKHN0eWxlLnByb3BzICYmIHN0eWxlLnByb3BzLnVybCAhPT0gXCJcIikge1xyXG4gICAgICAgICAgICAgICAgICAgIG91dHB1dCArPSBgQGltcG9ydCB1cmwoJyR7c3R5bGUucHJvcHMudXJsfScpO1xyXG4gICAgICAgICAgICAgICAgICAgIGA7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoc3R5bGUudHlwZSA9PT0gQ09ORklHLlRIRU1FX1NUWUxFUy5CQVNFX1RIRU1FKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoc3R5bGUucHJvcHMgJiYgc3R5bGUucHJvcHMudGhlbWUgIT09IFwiXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoc3R5bGUucHJvcHMudGhlbWUudG9Mb3dlckNhc2UoKSA9PT0gQ09ORklHLkJBU0VfVEhFTUVTLkRBUksuaWQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgb3V0cHV0ICs9IGBAaW1wb3J0IHVybCgnJHtnZXRUaGVtZUNTU0ZpbGUoQ09ORklHLkJBU0VfVEhFTUVTLkRBUksuaWQpfScpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBgO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHN0eWxlLnByb3BzLnRoZW1lLnRvTG93ZXJDYXNlKCkgPT09IENPTkZJRy5CQVNFX1RIRU1FUy5MSUdIVC5pZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBvdXRwdXQgKz0gYEBpbXBvcnQgdXJsKCcke2dldFRoZW1lQ1NTRmlsZShDT05GSUcuQkFTRV9USEVNRVMuTElHSFQuaWQpfScpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBgO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSBlbHNlIGlmIChzdHlsZS50eXBlID09PSBDT05GSUcuVEhFTUVfU1RZTEVTLlNUWUxFKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoc3R5bGUucHJvcHMgJiYgc3R5bGUucHJvcHMudGV4dCAhPT0gXCJcIikge1xyXG4gICAgICAgICAgICAgICAgICAgIG91dHB1dCArPSBgJHtzdHlsZS5wcm9wcy50ZXh0IHx8ICcnfVxyXG4gICAgICAgICAgICAgICAgICAgIGA7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoc3R5bGUudHlwZSA9PT0gQ09ORklHLlRIRU1FX1NUWUxFUy5CR19JTUFHRSkge1xyXG4gICAgICAgICAgICAgICAgaWYgKHN0eWxlLnByb3BzICYmIHN0eWxlLnByb3BzLnVybCAhPT0gXCJcIikge1xyXG4gICAgICAgICAgICAgICAgICAgIG91dHB1dCArPSBgXHJcbi5tYWluLXZpZXcsIC5zaWRlbWVudSwgLnNpZGVtZW51LW9wZW4gLnNpZGVtZW51LCAubmF2YmFyLCAuZGFzaGJvYXJkLWNvbnRhaW5lciB7XHJcbiAgICBiYWNrZ3JvdW5kOiB1cmwoXCIke3N0eWxlLnByb3BzLnVybH1cIilcclxuICAgIG5vLXJlcGVhdCBjZW50ZXIgY2VudGVyIGZpeGVkO1xyXG4gICAgLXdlYmtpdC1iYWNrZ3JvdW5kLXNpemU6IGNvdmVyO1xyXG4gICAgLW1vei1iYWNrZ3JvdW5kLXNpemU6IGNvdmVyO1xyXG4gICAgLW8tYmFja2dyb3VuZC1zaXplOiBjb3ZlcjtcclxuICAgIGJhY2tncm91bmQtc2l6ZTogY292ZXI7XHJcbn1cclxuICAgICAgICAgICAgICAgICAgICBgO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgcmV0dXJuIG91dHB1dDtcclxuICAgIH1cclxuICAgIHB1YmxpYyBnZXRUaGVtZUNvbnRlbnQoKTogc3RyaW5nIHtcclxuICAgICAgICBsZXQgb3V0cHV0ID0gJyc7XHJcbiAgICAgICAgaWYgKHRoaXMuc3R5bGVzICYmIHRoaXMuc3R5bGVzLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgb3V0cHV0ICs9IHRoaXMuY29uc3RydWN0VGhlbWUodGhpcy5zdHlsZXMuZmlsdGVyKHN0eWxlID0+IHN0eWxlLnR5cGUgPT09IENPTkZJRy5USEVNRV9TVFlMRVMuVVJMKSk7XHJcbiAgICAgICAgICAgIG91dHB1dCArPSB0aGlzLmNvbnN0cnVjdFRoZW1lKHRoaXMuc3R5bGVzLmZpbHRlcihzdHlsZSA9PiBzdHlsZS50eXBlID09PSBDT05GSUcuVEhFTUVfU1RZTEVTLlNUWUxFKSk7XHJcbiAgICAgICAgICAgIG91dHB1dCArPSB0aGlzLmNvbnN0cnVjdFRoZW1lKHRoaXMuc3R5bGVzLmZpbHRlcihzdHlsZSA9PiBzdHlsZS50eXBlICE9PSBDT05GSUcuVEhFTUVfU1RZTEVTLlVSTCAmJiBzdHlsZS50eXBlICE9PSBDT05GSUcuVEhFTUVfU1RZTEVTLlNUWUxFKSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBvdXRwdXQ7XHJcbiAgICB9XHJcbn1cclxuXHJcbmNsYXNzIEJvb21UaGVtZUN0bCBleHRlbmRzIFBhbmVsQ3RybCB7XHJcbiAgICBwdWJsaWMgc3RhdGljIHRlbXBsYXRlVXJsID0gXCJwYXJ0aWFscy9tb2R1bGUuaHRtbFwiO1xyXG4gICAgcHVibGljIHNjb3BlOiBhbnk7XHJcbiAgICBwdWJsaWMgY3RybDogYW55O1xyXG4gICAgcHVibGljIGVsZW06IGFueTtcclxuICAgIHB1YmxpYyBhdHRyczogYW55O1xyXG4gICAgcHVibGljIGFjdGl2ZUVkaXRvclRhYkluZGV4OiBudW1iZXI7XHJcbiAgICBwdWJsaWMgcnVudGltZVRoZW1lU2V0OiBCb29sZWFuO1xyXG4gICAgcHVibGljIHJ1bnRpbWVUaGVtZUluZGV4OiBudW1iZXI7XHJcbiAgICBwdWJsaWMgYmFzZV90aGVtZV9vcHRpb25zOiBhbnkgPSBbQ09ORklHLkJBU0VfVEhFTUVTLkRFRkFVTFQsIENPTkZJRy5CQVNFX1RIRU1FUy5EQVJLLCBDT05GSUcuQkFTRV9USEVNRVMuTElHSFRdLm1hcCh0aGVtZSA9PiB7XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgdGV4dDogdGhlbWUubmFtZSxcclxuICAgICAgICAgICAgdmFsdWU6IHRoZW1lLmlkXHJcbiAgICAgICAgfTtcclxuICAgIH0pO1xyXG4gICAgY29uc3RydWN0b3IoJHNjb3BlLCAkaW5qZWN0b3IpIHtcclxuICAgICAgICBzdXBlcigkc2NvcGUsICRpbmplY3Rvcik7XHJcbiAgICAgICAgXy5kZWZhdWx0cyh0aGlzLnBhbmVsLCB7fSk7XHJcbiAgICAgICAgdGhpcy5wYW5lbC50cmFuc3BhcmVudCA9IHRydWU7XHJcbiAgICAgICAgdGhpcy5wYW5lbC50aGVtZXMgPSB0aGlzLnBhbmVsLnRoZW1lcyB8fCBbXHJcbiAgICAgICAgICAgIG5ldyBCb29tVGhlbWUoe1xyXG4gICAgICAgICAgICAgICAgbmFtZTogQ09ORklHLkZJUlNUX1RIRU1FX05BTUUsXHJcbiAgICAgICAgICAgICAgICBzdHlsZXM6IFtcclxuICAgICAgICAgICAgICAgICAgICBuZXcgQm9vbVRoZW1lU3R5bGUoQ09ORklHLlRIRU1FX1NUWUxFUy5CQVNFX1RIRU1FLCB7IHRoZW1lOiBDT05GSUcuQkFTRV9USEVNRVMuREVGQVVMVC5pZCB9KSxcclxuICAgICAgICAgICAgICAgICAgICBuZXcgQm9vbVRoZW1lU3R5bGUoQ09ORklHLlRIRU1FX1NUWUxFUy5CR19JTUFHRSwgeyB1cmw6IENPTkZJRy5ERUZBVUxUX1RIRU1FX0JHX0lNQUdFIH0pLFxyXG4gICAgICAgICAgICAgICAgICAgIG5ldyBCb29tVGhlbWVTdHlsZShDT05GSUcuVEhFTUVfU1RZTEVTLlNUWUxFLHsgdGV4dCA6IENPTkZJRy5ERUZBVUxUX1RIRU1FX1NUWUxFIH0pXHJcbiAgICAgICAgICAgICAgICBdXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgXTtcclxuICAgICAgICB0aGlzLnBhbmVsLmFjdGl2ZVRoZW1lSWQgPSB0aGlzLnBhbmVsLmFjdGl2ZVRoZW1lSWQgfHwgMDtcclxuICAgICAgICB0aGlzLmFjdGl2ZUVkaXRvclRhYkluZGV4ID0gdGhpcy5wYW5lbC5hY3RpdmVUaGVtZUlkID49IDAgPyB0aGlzLnBhbmVsLmFjdGl2ZVRoZW1lSWQgOiAtMTtcclxuICAgICAgICB0aGlzLnJ1bnRpbWVUaGVtZVNldCA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMucnVudGltZVRoZW1lSW5kZXggPSB0aGlzLnBhbmVsLmFjdGl2ZVRoZW1lSWQgPj0gMCA/IHRoaXMucGFuZWwuYWN0aXZlVGhlbWVJZCA6IDA7XHJcbiAgICAgICAgdGhpcy51cGRhdGVQcm90b3R5cGVzKCk7XHJcbiAgICAgICAgdGhpcy5ldmVudHMub24oXCJpbml0LWVkaXQtbW9kZVwiLCB0aGlzLm9uSW5pdEVkaXRNb2RlLmJpbmQodGhpcykpO1xyXG4gICAgfVxyXG4gICAgcHJpdmF0ZSB1cGRhdGVQcm90b3R5cGVzKCk6IHZvaWQge1xyXG4gICAgICAgIGlmICh0aGlzLnBhbmVsLnRoZW1lcyAmJiB0aGlzLnBhbmVsLnRoZW1lcy5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgIHRoaXMucGFuZWwudGhlbWVzLm1hcCh0aGVtZSA9PiB7XHJcbiAgICAgICAgICAgICAgICBPYmplY3Quc2V0UHJvdG90eXBlT2YodGhlbWUsIEJvb21UaGVtZS5wcm90b3R5cGUpO1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoZW1lLnN0eWxlcyAmJiB0aGVtZS5zdHlsZXMubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoZW1lLnN0eWxlcy5tYXAoc3R5bGUgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBPYmplY3Quc2V0UHJvdG90eXBlT2Yoc3R5bGUsIEJvb21UaGVtZVN0eWxlLnByb3RvdHlwZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhlbWU7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHByaXZhdGUgb25Jbml0RWRpdE1vZGUoKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5hZGRFZGl0b3JUYWIoXCJUaGVtZVwiLCBcInB1YmxpYy9wbHVnaW5zL3llc29yZXllcmFtLWJvb210aGVtZS1wYW5lbC9wYXJ0aWFscy9vcHRpb25zLmh0bWxcIiwgMik7XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgYWRkVGhlbWUoKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5wYW5lbC50aGVtZXMgPSB0aGlzLnBhbmVsLnRoZW1lcyB8fCBbXTtcclxuICAgICAgICB0aGlzLnBhbmVsLnRoZW1lcy5wdXNoKG5ldyBCb29tVGhlbWUoe1xyXG4gICAgICAgICAgICBuYW1lOiBgVGhlbWUgJHt0aGlzLnBhbmVsLnRoZW1lcy5sZW5ndGggKyAxfWBcclxuICAgICAgICB9KSk7XHJcbiAgICAgICAgdGhpcy5hY3RpdmVFZGl0b3JUYWJJbmRleCA9IHRoaXMucGFuZWwudGhlbWVzLmxlbmd0aCAtIDE7XHJcbiAgICAgICAgdGhpcy5ydW50aW1lVGhlbWVJbmRleCA9IHRoaXMucGFuZWwudGhlbWVzLmxlbmd0aCAtIDE7XHJcbiAgICAgICAgdGhpcy5yZW5kZXIoKTtcclxuICAgIH1cclxuICAgIHB1YmxpYyBkZWxldGVUaGVtZShpbmRleDogbnVtYmVyKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5wYW5lbC50aGVtZXMuc3BsaWNlKGluZGV4LCAxKTtcclxuICAgICAgICBpZiAodGhpcy5wYW5lbC5hY3RpdmVUaGVtZUlkID09PSBpbmRleCkge1xyXG4gICAgICAgICAgICB0aGlzLnBhbmVsLmFjdGl2ZVRoZW1lSWQgPSAwO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAodGhpcy5ydW50aW1lVGhlbWVJbmRleCA9PT0gaW5kZXgpIHtcclxuICAgICAgICAgICAgdGhpcy5ydW50aW1lVGhlbWVJbmRleCA9IDA7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh0aGlzLmFjdGl2ZUVkaXRvclRhYkluZGV4ID09PSBpbmRleCkge1xyXG4gICAgICAgICAgICB0aGlzLmFjdGl2ZUVkaXRvclRhYkluZGV4ID0gdGhpcy5jdHJsLnBhbmVsLnRoZW1lcy5sZW5ndGggLSAxO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHB1YmxpYyBzZXRUaGVtZUFzRGVmYXVsdChpbmRleDogbnVtYmVyKSB7XHJcbiAgICAgICAgdGhpcy5jdHJsLnBhbmVsLmFjdGl2ZVRoZW1lSWQgPSBpbmRleDtcclxuICAgICAgICB0aGlzLnJ1bnRpbWVUaGVtZUluZGV4ID0gaW5kZXg7XHJcbiAgICAgICAgdGhpcy5yZW5kZXIoKTtcclxuICAgIH1cclxuICAgIHB1YmxpYyBzZXRydW50aW1lVGhlbWVJbmRleChpbmRleDogbnVtYmVyKSB7XHJcbiAgICAgICAgdGhpcy5ydW50aW1lVGhlbWVTZXQgPSB0cnVlO1xyXG4gICAgICAgIHRoaXMucnVudGltZVRoZW1lSW5kZXggPSBpbmRleDtcclxuICAgICAgICB0aGlzLnJlbmRlcigpO1xyXG4gICAgfVxyXG4gICAgcHVibGljIGxpbWl0VGV4dCh0ZXh0OiBzdHJpbmcsIG1heGxlbmd0aDogTnVtYmVyKTogc3RyaW5nIHtcclxuICAgICAgICBpZiAodGV4dC5zcGxpdChcIlwiKS5sZW5ndGggPiBtYXhsZW5ndGgpIHtcclxuICAgICAgICAgICAgdGV4dCA9IHRleHQuc3Vic3RyaW5nKDAsIE51bWJlcihtYXhsZW5ndGgpIC0gMykgKyBcIi4uLlwiO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdGV4dDtcclxuICAgIH1cclxuICAgIHB1YmxpYyBsaW5rKHNjb3BlOiBhbnksIGVsZW06IGFueSwgYXR0cnM6IGFueSwgY3RybDogYW55KTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5zY29wZSA9IHNjb3BlO1xyXG4gICAgICAgIHRoaXMuZWxlbSA9IGVsZW07XHJcbiAgICAgICAgdGhpcy5hdHRycyA9IGF0dHJzO1xyXG4gICAgICAgIHRoaXMuY3RybCA9IGN0cmw7XHJcbiAgICAgICAgdGhpcy5yZW5kZXIoKTtcclxuICAgIH1cclxufVxyXG5cclxubGV0IGdldFRoZW1lQ1NTRmlsZSA9IGZ1bmN0aW9uIChtb2RlOiBzdHJpbmcpOiBzdHJpbmcge1xyXG4gICAgbGV0IGZpbGVuYW1lID0gJyc7XHJcbiAgICBpZiAoW1wiZGFya1wiLCBcImxpZ2h0XCJdLmluZGV4T2YobW9kZS50b0xvd2VyQ2FzZSgpKSA+IC0xICYmIHdpbmRvdy5wZXJmb3JtYW5jZSkge1xyXG4gICAgICAgIGxldCBhcHBmaWxlcyA9IHdpbmRvdy5wZXJmb3JtYW5jZS5nZXRFbnRyaWVzKCkubWFwKGUgPT4gZS5uYW1lKS5maWx0ZXIoZSA9PiBlLmVuZHNXaXRoKFwiLmpzXCIpKS5maWx0ZXIoZSA9PiBlLmluZGV4T2YoXCIvcHVibGljL2J1aWxkL2FwcC5cIikgPiAtMSk7XHJcbiAgICAgICAgaWYgKGFwcGZpbGVzICYmIGFwcGZpbGVzLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgZmlsZW5hbWUgPSBhcHBmaWxlc1swXS5yZXBsYWNlKGAvcHVibGljL2J1aWxkL2FwcC5gLCBgL3B1YmxpYy9idWlsZC9ncmFmYW5hLiR7bW9kZS50b0xvd2VyQ2FzZSgpfS5gKS5zbGljZSgwLCAtMykgKyBcIi5jc3NcIjtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gZmlsZW5hbWU7XHJcbn07XHJcblxyXG5Cb29tVGhlbWVDdGwucHJvdG90eXBlLnJlbmRlciA9IGZ1bmN0aW9uICgpIHtcclxuXHJcbiAgICAvLyAjcmVnaW9uIFBhbmVsIFVJIE9wdGlvbnNcclxuICAgIGlmICh0aGlzLmN0cmwucGFuZWwudGl0bGUgPT09IFwiUGFuZWwgVGl0bGVcIikge1xyXG4gICAgICAgIHRoaXMuY3RybC5wYW5lbC50aXRsZSA9IFwiXCI7XHJcbiAgICB9XHJcbiAgICBpZiAodGhpcy5jdHJsLnBhbmVsLmdyaWRQb3MgJiYgdGhpcy5jdHJsLnBhbmVsLmdyaWRQb3MueCA9PT0gMCAmJiB0aGlzLmN0cmwucGFuZWwuZ3JpZFBvcy55ID09PSAwKSB7XHJcbiAgICAgICAgdGhpcy5jdHJsLnBhbmVsLmdyaWRQb3MudyA9IDI0O1xyXG4gICAgICAgIHRoaXMuY3RybC5wYW5lbC5ncmlkUG9zLmggPSAzO1xyXG4gICAgfVxyXG4gICAgLy8gI2VuZHJlZ2lvblxyXG5cclxuICAgIC8vICNyZWdpb24gVGhlbWVzIFJlbmRlcmluZ1xyXG4gICAgbGV0IG91dHB1dCA9ICcnO1xyXG4gICAgXy5lYWNoKHRoaXMucGFuZWwudGhlbWVzLCAodGhlbWUsIGluZGV4KSA9PiB7XHJcbiAgICAgICAgaWYgKHRoaXMucnVudGltZVRoZW1lU2V0ID09PSBmYWxzZSkge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5wYW5lbC5hY3RpdmVUaGVtZUlkID09PSBpbmRleCAmJiB0aGlzLnBhbmVsLmFjdGl2ZVRoZW1lSWQgPj0gMCkge1xyXG4gICAgICAgICAgICAgICAgb3V0cHV0ICs9IHRoZW1lLmdldFRoZW1lQ29udGVudCgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMucnVudGltZVRoZW1lSW5kZXggPT09IGluZGV4ICYmIHRoaXMucnVudGltZVRoZW1lSW5kZXggPj0gMCkge1xyXG4gICAgICAgICAgICAgICAgb3V0cHV0ICs9IHRoZW1lLmdldFRoZW1lQ29udGVudCgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcbiAgICBpZiAodGhpcy5ydW50aW1lVGhlbWVTZXQgPT09IHRydWUpIHtcclxuICAgICAgICBpZiAodGhpcy5ydW50aW1lVGhlbWVJbmRleCA9PT0gQ09ORklHLkJBU0VfVEhFTUVTLkRBUksuaW5kZXhfaWQpIHtcclxuICAgICAgICAgICAgb3V0cHV0ICs9IGBAaW1wb3J0IHVybCgnJHtnZXRUaGVtZUNTU0ZpbGUoQ09ORklHLkJBU0VfVEhFTUVTLkRBUksuaWQpfScpO1xyXG4gICAgICAgICAgICBgO1xyXG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy5ydW50aW1lVGhlbWVJbmRleCA9PT0gQ09ORklHLkJBU0VfVEhFTUVTLkxJR0hULmluZGV4X2lkKSB7XHJcbiAgICAgICAgICAgIG91dHB1dCArPSBgQGltcG9ydCB1cmwoJyR7Z2V0VGhlbWVDU1NGaWxlKENPTkZJRy5CQVNFX1RIRU1FUy5MSUdIVC5pZCl9Jyk7XHJcbiAgICAgICAgICAgIGA7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgY29uc3Qgc3R5bGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzdHlsZScpO1xyXG4gICAgc3R5bGUudHlwZSA9ICd0ZXh0L2Nzcyc7XHJcbiAgICBzdHlsZS5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShvdXRwdXQpKTtcclxuICAgIHRoaXMuZWxlbS5maW5kKFwiI2Jvb20tdGhlbWVcIikuaHRtbChcIlwiKTtcclxuICAgIHRoaXMuZWxlbS5maW5kKFwiI2Jvb20tdGhlbWVcIikuYXBwZW5kKHN0eWxlKTtcclxuICAgIC8vICNlbmRyZWdpb25cclxuXHJcbn07XHJcblxyXG5leHBvcnQgeyBCb29tVGhlbWVDdGwgYXMgUGFuZWxDdHJsIH07XHJcbiJdfQ==