import MemberEditor from "../../editors/MemberEditor";

const teamOptions = {
  endpoint: "members",
  columns: [
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
  ],
  primaryProperty: {
    display: (entry) => {
      return `${entry.name} (${entry.artist_name})`;
    },
    header: "Name",
  },
  editor: MemberEditor,
};

export default teamOptions;
