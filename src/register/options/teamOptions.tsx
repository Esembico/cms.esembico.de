import GroupIcon from '@material-ui/icons/Group';
import { Options } from '../../types/stateRegister';
import { Data } from '../../redux/helpers/types/state';

const teamOptions: Options = {
  singularName: 'team member',
  model: 'member',
  icon: <GroupIcon />,
  endpoint: 'members',
  columns: [
    {
      header: 'Name',
      display: 'name'
    },
    {
      header: 'Artist name',
      display: 'artist_name'
    },
    {
      header: 'Title',
      display: 'titles'
    }
  ],
  primaryProperty: {
    display: (entry: Data): string => {
      return `${entry.name} (${entry.artist_name})`;
    },
    header: 'Name'
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
      label: 'Artist name',
      name: 'artist_name',
      required: true
    },
    {
      type: 'text',
      label: 'Titles',
      name: 'titles',
      required: true
    },
    {
      type: 'text',
      label: 'Bio',
      name: 'bio',
      multiline: true,
      required: true
    },
    {
      type: 'reference',
      label: 'Image',
      name: 'image',
      to: 'images',
      required: true
    }
  ]
};

export default teamOptions;
