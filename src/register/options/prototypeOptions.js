const prototypeOptions = {
  columns: [
    {
      header: "Title",
      display: "title",
    },
    {
      header: "Subtitle",
      display: "subtitle",
    },
  ],
  primaryProperty: {
    header: "Title",
    display: "title",
  },
  editor: [
    {
      type: "text",
      label: "Title",
      name: "title",
    },
    {
      type: "text",
      label: "Subtitle",
      name: "subtitle",
    },
    {
      type: "text",
      label: "Url",
      name: "url",
    },
    {
      type: "reference",
      label: "Image",
      name: "image",
      to: "images",
    },
    {
      type: "text",
      label: "Challenge",
      name: "challenge",
      multiline: true,
    },
    {
      type: "text",
      label: "Solution",
      name: "solution",
      multiline: true,
    },
    {
      type: "text",
      label: "Rough details",
      name: "rough_details",
      multiline: true,
    },
  ],
};

export default prototypeOptions;
