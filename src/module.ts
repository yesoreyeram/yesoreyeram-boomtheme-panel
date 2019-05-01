///<reference path="../node_modules/grafana-sdk-mocks/app/headers/common.d.ts" />

import _ from "lodash";
import { PanelCtrl } from "app/plugins/sdk";

class BoomThemeStyle {
    public type: string;
    public props: any;
    constructor(type, props) {
        switch (type.toLowerCase()) {
            case "style":
                this.type = "style";
                this.props = {
                    text: props && props.text ? props.text : ""
                };
                break;
            case "url":
                this.type = "url";
                this.props = {
                    url: props && props.url ? props.url : ""
                };
                break;
            default:
                this.type = "none";
                this.props = {};
                break;

        }
    }
}

class BoomTheme {
    public name: string;
    public styles: BoomThemeStyle[];
    constructor(options) {
        this.name = options.name || "New Theme";
        this.styles = [
            new BoomThemeStyle("url", { url: "" }),
            new BoomThemeStyle("style", { text: `` })
        ];
    }
    public addStyle(type: string): void {
        if (type.toLowerCase() === "style") {
            this.styles.push(new BoomThemeStyle("style", {}));
        } else if (type.toLowerCase() === "url") {
            this.styles.push(new BoomThemeStyle("url", {}));
        }

    }
    public deleteStyle(index: number): void {
        this.styles.splice(index, 1);
    }
    public getThemeContent(): string {
        let output = '';
        if (this.styles && this.styles.length > 0) {
            _.each(this.styles, style => {
                if (style.type === "url") {
                    if (style.props && style.props.url !== "") {
                        output += `@import url('${style.props.url}');
                        `;
                    }

                } else if (style.type === "style") {
                    if (style.props && style.props.test !== "") {
                        output += `${style.props.text || ''}
                        `;
                    }
                }
            });
        }
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
        this.panel.transparent = true;
        this.panel.themes = this.panel.themes || [new BoomTheme({ name: "Default" })];
        this.panel.activeThemeId = this.panel.activeThemeId || 0;
        this.activeEditorTabIndex = this.panel.activeThemeId >= 0 ? this.panel.activeThemeId : -1;
        this.runtimeThemeSet = false;
        this.runtimeThemeIndex = this.panel.activeThemeId >= 0 ? this.panel.activeThemeId : 0;
        this.updatePrototypes();
        this.events.on("init-edit-mode", this.onInitEditMode.bind(this));
    }
    private updatePrototypes(): void {
        if (this.panel.themes && this.panel.themes.length > 0) {
            this.panel.themes.map(theme => {
                Object.setPrototypeOf(theme, BoomTheme.prototype);
                if (theme.styles && theme.styles.length > 0) {
                    theme.styles.map(style => {
                        Object.setPrototypeOf(style, BoomThemeStyle.prototype);
                    });
                }
                return theme;
            });
        }
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
        this.runtimeThemeIndex = this.panel.themes.length - 1;
        this.render();
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

let getThemeCSSFile = function (mode: string): string {
    let filename = '';
    if (["dark", "light"].indexOf(mode.toLowerCase()) > -1 && window.performance) {
        let appfiles = window.performance.getEntries().map(e => e.name).filter(e => e.indexOf(".css") > -1).filter(e => e.indexOf("/grafana.app") > -1);
        if (appfiles && appfiles.length > 0) {
            filename = appfiles[0].replace(`build/grafana.app`, `build/grafana.${mode.toLowerCase()}`);
        }
    }
    return filename;
};

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
    if (this.runtimeThemeSet === true) {
        if (this.runtimeThemeIndex === -2000) {
            output += `@import url('${getThemeCSSFile("dark")}');
            `;
        } else if (this.runtimeThemeIndex === -3000) {
            output += `@import url('${getThemeCSSFile("light")}');
            `;
        }
    }

    const style = document.createElement('style');
    style.type = 'text/css';
    style.appendChild(document.createTextNode(output));
    this.elem.find("#boom-theme").html("");
    this.elem.find("#boom-theme").append(style);
};

export { BoomThemeCtl as PanelCtrl };
