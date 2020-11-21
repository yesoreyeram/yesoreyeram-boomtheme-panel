import { CONFIG } from './config';
Anterface BoomThemeStyleInterface {
  type: 'basetheme' | 'bgimage' | 'style' | 'url' | 'panel-container-bg-color' | 'none';
}
interface BoomThemeStyleBaseThemeInterface extends BoomThemeStyleInterface {
  type: 'basetheme';
  props: {
    theme: 'default' | 'dark' | 'light';
  };
}
interface BoomThemeStyleBgImageInterface extends BoomThemeStyleInterface {
  type: 'bgimage';
  props: {
    url: string;
  };
}
interface BoomThemeStyleStyleInterface extends BoomThemeStyleInterface {
  type: 'style';
  props: {
    text: string;
  };
}
interface BoomThemeStyleURLInterface extends BoomThemeStyleInterface {
  type: 'url';
  props: {
    url: string;
  };
}
interface BoomThemePanelContainerBGColorInterface extends BoomThemeStyleInterface {
  type: 'panel-container-bg-color';
  props: {
    url: string;
  };
}
export type BoomThemeStyleType =
  | BoomThemeStyleBaseThemeInterface
  | BoomThemeStyleBgImageInterface
  | BoomThemeStyleStyleInterface
  | BoomThemeStyleURLInterface
  | BoomThemePanelContainerBGColorInterface;

export class BoomThemeStyle implements BoomThemeStyleInterface {
  type: 'basetheme' | 'bgimage' | 'style' | 'url' | 'panel-container-bg-color' | 'none';
  props: any;
  constructor(type: string, props: any) {
    switch (type.toLowerCase()) {
      case CONFIG.THEME_STYLES.BASE_THEME:
        this.type = 'basetheme';
        this.props = {
          theme: props && props.theme ? props.theme : '',
        };
        break;
      case CONFIG.THEME_STYLES.STYLE:
        this.type = 'style';
        this.props = {
          text: props && props.text ? props.text : '',
        };
        break;
      case CONFIG.THEME_STYLES.URL:
        this.type = 'url';
        this.props = {
          url: props && props.url ? props.url : '',
        };
        break;
      case CONFIG.THEME_STYLES.BG_IMAGE:
        this.type = 'bgimage';
        this.props = {
          url: props && props.url ? props.url : '',
        };
        break;
      case CONFIG.THEME_STYLES.PANEL_CONTAINER_BG_COLOR:
        this.type = 'panel-container-bg-color';
        this.props = {
          color: props && props.color ? props.color : '',
        };
        break;
      default:
        this.type = 'none';
        this.props = {};
        break;
    }
  }
}
