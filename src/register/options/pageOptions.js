import PagesIcon from '@material-ui/icons/Pages';

const pageOptions = {
  singularName: 'page',
  icon: <PagesIcon />,
  columns: [
    {
      header: 'Name',
      display: 'name'
    },
    {
      header: 'Slug',
      display: 'slug'
    }
  ],
  primaryProperty: {
    header: 'Name',
    display: 'name'
  },
  editor: [
    {
      type: 'text',
      label: 'Name',
      name: 'name',
      required: true
    },
    {
      type: 'text',
      label: 'Slug',
      name: 'slug',
      required: true
    },
    {
      type: 'markdown',
      label: 'Content',
      name: 'content',
      required: true
    }
  ]
};

export default pageOptions;
