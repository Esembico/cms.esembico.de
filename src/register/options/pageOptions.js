import { required } from "../../helpers/validation";

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
  validateData: (data) => {
    const errors = {};
    required(errors, "Name", data, "name");
    required(errors, "Slug", data, "slug");
    required(errors, "Content", data, "content");
    return errors;
  },
};

export default pageOptions;
