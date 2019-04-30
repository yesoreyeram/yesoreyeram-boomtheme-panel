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
                var output = '';
                if (this.ctrl.panel.externalCSSs && this.ctrl.panel.externalCSSs.length > 0) {
                    lodash_1.default.each(this.ctrl.panel.externalCSSs, function (cssFile) {
                        if (cssFile && cssFile.url !== "") {
                            output += "@import url('" + cssFile.url + "');\n";
                        }
                    });
                }
                output += this.ctrl.panel.custom_css || '';
                var style = document.createElement('style');
                style.type = 'text/css';
                style.appendChild(document.createTextNode(output));
                this.elem.find("#boom-theme").append(style);
            };
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL21vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O2dCQUsyQixnQ0FBUztnQkFNaEMsc0JBQVksTUFBTSxFQUFFLFNBQVM7b0JBQTdCLFlBQ0ksa0JBQU0sTUFBTSxFQUFFLFNBQVMsQ0FBQyxTQUkzQjtvQkFIRyxnQkFBQyxDQUFDLFFBQVEsQ0FBQyxLQUFJLENBQUMsS0FBSyxFQUFFLEVBQUUsQ0FBQyxDQUFDO29CQUMzQixLQUFJLENBQUMsS0FBSyxDQUFDLFlBQVksR0FBRyxLQUFJLENBQUMsS0FBSyxDQUFDLFlBQVksSUFBSSxFQUFFLENBQUM7b0JBQ3hELEtBQUksQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLGdCQUFnQixFQUFFLEtBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLEtBQUksQ0FBQyxDQUFDLENBQUM7O2dCQUNyRSxDQUFDO2dCQUNPLHFDQUFjLEdBQXRCO29CQUNJLElBQUksQ0FBQyxZQUFZLENBQUMsT0FBTyxFQUFFLGtFQUFrRSxFQUFFLENBQUMsQ0FBQyxDQUFDO2dCQUN0RyxDQUFDO2dCQUNNLHFDQUFjLEdBQXJCO29CQUNJLElBQUksQ0FBQyxLQUFLLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQzt3QkFDekIsR0FBRyxFQUFFLEVBQUU7cUJBQ1YsQ0FBQyxDQUFDO2dCQUNQLENBQUM7Z0JBQ00sMkJBQUksR0FBWCxVQUFZLEtBQVUsRUFBRSxJQUFTLEVBQUUsS0FBVSxFQUFFLElBQVM7b0JBQ3BELElBQUksQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDO29CQUNuQixJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztvQkFDakIsSUFBSSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUM7b0JBQ25CLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDO29CQUNqQixJQUFJLENBQUMsTUFBTSxFQUFFLENBQUM7Z0JBQ2xCLENBQUM7Z0JBekJhLHdCQUFXLEdBQUcsc0JBQXNCLENBQUM7Z0JBMEJ2RCxtQkFBQzthQUFBLEFBM0JELENBQTJCLGVBQVM7O1lBNEJwQyxZQUFZLENBQUMsU0FBUyxDQUFDLE1BQU0sR0FBRztnQkFDNUIsSUFBSSxNQUFNLEdBQUcsRUFBRSxDQUFDO2dCQUNoQixJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLFlBQVksSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxZQUFZLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRTtvQkFDekUsZ0JBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsWUFBWSxFQUFFLFVBQUEsT0FBTzt3QkFDeEMsSUFBSSxPQUFPLElBQUksT0FBTyxDQUFDLEdBQUcsS0FBSyxFQUFFLEVBQUU7NEJBQy9CLE1BQU0sSUFBSSxrQkFBZ0IsT0FBTyxDQUFDLEdBQUcsVUFDcEQsQ0FBQzt5QkFDVztvQkFDTCxDQUFDLENBQUMsQ0FBQztpQkFDTjtnQkFDRCxNQUFNLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsVUFBVSxJQUFJLEVBQUUsQ0FBQztnQkFFM0MsSUFBTSxLQUFLLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxPQUFPLENBQUMsQ0FBQztnQkFDOUMsS0FBSyxDQUFDLElBQUksR0FBRyxVQUFVLENBQUM7Z0JBQ3hCLEtBQUssQ0FBQyxXQUFXLENBQUMsUUFBUSxDQUFDLGNBQWMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO2dCQUVuRCxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDaEQsQ0FBQyxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLy8vPHJlZmVyZW5jZSBwYXRoPVwiLi4vbm9kZV9tb2R1bGVzL2dyYWZhbmEtc2RrLW1vY2tzL2FwcC9oZWFkZXJzL2NvbW1vbi5kLnRzXCIgLz5cblxuaW1wb3J0IF8gZnJvbSBcImxvZGFzaFwiO1xuaW1wb3J0IHsgUGFuZWxDdHJsIH0gZnJvbSBcImFwcC9wbHVnaW5zL3Nka1wiO1xuXG5jbGFzcyBCb29tVGhlbWVDdGwgZXh0ZW5kcyBQYW5lbEN0cmwge1xuICAgIHB1YmxpYyBzdGF0aWMgdGVtcGxhdGVVcmwgPSBcInBhcnRpYWxzL21vZHVsZS5odG1sXCI7XG4gICAgcHVibGljIHNjb3BlOiBhbnk7XG4gICAgcHVibGljIGN0cmw6IGFueTtcbiAgICBwdWJsaWMgZWxlbTogYW55O1xuICAgIHB1YmxpYyBhdHRyczogYW55O1xuICAgIGNvbnN0cnVjdG9yKCRzY29wZSwgJGluamVjdG9yKSB7XG4gICAgICAgIHN1cGVyKCRzY29wZSwgJGluamVjdG9yKTtcbiAgICAgICAgXy5kZWZhdWx0cyh0aGlzLnBhbmVsLCB7fSk7XG4gICAgICAgIHRoaXMucGFuZWwuZXh0ZXJuYWxDU1NzID0gdGhpcy5wYW5lbC5leHRlcm5hbENTU3MgfHwgW107XG4gICAgICAgIHRoaXMuZXZlbnRzLm9uKFwiaW5pdC1lZGl0LW1vZGVcIiwgdGhpcy5vbkluaXRFZGl0TW9kZS5iaW5kKHRoaXMpKTtcbiAgICB9XG4gICAgcHJpdmF0ZSBvbkluaXRFZGl0TW9kZSgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5hZGRFZGl0b3JUYWIoXCJUaGVtZVwiLCBcInB1YmxpYy9wbHVnaW5zL3llc29yZXllcmFtLWJvb210aGVtZS1wYW5lbC9wYXJ0aWFscy9vcHRpb25zLmh0bWxcIiwgMik7XG4gICAgfVxuICAgIHB1YmxpYyBhZGRleHRlcm5hbENTUygpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5wYW5lbC5leHRlcm5hbENTU3MucHVzaCh7XG4gICAgICAgICAgICB1cmw6IFwiXCJcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIHB1YmxpYyBsaW5rKHNjb3BlOiBhbnksIGVsZW06IGFueSwgYXR0cnM6IGFueSwgY3RybDogYW55KTogdm9pZCB7XG4gICAgICAgIHRoaXMuc2NvcGUgPSBzY29wZTtcbiAgICAgICAgdGhpcy5lbGVtID0gZWxlbTtcbiAgICAgICAgdGhpcy5hdHRycyA9IGF0dHJzO1xuICAgICAgICB0aGlzLmN0cmwgPSBjdHJsO1xuICAgICAgICB0aGlzLnJlbmRlcigpO1xuICAgIH1cbn1cbkJvb21UaGVtZUN0bC5wcm90b3R5cGUucmVuZGVyID0gZnVuY3Rpb24gKCkge1xuICAgIGxldCBvdXRwdXQgPSAnJztcbiAgICBpZiAodGhpcy5jdHJsLnBhbmVsLmV4dGVybmFsQ1NTcyAmJiB0aGlzLmN0cmwucGFuZWwuZXh0ZXJuYWxDU1NzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgXy5lYWNoKHRoaXMuY3RybC5wYW5lbC5leHRlcm5hbENTU3MsIGNzc0ZpbGUgPT4ge1xuICAgICAgICAgICAgaWYgKGNzc0ZpbGUgJiYgY3NzRmlsZS51cmwgIT09IFwiXCIpIHtcbiAgICAgICAgICAgICAgICBvdXRwdXQgKz0gYEBpbXBvcnQgdXJsKCcke2Nzc0ZpbGUudXJsfScpO1xuYDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuICAgIG91dHB1dCArPSB0aGlzLmN0cmwucGFuZWwuY3VzdG9tX2NzcyB8fCAnJztcblxuICAgIGNvbnN0IHN0eWxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3R5bGUnKTtcbiAgICBzdHlsZS50eXBlID0gJ3RleHQvY3NzJztcbiAgICBzdHlsZS5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShvdXRwdXQpKTtcblxuICAgIHRoaXMuZWxlbS5maW5kKFwiI2Jvb20tdGhlbWVcIikuYXBwZW5kKHN0eWxlKTtcbn07XG5leHBvcnQgeyBCb29tVGhlbWVDdGwgYXMgUGFuZWxDdHJsIH07XG4iXX0=