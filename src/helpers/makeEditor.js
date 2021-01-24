import React from 'react';
import Row from '../components/Responsive/Row';
import TextField from '../components/Input/TextField';
import SearchableField from '../components/Input/SearchableField';
import MarkdownEditor from '../components/Input/MarkdownEditor';
import Select from '../components/Input/Select';

function createFieldForProperty({ property, data, onUpdate, ...others }) {
  if (property.if) {
    if (!property.if(data)) {
      return <React.Fragment />;
    }
  }
  let label = property.label;
  if (typeof label === 'function') {
    label = label(data);
  }
  switch (property.type) {
    case 'select':
      return (
        <Select
          label={label}
          value={data[property.name]}
          onChange={(e) => onUpdate(property.name, e.target.value)}
          options={property.options}
          {...others}
        />
      );
    case 'text':
      return (
        <TextField
          label={label}
          value={data[property.name]}
          multiline={property.multiline}
          onChange={(e) => onUpdate(property.name, e.target.value)}
          {...others}
        />
      );
    case 'number':
      return (
        <TextField
          label={label}
          value={data[property.name]}
          multiline={property.multiline}
          onChange={(e) => onUpdate(property.name, e.target.value || null)}
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
          {...others}
        />
      );
    case 'markdown':
      return (
        <MarkdownEditor
          label={label}
          value={data[property.name]}
          onChange={(value) => onUpdate(property.name, value)}
          {...others}
        />
      );
    default:
      return <span>{data[property.name]}</span>;
  }
}

export default function makeEditor({ proprties }) {
  const Editor = ({ data, onUpdate, errors }) => {
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
                  errors: errors[property.name]
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
