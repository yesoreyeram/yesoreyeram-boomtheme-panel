import { BoomThemeStyle, BoomThemeStyleProps } from './BoomThemeStyle';
import { getThemeCSSFile } from './utils';
import { CONFIG } from './config';

interface BoomThemeInterface {
  name: string;
  styles: BoomThemeStyle[];
}

export class BoomTheme {
  name: string;
  styles: BoomThemeStyle[];
  constructor(options: BoomThemeInterface) {
    this.name = options.name || CONFIG.DEFAULT_THEME_NAME;
    this.styles =
      options.styles.length === 0
        ? [
            new BoomThemeStyle(BoomThemeStyleProps.BaseTheme, { theme: CONFIG.BASE_THEMES.DEFAULT.id }),
            new BoomThemeStyle(BoomThemeStyleProps.BackgroundImage, { url: '' }),
            new BoomThemeStyle(BoomThemeStyleProps.ExternalURL, { url: '' }),
            new BoomThemeStyle(BoomThemeStyleProps.CustomStyle, { text: `` }),
          ]
        : options.styles;
  }
  addStyle(type: BoomThemeStyleProps): void {
    this.styles.push(new BoomThemeStyle(type, {}));
  }
  deleteStyle(index: number): void {
    this.styles.splice(index, 1);
  }
  private constructTheme(styles: any[] = []): string {
    let output = ``;
    styles.forEach((style) => {
      if (style.type === CONFIG.THEME_STYLES.URL) {
        if (style.props && style.props.url !== '') {
          output += `@import url('${style.props.url}');
                    `;
        }
      } else if (style.type === CONFIG.THEME_STYLES.BASE_THEME) {
        if (style.props && style.props.theme !== '') {
          if (style.props.theme.toLowerCase() === CONFIG.BASE_THEMES.DARK.id) {
            output += `@import url('${getThemeCSSFile('dark')}');
                        `;
          } else if (style.props.theme.toLowerCase() === CONFIG.BASE_THEMES.LIGHT.id) {
            output += `@import url('${getThemeCSSFile('light')}');
                        `;
          }
        }
      } else if (style.type === CONFIG.THEME_STYLES.STYLE) {
        if (style.props && style.props.text !== '') {
          output += `${style.props.text || ''}
                    `;
        }
      } else if (style.type === CONFIG.THEME_STYLES.BG_IMAGE) {
        if (style.props && style.props.url !== '') {
          output += `
.main-view, .sidemenu, .sidemenu-open .sidemenu, .navbar, .dashboard-container,.dashboard-container > div, .page-toolbar  {
    background: url("${style.props.url}") no-repeat center center fixed;
    -webkit-background-size: cover;
    -moz-background-size: cover;
    -o-background-size: cover;
    background-size: cover;
}
                    `;
        }
      } else if (style.type === CONFIG.THEME_STYLES.PANEL_CONTAINER_BG_COLOR) {
        if (style.props && style.props.color !== '') {
          output += `
.panel-container, .page-toolbar {
    background-color: ${style.props.color}
}
`;
        }
      }
    });
    return output;
  }
  getThemeContent(): string {
    let output = '';
    if (this.styles && this.styles.length > 0) {
      output += this.constructTheme(this.styles.filter((style) => style.type === CONFIG.THEME_STYLES.URL));
      output += this.constructTheme(this.styles.filter((style) => style.type === CONFIG.THEME_STYLES.STYLE));
      output += this.constructTheme(
        this.styles.filter(
          (style) => style.type !== CONFIG.THEME_STYLES.URL && style.type !== CONFIG.THEME_STYLES.STYLE
        )
      );
    }
    return output;
  }
}
