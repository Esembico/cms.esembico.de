import React from "react";
import Row from "../components/Responsive/Row";
import Column from "../components/Responsive/Column";
import makeDataPage from "../helpers/makeDataPage";

const columns = [
  {
    header: "Name",
    display: "name",
  },
  {
    header: "Artist name",
    display: "artist_name",
  },
  {
    header: "Title",
    display: "titles",
  },
];

const primaryProperty = {
  display: (entry) => {
    return `${entry.name} (${entry.artist_name})`;
  },
  header: "Name",
};

const MemberEditor = ({ data, onUpdate }) => {
  return (
    <React.Fragment>
      <Row>
        <Column width={25}>
          <label>Name</label>
        </Column>
        <Column width={75}>
          <input
            type="text"
            onChange={(e) => onUpdate("name", e.target.value)}
            value={data.name}
          />
        </Column>
        <Column width={25}>
          <label>Artist Name</label>
        </Column>
        <Column width={75}>
          <input
            type="text"
            onChange={(e) => onUpdate("artist_name", e.target.value)}
            value={data.artist_name}
          />
        </Column>
        <Column width={25}>
          <label>Titles</label>
        </Column>
        <Column width={75}>
          <input
            type="text"
            onChange={(e) => onUpdate("titles", e.target.value)}
            value={data.titles}
          />
        </Column>
        <Column width={25}>
          <label>Bio</label>
        </Column>
        <Column width={75}>
          <textarea
            onChange={(e) => onUpdate("bio", e.target.value)}
            value={data.bio}
          ></textarea>
        </Column>
      </Row>
    </React.Fragment>
  );
};

export default makeDataPage({
  pageHeader: "Team",
  columns,
  primaryProperty,
  entity: "team members",
  endpoint: "members",
  Editor: MemberEditor,
});
