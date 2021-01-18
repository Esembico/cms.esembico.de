import React from "react";
import Row from "../components/Responsive/Row";
import makeDataPage from "../helpers/makeDataPage";
import TextField from "../components/Material/TextField";

const columns = [
  {
    header: "Url",
    display: "url",
  },
  {
    header: "Alternate text",
    display: "alt",
  },
  {
    header: "Dimension",
    display: (entry) => {
      return `${entry.width || "auto"} x ${entry.height || "auto"}`;
    },
  },
];

const primaryProperty = {
  header: "Url",
  display: "url",
};

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

export default makeDataPage({
  pageHeader: "Images",
  columns,
  primaryProperty,
  entity: "images",
  endpoint: "images",
  Editor: ImageEditor,
});
