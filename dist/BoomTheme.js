System.register(["lodash", "./BoomThemeStyle", "./utils", "./config"], function (exports_1, context_1) {
    "use strict";
    var lodash_1, BoomThemeStyle_1, utils_1, config_1, BoomTheme;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [
            function (lodash_1_1) {
                lodash_1 = lodash_1_1;
            },
            function (BoomThemeStyle_1_1) {
                BoomThemeStyle_1 = BoomThemeStyle_1_1;
            },
            function (utils_1_1) {
                utils_1 = utils_1_1;
            },
            function (config_1_1) {
                config_1 = config_1_1;
            }
        ],
        execute: function () {
            BoomTheme = (function () {
                function BoomTheme(options) {
                    this.name = options.name || config_1.CONFIG.DEFAULT_THEME_NAME;
                    this.styles = options.styles || [
                        new BoomThemeStyle_1.BoomThemeStyle(config_1.CONFIG.THEME_STYLES.BASE_THEME, { theme: config_1.CONFIG.BASE_THEMES.DEFAULT.id }),
                        new BoomThemeStyle_1.BoomThemeStyle(config_1.CONFIG.THEME_STYLES.BG_IMAGE, { url: "" }),
                        new BoomThemeStyle_1.BoomThemeStyle(config_1.CONFIG.THEME_STYLES.URL, { url: "" }),
                        new BoomThemeStyle_1.BoomThemeStyle(config_1.CONFIG.THEME_STYLES.STYLE, { text: "" }),
                    ];
                }
                BoomTheme.prototype.addStyle = function (type) {
                    this.styles.push(new BoomThemeStyle_1.BoomThemeStyle(type, {}));
                };
                BoomTheme.prototype.deleteStyle = function (index) {
                    this.styles.splice(index, 1);
                };
                BoomTheme.prototype.constructTheme = function (styles) {
                    var output = "";
                    lodash_1.default.each(styles, function (style) {
                        if (style.type === config_1.CONFIG.THEME_STYLES.URL) {
                            if (style.props && style.props.url !== "") {
                                output += "@import url('" + style.props.url + "');\n                    ";
                            }
                        }
                        else if (style.type === config_1.CONFIG.THEME_STYLES.BASE_THEME) {
                            if (style.props && style.props.theme !== "") {
                                if (style.props.theme.toLowerCase() === config_1.CONFIG.BASE_THEMES.DARK.id) {
                                    output += "@import url('" + utils_1.getThemeCSSFile(config_1.CONFIG.BASE_THEMES.DARK.id) + "');\n                        ";
                                }
                                else if (style.props.theme.toLowerCase() === config_1.CONFIG.BASE_THEMES.LIGHT.id) {
                                    output += "@import url('" + utils_1.getThemeCSSFile(config_1.CONFIG.BASE_THEMES.LIGHT.id) + "');\n                        ";
                                }
                            }
                        }
                        else if (style.type === config_1.CONFIG.THEME_STYLES.STYLE) {
                            if (style.props && style.props.text !== "") {
                                output += (style.props.text || '') + "\n                    ";
                            }
                        }
                        else if (style.type === config_1.CONFIG.THEME_STYLES.BG_IMAGE) {
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
                        output += this.constructTheme(this.styles.filter(function (style) { return style.type === config_1.CONFIG.THEME_STYLES.URL; }));
                        output += this.constructTheme(this.styles.filter(function (style) { return style.type === config_1.CONFIG.THEME_STYLES.STYLE; }));
                        output += this.constructTheme(this.styles.filter(function (style) { return style.type !== config_1.CONFIG.THEME_STYLES.URL && style.type !== config_1.CONFIG.THEME_STYLES.STYLE; }));
                    }
                    return output;
                };
                return BoomTheme;
            }());
            exports_1("BoomTheme", BoomTheme);
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQm9vbVRoZW1lLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL0Jvb21UaGVtZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztZQUtBO2dCQUdJLG1CQUFZLE9BQU87b0JBQ2YsSUFBSSxDQUFDLElBQUksR0FBRyxPQUFPLENBQUMsSUFBSSxJQUFJLGVBQU0sQ0FBQyxrQkFBa0IsQ0FBQztvQkFDdEQsSUFBSSxDQUFDLE1BQU0sR0FBRyxPQUFPLENBQUMsTUFBTSxJQUFJO3dCQUM1QixJQUFJLCtCQUFjLENBQUMsZUFBTSxDQUFDLFlBQVksQ0FBQyxVQUFVLEVBQUUsRUFBRSxLQUFLLEVBQUUsZUFBTSxDQUFDLFdBQVcsQ0FBQyxPQUFPLENBQUMsRUFBRSxFQUFFLENBQUM7d0JBQzVGLElBQUksK0JBQWMsQ0FBQyxlQUFNLENBQUMsWUFBWSxDQUFDLFFBQVEsRUFBRSxFQUFFLEdBQUcsRUFBRSxFQUFFLEVBQUUsQ0FBQzt3QkFDN0QsSUFBSSwrQkFBYyxDQUFDLGVBQU0sQ0FBQyxZQUFZLENBQUMsR0FBRyxFQUFFLEVBQUUsR0FBRyxFQUFFLEVBQUUsRUFBRSxDQUFDO3dCQUN4RCxJQUFJLCtCQUFjLENBQUMsZUFBTSxDQUFDLFlBQVksQ0FBQyxLQUFLLEVBQUUsRUFBRSxJQUFJLEVBQUUsRUFBRSxFQUFFLENBQUM7cUJBQzlELENBQUM7Z0JBQ04sQ0FBQztnQkFDTSw0QkFBUSxHQUFmLFVBQWdCLElBQVk7b0JBQ3hCLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksK0JBQWMsQ0FBQyxJQUFJLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQztnQkFDbkQsQ0FBQztnQkFDTSwrQkFBVyxHQUFsQixVQUFtQixLQUFhO29CQUM1QixJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxLQUFLLEVBQUUsQ0FBQyxDQUFDLENBQUM7Z0JBQ2pDLENBQUM7Z0JBQ08sa0NBQWMsR0FBdEIsVUFBdUIs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S0FBSyxJQUFJLE9BQUEsS0FBSyxDQUFDLElBQUksS0FBSyxlQUFNLENBQUMsWUFBWSxDQUFDLEdBQUcsSUFBSSxLQUFLLENBQUMsSUFBSSxLQUFLLGVBQU0sQ0FBQyxZQUFZLENBQUMsS0FBSyxFQUFsRixDQUFrRixDQUFDLENBQUMsQ0FBQztxQkFDbEo7b0JBQ0QsT0FBTyxNQUFNLENBQUM7Z0JBQ2xCLENBQUM7Z0JBQ0wsZ0JBQUM7WUFBRCxDQUFDLEFBcEVELElBb0VDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IF8gZnJvbSBcImxvZGFzaFwiO1xuaW1wb3J0IHsgQm9vbVRoZW1lU3R5bGUgfSBmcm9tICcuL0Jvb21UaGVtZVN0eWxlJztcbmltcG9ydCB7IGdldFRoZW1lQ1NTRmlsZSB9IGZyb20gJy4vdXRpbHMnO1xuaW1wb3J0IHsgQ09ORklHIH0gZnJvbSAnLi9jb25maWcnO1xuXG5leHBvcnQgY2xhc3MgQm9vbVRoZW1lIHtcbiAgICBwdWJsaWMgbmFtZTogc3RyaW5nO1xuICAgIHB1YmxpYyBzdHlsZXM6IEJvb21UaGVtZVN0eWxlW107XG4gICAgY29uc3RydWN0b3Iob3B0aW9ucykge1xuICAgICAgICB0aGlzLm5hbWUgPSBvcHRpb25zLm5hbWUgfHwgQ09ORklHLkRFRkFVTFRfVEhFTUVfTkFNRTtcbiAgICAgICAgdGhpcy5zdHlsZXMgPSBvcHRpb25zLnN0eWxlcyB8fCBbXG4gICAgICAgICAgICBuZXcgQm9vbVRoZW1lU3R5bGUoQ09ORklHLlRIRU1FX1NUWUxFUy5CQVNFX1RIRU1FLCB7IHRoZW1lOiBDT05GSUcuQkFTRV9USEVNRVMuREVGQVVMVC5pZCB9KSxcbiAgICAgICAgICAgIG5ldyBCb29tVGhlbWVTdHlsZShDT05GSUcuVEhFTUVfU1RZTEVTLkJHX0lNQUdFLCB7IHVybDogXCJcIiB9KSxcbiAgICAgICAgICAgIG5ldyBCb29tVGhlbWVTdHlsZShDT05GSUcuVEhFTUVfU1RZTEVTLlVSTCwgeyB1cmw6IFwiXCIgfSksXG4gICAgICAgICAgICBuZXcgQm9vbVRoZW1lU3R5bGUoQ09ORklHLlRIRU1FX1NUWUxFUy5TVFlMRSwgeyB0ZXh0OiBgYCB9KSxcbiAgICAgICAgXTtcbiAgICB9XG4gICAgcHVibGljIGFkZFN0eWxlKHR5cGU6IHN0cmluZyk6IHZvaWQge1xuICAgICAgICB0aGlzLnN0eWxlcy5wdXNoKG5ldyBCb29tVGhlbWVTdHlsZSh0eXBlLCB7fSkpO1xuICAgIH1cbiAgICBwdWJsaWMgZGVsZXRlU3R5bGUoaW5kZXg6IG51bWJlcik6IHZvaWQge1xuICAgICAgICB0aGlzLnN0eWxlcy5zcGxpY2UoaW5kZXgsIDEpO1xuICAgIH1cbiAgICBwcml2YXRlIGNvbnN0cnVjdFRoZW1lKHN0eWxlczogYW55W10pOiBzdHJpbmcge1xuICAgICAgICBsZXQgb3V0cHV0ID0gYGA7XG4gICAgICAgIF8uZWFjaChzdHlsZXMsIHN0eWxlID0+IHtcbiAgICAgICAgICAgIGlmIChzdHlsZS50eXBlID09PSBDT05GSUcuVEhFTUVfU1RZTEVTLlVSTCkge1xuICAgICAgICAgICAgICAgIGlmIChzdHlsZS5wcm9wcyAmJiBzdHlsZS5wcm9wcy51cmwgIT09IFwiXCIpIHtcbiAgICAgICAgICAgICAgICAgICAgb3V0cHV0ICs9IGBAaW1wb3J0IHVybCgnJHtzdHlsZS5wcm9wcy51cmx9Jyk7XG4gICAgICAgICAgICAgICAgICAgIGA7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIGlmIChzdHlsZS50eXBlID09PSBDT05GSUcuVEhFTUVfU1RZTEVTLkJBU0VfVEhFTUUpIHtcbiAgICAgICAgICAgICAgICBpZiAoc3R5bGUucHJvcHMgJiYgc3R5bGUucHJvcHMudGhlbWUgIT09IFwiXCIpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHN0eWxlLnByb3BzLnRoZW1lLnRvTG93ZXJDYXNlKCkgPT09IENPTkZJRy5CQVNFX1RIRU1FUy5EQVJLLmlkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBvdXRwdXQgKz0gYEBpbXBvcnQgdXJsKCcke2dldFRoZW1lQ1NTRmlsZShDT05GSUcuQkFTRV9USEVNRVMuREFSSy5pZCl9Jyk7XG4gICAgICAgICAgICAgICAgICAgICAgICBgO1xuXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoc3R5bGUucHJvcHMudGhlbWUudG9Mb3dlckNhc2UoKSA9PT0gQ09ORklHLkJBU0VfVEhFTUVTLkxJR0hULmlkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBvdXRwdXQgKz0gYEBpbXBvcnQgdXJsKCcke2dldFRoZW1lQ1NTRmlsZShDT05GSUcuQkFTRV9USEVNRVMuTElHSFQuaWQpfScpO1xuICAgICAgICAgICAgICAgICAgICAgICAgYDtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gZWxzZSBpZiAoc3R5bGUudHlwZSA9PT0gQ09ORklHLlRIRU1FX1NUWUxFUy5TVFlMRSkge1xuICAgICAgICAgICAgICAgIGlmIChzdHlsZS5wcm9wcyAmJiBzdHlsZS5wcm9wcy50ZXh0ICE9PSBcIlwiKSB7XG4gICAgICAgICAgICAgICAgICAgIG91dHB1dCArPSBgJHtzdHlsZS5wcm9wcy50ZXh0IHx8ICcnfVxuICAgICAgICAgICAgICAgICAgICBgO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gZWxzZSBpZiAoc3R5bGUudHlwZSA9PT0gQ09ORklHLlRIRU1FX1NUWUxFUy5CR19JTUFHRSkge1xuICAgICAgICAgICAgICAgIGlmIChzdHlsZS5wcm9wcyAmJiBzdHlsZS5wcm9wcy51cmwgIT09IFwiXCIpIHtcbiAgICAgICAgICAgICAgICAgICAgb3V0cHV0ICs9IGBcbi5tYWluLXZpZXcsIC5zaWRlbWVudSwgLnNpZGVtZW51LW9wZW4gLnNpZGVtZW51LCAubmF2YmFyLCAuZGFzaGJvYXJkLWNvbnRhaW5lciB7XG4gICAgYmFja2dyb3VuZDogdXJsKFwiJHtzdHlsZS5wcm9wcy51cmx9XCIpXG4gICAgbm8tcmVwZWF0IGNlbnRlciBjZW50ZXIgZml4ZWQ7XG4gICAgLXdlYmtpdC1iYWNrZ3JvdW5kLXNpemU6IGNvdmVyO1xuICAgIC1tb3otYmFja2dyb3VuZC1zaXplOiBjb3ZlcjtcbiAgICAtby1iYWNrZ3JvdW5kLXNpemU6IGNvdmVyO1xuICAgIGJhY2tncm91bmQtc2l6ZTogY292ZXI7XG59XG4gICAgICAgICAgICAgICAgICAgIGA7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIG91dHB1dDtcbiAgICB9XG4gICAgcHVibGljIGdldFRoZW1lQ29udGVudCgpOiBzdHJpbmcge1xuICAgICAgICBsZXQgb3V0cHV0ID0gJyc7XG4gICAgICAgIGlmICh0aGlzLnN0eWxlcyAmJiB0aGlzLnN0eWxlcy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICBvdXRwdXQgKz0gdGhpcy5jb25zdHJ1Y3RUaGVtZSh0aGlzLnN0eWxlcy5maWx0ZXIoc3R5bGUgPT4gc3R5bGUudHlwZSA9PT0gQ09ORklHLlRIRU1FX1NUWUxFUy5VUkwpKTtcbiAgICAgICAgICAgIG91dHB1dCArPSB0aGlzLmNvbnN0cnVjdFRoZW1lKHRoaXMuc3R5bGVzLmZpbHRlcihzdHlsZSA9PiBzdHlsZS50eXBlID09PSBDT05GSUcuVEhFTUVfU1RZTEVTLlNUWUxFKSk7XG4gICAgICAgICAgICBvdXRwdXQgKz0gdGhpcy5jb25zdHJ1Y3RUaGVtZSh0aGlzLnN0eWxlcy5maWx0ZXIoc3R5bGUgPT4gc3R5bGUudHlwZSAhPT0gQ09ORklHLlRIRU1FX1NUWUxFUy5VUkwgJiYgc3R5bGUudHlwZSAhPT0gQ09ORklHLlRIRU1FX1NUWUxFUy5TVFlMRSkpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBvdXRwdXQ7XG4gICAgfVxufVxuIl19