import React, { useState } from 'react';
import { PanelData, PanelProps } from '@grafana/data';
import { Style } from 'react-style-tag';
import { BoomTheme } from './BoomTheme';
import { ThemePicker } from './editors/ThemePicker';
import { getThemeCSSFile } from './utils';

export interface PanelOptions {
  disableThemePicker: boolean;
  activeTheme: string;
  themes: BoomTheme[];
}

interface Props extends PanelProps<PanelOptions> {
  options: PanelOptions;
  data: PanelData;
  width: number;
  height: number;
  onOptionsChange: (options: PanelOptions) => void;
}

export const Panel: React.FC<Props> = ({ options, onOptionsChange, replaceVariables }) => {
  const [runTimeThemeState, setRunTimeThemeState] = useState(false);
  const [runTimeTheme, setRunTimeTheme] = useState('');

  const onRuntimeThemeChange = (themeName: string) => {
    setRunTimeThemeState(true);
    setRunTimeTheme(themeName);
  };

  let output = '';

  options.themes.forEach((themeOptions: BoomTheme, index) => {
    const theme = new BoomTheme(themeOptions);
    if (runTimeThemeState) {
      if (runTimeTheme === theme.name) {
        output += theme.getThemeContent();
      } else if (runTimeTheme === 'Grafana Dark') {
        output = `@import url('${getThemeCSSFile('dark')}');
            `;
      } else if (runTimeTheme === 'Grafana Light') {
        output = `@import url('${getThemeCSSFile('light')}');
            `;
      }
    } else {
      if (replaceVariables(options.activeTheme) === 'Grafana Dark') {
        output = `@import url('${getThemeCSSFile('dark')}');
            `;
      } else if (replaceVariables(options.activeTheme) === 'Grafana Light') {
        output = `@import url('${getThemeCSSFile('light')}');
            `;
      } else if (replaceVariables(options.activeTheme) === theme.name) {
        output += theme.getThemeContent();
      }
    }
  });

  return (
    <>
      <Style>{output}</Style>
      {options.disableThemePicker ? <></> : <ThemePicker themes={options.themes} onChange={onRuntimeThemeChange} />}
    </>
  );
};
