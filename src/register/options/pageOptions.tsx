import PagesIcon from '@material-ui/icons/Pages';
import { Data } from '../../redux/helpers/types/state';
import { Options } from '../../types/stateRegister';

const pageOptions: Options = {
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
      type: 'generated',
      label: 'Slug',
      name: 'slug',
      value: (data: Data): string => {
        if (typeof data.name === 'string')
          return data.name?.replace(' ', '-').toLowerCase();
        return '';
      },
      dependsOn: ['name'],
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
