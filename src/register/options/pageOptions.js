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
      type: "markdown",
      label: "Content",
      name: "content",
    },
  ],
};

export default pageOptions;
