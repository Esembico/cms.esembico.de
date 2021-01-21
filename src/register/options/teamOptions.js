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
  editor: [
    {
      type: "text",
      label: "Name",
      name: "name",
    },
    {
      type: "text",
      label: "Artist name",
      name: "artist_name",
    },
    {
      type: "text",
      label: "Titles",
      name: "titles",
    },
    {
      type: "text",
      label: "Bio",
      name: "bio",
      multiline: true,
    },
    {
      type: "reference",
      label: "Image",
      name: "image",
      to: "images",
    },
  ],
  validateData: (data) => {
    const errors = {};

    if (!data.name) {
      errors.name = "Name is required";
    }

    if (!data.artist_name) {
      errors.artist_name = "Artist name is required";
    }

    if (!data.titles) {
      errors.titles = "Titles is required";
    }

    if (!data.bio) {
      errors.bio = "Bio is required";
    }

    if (!data.image) {
      errors.image = "Image is required";
    }

    return errors;
  },
};

export default teamOptions;
