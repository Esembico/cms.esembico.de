import React from "react";
import Row from "../components/Responsive/Row";
import TextField from "../components/Material/TextField";
import SearchableField from "../components/Material/SearchableField";

const MemberEditor = ({ data, onUpdate }) => {
  return (
    <React.Fragment>
      <Row>
        <TextField
          label="Name"
          onChange={(e) => onUpdate("name", e.target.value)}
          value={data.name}
        />
        <TextField
          label="Artist Name"
          onChange={(e) => onUpdate("artist_name", e.target.value)}
          value={data.artist_name}
        />
        <TextField
          label="Titles"
          onChange={(e) => onUpdate("titles", e.target.value)}
          value={data.titles}
        />
        <TextField
          label="Bio"
          onChange={(e) => onUpdate("bio", e.target.value)}
          value={data.bio}
          multiline={true}
        />
        <SearchableField
          label="Image"
          entity="images"
          value={data.image}
          onChange={(image) => onUpdate("image", image)}
        />
      </Row>
    </React.Fragment>
  );
};

export default MemberEditor;
