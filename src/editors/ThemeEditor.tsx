import React, { useState } from 'react';
import { SelectableValue } from '@grafana/data';
import { Modal, Label, Input, TextArea, RadioButtonGroup, ColorPicker } from '@grafana/ui';
import { BoomTheme } from '../BoomTheme';
import { BoomThemeStyle, BoomThemeStyleProps } from 'BoomThemeStyle';

interface EditorProps {
  value: BoomTheme;
  onChange: (value: BoomTheme) => void;
}

export const ThemeEditor = ({ value, onChange }: EditorProps) => {
  const [editorVisibility, setEditorVisibility] = useState(false);

  const addStyle = (styleType: BoomThemeStyleProps) => {
    let theme = value;
    theme.styles = theme.styles || [];
    theme.styles.push(new BoomThemeStyle(styleType, null));
    onChange(theme);
  };

  const onTitleChange = (title: string) => {
    let theme = value;
    theme.name = title;
    onChange(theme);
  };

  const onStylePropertyChange = (index: number, propertyName: string, replaceValue: unknown) => {
    let theme = value;
    theme.styles[index].props = theme.styles[index].props || {};
    theme.styles[index].props[propertyName] = replaceValue;
    onChange(theme);
  };
  const defaultThemes: SelectableValue[] = [
    { value: 'default', label: 'Default' },
    { value: 'dark', label: 'Dark' },
    { value: 'light', label: 'light' },
  ];
  return (
    <>
      <span className="btn width-18" style={{ justifyContent: 'start' }}>
        {value.name}
      </span>

      <i className="fa fa-edit btn btn-primary px-2" onClick={() => setEditorVisibility(true)}></i>

      <Modal isOpen={editorVisibility} onDismiss={() => setEditorVisibility(false)} title={`Edit ${value.name}`}>
        <Label>Theme Theme</Label>
        <Input css={{}} value={value.name} onChange={(e) => onTitleChange(e.currentTarget.value)}></Input>
        <br />
        {value.styles.map((style, index: number) => {
          switch (style.type) {
            case BoomThemeStyleProps.BaseTheme:
              const baseTheme: SelectableValue = defaultThemes.find((t) => t.value === style.props.theme) || {
                label: 'Default',
                value: 'default',
              };
              return (
                <>
                  <Label>Base Theme</Label>
                  <RadioButtonGroup
                    value={baseTheme.value}
                    options={defaultThemes}
                    onChange={(e) => {
                      onStylePropertyChange(index, 'theme', e);
                    }}
                  ></RadioButtonGroup>
                  <br />
                </>
              );
            case BoomThemeStyleProps.BackgroundImage:
              return (
                <>
                  <Label>Background Image</Label>
                  <Input
                    css={{}}
                    value={style.props.url}
                    onChange={(e) => {
                      onStylePropertyChange(index, 'url', e.currentTarget.value);
                    }}
                  ></Input>
                  <br />
                </>
              );
            case BoomThemeStyleProps.ExternalURL:
              return (
                <>
                  <Label>External CSS URL</Label>
                  <Input
                    css={{}}
                    value={style.props.url}
                    onChange={(e) => {
                      onStylePropertyChange(index, 'url', e.currentTarget.value);
                    }}
                  ></Input>
                  <br />
                </>
              );
            case BoomThemeStyleProps.CustomStyle:
              return (
                <>
                  <Label>Additional CSS Style</Label>
                  <TextArea
                    css={{}}
                    value={style.props.text}
                    rows={6}
                    onChange={(e) => {
                      onStylePropertyChange(index, 'text', e.currentTarget.value);
                    }}
                  ></TextArea>
                  <br />
                </>
              );
            case BoomThemeStyleProps.PanelBackground:
              return (
                <>
                  <Label>Panel BG Color</Label>
                  <Input
                    css={{}}
                    value={style.props.color}
                    onChange={(e) => {
                      onStylePropertyChange(index, 'color', e.currentTarget.value);
                    }}
                    prefix={
                      <div>
                        <ColorPicker
                          color={style.props.color}
                          onChange={(e) => {
                            onStylePropertyChange(index, 'color', e);
                          }}
                        />
                      </div>
                    }
                  ></Input>
                  <br />
                </>
              );
            case 'url':
              return (
                <>
                  <Label>Panel Container BG Color</Label>
                  <Input
                    css={{}}
                    value={style.props.url}
                    onChange={(e) => {
                      onStylePropertyChange(index, 'url', e.currentTarget.value);
                    }}
                  ></Input>
                  <br />
                </>
              );
            case 'none':
            default:
              return <></>;
          }
        })}
        <div className="text-center">
          <br />
          {value.styles.filter((s) => s.type === BoomThemeStyleProps.ExternalURL).length < 1 && (
            <>
              <button className="btn btn-success" onClick={() => addStyle(BoomThemeStyleProps.ExternalURL)}>
                Add external CSS
              </button>
              &nbsp;&nbsp;
            </>
          )}
          {value.styles.filter((s) => s.type === BoomThemeStyleProps.CustomStyle).length < 1 && (
            <>
              <button className="btn btn-success" onClick={() => addStyle(BoomThemeStyleProps.CustomStyle)}>
                Add custom CSS
              </button>
              &nbsp;&nbsp;
            </>
          )}
          {value.styles.filter((s) => s.type === BoomThemeStyleProps.BackgroundImage).length < 1 && (
            <>
              <button className="btn btn-success" onClick={() => addStyle(BoomThemeStyleProps.BackgroundImage)}>
                Add BG Image
              </button>
              &nbsp;&nbsp;
            </>
          )}
          {value.styles.filter((s) => s.type === BoomThemeStyleProps.PanelBackground).length < 1 && (
            <>
              <button className="btn btn-success" onClick={() => addStyle(BoomThemeStyleProps.PanelBackground)}>
                Add Panel BG Color
              </button>
              &nbsp;&nbsp;
            </>
          )}
          <br />
          <br />
          <button className="btn btn-success" onClick={() => setEditorVisibility(false)}>
            OK
          </button>
        </div>
      </Modal>
    </>
  );
};
