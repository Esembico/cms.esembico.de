import React from 'react';
import Row from '../components/Responsive/Row';
import TextField from '../components/EditorField/TextFieldImpl';
import SearchableField from '../components/EditorField/SearchableField';
import MarkdownEditor from '../components/EditorField/MarkdownEditor';
import Select from '../components/EditorField/SelectImpl';
import getLabelText from './getLabelText';

function createFieldForProperty({
  property,
  data,
  onUpdate,
  lastEditedField,
  ...others
}) {
  if (property.if) {
    if (!property.if(data)) {
      return <React.Fragment />;
    }
  }
  const label = getLabelText(property.label, data);
  switch (property.type) {
    case 'select':
      return (
        <Select
          label={label}
          value={data[property.name]}
          onChange={(e) => onUpdate(property.name, e.target.value)}
          options={property.options}
          required={property.required}
          {...others}
        />
      );
    case 'text':
    case 'url':
      return (
        <TextField
          label={label}
          value={data[property.name]}
          multiline={property.multiline}
          onChange={(e) => onUpdate(property.name, e.target.value)}
          required={property.required}
          {...others}
        />
      );
    case 'number':
      return (
        <TextField
          type='number'
          label={label}
          value={data[property.name]}
          multiline={property.multiline}
          onChange={(e) => onUpdate(property.name, e.target.value || null)}
          required={property.required}
          {...others}
        />
      );
    case 'reference':
      return (
        <SearchableField
          label={label}
          entity={property.to}
          value={data[property.name]}
          onChange={(value) => onUpdate(property.name, value)}
          required={property.required}
          {...others}
        />
      );
    case 'markdown':
      return (
        <MarkdownEditor
          label={label}
          value={data[property.name]}
          onChange={(value) => onUpdate(property.name, value)}
          required={property.required}
          {...others}
        />
      );
    case 'generated':
      let value = data[property.name];
      if (property.dependsOn.includes(lastEditedField)) {
        value = property.value(data);
        if (value !== data[property.name]) {
          onUpdate(property.name, value, false);
        }
      }
      return (
        <TextField
          label={label}
          InputProps={{
            readOnly: true
          }}
          value={value}
          multiline={property.multiline}
          onChange={(e) => onUpdate(property.name, e.target.value)}
          required={property.required}
          {...others}
        />
      );
    default:
      return <span>{data[property.name]}</span>;
  }
}

export default function makeEditor({ proprties }) {
  const Editor = ({ data, onUpdate, errors, lastEditedField }) => {
    return (
      <React.Fragment>
        <Row>
          {proprties.map((property) => {
            return (
              <React.Fragment key={property.name}>
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
