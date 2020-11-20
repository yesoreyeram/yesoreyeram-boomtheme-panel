System.register(["./config"], function (exports_1, context_1) {
    "use strict";
    var config_1, BoomThemeStyle;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [
            function (config_1_1) {
                config_1 = config_1_1;
            }
        ],
        execute: function () {
            BoomThemeStyle = (function () {
                function BoomThemeStyle(type, props) {
                    switch (type.toLowerCase()) {
                        case config_1.CONFIG.THEME_STYLES.BASE_THEME:
                            this.type = config_1.CONFIG.THEME_STYLES.BASE_THEME;
                            this.props = {
                                theme: props && props.theme ? props.theme : ""
                            };
                            break;
                        case config_1.CONFIG.THEME_STYLES.STYLE:
                            this.type = config_1.CONFIG.THEME_STYLES.STYLE;
                            this.props = {
                                text: props && props.text ? props.text : ""
                            };
                            break;
                        case config_1.CONFIG.THEME_STYLES.URL:
                            this.type = config_1.CONFIG.THEME_STYLES.URL;
                            this.props = {
                                url: props && props.url ? props.url : ""
                            };
                            break;
                        case config_1.CONFIG.THEME_STYLES.BG_IMAGE:
                            this.type = config_1.CONFIG.THEME_STYLES.BG_IMAGE;
                            this.props = {
                                url: props && props.url ? props.url : ""
                            };
                            break;
                        default:
                            this.type = config_1.CONFIG.THEME_STYLES.NONE;
                            this.props = {};
                            break;
                    }
                }
                return BoomThemeStyle;
            }());
            exports_1("BoomThemeStyle", BoomThemeStyle);
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQm9vbVRoZW1lU3R5bGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvQm9vbVRoZW1lU3R5bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7WUFFQTtnQkFHSSx3QkFBWSxJQUFJLEVBQUUsS0FBSztvQkFDbkIsUUFBUSxJQUFJLENBQUMsV0FBVyxFQUFFLEVBQUU7d0JBQ3hCLEtBQUssZUFBTSxDQUFDLFlBQVksQ0FBQyxVQUFVOzRCQUMvQixJQUFJLENBQUMsSUFBSSxHQUFHLGVBQU0sQ0FBQyxZQUFZLENBQUMsVUFBVSxDQUFDOzRCQUMzQyxJQUFJLENBQUMsS0FBSyxHQUFHO2dDQUNULEtBQUssRUFBRSxLQUFLLElBQUksS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsRUFBRTs2QkFDakQsQ0FBQzs0QkFDRixNQUFNO3dCQUNWLEtBQUssZUFBTSxDQUFDLFlBQVksQ0FBQyxLQUFLOzRCQUMxQixJQUFJLENBQUMsSUFBSSxHQUFHLGVBQU0sQ0FBQyxZQUFZLENBQUMsS0FBSyxDQUFDOzRCQUN0QyxJQUFJLENBQUMsS0FBSyxHQUFHO2dDQUNULElBQUksRUFBRSxLQUFLLElBQUksS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRTs2QkFDOUMsQ0FBQzs0QkFDRixNQUFNO3dCQUNWLEtBQUssZUFBTSxDQUFDLFlBQVksQ0FBQyxHQUFHOzRCQUN4QixJQUFJLENBQUMsSUFBSSxHQUFHLGVBQU0sQ0FBQyxZQUFZLENBQUMsR0FBRyxDQUFDOzRCQUNwQyxJQUFJLENBQUMsS0FBSyxHQUFHO2dDQUNULEdBQUcsRUFBRSxLQUFLLElBQUksS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRTs2QkFDM0MsQ0FBQzs0QkFDRixNQUFNO3dCQUNWLEtBQUssZUFBTSxDQUFDLFlBQVksQ0FBQyxRQUFROzRCQUM3QixJQUFJLENBQUMsSUFBSSxHQUFHLGVBQU0sQ0FBQyxZQUFZLENBQUMsUUFBUSxDQUFDOzRCQUN6QyxJQUFJLENBQUMsS0FBSyxHQUFHO2dDQUNULEdBQUcsRUFBRSxLQUFLLElBQUksS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRTs2QkFDM0MsQ0FBQzs0QkFDRixNQUFNO3dCQUNWOzRCQUNJLElBQUksQ0FBQyxJQUFJLEdBQUcsZUFBTSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUM7NEJBQ3JDLElBQUksQ0FBQyxLQUFLLEdBQUcsRUFBRSxDQUFDOzRCQUNoQixNQUFNO3FCQUViO2dCQUNMLENBQUM7Z0JBQ0wscUJBQUM7WUFBRCxDQUFDLEFBcENELElBb0NDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ09ORklHIH0gZnJvbSAnLi9jb25maWcnO1xuXG5leHBvcnQgY2xhc3MgQm9vbVRoZW1lU3R5bGUge1xuICAgIHB1YmxpYyB0eXBlOiBzdHJpbmc7XG4gICAgcHVibGljIHByb3BzOiBhbnk7XG4gICAgY29uc3RydWN0b3IodHlwZSwgcHJvcHMpIHtcbiAgICAgICAgc3dpdGNoICh0eXBlLnRvTG93ZXJDYXNlKCkpIHtcbiAgICAgICAgICAgIGNhc2UgQ09ORklHLlRIRU1FX1NUWUxFUy5CQVNFX1RIRU1FOlxuICAgICAgICAgICAgICAgIHRoaXMudHlwZSA9IENPTkZJRy5USEVNRV9TVFlMRVMuQkFTRV9USEVNRTtcbiAgICAgICAgICAgICAgICB0aGlzLnByb3BzID0ge1xuICAgICAgICAgICAgICAgICAgICB0aGVtZTogcHJvcHMgJiYgcHJvcHMudGhlbWUgPyBwcm9wcy50aGVtZSA6IFwiXCJcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBDT05GSUcuVEhFTUVfU1RZTEVTLlNUWUxFOlxuICAgICAgICAgICAgICAgIHRoaXMudHlwZSA9IENPTkZJRy5USEVNRV9TVFlMRVMuU1RZTEU7XG4gICAgICAgICAgICAgICAgdGhpcy5wcm9wcyA9IHtcbiAgICAgICAgICAgICAgICAgICAgdGV4dDogcHJvcHMgJiYgcHJvcHMudGV4dCA/IHByb3BzLnRleHQgOiBcIlwiXG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgQ09ORklHLlRIRU1FX1NUWUxFUy5VUkw6XG4gICAgICAgICAgICAgICAgdGhpcy50eXBlID0gQ09ORklHLlRIRU1FX1NUWUxFUy5VUkw7XG4gICAgICAgICAgICAgICAgdGhpcy5wcm9wcyA9IHtcbiAgICAgICAgICAgICAgICAgICAgdXJsOiBwcm9wcyAmJiBwcm9wcy51cmwgPyBwcm9wcy51cmwgOiBcIlwiXG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgQ09ORklHLlRIRU1FX1NUWUxFUy5CR19JTUFHRTpcbiAgICAgICAgICAgICAgICB0aGlzLnR5cGUgPSBDT05GSUcuVEhFTUVfU1RZTEVTLkJHX0lNQUdFO1xuICAgICAgICAgICAgICAgIHRoaXMucHJvcHMgPSB7XG4gICAgICAgICAgICAgICAgICAgIHVybDogcHJvcHMgJiYgcHJvcHMudXJsID8gcHJvcHMudXJsIDogXCJcIlxuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgIHRoaXMudHlwZSA9IENPTkZJRy5USEVNRV9TVFlMRVMuTk9ORTtcbiAgICAgICAgICAgICAgICB0aGlzLnByb3BzID0ge307XG4gICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgfVxuICAgIH1cbn1cbiJdfQ==