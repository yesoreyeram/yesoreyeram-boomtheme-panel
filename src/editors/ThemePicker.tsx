import React from 'react';
import { BoomTheme } from './../BoomTheme';

interface ThemePickerProps {
  themes: BoomTheme[];
  onChange: (activeTheme: string) => void;
}

export const ThemePicker = (props: ThemePickerProps) => {
  const onViewChange = (themeName: string) => {
    props.onChange(themeName);
  };
  const defaultThemes = ['Grafana Dark', 'Grafana Light'];
  return (
    <div style={{ textAlign: 'center' }}>
      <br />
      {(props.themes || [])
        .map((theme) => theme.name)
        .concat(defaultThemes)
        .map((themeName, index: number) => {
          return (
            <span
              className="btn btn-secondary"
              style={{ marginLeft: index === 0 ? '0' : '10px', marginRight: '10px' }}
              onClick={() => onViewChange(themeName)}
              key={index}
            >
              {themeName}
            </span>
          );
        })}
    </div>
  );
};
