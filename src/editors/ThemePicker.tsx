import React from 'react';
import { BoomTheme } from 'BoomTheme';

interface ThemePickerProps {
  themes: BoomTheme[];
  onChange: (activeTheme: string) => void;
}

export const ThemePicker: React.FC<ThemePickerProps> = (props: ThemePickerProps) => {
  const onViewChange = (themeName: string) => {
    props.onChange(themeName);
  };
  const style: React.CSSProperties = { textAlign: 'center' };
  return (
    <div style={style}>
      <br />
      {props.themes
        ?.map(theme => theme.name)
        .concat(['Grafana Dark', 'Grafana Light'])
        .map((themeName, index: number) => {
          return (
            <span
              className="btn btn-secondary"
              style={{ marginLeft: index === 0 ? '0' : '10px', marginRight: '10px' }}
              onClick={() => onViewChange(themeName)}
            >
              {themeName}
            </span>
          );
        })}
    </div>
  );
};
