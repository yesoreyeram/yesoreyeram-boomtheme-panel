///<reference path="../node_modules/grafana-sdk-mocks/app/headers/common.d.ts" />

import _ from "lodash";
import { PanelCtrl } from "app/plugins/sdk";
import { BoomTheme } from './BoomTheme';
import { BoomThemeStyle } from './BoomThemeStyle';
import { getThemeCSSFile } from './utils';
import { CONFIG } from './config';

export class BoomThemeCtl extends PanelCtrl {
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
        this.panel.themes = this.panel.themes || [
            new BoomTheme({
                name: CONFIG.FIRST_THEME_NAME,
                styles: [
                    new BoomThemeStyle(CONFIG.THEME_STYLES.BASE_THEME, { theme: CONFIG.BASE_THEMES.DEFAULT.id }),
                    new BoomThemeStyle(CONFIG.THEME_STYLES.BG_IMAGE, { url: CONFIG.DEFAULT_THEME_BG_IMAGE }),
                    new BoomThemeStyle(CONFIG.THEME_STYLES.STYLE, { text: CONFIG.DEFAULT_THEME_STYLE })
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
    public setRunTimeThemeIndex(index: number) {
        this.runtimeThemeSet = true;
        this.runtimeThemeIndex = index;
        this.render();
    }
    public limitText(text: string, maxLength: Number): string {
        if (text.split("").length > maxLength) {
            text = text.substring(0, Number(maxLength) - 3) + "...";
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
