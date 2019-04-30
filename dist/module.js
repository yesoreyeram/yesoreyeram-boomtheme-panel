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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL21vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O2dCQUsyQixnQ0FBUztnQkFNaEMsc0JBQVksTUFBTSxFQUFFLFNBQVM7b0JBQTdCLFlBQ0ksa0JBQU0sTUFBTSxFQUFFLFNBQVMsQ0FBQyxTQUkzQjtvQkFIRyxnQkFBQyxDQUFDLFFBQVEsQ0FBQyxLQUFJLENBQUMsS0FBSyxFQUFFLEVBQUUsQ0FBQyxDQUFDO29CQUMzQixLQUFJLENBQUMsS0FBSyxDQUFDLFlBQVksR0FBRyxLQUFJLENBQUMsS0FBSyxDQUFDLFlBQVksSUFBSSxFQUFFLENBQUM7b0JBQ3hELEtBQUksQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLGdCQUFnQixFQUFFLEtBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLEtBQUksQ0FBQyxDQUFDLENBQUM7O2dCQUNyRSxDQUFDO2dCQUNPLHFDQUFjLEdBQXRCO29CQUNJLElBQUksQ0FBQyxZQUFZLENBQUMsT0FBTyxFQUFFLGtFQUFrRSxFQUFFLENBQUMsQ0FBQyxDQUFDO2dCQUN0RyxDQUFDO2dCQUNNLHFDQUFjLEdBQXJCO29CQUNJLElBQUksQ0FBQyxLQUFLLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQzt3QkFDekIsR0FBRyxFQUFFLEVBQUU7cUJBQ1YsQ0FBQyxDQUFDO2dCQUNQLENBQUM7Z0JBQ00sMkJBQUksR0FBWCxVQUFZLEtBQVUsRUFBRSxJQUFTLEVBQUUsS0FBVSxFQUFFLElBQVM7b0JBQ3BELElBQUksQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDO29CQUNuQixJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztvQkFDakIsSUFBSSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUM7b0JBQ25CLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDO29CQUNqQixJQUFJLENBQUMsTUFBTSxFQUFFLENBQUM7Z0JBQ2xCLENBQUM7Z0JBekJhLHdCQUFXLEdBQUcsc0JBQXNCLENBQUM7Z0JBMEJ2RCxtQkFBQzthQUFBLEFBM0JELENBQTJCLGVBQVM7O1lBNEJwQyxZQUFZLENBQUMsU0FBUyxDQUFDLE1BQU0sR0FBRztnQkFDNUIsSUFBSSxNQUFNLEdBQUcsRUFBRSxDQUFDO2dCQUNoQixJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLFlBQVksSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxZQUFZLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRTtvQkFDekUsZ0JBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsWUFBWSxFQUFFLFVBQUEsT0FBTzt3QkFDeEMsSUFBSSxPQUFPLElBQUksT0FBTyxDQUFDLEdBQUcsS0FBSyxFQUFFLEVBQUU7NEJBQy9CLE1BQU0sSUFBSSxrQkFBZ0IsT0FBTyxDQUFDLEdBQUcsVUFDcEQsQ0FBQzt5QkFDVztvQkFDTCxDQUFDLENBQUMsQ0FBQztpQkFDTjtnQkFDRCxNQUFNLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsVUFBVSxJQUFJLEVBQUUsQ0FBQztnQkFFM0MsSUFBTSxLQUFLLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxPQUFPLENBQUMsQ0FBQztnQkFDOUMsS0FBSyxDQUFDLElBQUksR0FBRyxVQUFVLENBQUM7Z0JBQ3hCLEtBQUssQ0FBQyxXQUFXLENBQUMsUUFBUSxDQUFDLGNBQWMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO2dCQUVuRCxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDaEQsQ0FBQyxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLy8vPHJlZmVyZW5jZSBwYXRoPVwiLi4vbm9kZV9tb2R1bGVzL2dyYWZhbmEtc2RrLW1vY2tzL2FwcC9oZWFkZXJzL2NvbW1vbi5kLnRzXCIgLz5cclxuXHJcbmltcG9ydCBfIGZyb20gXCJsb2Rhc2hcIjtcclxuaW1wb3J0IHsgUGFuZWxDdHJsIH0gZnJvbSBcImFwcC9wbHVnaW5zL3Nka1wiO1xyXG5cclxuY2xhc3MgQm9vbVRoZW1lQ3RsIGV4dGVuZHMgUGFuZWxDdHJsIHtcclxuICAgIHB1YmxpYyBzdGF0aWMgdGVtcGxhdGVVcmwgPSBcInBhcnRpYWxzL21vZHVsZS5odG1sXCI7XHJcbiAgICBwdWJsaWMgc2NvcGU6IGFueTtcclxuICAgIHB1YmxpYyBjdHJsOiBhbnk7XHJcbiAgICBwdWJsaWMgZWxlbTogYW55O1xyXG4gICAgcHVibGljIGF0dHJzOiBhbnk7XHJcbiAgICBjb25zdHJ1Y3Rvcigkc2NvcGUsICRpbmplY3Rvcikge1xyXG4gICAgICAgIHN1cGVyKCRzY29wZSwgJGluamVjdG9yKTtcclxuICAgICAgICBfLmRlZmF1bHRzKHRoaXMucGFuZWwsIHt9KTtcclxuICAgICAgICB0aGlzLnBhbmVsLmV4dGVybmFsQ1NTcyA9IHRoaXMucGFuZWwuZXh0ZXJuYWxDU1NzIHx8IFtdO1xyXG4gICAgICAgIHRoaXMuZXZlbnRzLm9uKFwiaW5pdC1lZGl0LW1vZGVcIiwgdGhpcy5vbkluaXRFZGl0TW9kZS5iaW5kKHRoaXMpKTtcclxuICAgIH1cclxuICAgIHByaXZhdGUgb25Jbml0RWRpdE1vZGUoKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5hZGRFZGl0b3JUYWIoXCJUaGVtZVwiLCBcInB1YmxpYy9wbHVnaW5zL3llc29yZXllcmFtLWJvb210aGVtZS1wYW5lbC9wYXJ0aWFscy9vcHRpb25zLmh0bWxcIiwgMik7XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgYWRkZXh0ZXJuYWxDU1MoKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5wYW5lbC5leHRlcm5hbENTU3MucHVzaCh7XHJcbiAgICAgICAgICAgIHVybDogXCJcIlxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG4gICAgcHVibGljIGxpbmsoc2NvcGU6IGFueSwgZWxlbTogYW55LCBhdHRyczogYW55LCBjdHJsOiBhbnkpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLnNjb3BlID0gc2NvcGU7XHJcbiAgICAgICAgdGhpcy5lbGVtID0gZWxlbTtcclxuICAgICAgICB0aGlzLmF0dHJzID0gYXR0cnM7XHJcbiAgICAgICAgdGhpcy5jdHJsID0gY3RybDtcclxuICAgICAgICB0aGlzLnJlbmRlcigpO1xyXG4gICAgfVxyXG59XHJcbkJvb21UaGVtZUN0bC5wcm90b3R5cGUucmVuZGVyID0gZnVuY3Rpb24gKCkge1xyXG4gICAgbGV0IG91dHB1dCA9ICcnO1xyXG4gICAgaWYgKHRoaXMuY3RybC5wYW5lbC5leHRlcm5hbENTU3MgJiYgdGhpcy5jdHJsLnBhbmVsLmV4dGVybmFsQ1NTcy5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgXy5lYWNoKHRoaXMuY3RybC5wYW5lbC5leHRlcm5hbENTU3MsIGNzc0ZpbGUgPT4ge1xyXG4gICAgICAgICAgICBpZiAoY3NzRmlsZSAmJiBjc3NGaWxlLnVybCAhPT0gXCJcIikge1xyXG4gICAgICAgICAgICAgICAgb3V0cHV0ICs9IGBAaW1wb3J0IHVybCgnJHtjc3NGaWxlLnVybH0nKTtcclxuYDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG4gICAgb3V0cHV0ICs9IHRoaXMuY3RybC5wYW5lbC5jdXN0b21fY3NzIHx8ICcnO1xyXG5cclxuICAgIGNvbnN0IHN0eWxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3R5bGUnKTtcclxuICAgIHN0eWxlLnR5cGUgPSAndGV4dC9jc3MnO1xyXG4gICAgc3R5bGUuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUob3V0cHV0KSk7XHJcblxyXG4gICAgdGhpcy5lbGVtLmZpbmQoXCIjYm9vbS10aGVtZVwiKS5hcHBlbmQoc3R5bGUpO1xyXG59O1xyXG5leHBvcnQgeyBCb29tVGhlbWVDdGwgYXMgUGFuZWxDdHJsIH07XHJcbiJdfQ==