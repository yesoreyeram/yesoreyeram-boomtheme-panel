import React from 'react';
import { PanelOptionsEditorItem } from '@grafana/data';
import { BoomTheme } from './../BoomTheme';
import { ThemeEditor } from './ThemeEditor';

interface EditorProps {
  value: BoomTheme[];
  onChange: (value: BoomTheme[]) => void;
}

const Editor: React.FC<EditorProps> = ({ value, onChange }) => {
  const addTheme = () => {
    let themes: BoomTheme[] = value || [];
    let newTheme: BoomTheme = new BoomTheme({
      name: `New Theme ${themes.length + 1}`,
      styles: [],
    });
    themes.push(newTheme);
    onChange(themes);
  };
  const deleteTheme = (index: number) => {
    let themes: BoomTheme[] = value || [];
    themes.splice(index, 1);
    onChange(themes);
  };
  const onThemeChange = (theme: BoomTheme, index: number) => {
    let themes = value || [];
    themes[index] = theme;
    onChange(themes);
  };
  return (
    <>
      {value.map((theme, index) => (
        <div>
          <br />
          <ThemeEditor
            value={theme}
            onChange={updatedTheme => {
              onThemeChange(updatedTheme, index);
            }}
          />
          <i
            className="btn fa fa-trash btn btn-danger px-2"
            title={`Edit ${theme.name}`}
            onClick={() => deleteTheme(index)}
          ></i>
        </div>
      ))}
      <br />
      <div className="text-center">
        <button className="btn btn-primary" onClick={addTheme}>
          Add New Theme
        </button>
      </div>
    </>
  );
};

export const ThemesEditorOptions: PanelOptionsEditorItem = {
  id: 'themes',
  name: 'Themes',
  path: 'themes',
  category: ['Themes'],
  editor: ({ value, onChange }) => {
    return <Editor value={value} onChange={onChange}></Editor>;
  },
};
