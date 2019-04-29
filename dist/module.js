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
    var lodash_1, sdk_1, BoomThemeCtl;
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
            BoomThemeCtl = (function (_super) {
                __extends(BoomThemeCtl, _super);
                function BoomThemeCtl($scope, $injector) {
                    var _this = _super.call(this, $scope, $injector) || this;
                    lodash_1.default.defaults(_this.panel, {});
                    _this.panel.externalCSSs = _this.panel.externalCSSs || [];
                    _this.events.on("init-edit-mode", _this.onInitEditMode.bind(_this));
                    return _this;
                }
                BoomThemeCtl.prototype.onInitEditMode = function () {
                    this.addEditorTab("Theme", "public/plugins/yesoreyeram-boomtheme-panel/partials/options.html", 2);
                };
                BoomThemeCtl.prototype.addexternalCSS = function () {
                    this.panel.externalCSSs.push({
                        url: ""
                    });
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
            BoomThemeCtl.prototype.render = function () {
                var output = "";
                if (this.ctrl.panel.externalCSSs && this.ctrl.panel.externalCSSs.length > 0) {
                    lodash_1.default.each(this.ctrl.panel.externalCSSs, function (cssFile) {
                        if (cssFile && cssFile.url !== "") {
                            output += "\n                <style>\n                    @import url(' " + cssFile.url + "');\n                </style>\n                ";
                        }
                    });
                }
                output += "<style>" + (this.ctrl.panel.custom_css || "") + "</style>";
                this.elem.find("#boom-theme").html(output);
            };
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL21vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O2dCQUsyQixnQ0FBUztnQkFNaEMsc0JBQVksTUFBTSxFQUFFLFNBQVM7b0JBQTdCLFlBQ0ksa0JBQU0sTUFBTSxFQUFFLFNBQVMsQ0FBQyxTQUkzQjtvQkFIRyxnQkFBQyxDQUFDLFFBQVEsQ0FBQyxLQUFJLENBQUMsS0FBSyxFQUFFLEVBQUUsQ0FBQyxDQUFDO29CQUMzQixLQUFJLENBQUMsS0FBSyxDQUFDLFlBQVksR0FBRyxLQUFJLENBQUMsS0FBSyxDQUFDLFlBQVksSUFBSSxFQUFFLENBQUM7b0JBQ3hELEtBQUksQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLGdCQUFnQixFQUFFLEtBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLEtBQUksQ0FBQyxDQUFDLENBQUM7O2dCQUNyRSxDQUFDO2dCQUNPLHFDQUFjLEdBQXRCO29CQUNJLElBQUksQ0FBQyxZQUFZLENBQUMsT0FBTyxFQUFFLGtFQUFrRSxFQUFFLENBQUMsQ0FBQyxDQUFDO2dCQUN0RyxDQUFDO2dCQUNNLHFDQUFjLEdBQXJCO29CQUNJLElBQUksQ0FBQyxLQUFLLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQzt3QkFDekIsR0FBRyxFQUFFLEVBQUU7cUJBQ1YsQ0FBQyxDQUFDO2dCQUNQLENBQUM7Z0JBQ00sMkJBQUksR0FBWCxVQUFZLEtBQVUsRUFBRSxJQUFTLEVBQUUsS0FBVSxFQUFFLElBQVM7b0JBQ3BELElBQUksQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDO29CQUNuQixJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztvQkFDakIsSUFBSSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUM7b0JBQ25CLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDO29CQUNqQixJQUFJLENBQUMsTUFBTSxFQUFFLENBQUM7Z0JBQ2xCLENBQUM7Z0JBekJhLHdCQUFXLEdBQUcsc0JBQXNCLENBQUM7Z0JBMEJ2RCxtQkFBQzthQUFBLEFBM0JELENBQTJCLGVBQVM7O1lBNEJwQyxZQUFZLENBQUMsU0FBUyxDQUFDLE1BQU0sR0FBRztnQkFDNUIsSUFBSSxNQUFNLEdBQUcsRUFBRSxDQUFDO2dCQUNoQixJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLFlBQVksSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxZQUFZLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRTtvQkFDekUsZ0JBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsWUFBWSxFQUFFLFVBQUEsT0FBTzt3QkFDeEMsSUFBSSxPQUFPLElBQUksT0FBTyxDQUFDLEdBQUcsS0FBSyxFQUFFLEVBQUU7NEJBQy9CLE1BQU0sSUFBSSxrRUFFVSxPQUFPLENBQUMsR0FBRyxvREFFOUIsQ0FBQzt5QkFDTDtvQkFDTCxDQUFDLENBQUMsQ0FBQztpQkFDTjtnQkFDRCxNQUFNLElBQUksYUFBVSxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxVQUFVLElBQUksRUFBRSxjQUFVLENBQUM7Z0JBQy9ELElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztZQUMvQyxDQUFDLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvLy88cmVmZXJlbmNlIHBhdGg9XCIuLi9ub2RlX21vZHVsZXMvZ3JhZmFuYS1zZGstbW9ja3MvYXBwL2hlYWRlcnMvY29tbW9uLmQudHNcIiAvPlxyXG5cclxuaW1wb3J0IF8gZnJvbSBcImxvZGFzaFwiO1xyXG5pbXBvcnQgeyBQYW5lbEN0cmwgfSBmcm9tIFwiYXBwL3BsdWdpbnMvc2RrXCI7XHJcblxyXG5jbGFzcyBCb29tVGhlbWVDdGwgZXh0ZW5kcyBQYW5lbEN0cmwge1xyXG4gICAgcHVibGljIHN0YXRpYyB0ZW1wbGF0ZVVybCA9IFwicGFydGlhbHMvbW9kdWxlLmh0bWxcIjtcclxuICAgIHB1YmxpYyBzY29wZTogYW55O1xyXG4gICAgcHVibGljIGN0cmw6IGFueTtcclxuICAgIHB1YmxpYyBlbGVtOiBhbnk7XHJcbiAgICBwdWJsaWMgYXR0cnM6IGFueTtcclxuICAgIGNvbnN0cnVjdG9yKCRzY29wZSwgJGluamVjdG9yKSB7XHJcbiAgICAgICAgc3VwZXIoJHNjb3BlLCAkaW5qZWN0b3IpO1xyXG4gICAgICAgIF8uZGVmYXVsdHModGhpcy5wYW5lbCwge30pO1xyXG4gICAgICAgIHRoaXMucGFuZWwuZXh0ZXJuYWxDU1NzID0gdGhpcy5wYW5lbC5leHRlcm5hbENTU3MgfHwgW107XHJcbiAgICAgICAgdGhpcy5ldmVudHMub24oXCJpbml0LWVkaXQtbW9kZVwiLCB0aGlzLm9uSW5pdEVkaXRNb2RlLmJpbmQodGhpcykpO1xyXG4gICAgfVxyXG4gICAgcHJpdmF0ZSBvbkluaXRFZGl0TW9kZSgpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLmFkZEVkaXRvclRhYihcIlRoZW1lXCIsIFwicHVibGljL3BsdWdpbnMveWVzb3JleWVyYW0tYm9vbXRoZW1lLXBhbmVsL3BhcnRpYWxzL29wdGlvbnMuaHRtbFwiLCAyKTtcclxuICAgIH1cclxuICAgIHB1YmxpYyBhZGRleHRlcm5hbENTUygpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLnBhbmVsLmV4dGVybmFsQ1NTcy5wdXNoKHtcclxuICAgICAgICAgICAgdXJsOiBcIlwiXHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgbGluayhzY29wZTogYW55LCBlbGVtOiBhbnksIGF0dHJzOiBhbnksIGN0cmw6IGFueSk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuc2NvcGUgPSBzY29wZTtcclxuICAgICAgICB0aGlzLmVsZW0gPSBlbGVtO1xyXG4gICAgICAgIHRoaXMuYXR0cnMgPSBhdHRycztcclxuICAgICAgICB0aGlzLmN0cmwgPSBjdHJsO1xyXG4gICAgICAgIHRoaXMucmVuZGVyKCk7XHJcbiAgICB9XHJcbn1cclxuQm9vbVRoZW1lQ3RsLnByb3RvdHlwZS5yZW5kZXIgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICBsZXQgb3V0cHV0ID0gYGA7XHJcbiAgICBpZiAodGhpcy5jdHJsLnBhbmVsLmV4dGVybmFsQ1NTcyAmJiB0aGlzLmN0cmwucGFuZWwuZXh0ZXJuYWxDU1NzLmxlbmd0aCA+IDApIHtcclxuICAgICAgICBfLmVhY2godGhpcy5jdHJsLnBhbmVsLmV4dGVybmFsQ1NTcywgY3NzRmlsZSA9PiB7XHJcbiAgICAgICAgICAgIGlmIChjc3NGaWxlICYmIGNzc0ZpbGUudXJsICE9PSBcIlwiKSB7XHJcbiAgICAgICAgICAgICAgICBvdXRwdXQgKz0gYFxyXG4gICAgICAgICAgICAgICAgPHN0eWxlPlxyXG4gICAgICAgICAgICAgICAgICAgIEBpbXBvcnQgdXJsKCcgJHtjc3NGaWxlLnVybH0nKTtcclxuICAgICAgICAgICAgICAgIDwvc3R5bGU+XHJcbiAgICAgICAgICAgICAgICBgO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbiAgICBvdXRwdXQgKz0gYDxzdHlsZT4ke3RoaXMuY3RybC5wYW5lbC5jdXN0b21fY3NzIHx8IFwiXCJ9PC9zdHlsZT5gO1xyXG4gICAgdGhpcy5lbGVtLmZpbmQoXCIjYm9vbS10aGVtZVwiKS5odG1sKG91dHB1dCk7XHJcbn07XHJcbmV4cG9ydCB7IEJvb21UaGVtZUN0bCBhcyBQYW5lbEN0cmwgfTtcclxuIl19