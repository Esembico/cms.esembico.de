import MovieIcon from '@material-ui/icons/Movie';
import AllInclusiveIcon from '@material-ui/icons/AllInclusive';

const recommendationOptions = {
  columns: [
    {
      header: 'Type',
      display: (entry) => {
        switch (entry.type) {
          case 'movie':
            return <MovieIcon />;
          case 'misc':
            return <AllInclusiveIcon />;
          default:
            return entry.type;
        }
      }
    },
    {
      header: 'Title',
      display: 'title'
    },
    {
      header: 'Description',
      display: 'description'
    }
  ],
  primaryProperty: {
    header: 'Title',
    display: 'title'
  },
  editor: [
    {
      type: 'select',
      label: 'Type',
      name: 'type',
      options: [
        { value: 'misc', display: 'Misc' },
        { value: 'movie', display: 'Movie' }
      ],
      required: true
    },
    {
      type: 'text',
      label: 'Url',
      name: 'url',
      required: true
    },
    {
      type: 'text',
      label: 'Title',
      name: 'title',
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
      label: 'Description',
      name: 'description',
      if: (data) => {
        return data.type === 'misc';
      },
      required: true
    },
    {
      type: 'text',
      label: (data) => {
        if (data.type === 'movie') {
          return 'FSK Rating';
        }
      },
      name: 'field1',
      if: (data) => {
        return data.type === 'movie';
      },
      required: true
    },
    {
      type: 'text',
      label: (data) => {
        if (data.type === 'movie') {
          return 'Release year';
        }
      },
      name: 'field2',
      if: (data) => {
        return data.type === 'movie';
      },
      required: true
    },
    {
      type: 'text',
      label: 'Field3',
      name: 'field3',
      if: () => false
    },
    {
      type: 'text',
      label: 'Field4',
      name: 'field4',
      if: () => false
    },
    {
      type: 'text',
      label: 'Field5',
      name: 'field5',
      if: () => false
    }
  ]
};

export default recommendationOptions;
