///<reference path="../node_modules/grafana-sdk-mocks/app/headers/common.d.ts" />

import _ from "lodash";
import { PanelCtrl } from "app/plugins/sdk";

class BoomTheme {
    public name: string;
    public stylesheets: any[];
    public custom_css: string;
    constructor(options) {
        this.name = options.name || "New Theme";
        this.stylesheets = options.stylesheets || [{
            name: "External Style Sheet URL",
            url: ""
        }];
        this.custom_css = options.custom_css || "";
    }
    public addStyleSheet(): void {
        this.stylesheets.push({
            name: "External Style Sheet URL",
            url: ""
        });
    }
    public removeStyleSheet(index: number): void {
        this.stylesheets.splice(index, 1);
    }
    public moveStyleSheet(index: number, direction: string): void {
        let tempElement = this.stylesheets[Number(index)];
        if (direction.toUpperCase() === "UP") {
            this.stylesheets[Number(index)] = this.stylesheets[Number(index) - 1];
            this.stylesheets[Number(index) - 1] = tempElement;
        }
        if (direction.toUpperCase() === "DOWN") {
            this.stylesheets[Number(index)] = this.stylesheets[Number(index) + 1];
            this.stylesheets[Number(index) + 1] = tempElement;
        }

    }
    public getThemeContent(): string {
        let output = '';
        if (this.stylesheets && this.stylesheets.length > 0) {
            _.each(this.stylesheets, cssFile => {
                if (cssFile && cssFile.url !== "") {
                    output += `@import url('${cssFile.url}');
    `;
                }
            });
        }
        output += this.custom_css || '';
        return output;
    }
}

class BoomThemeCtl extends PanelCtrl {
    public static templateUrl = "partials/module.html";
    public scope: any;
    public ctrl: any;
    public elem: any;
    public attrs: any;
    public activeEditorTabIndex: number;
    public runtimeThemeSet: Boolean;
    public runtimeThemeIndex: number;
    constructor($scope, $injector) {
        super($scope, $injector);
        _.defaults(this.panel, {});
        this.panel.themes = this.panel.themes || [new BoomTheme({ name: "Theme 1" })];
        this.panel.externalCSSs = this.panel.externalCSSs || [];
        this.panel.activeThemeId = this.panel.activeThemeId || 0;
        this.activeEditorTabIndex = this.panel.activeThemeId > 0 ? this.panel.activeThemeId : -1;
        this.runtimeThemeSet = false;
        this.runtimeThemeIndex = this.panel.activeThemeId > 0 ? this.panel.activeThemeId : 0;
        this.updatePrototypes();
        this.events.on("init-edit-mode", this.onInitEditMode.bind(this));
    }
    private updatePrototypes(): void {
        this.panel.themes.map(theme => {
            Object.setPrototypeOf(theme, BoomTheme.prototype);
            return theme;
        });
    }
    private onInitEditMode(): void {
        this.addEditorTab("Theme", "public/plugins/yesoreyeram-boomtheme-panel/partials/options.html", 2);
    }
    public addTheme(): void {
        this.panel.themes = this.panel.themes || [];
        this.panel.themes.push(new BoomTheme({
            name: `Theme ${this.panel.themes.length + 1}`
        }));
        this.activeEditorTabIndex = this.panel.themes.length - 1;
    }
    public deleteTheme(index: number): void {
        if (index !== 0) {
            this.panel.themes.splice(index, 1);
            if (this.panel.activeThemeId === index) {
                this.panel.activeThemeId = 0;
            }
            if (this.activeEditorTabIndex === index) {
                this.activeEditorTabIndex = -1;
            }
            if (this.runtimeThemeIndex === index) {
                this.runtimeThemeIndex = 0;
            }
        }
    }
    public setThemeAsDefault(index: number) {
        this.ctrl.panel.activeThemeId = index;
        this.runtimeThemeIndex = index;
        this.render();
    }
    public setruntimeThemeIndex(index: number) {
        this.runtimeThemeSet = true;
        this.runtimeThemeIndex = index;
        this.render();
    }
    public clearTheme() {
        this.panel.activeThemeId = -999;
        this.render();
    }
    public addexternalCSS(): void {
        this.panel.externalCSSs.push({
            url: ""
        });
    }
    public limitText(text: string, maxlength: Number): string {
        if (text.split("").length > maxlength) {
            text = text.substring(0, Number(maxlength) - 3) + "...";
        }
        return text;
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
    _.each(this.panel.themes, (theme, index) => {
        if (this.runtimeThemeSet === false) {
            if (this.panel.activeThemeId === index && this.panel.activeThemeId >= 0) {
                output += theme.getThemeContent();
            }
        } else {
            if (this.runtimeThemeIndex === index && this.runtimeThemeIndex >= 0) {
                output += theme.getThemeContent();
            }
        }
    });

    const style = document.createElement('style');
    style.type = 'text/css';
    style.appendChild(document.createTextNode(output));
    this.elem.find("#boom-theme").html("");
    this.elem.find("#boom-theme").append(style);
};

export { BoomThemeCtl as PanelCtrl };
