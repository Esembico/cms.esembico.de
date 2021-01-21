const imageOptions = {
  columns: [
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
  ],
  primaryProperty: {
    header: "Url",
    display: "url",
  },
  editor: [
    {
      type: "text",
      label: "Url",
      name: "url",
    },
    {
      type: "text",
      label: "Alt",
      name: "alt",
    },
    {
      type: "number",
      label: "Width",
      name: "width",
    },
    {
      type: "number",
      label: "Height",
      name: "height",
    },
  ],
  validateData: (data) => {
    const errors = {};

    if (!data.url) {
      errors.url = "Url is required";
    }

    if (!data.alt) {
      errors.alt = "Alt is required";
    }

    return errors;
  },
};

export default imageOptions;
