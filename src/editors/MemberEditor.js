import React from "react";
import Row from "../components/Responsive/Row";
import TextField from "../components/Material/TextField";

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
      </Row>
    </React.Fragment>
  );
};

export default MemberEditor;
