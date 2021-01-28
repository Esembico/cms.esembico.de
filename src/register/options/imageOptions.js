import ImageIcon from '@material-ui/icons/Image';

const imageOptions = {
  singularName: 'image',
  icon: <ImageIcon />,
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
      type: 'url',
      label: 'Url',
      name: 'url',
      required: true
    },
    {
      type: 'image-preview',
      key: 'image-preview',
      name: 'url',
      base: 'http://react.esembico.de'
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
