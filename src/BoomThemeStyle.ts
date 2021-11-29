import { CONFIG } from './config';
export enum BoomThemeStyleProps {
  BaseTheme = 'basetheme',
  BackgroundImage = 'bgimage',
  CustomStyle = 'style',
  ExternalURL = 'url',
  PanelBackground = 'panel-container-bg-color',
  None = 'none',
}
interface BoomThemeStyleInterface {
  type: BoomThemeStyleProps;
}
interface BoomThemeStyleBaseThemeInterface extends BoomThemeStyleInterface {
  type: BoomThemeStyleProps.BaseTheme;
  props: {
    theme: 'default' | 'dark' | 'light';
  };
}
interface BoomThemeStyleBgImageInterface extends BoomThemeStyleInterface {
  type: BoomThemeStyleProps.BackgroundImage;
  props: {
    url: string;
  };
}
interface BoomThemeStyleStyleInterface extends BoomThemeStyleInterface {
  type: BoomThemeStyleProps.CustomStyle;
  props: {
    text: string;
  };
}
interface BoomThemeStyleURLInterface extends BoomThemeStyleInterface {
  type: BoomThemeStyleProps.ExternalURL;
  props: {
    url: string;
  };
}
interface BoomThemePanelContainerBGColorInterface extends BoomThemeStyleInterface {
  type: BoomThemeStyleProps.PanelBackground;
  props: {
    color: string;
  };
}
export type BoomThemeStyleType =
  | BoomThemeStyleBaseThemeInterface
  | BoomThemeStyleBgImageInterface
  | BoomThemeStyleStyleInterface
  | BoomThemeStyleURLInterface
  | BoomThemePanelContainerBGColorInterface;

export class BoomThemeStyle implements BoomThemeStyleInterface {
  type: BoomThemeStyleProps;
  props: any;
  constructor(type: BoomThemeStyleProps, props: any) {
    this.type = type;
    switch (type.toLowerCase()) {
      case BoomThemeStyleProps.BaseTheme:
        this.props = {
          theme: props && props.theme ? props.theme : '',
        };
        break;
      case BoomThemeStyleProps.CustomStyle:
        this.props = {
          text: props && props.text ? props.text : '',
        };
        break;
      case BoomThemeStyleProps.ExternalURL:
        this.props = {
          url: props && props.url ? props.url : '',
        };
        break;
      case BoomThemeStyleProps.BackgroundImage:
        this.props = {
          url: props && props.url ? props.url : '',
        };
        break;
      case CONFIG.THEME_STYLES.PANEL_CONTAINER_BG_COLOR:
        this.props = {
          color: props && props.color ? props.color : '',
        };
        break;
      default:
        this.props = {};
        break;
    }
  }
}
