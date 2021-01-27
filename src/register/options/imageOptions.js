const imageOptions = {
  singularName: 'image',
  columns: [
    {
      header: 'Url',
      display: 'url'
    },
    {
      header: 'Alternate text',
      display: 'alt'
    },
    {
      header: 'Dimension',
      display: (entry) => {
        return `${entry.width || 'auto'} x ${entry.height || 'auto'}`;
      }
    }
  ],
  primaryProperty: {
    header: 'Url',
    display: 'url'
  },
  editor: [
    {
      type: 'text',
      label: 'Url',
      name: 'url',
      required: true
    },
    {
      type: 'text',
      label: 'Alt',
      name: 'alt',
      required: true
    },
    {
      type: 'number',
      label: 'Width',
      name: 'width'
    },
    {
      type: 'number',
      label: 'Height',
      name: 'height'
    }
  ]
};

export default imageOptions;
