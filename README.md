# Boom Theme Panel

Custom styles / themes to grafana dashboards. You can customize any dashboard using external stylesheets / inline style.

![image](https://user-images.githubusercontent.com/153843/56893470-a77c3400-6a7a-11e9-8c26-efae8d29b69e.png)

![image](https://user-images.githubusercontent.com/153843/56890722-2d47b180-6a72-11e9-8de0-078035674c31.png)

# Features

* Add zero or more than one external style sheets
* Add inline styles to override styles
* Styles applicable to current dashboard only

# Supported Grafana version

This grafana plugin is tested with the grafna versions 6.x. But other versions are also expected to work.

# Note

* When adding external stylesheets, make sure CORS enabled for those domains.
* To make panel invisible : Modify following theme panel settings:  
    * transparent = true 
    * title = ""  
    * Move this panel to the bottom of the dashboard
    * Adjust the height and width if required.

# Disclaimer

* This plugin is in very much WIP / dev stage. Expect breaking changes & bugs.
* Though this is a workaround to [this](https://github.com/grafana/grafana/issues/10495) grafana bug, this plugin works.
* You can achieve the similiar effect without this plugin with the use of text panel. LOL.