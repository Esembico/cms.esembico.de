const pageOptions = {
  columns: [
    {
      header: "Name",
      display: "name",
    },
    {
      header: "Slug",
      display: "slug",
    },
  ],
  primaryProperty: {
    header: "Name",
    display: "name",
  },
  editor: [
    {
      type: "text",
      label: "Name",
      name: "name",
    },
    {
      type: "text",
      label: "Slug",
      name: "slug",
    },
    {
      type: "text",
      label: "Content",
      name: "content",
      multiline: true,
    },
  ],
};

export default pageOptions;
