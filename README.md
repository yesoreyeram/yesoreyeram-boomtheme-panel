# Boom Theme Panel

Custom styles / themes to grafana dashboards. You can customize any dashboard using external stylesheets / inline style.

![image](https://user-images.githubusercontent.com/153843/57007587-a87ba580-6be1-11e9-8a2e-a1d571ae59d6.png)

![image](https://user-images.githubusercontent.com/153843/57007597-c0ebc000-6be1-11e9-9293-70def425ea66.png)

# Features

* Multiple themes per dashboard
* Add zero or more than one external style sheets to a theme
* Add inline styles to themes to override styles 
* Themes applicable to current dashboard only
* Switch between Dark / Light Themes
* Users with view only option can also pick their favourite theme
* Add many themes as possible without rebuilding/restarting grafana

# Coming Soon / TO DO

* Boom Themes / Themes repository
* Extract color structure from Grafana core style to make quick color pallet based themes.

# Supported Grafana version

This grafana plugin is tested with the grafna versions 6.x. But other versions are also expected to work.

# Notes 

* When adding external stylesheets, make sure CORS enabled for those domains.
* To make panel invisible : Modify following theme panel settings:  
    * transparent = true 
    * title = ""  
    * Disable Theme Picker using panel settings
    * Move this panel to the bottom of the dashboard
    * Adjust the height and width if required.
* This plugin is in very much WIP / dev stage. Expect breaking changes & bugs.