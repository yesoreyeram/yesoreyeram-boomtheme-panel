import { CONFIG } from './config';

export class BoomThemeStyle {
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
