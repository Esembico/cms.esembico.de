import React from "react";
import Row from "../components/Responsive/Row";
import TextField from "../components/Material/TextField";

const ImageEditor = ({ data, onUpdate }) => {
  return (
    <React.Fragment>
      <Row>
        <TextField
          label="Url"
          onChange={(e) => onUpdate("url", e.target.value)}
          value={data.url}
        />
        <TextField
          label="Alternate text"
          onChange={(e) => onUpdate("alt", e.target.value)}
          value={data.alt}
        />
        <TextField
          label="Width"
          onChange={(e) => onUpdate("width", e.target.value)}
          value={data.width}
        />
        <TextField
          label="Height"
          onChange={(e) => onUpdate("height", e.target.value)}
          value={data.height}
        />
      </Row>
    </React.Fragment>
  );
};

export default ImageEditor;
