///<reference path="../node_modules/grafana-sdk-mocks/app/headers/common.d.ts" />

import _ from "lodash";
import { PanelCtrl } from "app/plugins/sdk";

class BoomThemeCtl extends PanelCtrl {
    public static templateUrl = "partials/module.html";
    public scope: any;
    public ctrl: any;
    public elem: any;
    public attrs: any;
    constructor($scope, $injector) {
        super($scope, $injector);
        _.defaults(this.panel, {});
        this.panel.externalCSSs = this.panel.externalCSSs || [];
        this.events.on("init-edit-mode", this.onInitEditMode.bind(this));
    }
    private onInitEditMode(): void {
        this.addEditorTab("Theme", "public/plugins/yesoreyeram-boomtheme-panel/partials/options.html", 2);
    }
    public addexternalCSS(): void {
        this.panel.externalCSSs.push({
            url: ""
        });
    }
    public link(scope: any, elem: any, attrs: any, ctrl: any): void {
        this.scope = scope;
        this.elem = elem;
        this.attrs = attrs;
        this.ctrl = ctrl;
        this.render();
    }
}
BoomThemeCtl.prototype.render = function () {
    let output = '';
    if (this.ctrl.panel.externalCSSs && this.ctrl.panel.externalCSSs.length > 0) {
        _.each(this.ctrl.panel.externalCSSs, cssFile => {
            if (cssFile && cssFile.url !== "") {
                output += `@import url('${cssFile.url}');
`;
            }
        });
    }
    output += this.ctrl.panel.custom_css || '';

    const style = document.createElement('style');
    style.type = 'text/css';
    style.appendChild(document.createTextNode(output));

    this.elem.find("#boom-theme").append(style);
};
export { BoomThemeCtl as PanelCtrl };
