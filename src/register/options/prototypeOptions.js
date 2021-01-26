const prototypeOptions = {
  columns: [
    {
      header: 'Title',
      display: 'title'
    },
    {
      header: 'Subtitle',
      display: 'subtitle'
    }
  ],
  primaryProperty: {
    header: 'Title',
    display: 'title'
  },
  editor: [
    {
      type: 'text',
      label: 'Title',
      name: 'title',
      required: true
    },
    {
      type: 'text',
      label: 'Subtitle',
      name: 'subtitle',
      required: true
    },
    {
      type: 'text',
      label: 'Url',
      name: 'url',
      required: true
    },
    {
      type: 'reference',
      label: 'Image',
      name: 'image',
      to: 'images',
      required: true
    },
    {
      type: 'text',
      label: 'Challenge',
      name: 'challenge',
      multiline: true,
      required: true
    },
    {
      type: 'text',
      label: 'Solution',
      name: 'solution',
      multiline: true,
      required: true
    },
    {
      type: 'text',
      label: 'Rough details',
      name: 'rough_details',
      multiline: true,
      required: true
    }
  ]
};

export default prototypeOptions;
