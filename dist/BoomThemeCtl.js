System.register(["lodash", "app/plugins/sdk", "./BoomTheme", "./BoomThemeStyle", "./utils", "./config"], function (exports_1, context_1) {
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
    var lodash_1, sdk_1, BoomTheme_1, BoomThemeStyle_1, utils_1, config_1, BoomThemeCtl;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [
            function (lodash_1_1) {
                lodash_1 = lodash_1_1;
            },
            function (sdk_1_1) {
                sdk_1 = sdk_1_1;
            },
            function (BoomTheme_1_1) {
                BoomTheme_1 = BoomTheme_1_1;
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
            BoomThemeCtl = (function (_super) {
                __extends(BoomThemeCtl, _super);
                function BoomThemeCtl($scope, $injector) {
                    var _this = _super.call(this, $scope, $injector) || this;
                    _this.base_theme_options = [config_1.CONFIG.BASE_THEMES.DEFAULT, config_1.CONFIG.BASE_THEMES.DARK, config_1.CONFIG.BASE_THEMES.LIGHT].map(function (theme) {
                        return {
                            text: theme.name,
                            value: theme.id
                        };
                    });
                    lodash_1.default.defaults(_this.panel, {});
                    _this.panel.themes = _this.panel.themes || [
                        new BoomTheme_1.BoomTheme({
                            name: config_1.CONFIG.FIRST_THEME_NAME,
                            styles: [
                                new BoomThemeStyle_1.BoomThemeStyle(config_1.CONFIG.THEME_STYLES.BASE_THEME, { theme: config_1.CONFIG.BASE_THEMES.DEFAULT.id }),
                                new BoomThemeStyle_1.BoomThemeStyle(config_1.CONFIG.THEME_STYLES.BG_IMAGE, { url: config_1.CONFIG.DEFAULT_THEME_BG_IMAGE }),
                                new BoomThemeStyle_1.BoomThemeStyle(config_1.CONFIG.THEME_STYLES.STYLE, { text: config_1.CONFIG.DEFAULT_THEME_STYLE })
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
                            Object.setPrototypeOf(theme, BoomTheme_1.BoomTheme.prototype);
                            if (theme.styles && theme.styles.length > 0) {
                                theme.styles.map(function (style) {
                                    Object.setPrototypeOf(style, BoomThemeStyle_1.BoomThemeStyle.prototype);
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
                    this.panel.themes.push(new BoomTheme_1.BoomTheme({
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
                BoomThemeCtl.prototype.setRunTimeThemeIndex = function (index) {
                    this.runtimeThemeSet = true;
                    this.runtimeThemeIndex = index;
                    this.render();
                };
                BoomThemeCtl.prototype.limitText = function (text, maxLength) {
                    if (text.split("").length > maxLength) {
                        text = text.substring(0, Number(maxLength) - 3) + "...";
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
            exports_1("BoomThemeCtl", BoomThemeCtl);
            exports_1("PanelCtrl", BoomThemeCtl);
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
                    if (this.runtimeThemeIndex === config_1.CONFIG.BASE_THEMES.DARK.index_id) {
                        output += "@import url('" + utils_1.getThemeCSSFile(config_1.CONFIG.BASE_THEMES.DARK.id) + "');\n            ";
                    }
                    else if (this.runtimeThemeIndex === config_1.CONFIG.BASE_THEMES.LIGHT.index_id) {
                        output += "@import url('" + utils_1.getThemeCSSFile(config_1.CONFIG.BASE_THEMES.LIGHT.id) + "');\n            ";
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQm9vbVRoZW1lQ3RsLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL0Jvb21UaGVtZUN0bC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O2dCQVNrQyxnQ0FBUztnQkFldkMsc0JBQVksTUFBTSxFQUFFLFNBQVM7b0JBQTdCLFlBQ0ksa0JBQU0sTUFBTSxFQUFFLFNBQVMsQ0FBQyxTQWtCM0I7b0JBekJNLHdCQUFrQixHQUFRLENBQUMsZUFBTSxDQUFDLFdBQVcsQ0FBQyxPQUFPLEVBQUUsZUFBTSxDQUFDLFdBQVcsQ0FBQyxJQUFJLEVBQUUsZUFBTSxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUMsQ0FBQyxHQUFHLENBQUMsVUFBQSxLQUFLO3dCQUN0SCxPQUFPOzRCQUNILElBQUksRUFBRSxLQUFLLENBQUMsSUFBSTs0QkFDaEIsS0FBSyxFQUFFLEtBQUssQ0FBQyxFQUFFO3lCQUNsQixDQUFDO29CQUNOLENBQUMsQ0FBQyxDQUFDO29CQUdDLGdCQUFDLENBQUMsUUFBUSxDQUFDLEtBQUksQ0FBQyxLQUFLLEVBQUUsRUFBRSxDQUFDLENBQUM7b0JBQzNCLEtBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxHQUFHLEtBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxJQUFJO3dCQUNyQyxJQUFJLHFCQUFTLENBQUM7NEJBQ1YsSUFBSSxFQUFFLGVBQU0sQ0FBQyxnQkFBZ0I7NEJBQzdCLE1BQU0sRUFBRTtnQ0FDSixJQUFJLCtCQUFjLENBQUMsZUFBTSxDQUFDLFlBQVksQ0FBQyxVQUFVLEVBQUUsRUFBRSxLQUFLLEVBQUUsZUFBTSxDQUFDLFdBQVcsQ0FBQyxPQUFPLENBQUMsRUFBRSxFQUFFLENBQUM7Z0NBQzVGLElBQUksK0JBQWMsQ0FBQyxlQUFNLENBQUMsWUFBWSxDQUFDLFFBQVEsRUFBRSxFQUFFLEdBQUcsRUFBRSxlQUFNLENBQUMsc0JBQXNCLEVBQUUsQ0FBQztnQ0FD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Q25ELElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQztnQkFDdkMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBR2hELENBQUMsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8vLzxyZWZlcmVuY2UgcGF0aD1cIi4uL25vZGVfbW9kdWxlcy9ncmFmYW5hLXNkay1tb2Nrcy9hcHAvaGVhZGVycy9jb21tb24uZC50c1wiIC8+XG5cbmltcG9ydCBfIGZyb20gXCJsb2Rhc2hcIjtcbmltcG9ydCB7IFBhbmVsQ3RybCB9IGZyb20gXCJhcHAvcGx1Z2lucy9zZGtcIjtcbmltcG9ydCB7IEJvb21UaGVtZSB9IGZyb20gJy4vQm9vbVRoZW1lJztcbmltcG9ydCB7IEJvb21UaGVtZVN0eWxlIH0gZnJvbSAnLi9Cb29tVGhlbWVTdHlsZSc7XG5pbXBvcnQgeyBnZXRUaGVtZUNTU0ZpbGUgfSBmcm9tICcuL3V0aWxzJztcbmltcG9ydCB7IENPTkZJRyB9IGZyb20gJy4vY29uZmlnJztcblxuZXhwb3J0IGNsYXNzIEJvb21UaGVtZUN0bCBleHRlbmRzIFBhbmVsQ3RybCB7XG4gICAgcHVibGljIHN0YXRpYyB0ZW1wbGF0ZVVybCA9IFwicGFydGlhbHMvbW9kdWxlLmh0bWxcIjtcbiAgICBwdWJsaWMgc2NvcGU6IGFueTtcbiAgICBwdWJsaWMgY3RybDogYW55O1xuICAgIHB1YmxpYyBlbGVtOiBhbnk7XG4gICAgcHVibGljIGF0dHJzOiBhbnk7XG4gICAgcHVibGljIGFjdGl2ZUVkaXRvclRhYkluZGV4OiBudW1iZXI7XG4gICAgcHVibGljIHJ1bnRpbWVUaGVtZVNldDogQm9vbGVhbjtcbiAgICBwdWJsaWMgcnVudGltZVRoZW1lSW5kZXg6IG51bWJlcjtcbiAgICBwdWJsaWMgYmFzZV90aGVtZV9vcHRpb25zOiBhbnkgPSBbQ09ORklHLkJBU0VfVEhFTUVTLkRFRkFVTFQsIENPTkZJRy5CQVNFX1RIRU1FUy5EQVJLLCBDT05GSUcuQkFTRV9USEVNRVMuTElHSFRdLm1hcCh0aGVtZSA9PiB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICB0ZXh0OiB0aGVtZS5uYW1lLFxuICAgICAgICAgICAgdmFsdWU6IHRoZW1lLmlkXG4gICAgICAgIH07XG4gICAgfSk7XG4gICAgY29uc3RydWN0b3IoJHNjb3BlLCAkaW5qZWN0b3IpIHtcbiAgICAgICAgc3VwZXIoJHNjb3BlLCAkaW5qZWN0b3IpO1xuICAgICAgICBfLmRlZmF1bHRzKHRoaXMucGFuZWwsIHt9KTtcbiAgICAgICAgdGhpcy5wYW5lbC50aGVtZXMgPSB0aGlzLnBhbmVsLnRoZW1lcyB8fCBbXG4gICAgICAgICAgICBuZXcgQm9vbVRoZW1lKHtcbiAgICAgICAgICAgICAgICBuYW1lOiBDT05GSUcuRklSU1RfVEhFTUVfTkFNRSxcbiAgICAgICAgICAgICAgICBzdHlsZXM6IFtcbiAgICAgICAgICAgICAgICAgICAgbmV3IEJvb21UaGVtZVN0eWxlKENPTkZJRy5USEVNRV9TVFlMRVMuQkFTRV9USEVNRSwgeyB0aGVtZTogQ09ORklHLkJBU0VfVEhFTUVTLkRFRkFVTFQuaWQgfSksXG4gICAgICAgICAgICAgICAgICAgIG5ldyBCb29tVGhlbWVTdHlsZShDT05GSUcuVEhFTUVfU1RZTEVTLkJHX0lNQUdFLCB7IHVybDogQ09ORklHLkRFRkFVTFRfVEhFTUVfQkdfSU1BR0UgfSksXG4gICAgICAgICAgICAgICAgICAgIG5ldyBCb29tVGhlbWVTdHlsZShDT05GSUcuVEhFTUVfU1RZTEVTLlNUWUxFLCB7IHRleHQ6IENPTkZJRy5ERUZBVUxUX1RIRU1FX1NUWUxFIH0pXG4gICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgfSlcbiAgICAgICAgXTtcbiAgICAgICAgdGhpcy5wYW5lbC5hY3RpdmVUaGVtZUlkID0gdGhpcy5wYW5lbC5hY3RpdmVUaGVtZUlkIHx8IDA7XG4gICAgICAgIHRoaXMuYWN0aXZlRWRpdG9yVGFiSW5kZXggPSB0aGlzLnBhbmVsLmFjdGl2ZVRoZW1lSWQgPj0gMCA/IHRoaXMucGFuZWwuYWN0aXZlVGhlbWVJZCA6IC0xO1xuICAgICAgICB0aGlzLnJ1bnRpbWVUaGVtZVNldCA9IGZhbHNlO1xuICAgICAgICB0aGlzLnJ1bnRpbWVUaGVtZUluZGV4ID0gdGhpcy5wYW5lbC5hY3RpdmVUaGVtZUlkID49IDAgPyB0aGlzLnBhbmVsLmFjdGl2ZVRoZW1lSWQgOiAwO1xuICAgICAgICB0aGlzLnVwZGF0ZVByb3RvdHlwZXMoKTtcbiAgICAgICAgdGhpcy5ldmVudHMub24oXCJpbml0LWVkaXQtbW9kZVwiLCB0aGlzLm9uSW5pdEVkaXRNb2RlLmJpbmQodGhpcykpO1xuICAgIH1cbiAgICBwcml2YXRlIHVwZGF0ZVByb3RvdHlwZXMoKTogdm9pZCB7XG4gICAgICAgIGlmICh0aGlzLnBhbmVsLnRoZW1lcyAmJiB0aGlzLnBhbmVsLnRoZW1lcy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICB0aGlzLnBhbmVsLnRoZW1lcy5tYXAodGhlbWUgPT4ge1xuICAgICAgICAgICAgICAgIE9iamVjdC5zZXRQcm90b3R5cGVPZih0aGVtZSwgQm9vbVRoZW1lLnByb3RvdHlwZSk7XG4gICAgICAgICAgICAgICAgaWYgKHRoZW1lLnN0eWxlcyAmJiB0aGVtZS5zdHlsZXMubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICAgICAgICB0aGVtZS5zdHlsZXMubWFwKHN0eWxlID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIE9iamVjdC5zZXRQcm90b3R5cGVPZihzdHlsZSwgQm9vbVRoZW1lU3R5bGUucHJvdG90eXBlKTtcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiB0aGVtZTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfVxuICAgIHByaXZhdGUgb25Jbml0RWRpdE1vZGUoKTogdm9pZCB7XG4gICAgICAgIHRoaXMuYWRkRWRpdG9yVGFiKFwiVGhlbWVcIiwgXCJwdWJsaWMvcGx1Z2lucy95ZXNvcmV5ZXJhbS1ib29tdGhlbWUtcGFuZWwvcGFydGlhbHMvb3B0aW9ucy5odG1sXCIsIDIpO1xuICAgIH1cbiAgICBwdWJsaWMgYWRkVGhlbWUoKTogdm9pZCB7XG4gICAgICAgIHRoaXMucGFuZWwudGhlbWVzID0gdGhpcy5wYW5lbC50aGVtZXMgfHwgW107XG4gICAgICAgIHRoaXMucGFuZWwudGhlbWVzLnB1c2gobmV3IEJvb21UaGVtZSh7XG4gICAgICAgICAgICBuYW1lOiBgVGhlbWUgJHt0aGlzLnBhbmVsLnRoZW1lcy5sZW5ndGggKyAxfWBcbiAgICAgICAgfSkpO1xuICAgICAgICB0aGlzLmFjdGl2ZUVkaXRvclRhYkluZGV4ID0gdGhpcy5wYW5lbC50aGVtZXMubGVuZ3RoIC0gMTtcbiAgICAgICAgdGhpcy5ydW50aW1lVGhlbWVJbmRleCA9IHRoaXMucGFuZWwudGhlbWVzLmxlbmd0aCAtIDE7XG4gICAgICAgIHRoaXMucmVuZGVyKCk7XG4gICAgfVxuICAgIHB1YmxpYyBkZWxldGVUaGVtZShpbmRleDogbnVtYmVyKTogdm9pZCB7XG4gICAgICAgIHRoaXMucGFuZWwudGhlbWVzLnNwbGljZShpbmRleCwgMSk7XG4gICAgICAgIGlmICh0aGlzLnBhbmVsLmFjdGl2ZVRoZW1lSWQgPT09IGluZGV4KSB7XG4gICAgICAgICAgICB0aGlzLnBhbmVsLmFjdGl2ZVRoZW1lSWQgPSAwO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLnJ1bnRpbWVUaGVtZUluZGV4ID09PSBpbmRleCkge1xuICAgICAgICAgICAgdGhpcy5ydW50aW1lVGhlbWVJbmRleCA9IDA7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMuYWN0aXZlRWRpdG9yVGFiSW5kZXggPT09IGluZGV4KSB7XG4gICAgICAgICAgICB0aGlzLmFjdGl2ZUVkaXRvclRhYkluZGV4ID0gdGhpcy5jdHJsLnBhbmVsLnRoZW1lcy5sZW5ndGggLSAxO1xuICAgICAgICB9XG4gICAgfVxuICAgIHB1YmxpYyBzZXRUaGVtZUFzRGVmYXVsdChpbmRleDogbnVtYmVyKSB7XG4gICAgICAgIHRoaXMuY3RybC5wYW5lbC5hY3RpdmVUaGVtZUlkID0gaW5kZXg7XG4gICAgICAgIHRoaXMucnVudGltZVRoZW1lSW5kZXggPSBpbmRleDtcbiAgICAgICAgdGhpcy5yZW5kZXIoKTtcbiAgICB9XG4gICAgcHVibGljIHNldFJ1blRpbWVUaGVtZUluZGV4KGluZGV4OiBudW1iZXIpIHtcbiAgICAgICAgdGhpcy5ydW50aW1lVGhlbWVTZXQgPSB0cnVlO1xuICAgICAgICB0aGlzLnJ1bnRpbWVUaGVtZUluZGV4ID0gaW5kZXg7XG4gICAgICAgIHRoaXMucmVuZGVyKCk7XG4gICAgfVxuICAgIHB1YmxpYyBsaW1pdFRleHQodGV4dDogc3RyaW5nLCBtYXhMZW5ndGg6IE51bWJlcik6IHN0cmluZyB7XG4gICAgICAgIGlmICh0ZXh0LnNwbGl0KFwiXCIpLmxlbmd0aCA+IG1heExlbmd0aCkge1xuICAgICAgICAgICAgdGV4dCA9IHRleHQuc3Vic3RyaW5nKDAsIE51bWJlcihtYXhMZW5ndGgpIC0gMykgKyBcIi4uLlwiO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0ZXh0O1xuICAgIH1cbiAgICBwdWJsaWMgbGluayhzY29wZTogYW55LCBlbGVtOiBhbnksIGF0dHJzOiBhbnksIGN0cmw6IGFueSk6IHZvaWQge1xuICAgICAgICB0aGlzLnNjb3BlID0gc2NvcGU7XG4gICAgICAgIHRoaXMuZWxlbSA9IGVsZW07XG4gICAgICAgIHRoaXMuYXR0cnMgPSBhdHRycztcbiAgICAgICAgdGhpcy5jdHJsID0gY3RybDtcbiAgICAgICAgdGhpcy5yZW5kZXIoKTtcbiAgICB9XG59XG5cbkJvb21UaGVtZUN0bC5wcm90b3R5cGUucmVuZGVyID0gZnVuY3Rpb24gKCkge1xuXG4gICAgLy8gI3JlZ2lvbiBQYW5lbCBVSSBPcHRpb25zXG4gICAgaWYgKHRoaXMuY3RybC5wYW5lbC50aXRsZSA9PT0gXCJQYW5lbCBUaXRsZVwiKSB7XG4gICAgICAgIHRoaXMuY3RybC5wYW5lbC50aXRsZSA9IFwiXCI7XG4gICAgfVxuICAgIGlmICh0aGlzLmN0cmwucGFuZWwuZ3JpZFBvcyAmJiB0aGlzLmN0cmwucGFuZWwuZ3JpZFBvcy54ID09PSAwICYmIHRoaXMuY3RybC5wYW5lbC5ncmlkUG9zLnkgPT09IDApIHtcbiAgICAgICAgdGhpcy5jdHJsLnBhbmVsLmdyaWRQb3MudyA9IDI0O1xuICAgICAgICB0aGlzLmN0cmwucGFuZWwuZ3JpZFBvcy5oID0gMztcbiAgICB9XG4gICAgLy8gI2VuZHJlZ2lvblxuXG4gICAgLy8gI3JlZ2lvbiBUaGVtZXMgUmVuZGVyaW5nXG4gICAgbGV0IG91dHB1dCA9ICcnO1xuICAgIF8uZWFjaCh0aGlzLnBhbmVsLnRoZW1lcywgKHRoZW1lLCBpbmRleCkgPT4ge1xuICAgICAgICBpZiAodGhpcy5ydW50aW1lVGhlbWVTZXQgPT09IGZhbHNlKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5wYW5lbC5hY3RpdmVUaGVtZUlkID09PSBpbmRleCAmJiB0aGlzLnBhbmVsLmFjdGl2ZVRoZW1lSWQgPj0gMCkge1xuICAgICAgICAgICAgICAgIG91dHB1dCArPSB0aGVtZS5nZXRUaGVtZUNvbnRlbnQoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGlmICh0aGlzLnJ1bnRpbWVUaGVtZUluZGV4ID09PSBpbmRleCAmJiB0aGlzLnJ1bnRpbWVUaGVtZUluZGV4ID49IDApIHtcbiAgICAgICAgICAgICAgICBvdXRwdXQgKz0gdGhlbWUuZ2V0VGhlbWVDb250ZW50KCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9KTtcbiAgICBpZiAodGhpcy5ydW50aW1lVGhlbWVTZXQgPT09IHRydWUpIHtcbiAgICAgICAgaWYgKHRoaXMucnVudGltZVRoZW1lSW5kZXggPT09IENPTkZJRy5CQVNFX1RIRU1FUy5EQVJLLmluZGV4X2lkKSB7XG4gICAgICAgICAgICBvdXRwdXQgKz0gYEBpbXBvcnQgdXJsKCcke2dldFRoZW1lQ1NTRmlsZShDT05GSUcuQkFTRV9USEVNRVMuREFSSy5pZCl9Jyk7XG4gICAgICAgICAgICBgO1xuICAgICAgICB9IGVsc2UgaWYgKHRoaXMucnVudGltZVRoZW1lSW5kZXggPT09IENPTkZJRy5CQVNFX1RIRU1FUy5MSUdIVC5pbmRleF9pZCkge1xuICAgICAgICAgICAgb3V0cHV0ICs9IGBAaW1wb3J0IHVybCgnJHtnZXRUaGVtZUNTU0ZpbGUoQ09ORklHLkJBU0VfVEhFTUVTLkxJR0hULmlkKX0nKTtcbiAgICAgICAgICAgIGA7XG4gICAgICAgIH1cbiAgICB9XG4gICAgY29uc3Qgc3R5bGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzdHlsZScpO1xuICAgIHN0eWxlLnR5cGUgPSAndGV4dC9jc3MnO1xuICAgIHN0eWxlLmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKG91dHB1dCkpO1xuICAgIHRoaXMuZWxlbS5maW5kKFwiI2Jvb20tdGhlbWVcIikuaHRtbChcIlwiKTtcbiAgICB0aGlzLmVsZW0uZmluZChcIiNib29tLXRoZW1lXCIpLmFwcGVuZChzdHlsZSk7XG4gICAgLy8gI2VuZHJlZ2lvblxuXG59O1xuXG5leHBvcnQgeyBCb29tVGhlbWVDdGwgYXMgUGFuZWxDdHJsIH07XG4iXX0=