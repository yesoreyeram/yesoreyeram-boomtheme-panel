import { PanelPlugin, PanelModel } from '@grafana/data';
import { Panel, PanelOptions } from './Panel';
import { ThemesEditorOptions } from './editors/ThemesEditor';
import { getActiveThemeName } from './utils';

export const plugin = new PanelPlugin<PanelOptions>(Panel)
  .setPanelOptions((builder) => {
    builder.addCustomEditor(ThemesEditorOptions);
    builder.addBooleanSwitch({
      name: 'Hide Theme Picker',
      path: 'disableThemePicker',
      category: ['Themes Options'],
    });
    builder.addTextInput({
      name: 'Default Theme',
      path: 'activeTheme',
      category: ['Themes Options'],
    });
    return builder;
  })
  .setMigrationHandler((panel: PanelModel<PanelOptions> & Record<string, any>) => {
    const newOptions = {
      disableThemePicker: panel.options.disableThemePicker ?? panel.disableThemePicker,
      activeTheme: panel.options.activeTheme ?? getActiveThemeName(panel.themes, panel.activeThemeId),
      themes: panel.options.themes ?? panel.themes,
    };
    delete panel.themes;
    delete panel.activeThemeId;
    delete panel.disableThemePicker;
    return newOptions;
  });
