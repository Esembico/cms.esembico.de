import React from "react";
import Row from "../components/Responsive/Row";
import TextField from "../components/Material/TextField";
import SearchableField from "../components/Material/SearchableField";

function createFieldForProperty({ property, data, onUpdate, ...others }) {
  switch (property.type) {
    case "text":
      return (
        <TextField
          label={property.label}
          value={data[property.name]}
          multiline={property.multiline}
          onChange={(e) => onUpdate(property.name, e.target.value)}
          {...others}
        />
      );
    case "number":
      return (
        <TextField
          label={property.label}
          value={data[property.name]}
          multiline={property.multiline}
          onChange={(e) => onUpdate(property.name, e.target.value || null)}
          {...others}
        />
      );
    case "reference":
      return (
        <SearchableField
          label={property.label}
          entity={property.to}
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
                  errors: errors[property.name],
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
