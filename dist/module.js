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
                DEFAULT_THEME_BG_IMAGE: "https://images.unsplash.com/photo-1534796636912-3b95b3ab5986",
                DEFAULT_THEME_NAME: "New Theme",
                FIRST_THEME_NAME: "Boom Theme",
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
                                output += "\n.main-view, .sidemenu-open .sidemenu, .navbar, .dashboard-container {\nbackground: url(\"" + style.props.url + "\")\nno-repeat center center fixed;\n-webkit-background-size: cover;\n-moz-background-size: cover;\n-o-background-size: cover;\nbackground-size: cover;\n}\n                    ";
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL21vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7WUFLTSxNQUFNLEdBQUc7Z0JBQ1gsV0FBVyxFQUFFO29CQUNULElBQUksRUFBRTt3QkFDRixFQUFFLEVBQUUsTUFBTTt3QkFDVixRQUFRLEVBQUUsQ0FBQyxJQUFJO3dCQUNmLElBQUksRUFBRSxZQUFZO3FCQUNyQjtvQkFDRCxPQUFPLEVBQUU7d0JBQ0wsRUFBRSxFQUFFLFNBQVM7d0JBQ2IsUUFBUSxFQUFFLENBQUMsSUFBSTt3QkFDZixJQUFJLEVBQUUsZUFBZTtxQkFDeEI7b0JBQ0QsS0FBSyxFQUFFO3dCQUNILEVBQUUsRUFBRSxPQUFPO3dCQUNYLFFBQVEsRUFBRSxDQUFDLElBQUk7d0JBQ2YsSUFBSSxFQUFFLGFBQWE7cUJBQ3RCO2lCQUNKO2dCQUNELHNCQUFzQixFQUFFLDhEQUE4RDtnQkFDdEYsa0JBQWtCLEVBQUUsV0FBVztnQkFDL0IsZ0JBQWdCLEVBQUUsWUFBWTtnQkFDOUIsWUFBWSxFQUFFO29CQUNWLFVBQVUsRUFBRSxXQUFXO29CQUN2QixRQUFRLEVBQUUsU0FBUztvQkFDbkIsSUFBSSxFQUFFLE1BQU07b0JBQ1osS0FBSyxFQUFFLE9BQU87b0JBQ2QsR0FBRyxFQUFFLEtBQUs7aUJBQ2I7YUFDSixDQUFDO1lBRUY7Z0JBR0ksd0JBQVksSUFBSSxFQUFFLEtBQUs7b0JBQ25CLFFBQVEsSUFBSSxDQUFDLFdBQVcsRUFBRSxFQUFFO3dCQUN4QixLQUFLLE1BQU0sQ0FBQyxZQUFZLENBQUMsVUFBVTs0QkFDL0IsSUFBSSxDQUFDLElBQUksR0FBRyxNQUFNLENBQUMsWUFBWSxDQUFDLFVBQVUsQ0FBQzs0QkFDM0MsSUFBSSxDQUFDLEtBQUssR0FBRztnQ0FDVCxLQUFLLEVBQUUsS0FBSyxJQUFJLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLEtB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QUU7NEJBQ2pFLE1BQU0sSUFBSSxLQUFLLENBQUMsZUFBZSxFQUFFLENBQUM7eUJBQ3JDO3FCQUNKO2dCQUNMLENBQUMsQ0FBQyxDQUFDO2dCQUNILElBQUksSUFBSSxDQUFDLGVBQWUsS0FBSyxJQUFJLEVBQUU7b0JBQy9CLElBQUksSUFBSSxDQUFDLGlCQUFpQixLQUFLLE1BQU0sQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRTt3QkFDN0QsTUFBTSxJQUFJLGtCQUFnQixlQUFlLENBQUMsTUFBTSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLHNCQUNwRSxDQUFDO3FCQUNMO3lCQUFNLElBQUksSUFBSSxDQUFDLGlCQUFpQixLQUFLLE1BQU0sQ0FBQyxXQUFXLENBQUMsS0FBSyxDQUFDLFFBQVEsRUFBRTt3QkFDckUsTUFBTSxJQUFJLGtCQUFnQixlQUFlLENBQUMsTUFBTSxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLHNCQUNyRSxDQUFDO3FCQUNMO2lCQUNKO2dCQUNELElBQU0sS0FBSyxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsT0FBTyxDQUFDLENBQUM7Z0JBQzlDLEtBQUssQ0FBQyxJQUFJLEdBQUcsVUFBVSxDQUFDO2dCQUN4QixLQUFLLENBQUMsV0FBVyxDQUFDLFFBQVEsQ0FBQyxjQUFjLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztnQkFDbkQsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDO2dCQUN2QyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUM7WUFHaEQsQ0FBQyxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLy8vPHJlZmVyZW5jZSBwYXRoPVwiLi4vbm9kZV9tb2R1bGVzL2dyYWZhbmEtc2RrLW1vY2tzL2FwcC9oZWFkZXJzL2NvbW1vbi5kLnRzXCIgLz5cclxuXHJcbmltcG9ydCBfIGZyb20gXCJsb2Rhc2hcIjtcclxuaW1wb3J0IHsgUGFuZWxDdHJsIH0gZnJvbSBcImFwcC9wbHVnaW5zL3Nka1wiO1xyXG5cclxuY29uc3QgQ09ORklHID0ge1xyXG4gICAgQkFTRV9USEVNRVM6IHtcclxuICAgICAgICBEQVJLOiB7XHJcbiAgICAgICAgICAgIGlkOiBcImRhcmtcIixcclxuICAgICAgICAgICAgaW5kZXhfaWQ6IC0yMDAwLFxyXG4gICAgICAgICAgICBuYW1lOiBcIkRhcmsgVGhlbWVcIlxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgREVGQVVMVDoge1xyXG4gICAgICAgICAgICBpZDogXCJkZWZhdWx0XCIsXHJcbiAgICAgICAgICAgIGluZGV4X2lkOiAtMTAwMCxcclxuICAgICAgICAgICAgbmFtZTogXCJEZWZhdWx0IFRoZW1lXCJcclxuICAgICAgICB9LFxyXG4gICAgICAgIExJR0hUOiB7XHJcbiAgICAgICAgICAgIGlkOiBcImxpZ2h0XCIsXHJcbiAgICAgICAgICAgIGluZGV4X2lkOiAtMzAwMCxcclxuICAgICAgICAgICAgbmFtZTogXCJMaWdodCBUaGVtZVwiXHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuICAgIERFRkFVTFRfVEhFTUVfQkdfSU1BR0U6IGBodHRwczovL2ltYWdlcy51bnNwbGFzaC5jb20vcGhvdG8tMTUzNDc5NjYzNjkxMi0zYjk1YjNhYjU5ODZgLFxyXG4gICAgREVGQVVMVF9USEVNRV9OQU1FOiBcIk5ldyBUaGVtZVwiLFxyXG4gICAgRklSU1RfVEhFTUVfTkFNRTogXCJCb29tIFRoZW1lXCIsXHJcbiAgICBUSEVNRV9TVFlMRVM6IHtcclxuICAgICAgICBCQVNFX1RIRU1FOiBcImJhc2V0aGVtZVwiLFxyXG4gICAgICAgIEJHX0lNQUdFOiBcImJnaW1hZ2VcIixcclxuICAgICAgICBOT05FOiBcIm5vbmVcIixcclxuICAgICAgICBTVFlMRTogXCJzdHlsZVwiLFxyXG4gICAgICAgIFVSTDogXCJ1cmxcIixcclxuICAgIH1cclxufTtcclxuXHJcbmNsYXNzIEJvb21UaGVtZVN0eWxlIHtcclxuICAgIHB1YmxpYyB0eXBlOiBzdHJpbmc7XHJcbiAgICBwdWJsaWMgcHJvcHM6IGFueTtcclxuICAgIGNvbnN0cnVjdG9yKHR5cGUsIHByb3BzKSB7XHJcbiAgICAgICAgc3dpdGNoICh0eXBlLnRvTG93ZXJDYXNlKCkpIHtcclxuICAgICAgICAgICAgY2FzZSBDT05GSUcuVEhFTUVfU1RZTEVTLkJBU0VfVEhFTUU6XHJcbiAgICAgICAgICAgICAgICB0aGlzLnR5cGUgPSBDT05GSUcuVEhFTUVfU1RZTEVTLkJBU0VfVEhFTUU7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnByb3BzID0ge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoZW1lOiBwcm9wcyAmJiBwcm9wcy50aGVtZSA/IHByb3BzLnRoZW1lIDogXCJcIlxyXG4gICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIENPTkZJRy5USEVNRV9TVFlMRVMuU1RZTEU6XHJcbiAgICAgICAgICAgICAgICB0aGlzLnR5cGUgPSBDT05GSUcuVEhFTUVfU1RZTEVTLlNUWUxFO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5wcm9wcyA9IHtcclxuICAgICAgICAgICAgICAgICAgICB0ZXh0OiBwcm9wcyAmJiBwcm9wcy50ZXh0ID8gcHJvcHMudGV4dCA6IFwiXCJcclxuICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBDT05GSUcuVEhFTUVfU1RZTEVTLlVSTDpcclxuICAgICAgICAgICAgICAgIHRoaXMudHlwZSA9IENPTkZJRy5USEVNRV9TVFlMRVMuVVJMO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5wcm9wcyA9IHtcclxuICAgICAgICAgICAgICAgICAgICB1cmw6IHByb3BzICYmIHByb3BzLnVybCA/IHByb3BzLnVybCA6IFwiXCJcclxuICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBDT05GSUcuVEhFTUVfU1RZTEVTLkJHX0lNQUdFOlxyXG4gICAgICAgICAgICAgICAgdGhpcy50eXBlID0gQ09ORklHLlRIRU1FX1NUWUxFUy5CR19JTUFHRTtcclxuICAgICAgICAgICAgICAgIHRoaXMucHJvcHMgPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdXJsOiBwcm9wcyAmJiBwcm9wcy51cmwgPyBwcm9wcy51cmwgOiBcIlwiXHJcbiAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICB0aGlzLnR5cGUgPSBDT05GSUcuVEhFTUVfU1RZTEVTLk5PTkU7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnByb3BzID0ge307XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcblxyXG5jbGFzcyBCb29tVGhlbWUge1xyXG4gICAgcHVibGljIG5hbWU6IHN0cmluZztcclxuICAgIHB1YmxpYyBzdHlsZXM6IEJvb21UaGVtZVN0eWxlW107XHJcbiAgICBjb25zdHJ1Y3RvcihvcHRpb25zKSB7XHJcbiAgICAgICAgdGhpcy5uYW1lID0gb3B0aW9ucy5uYW1lIHx8IENPTkZJRy5ERUZBVUxUX1RIRU1FX05BTUU7XHJcbiAgICAgICAgdGhpcy5zdHlsZXMgPSBvcHRpb25zLnN0eWxlcyB8fCBbXHJcbiAgICAgICAgICAgIG5ldyBCb29tVGhlbWVTdHlsZShDT05GSUcuVEhFTUVfU1RZTEVTLkJBU0VfVEhFTUUsIHsgdGhlbWU6IENPTkZJRy5CQVNFX1RIRU1FUy5ERUZBVUxULmlkIH0pLFxyXG4gICAgICAgICAgICBuZXcgQm9vbVRoZW1lU3R5bGUoQ09ORklHLlRIRU1FX1NUWUxFUy5CR19JTUFHRSwgeyB1cmw6IFwiXCIgfSksXHJcbiAgICAgICAgICAgIG5ldyBCb29tVGhlbWVTdHlsZShDT05GSUcuVEhFTUVfU1RZTEVTLlVSTCwgeyB1cmw6IFwiXCIgfSksXHJcbiAgICAgICAgICAgIG5ldyBCb29tVGhlbWVTdHlsZShDT05GSUcuVEhFTUVfU1RZTEVTLlNUWUxFLCB7IHRleHQ6IGBgIH0pLFxyXG4gICAgICAgIF07XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgYWRkU3R5bGUodHlwZTogc3RyaW5nKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5zdHlsZXMucHVzaChuZXcgQm9vbVRoZW1lU3R5bGUodHlwZSwge30pKTtcclxuICAgIH1cclxuICAgIHB1YmxpYyBkZWxldGVTdHlsZShpbmRleDogbnVtYmVyKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5zdHlsZXMuc3BsaWNlKGluZGV4LCAxKTtcclxuICAgIH1cclxuICAgIHByaXZhdGUgY29uc3RydWN0VGhlbWUoc3R5bGVzOiBhbnlbXSk6IHN0cmluZyB7XHJcbiAgICAgICAgbGV0IG91dHB1dCA9IGBgO1xyXG4gICAgICAgIF8uZWFjaChzdHlsZXMsIHN0eWxlID0+IHtcclxuICAgICAgICAgICAgaWYgKHN0eWxlLnR5cGUgPT09IENPTkZJRy5USEVNRV9TVFlMRVMuVVJMKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoc3R5bGUucHJvcHMgJiYgc3R5bGUucHJvcHMudXJsICE9PSBcIlwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgb3V0cHV0ICs9IGBAaW1wb3J0IHVybCgnJHtzdHlsZS5wcm9wcy51cmx9Jyk7XHJcbiAgICAgICAgICAgICAgICAgICAgYDtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSBlbHNlIGlmIChzdHlsZS50eXBlID09PSBDT05GSUcuVEhFTUVfU1RZTEVTLkJBU0VfVEhFTUUpIHtcclxuICAgICAgICAgICAgICAgIGlmIChzdHlsZS5wcm9wcyAmJiBzdHlsZS5wcm9wcy50aGVtZSAhPT0gXCJcIikge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChzdHlsZS5wcm9wcy50aGVtZS50b0xvd2VyQ2FzZSgpID09PSBDT05GSUcuQkFTRV9USEVNRVMuREFSSy5pZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBvdXRwdXQgKz0gYEBpbXBvcnQgdXJsKCcke2dldFRoZW1lQ1NTRmlsZShDT05GSUcuQkFTRV9USEVNRVMuREFSSy5pZCl9Jyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGA7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoc3R5bGUucHJvcHMudGhlbWUudG9Mb3dlckNhc2UoKSA9PT0gQ09ORklHLkJBU0VfVEhFTUVTLkxJR0hULmlkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG91dHB1dCArPSBgQGltcG9ydCB1cmwoJyR7Z2V0VGhlbWVDU1NGaWxlKENPTkZJRy5CQVNFX1RIRU1FUy5MSUdIVC5pZCl9Jyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGA7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKHN0eWxlLnR5cGUgPT09IENPTkZJRy5USEVNRV9TVFlMRVMuU1RZTEUpIHtcclxuICAgICAgICAgICAgICAgIGlmIChzdHlsZS5wcm9wcyAmJiBzdHlsZS5wcm9wcy50ZXh0ICE9PSBcIlwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgb3V0cHV0ICs9IGAke3N0eWxlLnByb3BzLnRleHQgfHwgJyd9XHJcbiAgICAgICAgICAgICAgICAgICAgYDtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSBlbHNlIGlmIChzdHlsZS50eXBlID09PSBDT05GSUcuVEhFTUVfU1RZTEVTLkJHX0lNQUdFKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoc3R5bGUucHJvcHMgJiYgc3R5bGUucHJvcHMudXJsICE9PSBcIlwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgb3V0cHV0ICs9IGBcclxuLm1haW4tdmlldywgLnNpZGVtZW51LW9wZW4gLnNpZGVtZW51LCAubmF2YmFyLCAuZGFzaGJvYXJkLWNvbnRhaW5lciB7XHJcbmJhY2tncm91bmQ6IHVybChcIiR7c3R5bGUucHJvcHMudXJsfVwiKVxyXG5uby1yZXBlYXQgY2VudGVyIGNlbnRlciBmaXhlZDtcclxuLXdlYmtpdC1iYWNrZ3JvdW5kLXNpemU6IGNvdmVyO1xyXG4tbW96LWJhY2tncm91bmQtc2l6ZTogY292ZXI7XHJcbi1vLWJhY2tncm91bmQtc2l6ZTogY292ZXI7XHJcbmJhY2tncm91bmQtc2l6ZTogY292ZXI7XHJcbn1cclxuICAgICAgICAgICAgICAgICAgICBgO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgcmV0dXJuIG91dHB1dDtcclxuICAgIH1cclxuICAgIHB1YmxpYyBnZXRUaGVtZUNvbnRlbnQoKTogc3RyaW5nIHtcclxuICAgICAgICBsZXQgb3V0cHV0ID0gJyc7XHJcbiAgICAgICAgaWYgKHRoaXMuc3R5bGVzICYmIHRoaXMuc3R5bGVzLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgb3V0cHV0ICs9IHRoaXMuY29uc3RydWN0VGhlbWUodGhpcy5zdHlsZXMuZmlsdGVyKHN0eWxlID0+IHN0eWxlLnR5cGUgPT09IENPTkZJRy5USEVNRV9TVFlMRVMuVVJMKSk7XHJcbiAgICAgICAgICAgIG91dHB1dCArPSB0aGlzLmNvbnN0cnVjdFRoZW1lKHRoaXMuc3R5bGVzLmZpbHRlcihzdHlsZSA9PiBzdHlsZS50eXBlID09PSBDT05GSUcuVEhFTUVfU1RZTEVTLlNUWUxFKSk7XHJcbiAgICAgICAgICAgIG91dHB1dCArPSB0aGlzLmNvbnN0cnVjdFRoZW1lKHRoaXMuc3R5bGVzLmZpbHRlcihzdHlsZSA9PiBzdHlsZS50eXBlICE9PSBDT05GSUcuVEhFTUVfU1RZTEVTLlVSTCAmJiBzdHlsZS50eXBlICE9PSBDT05GSUcuVEhFTUVfU1RZTEVTLlNUWUxFKSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBvdXRwdXQ7XHJcbiAgICB9XHJcbn1cclxuXHJcbmNsYXNzIEJvb21UaGVtZUN0bCBleHRlbmRzIFBhbmVsQ3RybCB7XHJcbiAgICBwdWJsaWMgc3RhdGljIHRlbXBsYXRlVXJsID0gXCJwYXJ0aWFscy9tb2R1bGUuaHRtbFwiO1xyXG4gICAgcHVibGljIHNjb3BlOiBhbnk7XHJcbiAgICBwdWJsaWMgY3RybDogYW55O1xyXG4gICAgcHVibGljIGVsZW06IGFueTtcclxuICAgIHB1YmxpYyBhdHRyczogYW55O1xyXG4gICAgcHVibGljIGFjdGl2ZUVkaXRvclRhYkluZGV4OiBudW1iZXI7XHJcbiAgICBwdWJsaWMgcnVudGltZVRoZW1lU2V0OiBCb29sZWFuO1xyXG4gICAgcHVibGljIHJ1bnRpbWVUaGVtZUluZGV4OiBudW1iZXI7XHJcbiAgICBwdWJsaWMgYmFzZV90aGVtZV9vcHRpb25zOiBhbnkgPSBbQ09ORklHLkJBU0VfVEhFTUVTLkRFRkFVTFQsIENPTkZJRy5CQVNFX1RIRU1FUy5EQVJLLCBDT05GSUcuQkFTRV9USEVNRVMuTElHSFRdLm1hcCh0aGVtZSA9PiB7XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgdGV4dDogdGhlbWUubmFtZSxcclxuICAgICAgICAgICAgdmFsdWU6IHRoZW1lLmlkXHJcbiAgICAgICAgfTtcclxuICAgIH0pO1xyXG4gICAgY29uc3RydWN0b3IoJHNjb3BlLCAkaW5qZWN0b3IpIHtcclxuICAgICAgICBzdXBlcigkc2NvcGUsICRpbmplY3Rvcik7XHJcbiAgICAgICAgXy5kZWZhdWx0cyh0aGlzLnBhbmVsLCB7fSk7XHJcbiAgICAgICAgdGhpcy5wYW5lbC50cmFuc3BhcmVudCA9IHRydWU7XHJcbiAgICAgICAgdGhpcy5wYW5lbC50aGVtZXMgPSB0aGlzLnBhbmVsLnRoZW1lcyB8fCBbXHJcbiAgICAgICAgICAgIG5ldyBCb29tVGhlbWUoe1xyXG4gICAgICAgICAgICAgICAgbmFtZTogQ09ORklHLkZJUlNUX1RIRU1FX05BTUUsXHJcbiAgICAgICAgICAgICAgICBzdHlsZXM6IFtcclxuICAgICAgICAgICAgICAgICAgICBuZXcgQm9vbVRoZW1lU3R5bGUoQ09ORklHLlRIRU1FX1NUWUxFUy5CQVNFX1RIRU1FLCB7IHRoZW1lOiBDT05GSUcuQkFTRV9USEVNRVMuREVGQVVMVC5pZCB9KSxcclxuICAgICAgICAgICAgICAgICAgICBuZXcgQm9vbVRoZW1lU3R5bGUoQ09ORklHLlRIRU1FX1NUWUxFUy5CR19JTUFHRSwgeyB1cmw6IENPTkZJRy5ERUZBVUxUX1RIRU1FX0JHX0lNQUdFIH0pXHJcbiAgICAgICAgICAgICAgICBdXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgXTtcclxuICAgICAgICB0aGlzLnBhbmVsLmFjdGl2ZVRoZW1lSWQgPSB0aGlzLnBhbmVsLmFjdGl2ZVRoZW1lSWQgfHwgMDtcclxuICAgICAgICB0aGlzLmFjdGl2ZUVkaXRvclRhYkluZGV4ID0gdGhpcy5wYW5lbC5hY3RpdmVUaGVtZUlkID49IDAgPyB0aGlzLnBhbmVsLmFjdGl2ZVRoZW1lSWQgOiAtMTtcclxuICAgICAgICB0aGlzLnJ1bnRpbWVUaGVtZVNldCA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMucnVudGltZVRoZW1lSW5kZXggPSB0aGlzLnBhbmVsLmFjdGl2ZVRoZW1lSWQgPj0gMCA/IHRoaXMucGFuZWwuYWN0aXZlVGhlbWVJZCA6IDA7XHJcbiAgICAgICAgdGhpcy51cGRhdGVQcm90b3R5cGVzKCk7XHJcbiAgICAgICAgdGhpcy5ldmVudHMub24oXCJpbml0LWVkaXQtbW9kZVwiLCB0aGlzLm9uSW5pdEVkaXRNb2RlLmJpbmQodGhpcykpO1xyXG4gICAgfVxyXG4gICAgcHJpdmF0ZSB1cGRhdGVQcm90b3R5cGVzKCk6IHZvaWQge1xyXG4gICAgICAgIGlmICh0aGlzLnBhbmVsLnRoZW1lcyAmJiB0aGlzLnBhbmVsLnRoZW1lcy5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgIHRoaXMucGFuZWwudGhlbWVzLm1hcCh0aGVtZSA9PiB7XHJcbiAgICAgICAgICAgICAgICBPYmplY3Quc2V0UHJvdG90eXBlT2YodGhlbWUsIEJvb21UaGVtZS5wcm90b3R5cGUpO1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoZW1lLnN0eWxlcyAmJiB0aGVtZS5zdHlsZXMubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoZW1lLnN0eWxlcy5tYXAoc3R5bGUgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBPYmplY3Quc2V0UHJvdG90eXBlT2Yoc3R5bGUsIEJvb21UaGVtZVN0eWxlLnByb3RvdHlwZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhlbWU7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHByaXZhdGUgb25Jbml0RWRpdE1vZGUoKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5hZGRFZGl0b3JUYWIoXCJUaGVtZVwiLCBcInB1YmxpYy9wbHVnaW5zL3llc29yZXllcmFtLWJvb210aGVtZS1wYW5lbC9wYXJ0aWFscy9vcHRpb25zLmh0bWxcIiwgMik7XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgYWRkVGhlbWUoKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5wYW5lbC50aGVtZXMgPSB0aGlzLnBhbmVsLnRoZW1lcyB8fCBbXTtcclxuICAgICAgICB0aGlzLnBhbmVsLnRoZW1lcy5wdXNoKG5ldyBCb29tVGhlbWUoe1xyXG4gICAgICAgICAgICBuYW1lOiBgVGhlbWUgJHt0aGlzLnBhbmVsLnRoZW1lcy5sZW5ndGggKyAxfWBcclxuICAgICAgICB9KSk7XHJcbiAgICAgICAgdGhpcy5hY3RpdmVFZGl0b3JUYWJJbmRleCA9IHRoaXMucGFuZWwudGhlbWVzLmxlbmd0aCAtIDE7XHJcbiAgICAgICAgdGhpcy5ydW50aW1lVGhlbWVJbmRleCA9IHRoaXMucGFuZWwudGhlbWVzLmxlbmd0aCAtIDE7XHJcbiAgICAgICAgdGhpcy5yZW5kZXIoKTtcclxuICAgIH1cclxuICAgIHB1YmxpYyBkZWxldGVUaGVtZShpbmRleDogbnVtYmVyKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5wYW5lbC50aGVtZXMuc3BsaWNlKGluZGV4LCAxKTtcclxuICAgICAgICBpZiAodGhpcy5wYW5lbC5hY3RpdmVUaGVtZUlkID09PSBpbmRleCkge1xyXG4gICAgICAgICAgICB0aGlzLnBhbmVsLmFjdGl2ZVRoZW1lSWQgPSAwO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAodGhpcy5ydW50aW1lVGhlbWVJbmRleCA9PT0gaW5kZXgpIHtcclxuICAgICAgICAgICAgdGhpcy5ydW50aW1lVGhlbWVJbmRleCA9IDA7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh0aGlzLmFjdGl2ZUVkaXRvclRhYkluZGV4ID09PSBpbmRleCkge1xyXG4gICAgICAgICAgICB0aGlzLmFjdGl2ZUVkaXRvclRhYkluZGV4ID0gdGhpcy5jdHJsLnBhbmVsLnRoZW1lcy5sZW5ndGggLSAxO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHB1YmxpYyBzZXRUaGVtZUFzRGVmYXVsdChpbmRleDogbnVtYmVyKSB7XHJcbiAgICAgICAgdGhpcy5jdHJsLnBhbmVsLmFjdGl2ZVRoZW1lSWQgPSBpbmRleDtcclxuICAgICAgICB0aGlzLnJ1bnRpbWVUaGVtZUluZGV4ID0gaW5kZXg7XHJcbiAgICAgICAgdGhpcy5yZW5kZXIoKTtcclxuICAgIH1cclxuICAgIHB1YmxpYyBzZXRydW50aW1lVGhlbWVJbmRleChpbmRleDogbnVtYmVyKSB7XHJcbiAgICAgICAgdGhpcy5ydW50aW1lVGhlbWVTZXQgPSB0cnVlO1xyXG4gICAgICAgIHRoaXMucnVudGltZVRoZW1lSW5kZXggPSBpbmRleDtcclxuICAgICAgICB0aGlzLnJlbmRlcigpO1xyXG4gICAgfVxyXG4gICAgcHVibGljIGxpbWl0VGV4dCh0ZXh0OiBzdHJpbmcsIG1heGxlbmd0aDogTnVtYmVyKTogc3RyaW5nIHtcclxuICAgICAgICBpZiAodGV4dC5zcGxpdChcIlwiKS5sZW5ndGggPiBtYXhsZW5ndGgpIHtcclxuICAgICAgICAgICAgdGV4dCA9IHRleHQuc3Vic3RyaW5nKDAsIE51bWJlcihtYXhsZW5ndGgpIC0gMykgKyBcIi4uLlwiO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdGV4dDtcclxuICAgIH1cclxuICAgIHB1YmxpYyBsaW5rKHNjb3BlOiBhbnksIGVsZW06IGFueSwgYXR0cnM6IGFueSwgY3RybDogYW55KTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5zY29wZSA9IHNjb3BlO1xyXG4gICAgICAgIHRoaXMuZWxlbSA9IGVsZW07XHJcbiAgICAgICAgdGhpcy5hdHRycyA9IGF0dHJzO1xyXG4gICAgICAgIHRoaXMuY3RybCA9IGN0cmw7XHJcbiAgICAgICAgdGhpcy5yZW5kZXIoKTtcclxuICAgIH1cclxufVxyXG5cclxubGV0IGdldFRoZW1lQ1NTRmlsZSA9IGZ1bmN0aW9uIChtb2RlOiBzdHJpbmcpOiBzdHJpbmcge1xyXG4gICAgbGV0IGZpbGVuYW1lID0gJyc7XHJcbiAgICBpZiAoW1wiZGFya1wiLCBcImxpZ2h0XCJdLmluZGV4T2YobW9kZS50b0xvd2VyQ2FzZSgpKSA+IC0xICYmIHdpbmRvdy5wZXJmb3JtYW5jZSkge1xyXG4gICAgICAgIGxldCBhcHBmaWxlcyA9IHdpbmRvdy5wZXJmb3JtYW5jZS5nZXRFbnRyaWVzKCkubWFwKGUgPT4gZS5uYW1lKS5maWx0ZXIoZSA9PiBlLmVuZHNXaXRoKFwiLmpzXCIpKS5maWx0ZXIoZSA9PiBlLmluZGV4T2YoXCIvcHVibGljL2J1aWxkL2FwcC5cIikgPiAtMSk7XHJcbiAgICAgICAgaWYgKGFwcGZpbGVzICYmIGFwcGZpbGVzLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgZmlsZW5hbWUgPSBhcHBmaWxlc1swXS5yZXBsYWNlKGAvcHVibGljL2J1aWxkL2FwcC5gLCBgL3B1YmxpYy9idWlsZC9ncmFmYW5hLiR7bW9kZS50b0xvd2VyQ2FzZSgpfS5gKS5zbGljZSgwLCAtMykgKyBcIi5jc3NcIjtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gZmlsZW5hbWU7XHJcbn07XHJcblxyXG5Cb29tVGhlbWVDdGwucHJvdG90eXBlLnJlbmRlciA9IGZ1bmN0aW9uICgpIHtcclxuXHJcbiAgICAvLyAjcmVnaW9uIFBhbmVsIFVJIE9wdGlvbnNcclxuICAgIGlmICh0aGlzLmN0cmwucGFuZWwudGl0bGUgPT09IFwiUGFuZWwgVGl0bGVcIikge1xyXG4gICAgICAgIHRoaXMuY3RybC5wYW5lbC50aXRsZSA9IFwiXCI7XHJcbiAgICB9XHJcbiAgICBpZiAodGhpcy5jdHJsLnBhbmVsLmdyaWRQb3MgJiYgdGhpcy5jdHJsLnBhbmVsLmdyaWRQb3MueCA9PT0gMCAmJiB0aGlzLmN0cmwucGFuZWwuZ3JpZFBvcy55ID09PSAwKSB7XHJcbiAgICAgICAgdGhpcy5jdHJsLnBhbmVsLmdyaWRQb3MudyA9IDI0O1xyXG4gICAgICAgIHRoaXMuY3RybC5wYW5lbC5ncmlkUG9zLmggPSAzO1xyXG4gICAgfVxyXG4gICAgLy8gI2VuZHJlZ2lvblxyXG5cclxuICAgIC8vICNyZWdpb24gVGhlbWVzIFJlbmRlcmluZ1xyXG4gICAgbGV0IG91dHB1dCA9ICcnO1xyXG4gICAgXy5lYWNoKHRoaXMucGFuZWwudGhlbWVzLCAodGhlbWUsIGluZGV4KSA9PiB7XHJcbiAgICAgICAgaWYgKHRoaXMucnVudGltZVRoZW1lU2V0ID09PSBmYWxzZSkge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5wYW5lbC5hY3RpdmVUaGVtZUlkID09PSBpbmRleCAmJiB0aGlzLnBhbmVsLmFjdGl2ZVRoZW1lSWQgPj0gMCkge1xyXG4gICAgICAgICAgICAgICAgb3V0cHV0ICs9IHRoZW1lLmdldFRoZW1lQ29udGVudCgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMucnVudGltZVRoZW1lSW5kZXggPT09IGluZGV4ICYmIHRoaXMucnVudGltZVRoZW1lSW5kZXggPj0gMCkge1xyXG4gICAgICAgICAgICAgICAgb3V0cHV0ICs9IHRoZW1lLmdldFRoZW1lQ29udGVudCgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcbiAgICBpZiAodGhpcy5ydW50aW1lVGhlbWVTZXQgPT09IHRydWUpIHtcclxuICAgICAgICBpZiAodGhpcy5ydW50aW1lVGhlbWVJbmRleCA9PT0gQ09ORklHLkJBU0VfVEhFTUVTLkRBUksuaW5kZXhfaWQpIHtcclxuICAgICAgICAgICAgb3V0cHV0ICs9IGBAaW1wb3J0IHVybCgnJHtnZXRUaGVtZUNTU0ZpbGUoQ09ORklHLkJBU0VfVEhFTUVTLkRBUksuaWQpfScpO1xyXG4gICAgICAgICAgICBgO1xyXG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy5ydW50aW1lVGhlbWVJbmRleCA9PT0gQ09ORklHLkJBU0VfVEhFTUVTLkxJR0hULmluZGV4X2lkKSB7XHJcbiAgICAgICAgICAgIG91dHB1dCArPSBgQGltcG9ydCB1cmwoJyR7Z2V0VGhlbWVDU1NGaWxlKENPTkZJRy5CQVNFX1RIRU1FUy5MSUdIVC5pZCl9Jyk7XHJcbiAgICAgICAgICAgIGA7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgY29uc3Qgc3R5bGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzdHlsZScpO1xyXG4gICAgc3R5bGUudHlwZSA9ICd0ZXh0L2Nzcyc7XHJcbiAgICBzdHlsZS5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShvdXRwdXQpKTtcclxuICAgIHRoaXMuZWxlbS5maW5kKFwiI2Jvb20tdGhlbWVcIikuaHRtbChcIlwiKTtcclxuICAgIHRoaXMuZWxlbS5maW5kKFwiI2Jvb20tdGhlbWVcIikuYXBwZW5kKHN0eWxlKTtcclxuICAgIC8vICNlbmRyZWdpb25cclxuXHJcbn07XHJcblxyXG5leHBvcnQgeyBCb29tVGhlbWVDdGwgYXMgUGFuZWxDdHJsIH07XHJcbiJdfQ==