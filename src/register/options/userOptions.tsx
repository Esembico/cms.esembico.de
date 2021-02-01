import PersonIcon from '@material-ui/icons/Person';
import { Options } from '../../types/stateRegister';

const userOptions: Options = {
  singularName: 'user',
  model: 'user',
  icon: <PersonIcon />,
  columns: [
    {
      header: 'Username',
      display: 'username'
    },
    {
      header: 'Email',
      display: 'email'
    },
    {
      header: 'Active',
      display: 'is_active'
    }
  ],
  primaryProperty: {
    header: 'Username',
    display: 'username'
  },
  editor: [
    {
      type: 'text',
      label: 'Username',
      name: 'username',
      required: true
    },
    {
      type: 'text',
      label: 'Email',
      name: 'email'
    },
    {
      type: 'text',
      label: 'First name',
      name: 'first_name'
    },
    {
      type: 'text',
      label: 'Last name',
      name: 'last_name'
    },
    {
      type: 'boolean',
      label: 'Superuser',
      name: 'is_superuser'
    },
    {
      type: 'boolean',
      label: 'Active',
      name: 'is_active'
    },
    {
      type: 'boolean',
      label: 'Staff',
      name: 'is_staff'
    }
  ]
};

export default userOptions;
