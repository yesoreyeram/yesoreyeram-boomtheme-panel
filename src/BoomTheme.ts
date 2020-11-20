import _ from "lodash";
import { BoomThemeStyle } from './BoomThemeStyle';
import { getThemeCSSFile } from './utils';
import { CONFIG } from './config';

export class BoomTheme {
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