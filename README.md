# Boom Theme Panel

Theme switcher with custom styles / themes for grafana dashboards.

![image](https://user-images.githubusercontent.com/153843/57070256-ba874200-6cce-11e9-85f5-e0a036eb306b.png)

![image](https://user-images.githubusercontent.com/153843/57070201-99265600-6cce-11e9-9a9c-734121df7cb8.png)

# Features

- Theme switcher
- Multiple themes per dashboard
- Theme builder
- External stylesheets support
- Add inline styles to themes to override styles
- Add many themes as possible without rebuilding / restarting grafana
- Users with view only option can also pick their favourite theme
- Themes applicable to current dashboard only

# Creating Theme

Themes can be created with multiple building blocks like background image, base theme etc.

| Property                    | Description                                                                                              |
| --------------------------- | -------------------------------------------------------------------------------------------------------- |
| Base theme                  | Themes can be built on top of default/dark/light theme. Default is **Default Theme**                     |
| Background image            | Optional property. Can be blank. If specified more than once, last wins. Value should be valid image URL |
| CSS url                     | External theme file. Should be valid CSS file URL                                                        |
| Custom Style / CSS Override | CSS Styles. Should be valid css                                                                          |

# Supported Grafana version

This grafana plugin is tested with the grafna versions 6.x. But other versions are also expected to work.

# Notes

- When adding external stylesheets, make sure CORS enabled for those domains.
- To make panel invisible : Modify following theme panel settings:
  - transparent = true
  - title = ""
  - Disable Theme Picker using panel settings
  - Move this panel to the bottom of the dashboard
  - Adjust the height and width if required.
- This plugin is in very much WIP / dev stage. Expect breaking changes & bugs.

# Known issues

- If any custom plugin is used, dark/light theme switch, base theme will not work for those custom plugins. Refer [this](https://github.com/yesoreyeram/yesoreyeram-boomtheme-panel/issues/3) github issue
