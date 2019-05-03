///<reference path="../node_modules/grafana-sdk-mocks/app/headers/common.d.ts" />

import _ from "lodash";
import { PanelCtrl } from "app/plugins/sdk";

const CONFIG = {
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
    DEFAULT_THEME_BG_IMAGE: `https://images.unsplash.com/photo-1524334228333-0f6db392f8a1`, // Image Credits : https://unsplash.com/photos/fX-qWsXl5x8
    DEFAULT_THEME_NAME: "New Theme",
    DEFAULT_THEME_STYLE: `.panel-container {
    background-color: rgba(0,0,0,0.3);
}`,
    FIRST_THEME_NAME: "Night Theme",
    THEME_STYLES: {
        BASE_THEME: "basetheme",
        BG_IMAGE: "bgimage",
        NONE: "none",
        STYLE: "style",
        URL: "url",
    }
};

class BoomThemeStyle {
    public type: string;
    public props: any;
    constructor(type, props) {
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
}

class BoomTheme {
    public name: string;
    public styles: BoomThemeStyle[];
    constructor(options) {
        this.name = options.name || CONFIG.DEFAULT_THEME_NAME;
        this.styles = options.styles || [
            new BoomThemeStyle(CONFIG.THEME_STYLES.BASE_THEME, { theme: CONFIG.BASE_THEMES.DEFAULT.id }),
            new BoomThemeStyle(CONFIG.THEME_STYLES.BG_IMAGE, { url: "" }),
            new BoomThemeStyle(CONFIG.THEME_STYLES.URL, { url: "" }),
            new BoomThemeStyle(CONFIG.THEME_STYLES.STYLE, { text: `` }),
        ];
    }
    public addStyle(type: string): void {
        this.styles.push(new BoomThemeStyle(type, {}));
    }
    public deleteStyle(index: number): void {
        this.styles.splice(index, 1);
    }
    private constructTheme(styles: any[]): string {
        let output = ``;
        _.each(styles, style => {
            if (style.type === CONFIG.THEME_STYLES.URL) {
                if (style.props && style.props.url !== "") {
                    output += `@import url('${style.props.url}');
                    `;
                }
            } else if (style.type === CONFIG.THEME_STYLES.BASE_THEME) {
                if (style.props && style.props.theme !== "") {
                    if (style.props.theme.toLowerCase() === CONFIG.BASE_THEMES.DARK.id) {
                        output += `@import url('${getThemeCSSFile(CONFIG.BASE_THEMES.DARK.id)}');
                        `;

                    } else if (style.props.theme.toLowerCase() === CONFIG.BASE_THEMES.LIGHT.id) {
                        output += `@import url('${getThemeCSSFile(CONFIG.BASE_THEMES.LIGHT.id)}');
                        `;
                    }
                }
            } else if (style.type === CONFIG.THEME_STYLES.STYLE) {
                if (style.props && style.props.text !== "") {
                    output += `${style.props.text || ''}
                    `;
                }
            } else if (style.type === CONFIG.THEME_STYLES.BG_IMAGE) {
                if (style.props && style.props.url !== "") {
                    output += `
.main-view, .sidemenu, .sidemenu-open .sidemenu, .navbar, .dashboard-container {
    background: url("${style.props.url}")
    no-repeat center center fixed;
    -webkit-background-size: cover;
    -moz-background-size: cover;
    -o-background-size: cover;
    background-size: cover;
}
                    `;
                }
            }
        });
        return output;
    }
    public getThemeContent(): string {
        let output = '';
        if (this.styles && this.styles.length > 0) {
            output += this.constructTheme(this.styles.filter(style => style.type === CONFIG.THEME_STYLES.URL));
            output += this.constructTheme(this.styles.filter(style => style.type === CONFIG.THEME_STYLES.STYLE));
            output += this.constructTheme(this.styles.filter(style => style.type !== CONFIG.THEME_STYLES.URL && style.type !== CONFIG.THEME_STYLES.STYLE));
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
    public base_theme_options: any = [CONFIG.BASE_THEMES.DEFAULT, CONFIG.BASE_THEMES.DARK, CONFIG.BASE_THEMES.LIGHT].map(theme => {
        return {
            text: theme.name,
            value: theme.id
        };
    });
    constructor($scope, $injector) {
        super($scope, $injector);
        _.defaults(this.panel, {});
        this.panel.transparent = true;
        this.panel.themes = this.panel.themes || [
            new BoomTheme({
                name: CONFIG.FIRST_THEME_NAME,
                styles: [
                    new BoomThemeStyle(CONFIG.THEME_STYLES.BASE_THEME, { theme: CONFIG.BASE_THEMES.DEFAULT.id }),
                    new BoomThemeStyle(CONFIG.THEME_STYLES.BG_IMAGE, { url: CONFIG.DEFAULT_THEME_BG_IMAGE }),
                    new BoomThemeStyle(CONFIG.THEME_STYLES.STYLE,{ text : CONFIG.DEFAULT_THEME_STYLE })
                ]
            })
        ];
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
        let appfiles = window.performance.getEntries().map(e => e.name).filter(e => e.endsWith(".js")).filter(e => e.indexOf("/public/build/app.") > -1);
        if (appfiles && appfiles.length > 0) {
            filename = appfiles[0].replace(`/public/build/app.`, `/public/build/grafana.${mode.toLowerCase()}.`).slice(0, -3) + ".css";
        }
    }
    return filename;
};

BoomThemeCtl.prototype.render = function () {

    // #region Panel UI Options
    if (this.ctrl.panel.title === "Panel Title") {
        this.ctrl.panel.title = "";
    }
    if (this.ctrl.panel.gridPos && this.ctrl.panel.gridPos.x === 0 && this.ctrl.panel.gridPos.y === 0) {
        this.ctrl.panel.gridPos.w = 24;
        this.ctrl.panel.gridPos.h = 3;
    }
    // #endregion

    // #region Themes Rendering
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
        if (this.runtimeThemeIndex === CONFIG.BASE_THEMES.DARK.index_id) {
            output += `@import url('${getThemeCSSFile(CONFIG.BASE_THEMES.DARK.id)}');
            `;
        } else if (this.runtimeThemeIndex === CONFIG.BASE_THEMES.LIGHT.index_id) {
            output += `@import url('${getThemeCSSFile(CONFIG.BASE_THEMES.LIGHT.id)}');
            `;
        }
    }
    const style = document.createElement('style');
    style.type = 'text/css';
    style.appendChild(document.createTextNode(output));
    this.elem.find("#boom-theme").html("");
    this.elem.find("#boom-theme").append(style);
    // #endregion

};

export { BoomThemeCtl as PanelCtrl };
