import React, { useState } from 'react';
import { SelectableValue } from '@grafana/data';
import { Modal, Label, Input, TextArea, RadioButtonGroup, ColorPicker } from '@grafana/ui';
import { BoomTheme } from '../BoomTheme';
import { BoomThemeStyle } from 'BoomThemeStyle';

interface EditorProps {
  value: BoomTheme;
  onChange: (value: BoomTheme) => void;
}

export const ThemeEditor: React.FC<EditorProps> = ({ value, onChange }) => {
  const [editorVisibility, setEditorVisibility] = useState(false);

  const addStyle = (styleType: 'bgimage' | 'style' | 'url' | 'panel-container-bg-color') => {
    let theme = value;
    theme.styles = theme.styles || [];
    theme.styles.push(new BoomThemeStyle(styleType, null));
    console.log(theme.styles);
    onChange(theme);
  };

  const onTitleChange = (title: string) => {
    let theme = value;
    theme.name = title;
    onChange(theme);
  };

  const onStylePropertyChange = (index: number, propertyName: string, replaceValue: unknown) => {
    console.log('here');
    let theme = value;
    theme.styles[index].props = theme.styles[index].props || {};
    theme.styles[index].props[propertyName] = replaceValue;
    console.log(theme);
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
        <Input css={{}} value={value.name} onChange={e => onTitleChange(e.currentTarget.value)}></Input>
        <br />
        {value.styles.map((style, index: number) => {
          switch (style.type) {
            case 'basetheme':
              const baseTheme: SelectableValue = defaultThemes.find(t => t.value === style.props.theme) || {
                label: 'Default',
                value: 'default',
              };
              return (
                <>
                  <Label>Base Theme</Label>
                  <RadioButtonGroup
                    value={baseTheme.value}
                    options={defaultThemes}
                    onChange={e => {
                      onStylePropertyChange(index, 'theme', e);
                    }}
                  ></RadioButtonGroup>
                  <br />
                </>
              );
            case 'bgimage':
              return (
                <>
                  <Label>Background Image</Label>
                  <Input
                    css={{}}
                    value={style.props.url}
                    onChange={e => {
                      onStylePropertyChange(index, 'url', e.currentTarget.value);
                    }}
                  ></Input>
                  <br />
                </>
              );
            case 'url':
              return (
                <>
                  <Label>External CSS URL</Label>
                  <Input
                    css={{}}
                    value={style.props.url}
                    onChange={e => {
                      onStylePropertyChange(index, 'url', e.currentTarget.value);
                    }}
                  ></Input>
                  <br />
                </>
              );
            case 'style':
              return (
                <>
                  <Label>Additional CSS Style</Label>
                  <TextArea
                    css={{}}
                    value={style.props.text}
                    rows={6}
                    onChange={e => {
                      onStylePropertyChange(index, 'text', e.currentTarget.value);
                    }}
                  ></TextArea>
                  <br />
                </>
              );
            case 'panel-container-bg-color':
              return (
                <>
                  <Label>Panel BG Color</Label>
                  <Input
                    css={{}}
                    value={style.props.color}
                    onChange={e => {
                      onStylePropertyChange(index, 'color', e.currentTarget.value);
                    }}
                    prefix={
                      <div>
                        <ColorPicker
                          color={style.props.color}
                          onChange={e => {
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
                  <Label>Panel COntainer BG Color</Label>
                  <Input
                    css={{}}
                    value={style.props.url}
                    onChange={e => {
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
          <>
            <button className="btn btn-success" onClick={() => addStyle('url')}>
              Add external CSS
            </button>
            &nbsp;&nbsp;
          </>
          <>
            <button className="btn btn-success" onClick={() => addStyle('style')}>
              Add custom CSS
            </button>
            &nbsp;&nbsp;
          </>
          <>
            <button className="btn btn-success" onClick={() => addStyle('bgimage')}>
              Add BG Image
            </button>
            &nbsp;&nbsp;
          </>
          <>
            <button className="btn btn-success" onClick={() => addStyle('panel-container-bg-color')}>
              Add Panel BG Color
            </button>
            &nbsp;&nbsp;
          </>
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
