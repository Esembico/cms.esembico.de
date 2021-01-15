import makeDataPage from "../helpers/makeDataPage";

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

export default makeDataPage({
  pageHeader: "Images",
  columns,
  primaryProperty,
  entity: "images",
  endpoint: "images",
});
