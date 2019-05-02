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
                BoomTheme.prototype.getThemeContent = function () {
                    var output = '';
                    if (this.styles && this.styles.length > 0) {
                        lodash_1.default.each(this.styles, function (style) {
                            if (style.type === CONFIG.THEME_STYLES.URL) {
                                if (style.props && style.props.url !== "") {
                                    output += "@import url('" + style.props.url + "');\n                        ";
                                }
                            }
                            else if (style.type === CONFIG.THEME_STYLES.BASE_THEME) {
                                if (style.props && style.props.theme !== "") {
                                    if (style.props.theme.toLowerCase() === CONFIG.BASE_THEMES.DARK.id) {
                                        output += "@import url('" + getThemeCSSFile(CONFIG.BASE_THEMES.DARK.id) + "');\n                            ";
                                    }
                                    else if (style.props.theme.toLowerCase() === CONFIG.BASE_THEMES.LIGHT.id) {
                                        output += "@import url('" + getThemeCSSFile(CONFIG.BASE_THEMES.LIGHT.id) + "');\n                            ";
                                    }
                                }
                            }
                            else if (style.type === CONFIG.THEME_STYLES.STYLE) {
                                if (style.props && style.props.text !== "") {
                                    output += (style.props.text || '') + "\n                        ";
                                }
                            }
                            else if (style.type === CONFIG.THEME_STYLES.BG_IMAGE) {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL21vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7WUFLTSxNQUFNLEdBQUc7Z0JBQ1gsV0FBVyxFQUFFO29CQUNULElBQUksRUFBRTt3QkFDRixFQUFFLEVBQUUsTUFBTTt3QkFDVixRQUFRLEVBQUUsQ0FBQyxJQUFJO3dCQUNmLElBQUksRUFBRSxZQUFZO3FCQUNyQjtvQkFDRCxPQUFPLEVBQUU7d0JBQ0wsRUFBRSxFQUFFLFNBQVM7d0JBQ2IsUUFBUSxFQUFFLENBQUMsSUFBSTt3QkFDZixJQUFJLEVBQUUsZUFBZTtxQkFDeEI7b0JBQ0QsS0FBSyxFQUFFO3dCQUNILEVBQUUsRUFBRSxPQUFPO3dCQUNYLFFBQVEsRUFBRSxDQUFDLElBQUk7d0JBQ2YsSUFBSSxFQUFFLGFBQWE7cUJBQ3RCO2lCQUNKO2dCQUNELHNCQUFzQixFQUFFLDhEQUE4RDtnQkFDdEYsa0JBQWtCLEVBQUUsV0FBVztnQkFDL0IsZ0JBQWdCLEVBQUUsWUFBWTtnQkFDOUIsWUFBWSxFQUFFO29CQUNWLFVBQVUsRUFBRSxXQUFXO29CQUN2QixRQUFRLEVBQUUsU0FBUztvQkFDbkIsSUFBSSxFQUFFLE1BQU07b0JBQ1osS0FBSyxFQUFFLE9BQU87b0JBQ2QsR0FBRyxFQUFFLEtBQUs7aUJBQ2I7YUFDSixDQUFDO1lBRUY7Z0JBR0ksd0JBQVksSUFBSSxFQUFFLEtBQUs7b0JBQ25CLFFBQVEsSUFBSSxDQUFDLFdBQVcsRUFBRSxFQUFFO3dCQUN4QixLQUFLLE1BQU0sQ0FBQyxZQUFZLENBQUMsVUFBVTs0QkFDL0IsSUFBSSxDQUFDLElBQUksR0FBRyxNQUFNLENBQUMsWUFBWSxDQUFDLFVBQVUsQ0FBQzs0QkFDM0MsSUFBSSxDQUFDLEtBQUssR0FBRztnQ0FDVCxLQUFLLEVBQUUsS0FBSyxJQUFJLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLEtB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Q0FBQztnQkFDbkQsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDO2dCQUN2QyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUM7WUFHaEQsQ0FBQyxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLy8vPHJlZmVyZW5jZSBwYXRoPVwiLi4vbm9kZV9tb2R1bGVzL2dyYWZhbmEtc2RrLW1vY2tzL2FwcC9oZWFkZXJzL2NvbW1vbi5kLnRzXCIgLz5cclxuXHJcbmltcG9ydCBfIGZyb20gXCJsb2Rhc2hcIjtcclxuaW1wb3J0IHsgUGFuZWxDdHJsIH0gZnJvbSBcImFwcC9wbHVnaW5zL3Nka1wiO1xyXG5cclxuY29uc3QgQ09ORklHID0ge1xyXG4gICAgQkFTRV9USEVNRVM6IHtcclxuICAgICAgICBEQVJLOiB7XHJcbiAgICAgICAgICAgIGlkOiBcImRhcmtcIixcclxuICAgICAgICAgICAgaW5kZXhfaWQ6IC0yMDAwLFxyXG4gICAgICAgICAgICBuYW1lOiBcIkRhcmsgVGhlbWVcIlxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgREVGQVVMVDoge1xyXG4gICAgICAgICAgICBpZDogXCJkZWZhdWx0XCIsXHJcbiAgICAgICAgICAgIGluZGV4X2lkOiAtMTAwMCxcclxuICAgICAgICAgICAgbmFtZTogXCJEZWZhdWx0IFRoZW1lXCJcclxuICAgICAgICB9LFxyXG4gICAgICAgIExJR0hUOiB7XHJcbiAgICAgICAgICAgIGlkOiBcImxpZ2h0XCIsXHJcbiAgICAgICAgICAgIGluZGV4X2lkOiAtMzAwMCxcclxuICAgICAgICAgICAgbmFtZTogXCJMaWdodCBUaGVtZVwiXHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuICAgIERFRkFVTFRfVEhFTUVfQkdfSU1BR0U6IGBodHRwczovL2ltYWdlcy51bnNwbGFzaC5jb20vcGhvdG8tMTUzNDc5NjYzNjkxMi0zYjk1YjNhYjU5ODZgLFxyXG4gICAgREVGQVVMVF9USEVNRV9OQU1FOiBcIk5ldyBUaGVtZVwiLFxyXG4gICAgRklSU1RfVEhFTUVfTkFNRTogXCJCb29tIFRoZW1lXCIsXHJcbiAgICBUSEVNRV9TVFlMRVM6IHtcclxuICAgICAgICBCQVNFX1RIRU1FOiBcImJhc2V0aGVtZVwiLFxyXG4gICAgICAgIEJHX0lNQUdFOiBcImJnaW1hZ2VcIixcclxuICAgICAgICBOT05FOiBcIm5vbmVcIixcclxuICAgICAgICBTVFlMRTogXCJzdHlsZVwiLFxyXG4gICAgICAgIFVSTDogXCJ1cmxcIixcclxuICAgIH1cclxufTtcclxuXHJcbmNsYXNzIEJvb21UaGVtZVN0eWxlIHtcclxuICAgIHB1YmxpYyB0eXBlOiBzdHJpbmc7XHJcbiAgICBwdWJsaWMgcHJvcHM6IGFueTtcclxuICAgIGNvbnN0cnVjdG9yKHR5cGUsIHByb3BzKSB7XHJcbiAgICAgICAgc3dpdGNoICh0eXBlLnRvTG93ZXJDYXNlKCkpIHtcclxuICAgICAgICAgICAgY2FzZSBDT05GSUcuVEhFTUVfU1RZTEVTLkJBU0VfVEhFTUU6XHJcbiAgICAgICAgICAgICAgICB0aGlzLnR5cGUgPSBDT05GSUcuVEhFTUVfU1RZTEVTLkJBU0VfVEhFTUU7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnByb3BzID0ge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoZW1lOiBwcm9wcyAmJiBwcm9wcy50aGVtZSA/IHByb3BzLnRoZW1lIDogXCJcIlxyXG4gICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIENPTkZJRy5USEVNRV9TVFlMRVMuU1RZTEU6XHJcbiAgICAgICAgICAgICAgICB0aGlzLnR5cGUgPSBDT05GSUcuVEhFTUVfU1RZTEVTLlNUWUxFO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5wcm9wcyA9IHtcclxuICAgICAgICAgICAgICAgICAgICB0ZXh0OiBwcm9wcyAmJiBwcm9wcy50ZXh0ID8gcHJvcHMudGV4dCA6IFwiXCJcclxuICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBDT05GSUcuVEhFTUVfU1RZTEVTLlVSTDpcclxuICAgICAgICAgICAgICAgIHRoaXMudHlwZSA9IENPTkZJRy5USEVNRV9TVFlMRVMuVVJMO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5wcm9wcyA9IHtcclxuICAgICAgICAgICAgICAgICAgICB1cmw6IHByb3BzICYmIHByb3BzLnVybCA/IHByb3BzLnVybCA6IFwiXCJcclxuICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBDT05GSUcuVEhFTUVfU1RZTEVTLkJHX0lNQUdFOlxyXG4gICAgICAgICAgICAgICAgdGhpcy50eXBlID0gQ09ORklHLlRIRU1FX1NUWUxFUy5CR19JTUFHRTtcclxuICAgICAgICAgICAgICAgIHRoaXMucHJvcHMgPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdXJsOiBwcm9wcyAmJiBwcm9wcy51cmwgPyBwcm9wcy51cmwgOiBcIlwiXHJcbiAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICB0aGlzLnR5cGUgPSBDT05GSUcuVEhFTUVfU1RZTEVTLk5PTkU7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnByb3BzID0ge307XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcblxyXG5jbGFzcyBCb29tVGhlbWUge1xyXG4gICAgcHVibGljIG5hbWU6IHN0cmluZztcclxuICAgIHB1YmxpYyBzdHlsZXM6IEJvb21UaGVtZVN0eWxlW107XHJcbiAgICBjb25zdHJ1Y3RvcihvcHRpb25zKSB7XHJcbiAgICAgICAgdGhpcy5uYW1lID0gb3B0aW9ucy5uYW1lIHx8IENPTkZJRy5ERUZBVUxUX1RIRU1FX05BTUU7XHJcbiAgICAgICAgdGhpcy5zdHlsZXMgPSBvcHRpb25zLnN0eWxlcyB8fCBbXHJcbiAgICAgICAgICAgIG5ldyBCb29tVGhlbWVTdHlsZShDT05GSUcuVEhFTUVfU1RZTEVTLkJBU0VfVEhFTUUsIHsgdGhlbWU6IENPTkZJRy5CQVNFX1RIRU1FUy5ERUZBVUxULmlkIH0pLFxyXG4gICAgICAgICAgICBuZXcgQm9vbVRoZW1lU3R5bGUoQ09ORklHLlRIRU1FX1NUWUxFUy5CR19JTUFHRSwgeyB1cmw6IFwiXCIgfSksXHJcbiAgICAgICAgICAgIG5ldyBCb29tVGhlbWVTdHlsZShDT05GSUcuVEhFTUVfU1RZTEVTLlVSTCwgeyB1cmw6IFwiXCIgfSksXHJcbiAgICAgICAgICAgIG5ldyBCb29tVGhlbWVTdHlsZShDT05GSUcuVEhFTUVfU1RZTEVTLlNUWUxFLCB7IHRleHQ6IGBgIH0pLFxyXG4gICAgICAgIF07XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgYWRkU3R5bGUodHlwZTogc3RyaW5nKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5zdHlsZXMucHVzaChuZXcgQm9vbVRoZW1lU3R5bGUodHlwZSwge30pKTtcclxuICAgIH1cclxuICAgIHB1YmxpYyBkZWxldGVTdHlsZShpbmRleDogbnVtYmVyKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5zdHlsZXMuc3BsaWNlKGluZGV4LCAxKTtcclxuICAgIH1cclxuICAgIHB1YmxpYyBnZXRUaGVtZUNvbnRlbnQoKTogc3RyaW5nIHtcclxuICAgICAgICBsZXQgb3V0cHV0ID0gJyc7XHJcbiAgICAgICAgaWYgKHRoaXMuc3R5bGVzICYmIHRoaXMuc3R5bGVzLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgXy5lYWNoKHRoaXMuc3R5bGVzLCBzdHlsZSA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZiAoc3R5bGUudHlwZSA9PT0gQ09ORklHLlRIRU1FX1NUWUxFUy5VUkwpIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoc3R5bGUucHJvcHMgJiYgc3R5bGUucHJvcHMudXJsICE9PSBcIlwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG91dHB1dCArPSBgQGltcG9ydCB1cmwoJyR7c3R5bGUucHJvcHMudXJsfScpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBgO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoc3R5bGUudHlwZSA9PT0gQ09ORklHLlRIRU1FX1NUWUxFUy5CQVNFX1RIRU1FKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHN0eWxlLnByb3BzICYmIHN0eWxlLnByb3BzLnRoZW1lICE9PSBcIlwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChzdHlsZS5wcm9wcy50aGVtZS50b0xvd2VyQ2FzZSgpID09PSBDT05GSUcuQkFTRV9USEVNRVMuREFSSy5pZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb3V0cHV0ICs9IGBAaW1wb3J0IHVybCgnJHtnZXRUaGVtZUNTU0ZpbGUoQ09ORklHLkJBU0VfVEhFTUVTLkRBUksuaWQpfScpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYDtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoc3R5bGUucHJvcHMudGhlbWUudG9Mb3dlckNhc2UoKSA9PT0gQ09ORklHLkJBU0VfVEhFTUVTLkxJR0hULmlkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvdXRwdXQgKz0gYEBpbXBvcnQgdXJsKCcke2dldFRoZW1lQ1NTRmlsZShDT05GSUcuQkFTRV9USEVNRVMuTElHSFQuaWQpfScpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoc3R5bGUudHlwZSA9PT0gQ09ORklHLlRIRU1FX1NUWUxFUy5TVFlMRSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChzdHlsZS5wcm9wcyAmJiBzdHlsZS5wcm9wcy50ZXh0ICE9PSBcIlwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG91dHB1dCArPSBgJHtzdHlsZS5wcm9wcy50ZXh0IHx8ICcnfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBgO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoc3R5bGUudHlwZSA9PT0gQ09ORklHLlRIRU1FX1NUWUxFUy5CR19JTUFHRSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChzdHlsZS5wcm9wcyAmJiBzdHlsZS5wcm9wcy51cmwgIT09IFwiXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgb3V0cHV0ICs9IGBcclxuLm1haW4tdmlldywgLnNpZGVtZW51LW9wZW4gLnNpZGVtZW51LCAubmF2YmFyLCAuZGFzaGJvYXJkLWNvbnRhaW5lciB7XHJcbiAgICBiYWNrZ3JvdW5kOiB1cmwoXCIke3N0eWxlLnByb3BzLnVybH1cIilcclxuICAgIG5vLXJlcGVhdCBjZW50ZXIgY2VudGVyIGZpeGVkO1xyXG4gICAgLXdlYmtpdC1iYWNrZ3JvdW5kLXNpemU6IGNvdmVyO1xyXG4gICAgLW1vei1iYWNrZ3JvdW5kLXNpemU6IGNvdmVyO1xyXG4gICAgLW8tYmFja2dyb3VuZC1zaXplOiBjb3ZlcjtcclxuICAgIGJhY2tncm91bmQtc2l6ZTogY292ZXI7XHJcbn1cclxuICAgICAgICAgICAgICAgICAgICAgICAgYDtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gb3V0cHV0O1xyXG4gICAgfVxyXG59XHJcblxyXG5jbGFzcyBCb29tVGhlbWVDdGwgZXh0ZW5kcyBQYW5lbEN0cmwge1xyXG4gICAgcHVibGljIHN0YXRpYyB0ZW1wbGF0ZVVybCA9IFwicGFydGlhbHMvbW9kdWxlLmh0bWxcIjtcclxuICAgIHB1YmxpYyBzY29wZTogYW55O1xyXG4gICAgcHVibGljIGN0cmw6IGFueTtcclxuICAgIHB1YmxpYyBlbGVtOiBhbnk7XHJcbiAgICBwdWJsaWMgYXR0cnM6IGFueTtcclxuICAgIHB1YmxpYyBhY3RpdmVFZGl0b3JUYWJJbmRleDogbnVtYmVyO1xyXG4gICAgcHVibGljIHJ1bnRpbWVUaGVtZVNldDogQm9vbGVhbjtcclxuICAgIHB1YmxpYyBydW50aW1lVGhlbWVJbmRleDogbnVtYmVyO1xyXG4gICAgcHVibGljIGJhc2VfdGhlbWVfb3B0aW9uczogYW55ID0gW0NPTkZJRy5CQVNFX1RIRU1FUy5ERUZBVUxULCBDT05GSUcuQkFTRV9USEVNRVMuREFSSywgQ09ORklHLkJBU0VfVEhFTUVTLkxJR0hUXS5tYXAodGhlbWUgPT4ge1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIHRleHQ6IHRoZW1lLm5hbWUsXHJcbiAgICAgICAgICAgIHZhbHVlOiB0aGVtZS5pZFxyXG4gICAgICAgIH07XHJcbiAgICB9KTtcclxuICAgIGNvbnN0cnVjdG9yKCRzY29wZSwgJGluamVjdG9yKSB7XHJcbiAgICAgICAgc3VwZXIoJHNjb3BlLCAkaW5qZWN0b3IpO1xyXG4gICAgICAgIF8uZGVmYXVsdHModGhpcy5wYW5lbCwge30pO1xyXG4gICAgICAgIHRoaXMucGFuZWwudHJhbnNwYXJlbnQgPSB0cnVlO1xyXG4gICAgICAgIHRoaXMucGFuZWwudGhlbWVzID0gdGhpcy5wYW5lbC50aGVtZXMgfHwgW1xyXG4gICAgICAgICAgICBuZXcgQm9vbVRoZW1lKHtcclxuICAgICAgICAgICAgICAgIG5hbWU6IENPTkZJRy5GSVJTVF9USEVNRV9OQU1FLFxyXG4gICAgICAgICAgICAgICAgc3R5bGVzOiBbXHJcbiAgICAgICAgICAgICAgICAgICAgbmV3IEJvb21UaGVtZVN0eWxlKENPTkZJRy5USEVNRV9TVFlMRVMuQkFTRV9USEVNRSwgeyB0aGVtZTogQ09ORklHLkJBU0VfVEhFTUVTLkRFRkFVTFQuaWQgfSksXHJcbiAgICAgICAgICAgICAgICAgICAgbmV3IEJvb21UaGVtZVN0eWxlKENPTkZJRy5USEVNRV9TVFlMRVMuQkdfSU1BR0UsIHsgdXJsOiBDT05GSUcuREVGQVVMVF9USEVNRV9CR19JTUFHRSB9KVxyXG4gICAgICAgICAgICAgICAgXVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgIF07XHJcbiAgICAgICAgdGhpcy5wYW5lbC5hY3RpdmVUaGVtZUlkID0gdGhpcy5wYW5lbC5hY3RpdmVUaGVtZUlkIHx8IDA7XHJcbiAgICAgICAgdGhpcy5hY3RpdmVFZGl0b3JUYWJJbmRleCA9IHRoaXMucGFuZWwuYWN0aXZlVGhlbWVJZCA+PSAwID8gdGhpcy5wYW5lbC5hY3RpdmVUaGVtZUlkIDogLTE7XHJcbiAgICAgICAgdGhpcy5ydW50aW1lVGhlbWVTZXQgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLnJ1bnRpbWVUaGVtZUluZGV4ID0gdGhpcy5wYW5lbC5hY3RpdmVUaGVtZUlkID49IDAgPyB0aGlzLnBhbmVsLmFjdGl2ZVRoZW1lSWQgOiAwO1xyXG4gICAgICAgIHRoaXMudXBkYXRlUHJvdG90eXBlcygpO1xyXG4gICAgICAgIHRoaXMuZXZlbnRzLm9uKFwiaW5pdC1lZGl0LW1vZGVcIiwgdGhpcy5vbkluaXRFZGl0TW9kZS5iaW5kKHRoaXMpKTtcclxuICAgIH1cclxuICAgIHByaXZhdGUgdXBkYXRlUHJvdG90eXBlcygpOiB2b2lkIHtcclxuICAgICAgICBpZiAodGhpcy5wYW5lbC50aGVtZXMgJiYgdGhpcy5wYW5lbC50aGVtZXMubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICB0aGlzLnBhbmVsLnRoZW1lcy5tYXAodGhlbWUgPT4ge1xyXG4gICAgICAgICAgICAgICAgT2JqZWN0LnNldFByb3RvdHlwZU9mKHRoZW1lLCBCb29tVGhlbWUucHJvdG90eXBlKTtcclxuICAgICAgICAgICAgICAgIGlmICh0aGVtZS5zdHlsZXMgJiYgdGhlbWUuc3R5bGVzLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGVtZS5zdHlsZXMubWFwKHN0eWxlID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgT2JqZWN0LnNldFByb3RvdHlwZU9mKHN0eWxlLCBCb29tVGhlbWVTdHlsZS5wcm90b3R5cGUpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoZW1lO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBwcml2YXRlIG9uSW5pdEVkaXRNb2RlKCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuYWRkRWRpdG9yVGFiKFwiVGhlbWVcIiwgXCJwdWJsaWMvcGx1Z2lucy95ZXNvcmV5ZXJhbS1ib29tdGhlbWUtcGFuZWwvcGFydGlhbHMvb3B0aW9ucy5odG1sXCIsIDIpO1xyXG4gICAgfVxyXG4gICAgcHVibGljIGFkZFRoZW1lKCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMucGFuZWwudGhlbWVzID0gdGhpcy5wYW5lbC50aGVtZXMgfHwgW107XHJcbiAgICAgICAgdGhpcy5wYW5lbC50aGVtZXMucHVzaChuZXcgQm9vbVRoZW1lKHtcclxuICAgICAgICAgICAgbmFtZTogYFRoZW1lICR7dGhpcy5wYW5lbC50aGVtZXMubGVuZ3RoICsgMX1gXHJcbiAgICAgICAgfSkpO1xyXG4gICAgICAgIHRoaXMuYWN0aXZlRWRpdG9yVGFiSW5kZXggPSB0aGlzLnBhbmVsLnRoZW1lcy5sZW5ndGggLSAxO1xyXG4gICAgICAgIHRoaXMucnVudGltZVRoZW1lSW5kZXggPSB0aGlzLnBhbmVsLnRoZW1lcy5sZW5ndGggLSAxO1xyXG4gICAgICAgIHRoaXMucmVuZGVyKCk7XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgZGVsZXRlVGhlbWUoaW5kZXg6IG51bWJlcik6IHZvaWQge1xyXG4gICAgICAgIHRoaXMucGFuZWwudGhlbWVzLnNwbGljZShpbmRleCwgMSk7XHJcbiAgICAgICAgaWYgKHRoaXMucGFuZWwuYWN0aXZlVGhlbWVJZCA9PT0gaW5kZXgpIHtcclxuICAgICAgICAgICAgdGhpcy5wYW5lbC5hY3RpdmVUaGVtZUlkID0gMDtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHRoaXMucnVudGltZVRoZW1lSW5kZXggPT09IGluZGV4KSB7XHJcbiAgICAgICAgICAgIHRoaXMucnVudGltZVRoZW1lSW5kZXggPSAwO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAodGhpcy5hY3RpdmVFZGl0b3JUYWJJbmRleCA9PT0gaW5kZXgpIHtcclxuICAgICAgICAgICAgdGhpcy5hY3RpdmVFZGl0b3JUYWJJbmRleCA9IHRoaXMuY3RybC5wYW5lbC50aGVtZXMubGVuZ3RoIC0gMTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgc2V0VGhlbWVBc0RlZmF1bHQoaW5kZXg6IG51bWJlcikge1xyXG4gICAgICAgIHRoaXMuY3RybC5wYW5lbC5hY3RpdmVUaGVtZUlkID0gaW5kZXg7XHJcbiAgICAgICAgdGhpcy5ydW50aW1lVGhlbWVJbmRleCA9IGluZGV4O1xyXG4gICAgICAgIHRoaXMucmVuZGVyKCk7XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgc2V0cnVudGltZVRoZW1lSW5kZXgoaW5kZXg6IG51bWJlcikge1xyXG4gICAgICAgIHRoaXMucnVudGltZVRoZW1lU2V0ID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLnJ1bnRpbWVUaGVtZUluZGV4ID0gaW5kZXg7XHJcbiAgICAgICAgdGhpcy5yZW5kZXIoKTtcclxuICAgIH1cclxuICAgIHB1YmxpYyBsaW1pdFRleHQodGV4dDogc3RyaW5nLCBtYXhsZW5ndGg6IE51bWJlcik6IHN0cmluZyB7XHJcbiAgICAgICAgaWYgKHRleHQuc3BsaXQoXCJcIikubGVuZ3RoID4gbWF4bGVuZ3RoKSB7XHJcbiAgICAgICAgICAgIHRleHQgPSB0ZXh0LnN1YnN0cmluZygwLCBOdW1iZXIobWF4bGVuZ3RoKSAtIDMpICsgXCIuLi5cIjtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHRleHQ7XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgbGluayhzY29wZTogYW55LCBlbGVtOiBhbnksIGF0dHJzOiBhbnksIGN0cmw6IGFueSk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuc2NvcGUgPSBzY29wZTtcclxuICAgICAgICB0aGlzLmVsZW0gPSBlbGVtO1xyXG4gICAgICAgIHRoaXMuYXR0cnMgPSBhdHRycztcclxuICAgICAgICB0aGlzLmN0cmwgPSBjdHJsO1xyXG4gICAgICAgIHRoaXMucmVuZGVyKCk7XHJcbiAgICB9XHJcbn1cclxuXHJcbmxldCBnZXRUaGVtZUNTU0ZpbGUgPSBmdW5jdGlvbiAobW9kZTogc3RyaW5nKTogc3RyaW5nIHtcclxuICAgIGxldCBmaWxlbmFtZSA9ICcnO1xyXG4gICAgaWYgKFtcImRhcmtcIiwgXCJsaWdodFwiXS5pbmRleE9mKG1vZGUudG9Mb3dlckNhc2UoKSkgPiAtMSAmJiB3aW5kb3cucGVyZm9ybWFuY2UpIHtcclxuICAgICAgICBsZXQgYXBwZmlsZXMgPSB3aW5kb3cucGVyZm9ybWFuY2UuZ2V0RW50cmllcygpLm1hcChlID0+IGUubmFtZSkuZmlsdGVyKGUgPT4gZS5lbmRzV2l0aChcIi5qc1wiKSkuZmlsdGVyKGUgPT4gZS5pbmRleE9mKFwiL3B1YmxpYy9idWlsZC9hcHAuXCIpID4gLTEpO1xyXG4gICAgICAgIGlmIChhcHBmaWxlcyAmJiBhcHBmaWxlcy5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgIGZpbGVuYW1lID0gYXBwZmlsZXNbMF0ucmVwbGFjZShgL3B1YmxpYy9idWlsZC9hcHAuYCwgYC9wdWJsaWMvYnVpbGQvZ3JhZmFuYS4ke21vZGUudG9Mb3dlckNhc2UoKX0uYCkuc2xpY2UoMCwgLTMpICsgXCIuY3NzXCI7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIGZpbGVuYW1lO1xyXG59O1xyXG5cclxuQm9vbVRoZW1lQ3RsLnByb3RvdHlwZS5yZW5kZXIgPSBmdW5jdGlvbiAoKSB7XHJcblxyXG4gICAgLy8gI3JlZ2lvbiBQYW5lbCBVSSBPcHRpb25zXHJcbiAgICBpZiAodGhpcy5jdHJsLnBhbmVsLnRpdGxlID09PSBcIlBhbmVsIFRpdGxlXCIpIHtcclxuICAgICAgICB0aGlzLmN0cmwucGFuZWwudGl0bGUgPSBcIlwiO1xyXG4gICAgfVxyXG4gICAgaWYgKHRoaXMuY3RybC5wYW5lbC5ncmlkUG9zICYmIHRoaXMuY3RybC5wYW5lbC5ncmlkUG9zLnggPT09IDAgJiYgdGhpcy5jdHJsLnBhbmVsLmdyaWRQb3MueSA9PT0gMCkge1xyXG4gICAgICAgIHRoaXMuY3RybC5wYW5lbC5ncmlkUG9zLncgPSAyNDtcclxuICAgICAgICB0aGlzLmN0cmwucGFuZWwuZ3JpZFBvcy5oID0gMztcclxuICAgIH1cclxuICAgIC8vICNlbmRyZWdpb25cclxuXHJcbiAgICAvLyAjcmVnaW9uIFRoZW1lcyBSZW5kZXJpbmdcclxuICAgIGxldCBvdXRwdXQgPSAnJztcclxuICAgIF8uZWFjaCh0aGlzLnBhbmVsLnRoZW1lcywgKHRoZW1lLCBpbmRleCkgPT4ge1xyXG4gICAgICAgIGlmICh0aGlzLnJ1bnRpbWVUaGVtZVNldCA9PT0gZmFsc2UpIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMucGFuZWwuYWN0aXZlVGhlbWVJZCA9PT0gaW5kZXggJiYgdGhpcy5wYW5lbC5hY3RpdmVUaGVtZUlkID49IDApIHtcclxuICAgICAgICAgICAgICAgIG91dHB1dCArPSB0aGVtZS5nZXRUaGVtZUNvbnRlbnQoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLnJ1bnRpbWVUaGVtZUluZGV4ID09PSBpbmRleCAmJiB0aGlzLnJ1bnRpbWVUaGVtZUluZGV4ID49IDApIHtcclxuICAgICAgICAgICAgICAgIG91dHB1dCArPSB0aGVtZS5nZXRUaGVtZUNvbnRlbnQoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG4gICAgaWYgKHRoaXMucnVudGltZVRoZW1lU2V0ID09PSB0cnVlKSB7XHJcbiAgICAgICAgaWYgKHRoaXMucnVudGltZVRoZW1lSW5kZXggPT09IENPTkZJRy5CQVNFX1RIRU1FUy5EQVJLLmluZGV4X2lkKSB7XHJcbiAgICAgICAgICAgIG91dHB1dCArPSBgQGltcG9ydCB1cmwoJyR7Z2V0VGhlbWVDU1NGaWxlKENPTkZJRy5CQVNFX1RIRU1FUy5EQVJLLmlkKX0nKTtcclxuICAgICAgICAgICAgYDtcclxuICAgICAgICB9IGVsc2UgaWYgKHRoaXMucnVudGltZVRoZW1lSW5kZXggPT09IENPTkZJRy5CQVNFX1RIRU1FUy5MSUdIVC5pbmRleF9pZCkge1xyXG4gICAgICAgICAgICBvdXRwdXQgKz0gYEBpbXBvcnQgdXJsKCcke2dldFRoZW1lQ1NTRmlsZShDT05GSUcuQkFTRV9USEVNRVMuTElHSFQuaWQpfScpO1xyXG4gICAgICAgICAgICBgO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIGNvbnN0IHN0eWxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3R5bGUnKTtcclxuICAgIHN0eWxlLnR5cGUgPSAndGV4dC9jc3MnO1xyXG4gICAgc3R5bGUuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUob3V0cHV0KSk7XHJcbiAgICB0aGlzLmVsZW0uZmluZChcIiNib29tLXRoZW1lXCIpLmh0bWwoXCJcIik7XHJcbiAgICB0aGlzLmVsZW0uZmluZChcIiNib29tLXRoZW1lXCIpLmFwcGVuZChzdHlsZSk7XHJcbiAgICAvLyAjZW5kcmVnaW9uXHJcblxyXG59O1xyXG5cclxuZXhwb3J0IHsgQm9vbVRoZW1lQ3RsIGFzIFBhbmVsQ3RybCB9O1xyXG4iXX0=