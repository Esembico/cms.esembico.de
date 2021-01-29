import MovieIcon from '@material-ui/icons/Movie';
import AllInclusiveIcon from '@material-ui/icons/AllInclusive';
import FeaturedPlayListIcon from '@material-ui/icons/FeaturedPlayList';

const recommendationOptions = {
  singularName: 'recommendation',
  icon: <FeaturedPlayListIcon />,
  columns: [
    {
      header: 'Type',
      display: (entry: { type: string }): any => {
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
      type: 'url',
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
      if: (data: { type: string }): boolean => {
        return data.type === 'misc';
      },
      required: true
    },
    {
      type: 'text',
      label: (data: { type: string }): string => {
        if (data.type === 'movie') {
          return 'FSK Rating';
        }
        return 'Field1';
      },
      name: 'field1',
      if: (data: { type: string }): boolean => {
        return data.type === 'movie';
      },
      required: true
    },
    {
      type: 'text',
      label: (data: { type: string }): string => {
        if (data.type === 'movie') {
          return 'Release year';
        }
        return 'Field2';
      },
      name: 'field2',
      if: (data: { type: string }): boolean => {
        return data.type === 'movie';
      },
      required: true
    },
    {
      type: 'text',
      label: 'Field3',
      name: 'field3',
      if: (): boolean => false
    },
    {
      type: 'text',
      label: 'Field4',
      name: 'field4',
      if: (): boolean => false
    },
    {
      type: 'text',
      label: 'Field5',
      name: 'field5',
      if: (): boolean => false
    }
  ]
};

export default recommendationOptions;
