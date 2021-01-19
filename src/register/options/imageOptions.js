import ImageEditor from "../../editors/ImageEditor";

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
  editor: ImageEditor,
};

export default imageOptions;
