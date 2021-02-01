import React, { FC } from 'react';
import Row from '../components/Responsive/Row';
import TextField from '../components/EditorField/TextFieldImpl';
import SearchableField from '../components/EditorField/SearchableField';
import MarkdownEditor from '../components/EditorField/MarkdownEditor';
import Select from '../components/EditorField/SelectImpl';
import getLabelText from './getLabelText';
import ImagePreview from '../components/EditorField/ImagePreview';
import BooleanField from '../components/EditorField/BooleanField';
import {
  CreateFieldForPropertyParams,
  EditorProps,
  MakeEditorParams
} from './types/makeEditor';
import { EditorEntryBase } from '../types/stateRegister';
import { Data } from '../redux/helpers/types/state';

function createFieldForProperty({
  property,
  data,
  onUpdate,
  lastEditedField,
  ...others
}: CreateFieldForPropertyParams): JSX.Element {
  if (property.if) {
    if (!property.if(data)) {
      return <React.Fragment />;
    }
  }
  const label = getLabelText(property.label, data);

  const additionalProps = property.fieldProps ? property.fieldProps(data) : {};

  switch (property.type) {
    case 'select':
      return (
        <Select
          {...additionalProps}
          {...others}
          label={label}
          value={data[property.name] as string}
          onChange={(e: any) => onUpdate(property.name, e.target.value)}
          options={property.options}
          required={property.required}
        />
      );
    case 'text':
      return (
        <TextField
          {...additionalProps}
          {...others}
          label={label}
          value={data[property.name] as string}
          multiline={property.multiline}
          onChange={(e: any) => onUpdate(property.name, e.target.value)}
          required={property.required}
        />
      );
    case 'url':
      return (
        <TextField
          {...additionalProps}
          {...others}
          label={label}
          value={data[property.name] as string}
          onChange={(e: any) => onUpdate(property.name, e.target.value)}
          required={property.required}
        />
      );
    case 'number':
      return (
        <TextField
          {...additionalProps}
          {...others}
          type='number'
          label={label}
          value={data[property.name] as string}
          onChange={(e: any) => onUpdate(property.name, e.target.value || null)}
          required={property.required}
          {...others}
        />
      );
    case 'reference':
      return (
        <SearchableField
          {...additionalProps}
          {...others}
          label={label}
          entity={property.to}
          value={data[property.name] as Data}
          onChange={(value: any) => onUpdate(property.name, value)}
          required={property.required}
        />
      );
    case 'markdown':
      return (
        <MarkdownEditor
          {...additionalProps}
          {...others}
          label={label}
          value={data[property.name] as string}
          onChange={(value: any) => onUpdate(property.name, value)}
        />
      );
    case 'generated':
      let value = data[property.name];
      if (lastEditedField && property.dependsOn.includes(lastEditedField)) {
        value = property.value(data);
        if (value !== data[property.name]) {
          onUpdate(property.name, value, false);
        }
      }
      return (
        <TextField
          {...additionalProps}
          {...others}
          label={label}
          InputProps={{
            readOnly: true
          }}
          value={value as string}
          onChange={(e: any) => onUpdate(property.name, e.target.value)}
          required={property.required}
        />
      );
    case 'image-preview':
      return (
        <ImagePreview
          {...additionalProps}
          {...others}
          value={data[property.name] as string}
          base={property.base}
        />
      );
    case 'boolean':
      return (
        <BooleanField
          {...others}
          {...additionalProps}
          label={label}
          checked={data[property.name] as boolean}
          onChange={(e: any) => onUpdate(property.name, e.target.checked)}
        />
      );
    default:
      throw Error(
        `Unsupported type for field ${(property as EditorEntryBase).name}`
      );
  }
}

export default function makeEditor({
  properties
}: MakeEditorParams): FC<EditorProps> {
  const Editor: FC<EditorProps> = ({
    data,
    onUpdate,
    errors,
    lastEditedField
  }) => {
    return (
      <React.Fragment>
        <Row>
          {properties.map((property: any) => {
            return (
              <React.Fragment key={property.key || property.name}>
                {createFieldForProperty({
                  property,
                  data,
                  onUpdate,
                  errors: errors[property.name],
                  lastEditedField
                })}
              </React.Fragment>
            );
          })}
        </Row>
      </React.Fragment>
    );
  };

  return Editor;
}
