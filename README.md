# Boom Theme Panel

Theme switcher with custom styles / themes for grafana dashboards.

![image](https://user-images.githubusercontent.com/153843/99795058-0e60b280-2b23-11eb-88fb-fa673a6111ea.png)

![image](https://user-images.githubusercontent.com/153843/99795201-45cf5f00-2b23-11eb-8da7-e6dcb4383c7f.png)


# Features

- Theme switcher
- Multiple themes per dashboard
- Theme builder
- External stylesheets support
- Add inline styles to themes to override styles
- Add many themes as possible without rebuilding / restarting grafana
- Users with view only option can also pick their favorite theme
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

This grafana plugin is tested with the grafana versions 6.x. But other versions are also expected to work.

# Work in progress

* Color palette based themes - Pick your own background/foreground colors
* Font size adjuster - Viewers will be able to adjust their dashboard font sizes

# Notes

- When adding external stylesheets, make sure CORS enabled for those domains.
- To make panel invisible : Modify following theme panel settings:
  - transparent = true
  - title = ""
  - Disable Theme Picker using panel settings
  - Move this panel to the bottom of the dashboard
  - Adjust the height and width if required.
- This plugin is in very much WIP / dev stage. Expect breaking changes & bugs.

# Known issues / Limitations

- If any custom plugin is used, dark/light theme switch, base theme will not work for those custom plugins. Refer [this](https://github.com/yesoreyeram/yesoreyeram-boomtheme-panel/issues/3) github issue

- Theme panel should be within view port. Otherwise, Grafana won't render the theme. Refer [this](https://github.com/yesoreyeram/yesoreyeram-boomtheme-panel/issues/17)
